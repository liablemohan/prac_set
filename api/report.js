const nodemailer = require('nodemailer');

const RECIPIENT = 'mohan.sircle@gmail.com';
const SUBJECT = 'practice_spelling_mistake';

function clean(value, max = 5000) {
  return typeof value === 'string' ? value.slice(0, max) : '';
}

function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(value => value.trim().replace(/\/$/, ''))
    .filter(Boolean);
}

function requestOrigin(req) {
  return typeof req.headers.origin === 'string' ? req.headers.origin.replace(/\/$/, '') : '';
}

function isAllowedOrigin(req) {
  const origin = requestOrigin(req);
  // Non-browser requests have no Origin header. CORS does not apply to them.
  if (!origin) return true;

  const configured = allowedOrigins();
  if (configured.includes(origin)) return true;

  // Permit same-origin requests, e.g. when the app is also served by Vercel.
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
  return Boolean(host && origin === `${protocol}://${host}`);
}

function setCors(req, res) {
  const origin = requestOrigin(req);
  if (origin && isAllowedOrigin(req)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '600');
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'This website is not allowed to submit reports.' });
  }
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Basic bot trap. Real users never see or fill this field.
  if (clean(req.body && req.body.website, 200).trim()) {
    return res.status(200).json({ ok: true });
  }

  const message = clean(req.body && req.body.message, 4000).trim();
  const question = req.body && typeof req.body.question === 'object' ? req.body.question : {};
  if (!message) return res.status(400).json({ error: 'Please include a description of the mistake.' });
  if (message.length < 3) return res.status(400).json({ error: 'Please provide a little more detail.' });

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailAppPassword) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variable.');
    return res.status(503).json({ error: 'Email reporting is not configured yet. Please try again later or contact the site owner.' });
  }

  const options = question.options && typeof question.options === 'object' ? question.options : {};
  const optionLines = ['a','b','c','d'].map(key => `(${key}) ${clean(options[key], 1000)}`).join('\n');
  const selected = question.selectedOption ? `(${clean(question.selectedOption, 1)}) ${clean(question.selectedOptionText, 1000)}` : 'Not selected';
  const text = [
    'A question mistake was reported from Sanskrit UGC NET/JRF PYQ Practice.',
    '',
    'USER REPORT',
    message,
    '',
    'QUESTION DETAILS',
    `Question ID: ${clean(question.id, 300)}`,
    `Question number: ${clean(question.number, 30)}`,
    `Exam/paper: ${clean(question.section, 500)}`,
    `Source PDF page: ${clean(String(question.sourcePage ?? ''), 20)}`,
    '',
    'Question:',
    clean(question.question, 3000),
    '',
    'Options:',
    optionLines,
    '',
    `Selected option: ${selected}`,
    `Answer key: ${clean(question.answerKey, 10) || 'Not available'}`,
    '',
    `Reported at: ${new Date().toISOString()}`
  ].join('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: gmailUser, pass: gmailAppPassword },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    });

    await transporter.sendMail({
      from: `Sanskrit PYQ Practice <${gmailUser}>`,
      to: RECIPIENT,
      subject: SUBJECT,
      text
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Question report email failed:', error && error.message ? error.message : error);
    return res.status(502).json({ error: 'The email service could not send the report. Please try again later.' });
  }
};
