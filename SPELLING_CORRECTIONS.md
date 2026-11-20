# Spelling correction implementation

Source: `yct_sanskrit_spelling_audit-v2.csv`

- CSV correction entries reviewed: 350
- Question records retained: 3,250
- Correction entries that changed data: 285
- Text occurrences replaced: 299
- Entries already correct in context: 62
- Morphology-preserving entries: 7
- Entries held for manual review: 3
- Overlapping substrings resolved by preferring the more specific correction: 2

## Manual review required

The audit lists `प्रतिपादिका` → `प्रातिपदिक` for question 0146, question 0538, and explanation 0146. The actual contexts are `वाच्यार्थप्रतिपादिका शक्तिः` and `प्रतीयमानार्थस्य प्रतिपादिका शक्तिः`. Here `प्रतिपादिका` is the feminine form meaning “denoting”; replacing it with `प्रातिपदिक` would change the word and meaning. These three entries were therefore left unchanged pending confirmation.

## Morphology-preserving corrections

- `भूषिष्ठैः` → `भूयिष्ठैः`: the CSV supplies the citation form `भूयिष्ठ`; the instrumental plural ending `ैः` was retained in the question and explanation.
- `पुरूष` → `पुरुष`: applied as a stem correction so compounds and inflections remain intact (for example, `पुरुषबहुत्व`, `पुरुषों`, and `पुरुषं`). The CSV gives the standalone citation form `पुरुषः`, but adding visarga in these contexts would be inappropriate.
- `कैथुमी` → `कौथुमी`: applied within `कौथुमीय` to preserve the adjectival ending.

## Already-correct records

Some source strings in the CSV are substrings of words that are already correctly spelled, such as `सात्मकं` inside `रसात्मकं`, `धस्तनेषु` inside `अधस्तनेषु`, and `तोत्रकाव्य` inside `स्तोत्रकाव्य`. These were left unchanged to avoid duplicating the initial character.

The original audit CSV is the basis for the changes. No answer-key values or scoring logic were changed.
