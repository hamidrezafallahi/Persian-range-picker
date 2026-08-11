# GitHub repo SEO (manual steps)

Do these in the GitHub UI (Settings / About). Agents cannot reliably change them without your token.

## 1) About panel

- **Description:**  
  `Jalali / Persian date picker & range picker for React — DatePicker, compare ranges, TimePicker`
- **Website:**  
  `https://hamidrezafallahi.github.io/Persian-range-picker/`
- **Topics** (add all):
  - `react`
  - `typescript`
  - `datepicker`
  - `jalali-datepicker`
  - `persian-datepicker`
  - `range-picker`
  - `jalali`
  - `persian`
  - `shamsi`
  - `calendar`
  - `time-picker`
  - `erp`
  - `jalaali`

## 2) Rename repository (recommended)

Rename to: `react-persian-range-picker`

GitHub keeps redirects from the old name. After rename, update:

- `package.json` → `repository.url`, `bugs.url`, `homepage` (if needed)
- README badges / links
- GitHub Pages base path (`demo/vite.config.ts` `base`)
- CI / Pages settings if the site URL changes

Only do this when you are ready to redeploy Pages with the new base path.

## 3) Google Search Console

1. Add property: `https://hamidrezafallahi.github.io/Persian-range-picker/`
2. Verify (HTML meta tag or DNS if custom domain)
3. Submit sitemap:  
   `https://hamidrezafallahi.github.io/Persian-range-picker/sitemap.xml`
4. URL Inspection → Request indexing for:
   - `/`
   - `/guide/`
   - `/blog/en/`
   - `/blog/fa/`
   - npm package URL
   - GitHub repo URL

## 4) Publish articles

Use drafts already in the repo:

- `docs/article-en.md` → Dev.to / Hashnode / Medium
- `docs/article-fa.md` → Virgool / LinkedIn FA

Always link:

- npm package
- live demo
- `/guide/`
