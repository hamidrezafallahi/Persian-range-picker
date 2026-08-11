# SEO Checklist — Jalali / Persian date picker (React)

Status legend: ✅ done in repo · ⏳ needs deploy/publish · 👤 you must do manually

## Keyword strategy (search demand first, brand second)

People do **not** search the npm name. Target these intents in titles/H1/description:

| Priority | EN | FA |
|----------|----|----|
| Primary | `jalali date picker react`, `persian date picker` | `انتخابگر تاریخ شمسی`, `دیت پیکر شمسی react` |
| Secondary | `shamsi datepicker`, `react datepicker jalali` | `تقویم جلالی react`, `datepicker شمسی` |
| Range | `jalali range picker`, `persian date range picker` | `RangePicker شمسی`, `انتخاب بازه تاریخ` |
| Differentiator | `date range comparison`, `ERP date picker` | `مقایسه بازه زمانی`, `datepicker ERP` |
| Brand (low volume) | `react-persian-range-picker` | همان |

**Rule:** Title/H1 = search keyword. Package name only in install, npm link, `alternateName`.

## A. Technical crawlability

| # | Item | Status |
|---|------|--------|
| A1 | `robots.txt` Allow + Sitemap URL | ✅ |
| A2 | `sitemap.xml` with demo + guide + blog URLs | ✅ |
| A3 | Canonical URL on demo pages | ✅ |
| A4 | Meta title / description / OG / Twitter | ✅ |
| A5 | JSON-LD `SoftwareApplication` + `FAQPage` | ✅ |
| A6 | Crawlable HTML (not only SPA/`noscript`) | ✅ static pages |
| A7 | `llms.txt` for AI crawlers | ✅ |
| A8 | Deploy demo to GitHub Pages after merge | ⏳ after push |
| A9 | Google Search Console property + sitemap submit | 👤 |
| A10 | Request indexing for npm / GitHub / demo / guide | 👤 |
| A11 | Custom domain (optional, stronger brand) | 👤 |

## B. Naming & identity consistency

| # | Item | Status |
|---|------|--------|
| B1 | npm name = `react-persian-range-picker` | ✅ |
| B2 | Exact package name in H1 / title / schema | ✅ |
| B3 | Keywords include exact package name | ✅ |
| B4 | Rename GitHub repo → `react-persian-range-picker` | 👤 |
| B5 | Align repo About description + Homepage URL | 👤 |
| B6 | GitHub Topics (see list below) | 👤 |

**Suggested GitHub Topics:**  
`react` `typescript` `datepicker` `range-picker` `jalali` `persian` `shamsi` `calendar` `time-picker` `react-persian-range-picker` `erp` `jalaali`

## C. Content & backlinks (ranking fuel)

| # | Item | Status |
|---|------|--------|
| C1 | Strong README with install + demos + keywords | ✅ |
| C2 | EN article draft (`docs/article-en.md`) | ✅ |
| C3 | FA article draft (`docs/article-fa.md`) | ✅ |
| C4 | Static HTML blog pages on GitHub Pages | ✅ |
| C5 | Publish EN article (Dev.to / Hashnode / Medium) | 👤 |
| C6 | Publish FA article (Virgool / LinkedIn) | 👤 |
| C7 | Answer 2–3 Stack Overflow / Reddit questions with package link | 👤 |
| C8 | Submit to awesome-react / awesome-jalali lists (PRs) | 👤 |
| C9 | Show HN / Product Hunt (optional later) | 👤 |

## D. npm discoverability

| # | Item | Status |
|---|------|--------|
| D1 | Rich `description` + `keywords` in `package.json` | ✅ |
| D2 | README badges + demo + comparison table | ✅ |
| D3 | Keep releasing (activity signal) | 👤 ongoing |
| D4 | Grow weekly downloads via real usage / articles | 👤 |

## E. Verify indexing (after deploy)

Search these after Pages deploy + ~1–7 days:

```text
"react-persian-range-picker"
site:npmjs.com react-persian-range-picker
site:hamidrezafallahi.github.io react-persian-range-picker
site:github.com/hamidrezafallahi Persian-range-picker
```

Also use Search Console → URL Inspection → Request indexing.
