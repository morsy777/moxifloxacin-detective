# Drug Detective — Moxifloxacin Edition 🧪

A mobile-first, bilingual Arabic/English interactive chemistry mystery game designed to complement the supplied **Moxifloxacin** educational brochure. Built in **React + Vite**, with custom CSS, clickable real chemical structure, animated flipping/shuffling evidence cards, immediate explanations, and a results dashboard.

## What is included

- **20 case files** across five learning labs: Heterocycles, Structure Matching, IR/NMR Spectra, Drug Detective and Use It Safely.
- **5 hotspot areas** on a chemically correct SVG of Moxifloxacin. Students identify the quinolone core, C7 bicyclic amine, C3 carboxylic acid, C8 methoxy and N1 cyclopropyl.
- Four-column interactive drug matching exercise alongside multiple-choice challenges.
- Results instantly show correct/incorrect responses and explanations. Wrong answers show the right response.
- After each case, the remaining board shuffles and cards animate a flip. Solved cards stay visible but are locked.
- Score, streak, bonus points, case completion tracker and results summary.
- Progress saved to browser `localStorage` (no registration/backend needed).
- Responsive layout for students scanning a printed brochure QR code.
- Original brochure available at `/assets/brochure.jpg` for visual reference.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build and deploy on Vercel

1. Push this folder to a new GitHub repository (recommended name `moxifloxacin-detective`).
2. Go to [Vercel → New Project](https://vercel.com/new) and import that repository.
3. Framework preset: **Vite**; root directory: `./`; build: `npm run build`; output directory: `dist`.
4. Deploy. Subsequent commits to the default branch will automatically redeploy when Git integration is enabled.
5. **Only after obtaining the final production URL**, generate a QR code for that exact URL, add it to the brochure and test a phone scan before printing. Avoid QR codes based on preview-deployment URLs.

## Project layout

```text
src/
  main.jsx           # Game UI, chemistry visuals, interactive flow
  questions.js       # 20 questions, categories and reference links
  molecule-zones.json # Clickable hotspot positions on the SVG
  styles.css         # Brochure-inspired responsive design
public/
  assets/
    moxifloxacin.svg # Correct molecular depiction generated from PubChem SMILES
    brochure.jpg     # Reference brochure artwork supplied by the user
  favicon.svg
index.html
vite.config.js
vercel.json
```

## Scientific notes and review

**Important correction to source screenshots:** Moxifloxacin has a C7 **bicyclic amine** side chain (octahydropyrrolo[3,4-b]pyridinyl), not a simple piperazine ring. The game deliberately uses the correct structural assignment. Its free-base formula is **C21H24FN3O4** (MW ≈ 401.43 g/mol). Moxifloxacin hydrochloride has a different formula; the quiz specifies the free base.

The IR/NMR plots are **illustrative teaching schematics**, not experimentally recorded spectra. Actual chemical shifts and IR bands depend on sample and measurement conditions. Drug dosing and interactions are educational summaries, not individualized medical advice. Confirm clinical text and suitability with an instructor before printing.

Primary references:

- [PubChem: Moxifloxacin, CID 152946](https://pubchem.ncbi.nlm.nih.gov/compound/152946)
- [DailyMed: Moxifloxacin tablets, prescribing information](https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1c6f7150-a8f4-408f-956f-c26d37030cf4)

## Updating questions

Edit `src/questions.js`. The following data structures are supported: `choice`, `molecule`, and `matching`. If you change the questions, bump `STORAGE_KEY` in `src/main.jsx` to clear obsolete saved playthroughs.

## License

Educational project. The included brochure artwork belongs to its original authors and was provided for this project; review permissions before publicly redistributing it.

### Optional Windows one-click publishing workflow

From PowerShell inside the unzipped project, run `./publish.ps1`. This helper checks that GitHub CLI is signed in as `morsy777`, creates a public repository, pushes the source, deploys to Vercel using the CLI and attempts to connect Git integration. Authentication/approval prompts still require your interaction. It is included because GitHub's connected app in this session does not expose a repository-creation action.

### Generating the printable QR after deployment

Run `python tools/make_qr.py https://YOUR-PRODUCTION-URL.vercel.app`. The script produces both a high-contrast PNG and a scalable SVG in `print-assets/`. Add either one to the brochure *after* the production URL has been verified. The supplied QR generator does not publish the application by itself.
