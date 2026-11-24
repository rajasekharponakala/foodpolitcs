# Plate & Power

An interactive, responsive visual companion to **_The Meat of the Matter_ by Dr Sylvia Karpagam** (HarperCollins India, 2026).

The site turns the book’s themes into explorable systems rather than a linear summary: nutrition, access, identity, school meals, markets, policy and action. Its visual language combines editorial neo-brutalism with translucent glass panels, oversized typography and colour-coded evidence.

## Features

- Interactive access-chain walkthrough with wealth-gap chart
- Protein, iron and vitamin B12 evidence views
- Educational meal-role lab with locally saved selections
- Filterable myth decoder with nuance and source drawers
- Policy pipeline and evidence-type filter
- Nutrition / climate / livelihood / rights trade-off canvas
- Ten-chapter map with accessible chapter dialogs
- Stakeholder action checklists with local-only persistence
- Full-text search (`/` or `Ctrl/Cmd + K`)
- Keyboard tabs, skip link, focus states, reduced-motion support and mobile navigation
- Source notes that distinguish surveys, studies, legal rules, models, allegations and the author’s arguments

## Run locally

```bash
npm ci
npm run dev
```

Open the URL printed by Vite.

## Verify

```bash
npm ci
npx playwright install chromium
npm run build
npm test
```

The test suite covers core interactions, mobile navigation, source dialogs, checklist persistence, keyboard search, horizontal overflow and automated accessibility checks.

## Deployment

Pushing to `main` runs the GitHub Pages workflow in `.github/workflows/pages.yml`. It builds the site with Vite and deploys `dist/` through the official Pages actions.

The site is static and uses no analytics, account system or backend. Meal choices and checklist progress are stored only in the visitor’s browser.

## Editorial and medical limitations

- This is an independent educational companion, not an official book website or medical service.
- Book text and cover art are not republished.
- Figures reflect the evidence periods cited in the book, not a live data feed.
- NFHS-5, CNNS and administrative measurements have different samples, age groups and years; they are not one time series.
- Survey findings, study estimates, official rules, reported allegations and author interpretations are labelled separately.
- The meal lab models food-role coverage only. It does not calculate calories, clinical adequacy or supplement doses.
- Laws and nutritional standards can change. Check current official notifications before implementation.

## License

Original website code is released under the MIT License. Book-related summaries remain attributable to Dr Sylvia Karpagam and the cited sources; no claim of ownership over the book or its text is made.
