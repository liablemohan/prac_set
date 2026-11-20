# Sanskrit UGC NET/JRF PYQ Practice

A mobile-friendly, static practice app for Sanskrit UGC NET/JRF previous-year questions. The question bank, options, answer key, and available explanations are embedded in `index.html`. The app supports question search, paper filters, answer checking, explanations, progress tracking, review marks, exportable progress, and the red mistake-report dialog.

## GitHub Pages deployment

This repository is configured to publish automatically to GitHub Pages whenever you push to the `main` branch. The workflow publishes **only** `index.html` and `config.js`; it does not publish the server-side `api/` folder or other project files.

### 1. Create the repository

1. Download and extract this project ZIP.
2. On GitHub, create a new repository. For GitHub Free, make it **Public** to use GitHub Pages.
3. Upload/push the extracted project contents to the repository's `main` branch. Do not upload the ZIP itself as a single file.

Using Git from Terminal (run inside the extracted project folder):

```bash
git init
git add .
git commit -m "Initial Sanskrit PYQ practice app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If you already created the repository with a README or license, follow GitHub's instructions for connecting an existing repository or clone it first to avoid unrelated-history conflicts.

### 2. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy Sanskrit PYQ to GitHub Pages** to complete.
5. The deployed URL is shown in the successful workflow run and under **Settings → Pages**. It will usually look like `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

Future pushes to `main` automatically redeploy the site.

## Email reporting: important hosting distinction

GitHub Pages is static hosting. It cannot execute `api/report.js`, so the red **Report a mistake** dialog will appear, but email delivery will remain disabled until you configure a separate API host. This repository retains the Vercel API so you can keep email reporting without exposing Gmail credentials in the browser.

### 1. Deploy the API on Vercel

1. Import this same GitHub repository into Vercel as a separate Vercel project.
2. In Vercel → Project → Settings → Environment Variables, add:
   - `GMAIL_USER` = `mohan.sircle@gmail.com`
   - `GMAIL_APP_PASSWORD` = your Google App Password (16 characters; remove spaces if displayed)
   - `ALLOWED_ORIGINS` = `https://YOUR-USERNAME.github.io`
3. Redeploy the Vercel project.
4. Confirm the API endpoint is `https://YOUR-VERCEL-PROJECT.vercel.app/api/report`.

If you use a custom domain for GitHub Pages, put that origin in `ALLOWED_ORIGINS` instead. Multiple allowed origins can be comma-separated. Do not include a trailing slash.

### 2. Connect GitHub Pages to the Vercel API

Edit `config.js` in the GitHub repository and set the Vercel endpoint:

```js
window.PYQ_CONFIG = {
  reportApiUrl: "https://YOUR-VERCEL-PROJECT.vercel.app/api/report"
};
```

Commit and push the change. GitHub Actions will redeploy the site. The public API URL is not a secret; the Gmail App Password must remain only in Vercel Environment Variables.

### Gmail App Password

Google requires 2-Step Verification for App Passwords, and the feature may be unavailable for some managed or protected accounts. Create one at https://myaccount.google.com/apppasswords. Never put it in `index.html`, `config.js`, `.env.example`, or any public Git commit.

## Repository layout

```text
.
├── .github/workflows/deploy-pages.yml  # Automatic GitHub Pages deploy
├── api/report.js                       # Vercel email-report endpoint
├── data/p1_audited_records.jsonl        # P1 audited source records
├── config.js                            # Public frontend configuration
├── index.html                           # Complete practice application + embedded question bank
├── package.json                         # Vercel API dependency
├── .env.example                         # Environment-variable names only
├── P1_VERIFIED_CORRECTIONS.md           # P1 correction notes
└── SPELLING_CORRECTIONS.md              # Spelling correction notes
```

The GitHub Pages workflow uploads only `index.html`, `config.js`, and `.nojekyll`. The API source is kept in the repository for the separate Vercel deployment, not exposed as a Pages endpoint.

## Included data and correction notes

- 3,250 questions are retained in the app's embedded dataset.
- Verified spelling corrections and the P1 audited corrections are included in the current application build.
- Records that require checking against the source PDF are not silently completed with invented options or answer permutations.
- `data/p1_audited_records.jsonl`, `P1_VERIFIED_CORRECTIONS.md`, and `SPELLING_CORRECTIONS.md` are retained as audit material.

## Progress and privacy

- Practice progress is saved in the current browser's local storage. It does not synchronise across devices or users.
- The question bank, options, answers, and explanations are shipped to the browser. Anyone can inspect the public website's source and download that data.
- Mistake reports are sent to `mohan.sircle@gmail.com` with the fixed subject `practice_spelling_mistake` through the Vercel API when configured.
- Do not commit passwords, App Passwords, private tokens, or a real `.env` file.

## Local preview

You can open `index.html` directly in a modern browser. For a local HTTP server, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
