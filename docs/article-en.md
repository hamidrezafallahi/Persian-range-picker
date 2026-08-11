# From Simple Date Picking to ERP Range Comparison in React (Jalali + Gregorian)

> **Best for:** Dev.to, Hashnode, Medium, Reddit r/reactjs / r/javascript, LinkedIn, Hacker News “Show HN” (short pitch), Product Hunt (later)  
> **Keywords:** React Jalali date picker, Persian calendar React, Shamsi datepicker, date range comparison, ERP range picker, keyboard date mask, TimePicker, leap year Jalali

Most React date libraries answer a simple question:

> “Which day (or which range) did the user pick?”

Enterprise dashboards and ERP systems ask a harder one:

> “Compare this period to another period — then move both ranges together when the analyst steps backward.”

That is the gap [`react-persian-range-picker`](https://www.npmjs.com/package/react-persian-range-picker) is built for: **comparative date-range UX** inspired by enterprise analytics tools, with first-class **Jalali (Persian / Shamsi)** support, Gregorian mode, keyboard masking, time picking — and a navigation model many pickers never ship.

---

## The capability ladder (simple → enterprise)

| Level | Need | Component |
|------|------|-----------|
| 1 | Single date (forms, invoices) | `DatePicker` |
| 2 | Fast keyboard entry `YYYY/MM/DD` | `Mask` or `DatePicker` + `showMask` |
| 3 | Time selection | `TimePicker` / `DatePicker` + `showTime` |
| 4 | One reporting range | `RangePicker` |
| 5 | Primary vs compare periods | `RangePicker` + `showComparison` |
| 6 | Step both ranges together | `isShowNavigationButton` |
| 7 | Safe popup placement / responsive UX | `useRenderPosition` / `useMediaQuery` |

This ladder is why the library fits large products (ERP, BI, finance panels) — not only “pretty calendars”.

---

## The enterprise problem (beyond a calendar grid)

In ERP, BI, and ops dashboards you usually need all of this together:

1. A primary range (e.g. this month)
2. A compare range (previous month / previous year / custom)
3. Fast period stepping (back/forward by day, week, month, year)
4. Correct calendar math for **Jalali leap years** and month lengths
5. Optional Gregorian mode for bilingual products
6. Stable exports for APIs (`Unix ms` or `ISO string`)

Popular Jalali pickers are great at rendering calendars. Few of them treat **range comparison + synced period navigation** as a first-class product feature.

---

## What makes this library different?

### 1) Enterprise-style range comparison
`RangePicker` is designed for analytics/ERP workflows:

- primary range + compare range
- period tabs (Day / Week / Month / Year / manual)
- submit/reject style interaction suitable for filters

### 2) Synced step navigation (a real differentiator)
The period navigation buttons do more than shift one range:

- one click moves the **primary** range one step back/forward
- the **compare** range moves by the matching step at the same time

This “move both timelines together” behavior is exactly what analysts expect in ERP screens — and it is often missing (or custom-built) even in Dynamics-inspired UIs.

### 3) Jalali-native engine (not a fragile convert layer)
Date math is powered by [`jalaali-js`](https://www.npmjs.com/package/jalaali-js) (Borkowski algorithm). The library is Shamsi-first, while still supporting Gregorian via `calendarType`. No `moment-jalaali` dependency.

### 4) A practical component set for forms + dashboards
Besides range comparison:

- `DatePicker` (optional mask + time)
- keyboard `Mask` (`YYYY/MM/DD` segments with year → month → day focus)
- `TimePicker`
- embeddable `Calendar`
- `useRenderPosition` / `useMediaQuery` helpers
- `formatExport` / `formatIDateExport` utilities

### 5) Production-friendly footprint
Runtime date dependency is essentially `jalaali-js`, with React as a peer dependency — useful when enterprise bundles are already heavy.

---

## Install & quick start

```bash
npm i react-persian-range-picker
# or
yarn add react-persian-range-picker
```

**Peer dependencies:** `react` and `react-dom` (`^17` / `^18` / `^19`).

### Example 1 — Simple DatePicker (level 1)

```tsx
import { useState } from 'react';
import { DatePicker } from 'react-persian-range-picker';
import type { DatePickerValue } from 'react-persian-range-picker';

export function InvoiceDateField() {
  const [value, setValue] = useState<DatePickerValue>(null);

  return (
    <DatePicker
      calendarType="jalali" // or "gregorian"
      exportType="timeStamp"
      showMask
      allowClear
      value={value}
      onChange={setValue}
      primaryColor="#1c39bb"
    />
  );
}
```

### Example 2 — Standalone Mask (level 2)

```tsx
import { Mask } from 'react-persian-range-picker';

<Mask
  calendarType="jalali"
  exportType="IsoString"
  allowClear
  maskPlaceHolder="____/__/__"
  onMaskChange={(v) => console.log(v)}
  onError={(msg) => console.warn(msg)}
/>
```

### Example 3 — TimePicker (level 3)

```tsx
import { TimePicker } from 'react-persian-range-picker';

<TimePicker
  exportType="timeStamp"
  showSecond
  showNow
  minuteStep={5}
  onChange={(v) => console.log(v)}
/>
```

### Example 4 — Range + compare + synced navigation (levels 5–6)

```tsx
import { useState } from 'react';
import { RangePicker } from 'react-persian-range-picker';
import type { HandleParams, IDate } from 'react-persian-range-picker';

export function RevenueFilter() {
  const [range, setRange] = useState<IDate | null>(null);

  return (
    <RangePicker
      calendarType="jalali"
      exportType="timeStamp"
      showComparison
      isShowNavigationButton
      value={range ?? undefined}
      onChange={(e: HandleParams) => {
        const date = e.Data?.date as IDate | undefined;
        if (date) setRange(date);
      }}
      onCompareDateChange={(e) => {
        console.log('compare', e.Data);
      }}
      onSubmit={(e) => console.log('submit', e)}
      primaryColor="#1c39bb"
    />
  );
}
```

> API note: `RangePicker` delivers values via `e.Data.date` and `e.Data.compareDate` (not `e.date`).

### Export formats

| `exportType` | Output |
|--------------|--------|
| `"timeStamp"` | `number` (ms) |
| `"IsoString"` | ISO-8601 `string` |
| clear / invalid | `null` |

---

## When to choose it

**Choose it when:**

- your product is ERP/dashboard-heavy and compare ranges are core UX
- Jalali must be native (Iranian enterprise apps, bilingual products)
- you need synced primary+compare period navigation
- you want Gregorian too without switching libraries
- you want a focused picker without pulling an entire Ant/MUI stack

**Consider alternatives when:**

- you only need a simple single-date input inside Ant Design / MUI
- you prioritize the largest plugin ecosystem first (`react-multi-date-picker`)

---

## Quick comparison

| Capability | react-persian-range-picker | react-multi-date-picker | MUI + Jalali adapter | antd-jalali |
|------------|---------------------------|-------------------------|----------------------|-------------|
| Range | Yes | Yes | Limited | Yes |
| Compare range | Yes (first-class) | No / custom | No | No |
| Synced step navigation | Yes | No | No | No |
| Keyboard mask | Yes | Limited | No | Limited |
| TimePicker | Yes | Yes | Yes | Yes |
| Deps | Very low (`jalaali-js`) | Higher | High | High |

---

## FAQ

**Does it handle Jalali leap years?**  
Yes — the engine is `jalaali-js`, and mask/calendar validation is leap-aware.

**Jalali only?**  
No. Use `calendarType="gregorian"` when needed.

**React 19?**  
Yes — peers cover React 17 / 18 / 19.

**TypeScript?**  
Yes — types ship with the package.

---

## Links

- **Live demo:** [GitHub Pages](https://hamidrezafallahi.github.io/react-persian-range-picker/)
- **npm:** [react-persian-range-picker](https://www.npmjs.com/package/react-persian-range-picker)
- **Source:** [GitHub repository](https://github.com/hamidrezafallahi/react-persian-range-picker)
- **Author:** [Hamidreza Fallahi](https://github.com/hamidrezafallahi)

---

## Closing / Show HN pitch (short)

If your React app only needs a calendar, almost any picker will do.  
If your React app needs **enterprise range comparison** — especially with Jalali, Gregorian mode, and synced period stepping — try `react-persian-range-picker` with `showComparison` and navigation enabled. That combination is the product story, not just another date widget.

```bash
npm i react-persian-range-picker
```

**Demo:** https://hamidrezafallahi.github.io/react-persian-range-picker/
