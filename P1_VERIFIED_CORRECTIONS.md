# P1 Verified Corrections Applied

Source: `yct_sanskrit_p1_verified_corrections.csv`

- Total CSV rows: **63**
- Rows marked Verified: **52**
- Rows marked Requires Source PDF: **11**
- Verified rows still requiring a PDF check because code choices, distractors, or an answer detail remain unresolved: **22**
- Additional neighbouring records repaired for cross-column alignment: **4** (0073, 0198, 0382, 0542)

## Corrections applied

For each Verified row, the corrected question text, explicit options, and corrected answer were written into the application dataset. Missing matching-table code permutations were **not reconstructed**; their options are shown as `[VERIFY_FROM_PDF]` and the record is not auto-graded. Ambiguous answer candidates are retained as `answerCandidate` and not treated as confirmed answer keys.

## Records still requiring the source PDF

0643, 2013, 2144, 2202, 2207, 2371, 2402, 2441, 2516, 2569, 3237

## Verified records with remaining PDF checks

0184, 0422, 0540, 0712, 0754, 0778, 1092, 1177, 1981, 2104, 2164, 2395, 2409, 2422, 2429, 2451, 2460, 2462, 2475, 2477, 2485, 2984

## Explanation alignment repairs

- **0074:** removed the unrelated explanation about `अधिहरि`; no unsupported replacement was inserted.
- **0184:** moved the matching explanation from record 0198, corrected `Genological` to `Genealogical`, and removed it from 0198.
- **0264, 0377, 0383, 2984:** withheld linked explanations identified as belonging to other questions.
- **0382:** restored the `छायाङ्क` question stem; kept its supporting उत्तररामचरितम् explanation.
- **0073 and 0542:** removed the next question's stem from the previous explanation.
- Recovered explanations where the audit explicitly identified OCR-tagged text or gave the relevant verified mapping/source statement (including 1653, 2011, 2414 and 3010).

See `data/p1_audited_records.jsonl` for the resulting data for all 63 CSV rows.
