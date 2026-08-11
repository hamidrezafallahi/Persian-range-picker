# React Jalali / Persian Date Picker & Range Picker

[![npm version](https://img.shields.io/npm/v/react-persian-range-picker.svg)](https://www.npmjs.com/package/react-persian-range-picker)
[![npm downloads](https://img.shields.io/npm/dm/react-persian-range-picker.svg)](https://www.npmjs.com/package/react-persian-range-picker)
[![license](https://img.shields.io/npm/l/react-persian-range-picker.svg)](https://github.com/hamidrezafallahi/react-persian-range-picker/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6)](https://www.typescriptlang.org/)

**Jalali (Persian / Shamsi) date picker and range picker for React** — plus TimePicker and keyboard date mask.

Lightweight components for **Jalali** and **Gregorian** calendars: single date, date-range selection with comparison (analytics/ERP-style), time selection, and a keyboard-friendly input mask.

> npm package: [`react-persian-range-picker`](https://www.npmjs.com/package/react-persian-range-picker) · Author: [Hamidreza Fallahi](https://github.com/hamidrezafallahi)

---

## Table of contents

- [Features](#features)
- [Install](#install)
- [Quick start](#quick-start)
- [Usage examples](#usage-examples)
- [API overview](#api-overview)
- [Export format](#export-format)
- [Keyboard & accessibility](#keyboard--accessibility)
- [Demo](#demo)
- [Comparison](#comparison)
- [SEO & docs](#seo--docs)
- [فارسی](#فارسی)
- [License](#license)

---

## Features

- **Jalali-first calendar engine** powered by [`jalaali-js`](https://www.npmjs.com/package/jalaali-js) (Borkowski algorithm) — leap years and month lengths handled correctly
- **Gregorian** support via `calendarType="gregorian"`
- **DatePicker** — single date, optional time (`showTime`), optional mask input (`showMask`)
- **RangePicker** — range selection, period navigation, optional **compare** ranges (analytics-style)
- **Mask** — type `YYYY/MM/DD` with segment focus (year → month → day), validation, clear
- **TimePicker** — hour / minute / second columns
- **Calendar** — embeddable grid calendar (`date` or `range` model)
- **Controlled & uncontrolled** modes (`value` / `defaultValue`)
- **Export as** Unix timestamp (ms) or ISO string (`exportType`)
- **Hooks:** `useRenderPosition`, `useMediaQuery`
- **RTL / LTR**, mobile fullscreen UX, React **17 / 18 / 19**, TypeScript types included
- **Minimal dependency:** only `jalaali-js` (plus `react` / `react-dom` as peers)

---

## Install

```bash
npm i react-persian-range-picker
# or
yarn add react-persian-range-picker
# or
pnpm add react-persian-range-picker
```

**Peer dependencies:** `react` and `react-dom` (`^17` / `^18` / `^19`).

```bash
npm i react react-dom
```

---

## Quick start

```tsx
import { useState } from 'react';
import {
  DatePicker,
  RangePicker,
  Mask,
  TimePicker,
  Calendar,
} from 'react-persian-range-picker';

export function App() {
  const [date, setDate] = useState<number | string | null>(null);

  return (
    <DatePicker
      calendarType="jalali"
      exportType="timeStamp"
      showMask
      allowClear
      value={date}
      onChange={setDate}
    />
  );
}
```

---

## Usage examples

### DatePicker (single date + mask)

```tsx
import { useState } from 'react';
import { DatePicker } from 'react-persian-range-picker';
import type { DatePickerValue } from 'react-persian-range-picker';

function SingleDateExample() {
  const [value, setValue] = useState<DatePickerValue>(null);

  return (
    <DatePicker
      calendarType="jalali"      // "jalali" | "gregorian"
      exportType="IsoString"     // "timeStamp" | "IsoString"
      showMask
      showTime={false}
      allowClear
      value={value}
      onChange={setValue}
      primaryColor="#2563eb"
      highlightColor="#f3f4f6"
    />
  );
}
```

Uncontrolled:

```tsx
<DatePicker
  defaultValue={Date.now()}
  calendarType="jalali"
  exportType="timeStamp"
  onChange={(v) => console.log(v)}
/>
```

### RangePicker (range + optional compare)

```tsx
import { useState } from 'react';
import { RangePicker } from 'react-persian-range-picker';
import type { HandleParams, IDate } from 'react-persian-range-picker';

function RangeExample() {
  const [range, setRange] = useState<IDate | null>(null);

  return (
    <RangePicker
      calendarType="jalali"
      exportType="timeStamp"
      showComparison
      value={range ?? undefined}
      onChange={(e: HandleParams) => {
        const date = e.Data?.date as IDate | undefined;
        if (date) setRange(date);
      }}
      onCompareDateChange={(e) => {
        console.log('compare', e.Data);
      }}
      onSubmit={(e) => console.log('submit', e)}
    />
  );
}
```

### Mask (standalone keyboard input)

```tsx
import { useState } from 'react';
import { Mask } from 'react-persian-range-picker';

function MaskExample() {
  const [value, setValue] = useState<number | string | null>(null);

  return (
    <Mask
      calendarType="jalali"
      exportType="timeStamp"
      allowClear
      maskPlaceHolder="____/__/__"
      value={value}
      onMaskChange={setValue}
      onError={(msg) => console.warn(msg)}
    />
  );
}
```

**Mask modes**

| Mode | How | Behavior |
|------|-----|----------|
| Display | default | Shows formatted date or placeholder |
| Separated | Tab / click / type | Focus year → Tab month → Tab day |
| Full | triple-click a segment | One field selects the whole value |

### TimePicker

```tsx
import { TimePicker } from 'react-persian-range-picker';

<TimePicker
  exportType="timeStamp"
  showSecond
  showNow
  hourStep={1}
  minuteStep={5}
  onChange={(v) => console.log(v)}
/>
```

### Calendar (inline)

```tsx
import { Calendar } from 'react-persian-range-picker';

<Calendar
  model="date"
  calendarType="jalali"
  exportType="timeStamp"
  onChange={(v) => console.log(v)}
/>
```

### Helpers

```tsx
import { formatExport, formatIDateExport } from 'react-persian-range-picker';

// Internal ms → public API shape
const iso = formatExport(Date.now(), 'fa', 'IsoString');
const rangeOut = formatIDateExport(
  { from: Date.now() - 86400000, to: Date.now() },
  'fa',
  'timeStamp'
);
```

### Hooks

```tsx
import { useMediaQuery, useRenderPosition } from 'react-persian-range-picker';

const isMobile = useMediaQuery('(max-width: 768px)');
// useRenderPosition({ buttonRef, popupRef, isOpen, setIsOpen, ... })
```

---

## API overview

### Public exports

| Export | Kind | Description |
|--------|------|-------------|
| `DatePicker` | component | Single date (+ optional mask / time) |
| `RangePicker` | component | Date range (+ compare / navigation) |
| `Mask` | component | Jalali/Gregorian typed date mask |
| `TimePicker` | component | Time columns |
| `Calendar` | component | Inline calendar grid |
| `useRenderPosition` | hook | Safe popup placement |
| `useMediaQuery` | hook | Responsive breakpoint helper |
| `formatExport` / `formatIDateExport` | util | Boundary formatting |
| `MaskMode` | const | Display / Separated / Full |

### Common props

| Prop | Type | Default / notes |
|------|------|-----------------|
| `calendarType` | `"jalali" \| "gregorian"` | Jalali by default in most UIs |
| `exportType` | `"timeStamp" \| "IsoString"` | Controls `onChange` / mask output |
| `value` / `defaultValue` | see types | Controlled vs uncontrolled |
| `disabled` | `boolean` | Disables interaction |
| `allowClear` | `boolean` | Clear → `null` |
| Theme colors | `primaryColor`, `highlightColor`, … | Optional theming |

**DatePicker extras:** `showMask`, `showTime`, `isTodaySelectPreset`, `onClear`.

**RangePicker extras:** `showComparison`, `isShowNavigationButton`, `onCompareDateChange`, `onSubmit`, `activeTable`.

> Full prop typings ship in `dist/index.d.ts` (`DatePickerProps`, `RangePickerProps`, `MaskProps`, …).

---

## Export format

Internally the library stores dates as **Unix milliseconds**. At the public boundary:

| `exportType` | Output |
|--------------|--------|
| `"timeStamp"` | `number` (ms) |
| `"IsoString"` | ISO-8601 `string` |
| clear / invalid | `null` |

Use `formatExport` / `formatIDateExport` when you need the same mapping outside components.

---

## Keyboard & accessibility

- **Tab** into Mask / DatePicker-with-mask focuses the **year** segment, then month, then day, then the next form control.
- Arrow keys move between segments; digits validate with leap-year awareness.
- Prefer not wrapping Mask inside a single `<button>` (the built-in DatePicker shell already uses a non-button container when `showMask` is on).

---

## Demo

**Live demo (GitHub Pages):**  
[https://hamidrezafallahi.github.io/react-persian-range-picker/](https://hamidrezafallahi.github.io/react-persian-range-picker/)

**Docs & articles (crawlable HTML):**

- [Install guide](https://hamidrezafallahi.github.io/react-persian-range-picker/guide/)
- [English article](https://hamidrezafallahi.github.io/react-persian-range-picker/blog/en/)
- [مقاله فارسی](https://hamidrezafallahi.github.io/react-persian-range-picker/blog/fa/)
- npm: [`react-persian-range-picker`](https://www.npmjs.com/package/react-persian-range-picker)

Local playground:

```bash
yarn install
yarn dev
# or: yarn dev:demo

# publish demo site
yarn build:demo
yarn deploy:demo
```

Preview assets:

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/react-persian-range-picker/refs/heads/main/public/assets/calendar-range-picker.PNG" width="700" alt="Persian Jalali range picker desktop UI"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/react-persian-range-picker/refs/heads/main/public/assets/desktop-gregorian.PNG" width="700" alt="Gregorian date range picker desktop"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/react-persian-range-picker/refs/heads/main/public/assets/mobile-range-picker.PNG" width="320" alt="Mobile Persian range picker fullscreen"/>
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/react-persian-range-picker/refs/heads/main/public/assets/mobile-compare-range.PNG" width="320" alt="Mobile compare date ranges"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/react-persian-range-picker/refs/heads/main/public/assets/mask.PNG" width="300" alt="Persian date input mask"/>
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/react-persian-range-picker/refs/heads/main/public/assets/time-picker.PNG" width="300" alt="React time picker columns"/>
</p>

---

## Comparison

| Library | Range | Time | Mask | Customize | Deps |
|---------|-------|------|------|-----------|------|
| **react-persian-range-picker** | Yes + compare | Yes | Yes | High | Very low (`jalaali-js`) |
| react-multi-date-picker | Yes | Yes | Limited | Good | Higher |
| MUI pickers + Jalali adapter | Limited | Yes | No | Medium | High |
| antd-jalali | Yes | Yes | Limited | Limited | High |

**Keywords:** React Persian date picker, Jalali datepicker, Shamsi calendar React, date range picker, compare ranges, Persian input mask, React 19 date picker, TypeScript Jalali, **react-persian-range-picker**.

---

## SEO & docs

Crawlable pages (better for Google than SPA-only content):

| Page | URL |
|------|-----|
| Demo | https://hamidrezafallahi.github.io/react-persian-range-picker/ |
| Guide | https://hamidrezafallahi.github.io/react-persian-range-picker/guide/ |
| Article EN | https://hamidrezafallahi.github.io/react-persian-range-picker/blog/en/ |
| Article FA | https://hamidrezafallahi.github.io/react-persian-range-picker/blog/fa/ |
| Sitemap | https://hamidrezafallahi.github.io/react-persian-range-picker/sitemap.xml |

Repo SEO checklist: [`docs/SEO-CHECKLIST.md`](./docs/SEO-CHECKLIST.md) · Manual GitHub steps: [`docs/REPO-SEO-MANUAL.md`](./docs/REPO-SEO-MANUAL.md)

---

## فارسی

### معرفی

`react-persian-range-picker` یک کتابخانهٔ سبک React برای **انتخاب تاریخ شمسی (جلالی)** و میلادی است؛ شامل DatePicker، RangePicker با مقایسه بازه، Mask ورودی کیبوردی، TimePicker و Calendar توکار.

### نصب

```bash
npm i react-persian-range-picker
```

وابستگی‌های peer: `react` و `react-dom` (نسخه ۱۷، ۱۸ یا ۱۹). تنها dependency تاریخ: `jalaali-js` (دیگر به `moment-jalaali` نیاز نیست).

### شروع سریع

```tsx
import { DatePicker } from 'react-persian-range-picker';

<DatePicker
  calendarType="jalali"
  exportType="timeStamp"
  showMask
  allowClear
  onChange={(v) => console.log(v)}
/>
```

### کامپوننت‌های اصلی

| کامپوننت | کاربرد |
|----------|--------|
| `DatePicker` | یک تاریخ (+ ماسک / ساعت) |
| `RangePicker` | بازه + مقایسه اختیاری |
| `Mask` | تایپ `سال/ماه/روز` |
| `TimePicker` | ساعت |
| `Calendar` | تقویم درون‌خطی |

### خروجی

- `exportType="timeStamp"` → میلی‌ثانیه
- `exportType="IsoString"` → رشته ISO
- پاک‌کردن → `null`

### کیبورد (Mask)

با **Tab** ابتدا روی **سال** فوکوس می‌شود، سپس ماه، سپس روز، و بعد به فیلد بعدی فرم می‌رود.

### دمو زنده

[https://hamidrezafallahi.github.io/react-persian-range-picker/](https://hamidrezafallahi.github.io/react-persian-range-picker/)

### توسعه محلی

```bash
yarn install
yarn test      # Vitest
yarn build    # Rollup + TypeScript declarations
yarn dev      # دمو (InitialComponent)
yarn build:demo && yarn deploy:demo  # انتشار GitHub Pages
```

---

## License

MIT © [Hamidreza Fallahi](https://github.com/hamidrezafallahi)

Repository: [github.com/hamidrezafallahi/react-persian-range-picker](https://github.com/hamidrezafallahi/react-persian-range-picker)  
Issues: [GitHub Issues](https://github.com/hamidrezafallahi/react-persian-range-picker/issues)  
npm: [react-persian-range-picker](https://www.npmjs.com/package/react-persian-range-picker)
