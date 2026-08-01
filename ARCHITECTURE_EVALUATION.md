# ارزیابی معماری کتابخانه `react-persian-range-picker`

> تاریخ بررسی: ۱۴۰۴/۰۵/۱۰ (۱ اوت ۲۰۲۶)  
> نسخهٔ فعلی: `1.0.36`  
> رویکرد: مربی‌گونه — تمرکز روی لایه‌ها، قرارداد تایپ، جنس خروجی، ارتباط فایل‌ها و مدیریت داده

---

## خلاصهٔ حکم

کتابخانه از نظر **ارزش محصول** (بازه + مقایسه + ماسک جلالی + وابستگی سبک) قوی است؛ از نظر **قرارداد پایدار API و یکنواختی خروجی** هنوز خام است. هستهٔ تاریخ (`dateEngine`) و لایهٔ `Mask` بهترین بخش‌ها هستند. ضعیف‌ترین نقطه، **عدم اعمال یکسان `exportType` روی RangePicker** و تایپ‌های شلِ رویدادها (`HandleParams`) است.

| معیار | امتیاز (از ۱۰) |
|--------|----------------|
| هستهٔ تاریخ (`dateEngine`) | **۸.۵** |
| لایهٔ Mask | **۸.۰** |
| لایهٔ Calendar | **۷.۰** |
| هوک‌ها و زیرساخت UI | **۷.۵** |
| ارکستراسیون Range / Comparison | **۶.۰** |
| قرارداد تایپ و خروجی عمومی | **۵.۰** |
| مدیریت state / ذخیره‌سازی داده | **۵.۰** |
| ارتباط و مرزبندی لایه‌ها | **۶.۰** |
| تست‌پذیری و DX مصرف‌کننده | **۴.۵** |
| **میانگین وزنی کلی** | **۶.۵ / ۱۰** |

---

## ۱. نقشهٔ لایه‌ها و ارتباط فایل‌ها

```text
src/index.ts                          ← Public API (کامپوننت + type)
│
├── dateEngine/                       ← Domain Engine (PDate + jalaali-js)
│
├── core/
│   ├── type.ts                       ← ExportType, IDate, TLocale
│   ├── helper.ts                     ← period presets, navigation steps
│   ├── mainContent.tsx               ← تب‌های Day/Week/Month/Year/manual
│   ├── manual.tsx / periodList.tsx   ← انتخاب بازه
│   ├── maskRange.tsx / navigateButton.tsx / footer.tsx
│
├── persianDatePicker/
│   ├── type.ts / enum.ts             ← سطح وسیع Props و CalendarState
│   ├── Calendar.tsx                  ← useReducer انتخاب روز/بازه/چندتایی
│   ├── helper.ts / dataPickerBody…   ← تولید گرید تقویم
│
├── mask/                             ← بهترین جداسازی لایه
│   ├── types.ts → utils.ts → useMaskController.ts → views.tsx → index.tsx
│
├── rangePicker/                      ← Shell دسکتاپ/موبایل + draft/commit
├── datePicker/                       ← Shell + Calendar + Time + Mask
├── timePicker/                       ← انتخاب زمان مستقل
├── comparison/                       ← مقایسه بازه (GA-like)
├── useRenderPosition/ / useMediaQuery/
└── assets/ + main.module.css
```

### جریان وابستگی (واقعی)

| از | به | نوع وابستگی | ارزیابی |
|----|----|-------------|---------|
| همهٔ UI | `dateEngine` | محاسبات تاریخ | سالم و مرکزی |
| `RangePicker` | `core/mainContent` → `manual` / `periodList` → `Calendar` / `Mask` / `Comparison` | ارکستراسیون عمیق | Prop-drilling زیاد |
| `DatePicker` | `Calendar` + `Mask` + `TimeColumns` | ترکیب خوب | منطق export تکراری |
| `core/*` | `persianDatePicker/enum` و `type` | وابستگی معکوس نسبی | مرز لایه‌ها مبهم |
| `mask` | `core/type` + `dateEngine` | ایزوله | الگوی هدف برای بقیه |

**نکتهٔ مربی:** `core` باید خالص باشد (types + pure helpers). الان `core` به enumهای `persianDatePicker` وابسته است؛ این یعنی «هسته» زیرمجموعهٔ UI است، نه برعکس. برای مقیاس‌پذیری، enumها و `HandleParams` را به یک لایهٔ `domain/` مشترک منتقل کنید.

---

## ۲. جنس داده، ورودی و خروجی

### ۲.۱ قرارداد رسمی خروجی (`ExportType`)

در `core/type.ts`:

| مقدار | جنس runtime | کاربرد توصیه‌شده |
|--------|-------------|------------------|
| `"timeStamp"` | `number` (Unix ms) | analytics، فیلتر، ذخیره‌سازی فشرده |
| `"IsoString"` | `string` (شبه‌-ISO با offset) | مرز API، serialization |

پیش‌فرض عمومی اغلب `"IsoString"` است — انتخاب معقول برای کتابخانهٔ فرم/API.

### ۲.۲ مدل‌های داده کلیدی

| تایپ | شکل | نقش |
|------|-----|-----|
| `IDate` | `{ from, to }` با `number \| string \| null \| undefined` | بازهٔ اصلی و compare |
| `DateValue` | `IDate \| number \| string \| number[] \| string[] \| null` | اتحاد بزرگ برای Calendar |
| `DatePickerValue` | `number \| string \| null` | خروجی تک‌تاریخی |
| `MaskInputValue` / `MaskOutputValue` | ورودی شل / خروجی متعهد | بهترین قرارداد در کتابخانه |
| `HandleParams` | `{ type: string; Data?: ... }` | رویداد Range — **ضعیف‌ترین قرارداد** |
| `CalendarState` | year/month/view/range/date/multiple | state داخلی Calendar (همیشه timestamp) |
| `ISubmittedData` | `{ date, compareDate, Data }` | snapshot نمایشی بعد از Accept |

### ۲.۳ ماتریس سازگاری ورودی → ذخیرهٔ داخلی → خروجی

| کامپوننت | ورودی پذیرفته‌شده | ذخیرهٔ داخلی | خروجی به مصرف‌کننده | رعایت `exportType` |
|----------|-------------------|--------------|----------------------|---------------------|
| **Mask** | `number \| string \| null` | `parts` + `baseValue: number \| null` | `MaskOutputValue` | بله (از طریق `formatMaskExport`) |
| **DatePicker** | `number \| string \| null` | `showDate: number \| null` | `number \| string \| null` | بله (اما منطق تکراری و timezone دوگانه) |
| **TimePicker** | `number \| string \| null` | `time: number \| null` | `number \| string \| null` | بله (همان تکرار) |
| **Calendar** | `DateValue` | همیشه `number` (ms) در reducer | `timestamp` / `IDate` / `number[]` | **خیر** — همیشه timestamp |
| **RangePicker** | `IDate` (`value` / `defaultValue`) | `date`, `compareDate`, `showDate` | `HandleParams` با `IDate` عمدتاً عددی | **عملاً خیر** — prop پاس می‌شود ولی تبدیل خروجی یکنواخت نیست |

**حکم مربی:** مصرف‌کننده فکر می‌کند `exportType="IsoString"` روی Range هم اثر دارد؛ در عمل Range معمولاً `from`/`to` را به‌صورت timestamp نگه می‌دارد و در `onChange`/`onSubmit` همان را برمی‌گرداند. این شکاف قرارداد، منبع باگ در یکپارچه‌سازی با backend است.

### ۲.۴ ناسازگاری timezone

الگوی تکراری در DatePicker / TimePicker / Mask:

- `jalali` / `fa` → `moment(...).locale("fa")` (محلی)
- `gregorian` / `en` → `moment.utc(...)`

این تصمیم برای جلوگیری از جابه‌جایی روز در میلادی قابل‌فهم است، ولی در مستند و تایپ اعلام نشده. برای یک تاریخ «فقط روز»، بهتر است قرارداد صریح داشته باشید: مثلاً همیشه noon UTC یا همیشه startOfDay محلی — نه دو مسیر متفاوت بدون توضیح.

---

## ۳. مدیریت ذخیره‌سازی داده (State)

کتابخانه **persistence خارجی ندارد** (نه `localStorage` و نه store سراسری). این برای UI library درست است. مشکل در **مدل state داخلی** است.

### ۳.۱ الگوی Draft / Commit در RangePicker

```text
[Draft]  date, compareDate, step, zone, counter, customData
    │  Accept ──► showDate (ISubmittedData) + onSubmit
    │  Cancel ──► بازگردانی date از showDate
[Display] متن دکمه از date جاری (نه لزوماً showDate)
```

**نقاط قوت**

- جدا کردن Accept/Cancel شبیه analytics UX خوب است.
- `value` کنترل‌شده از بیرون sync می‌شود.

**نقاط ضعف**

1. تعداد زیاد `useState` همسایه بدون reducer واحد → ریسک ناسازگاری.
2. `showDate` و `date` هر دو زنده هستند؛ Cancel/Accept دستی است و بعضی `useEffect`ها (`compareDate`, `counter`) side-effect دارند.
3. پاس‌دادن `setDate`, `setCompareDate`, `setStep`, `setZone`, `setCounter`, `setActiveCompareStep` به عمق درخت = ant-pattern برای نگهداری.
4. sentinel جادویی: `ESteps.manual` ≈ `366` و مقداردهی اولیهٔ `step` به `366` — خوانایی و type-safety پایین.

### ۳.۲ Calendar — بهترین الگوی state داخلی

`useReducer` + `CalendarAction` شفاف است:

- `SET_FROM` / `SET_TO` / `SET_RANGE`
- `SET_DATE` / `SET_MULTIPLE` / `SET_WEEK_DAYS`
- `CHANGE_VIEW` / `CHANGE_YEAR` / `CHANGE_MONTH`

**قابل توسعه:** `exportType` و نرمال‌سازی خروجی باید بیرون از reducer (در adapter لایهٔ shell) باشد؛ reducer فقط با `number` کار کند — که الان همین‌طور است و خوب است.

### ۳.۳ Mask — الگوی Controller جدا

جداسازی `types → utils → useMaskController → views` نزدیک Clean Architecture برای UI است:

- دادهٔ متعهد: `baseValue: number | null`
- دادهٔ ویرایشی: `parts` / `compactValue`
- emit فقط از `emitChange` → `formatMaskExport`

این الگو را به DatePicker و RangePicker تعمیم دهید.

---

## ۴. ارزیابی لایه‌به‌لایه (مربی‌گونه)

### ۴.۱ `dateEngine` — ۸.۵/۱۰

**نقاط قوت**

- جایگزینی هوشمندانهٔ `moment-jalaali` با `jalaali-js` + API سازگار (`PDate`).
- پشتیبانی `startOf`/`endOf` برای `jMonth`/`jYear`.
- parse با format جلالی برای Mask حیاتی است.

**قابل توسعه**

- متدهای mutable (مثل moment) در React خطرناک‌اند؛ ترجیح immutability سخت‌گیرانه یا برندینگ داخلی بدون نام `moment`.
- `set('day')` vs weekday ابهام دارد (کامنت خودتان هم اشاره کرده).
- export مستقیم به‌عنوان public API از پکیج هنوز نیست — فرصت خوب برای `utils` پایدار.

### ۴.۲ `Mask` — ۸.۰/۱۰

**نقاط قوت**

- قرارداد ورودی/خروجی مستند و نسبتاً سخت‌گیر.
- اعتبارسنجی ماه/روز/کبیسه.
- سه حالت Display / Separated / Full.

**قابل توسعه**

- تست واحد روی `utils` (پاریتی با `scripts/parity-check` گسترش یابد).
- controlled sync وقتی `value` از بیرون عوض می‌شود باید دقیق و بدون flicker باشد.

### ۴.۳ `Calendar` — ۷.۰/۱۰

**نقاط قوت**

- reducer خوانا، مدل‌های date / range / multiple.
- render props برای سفارشی‌سازی روز و ستون.

**نقاط ضعف**

- `onChange` تایپ‌شده با `DateValue` ولی runtime همیشه timestamp می‌دهد.
- تولید روزها گاهی `new Date(string)` برای gregorian — timezone-sensitive.
- `HOVER` با `payload: any`.

### ۴.۴ `RangePicker` + `comparison` — ۶.۰/۱۰

**نقاط قوت**

- تمایز محصولی واقعی (مقایسه بازه، navigation مثل GA).
- موبایل fullscreen + دسکتاپ portal.
- تب‌های period و `additionalElement` برای اکستنشن.

**نقاط ضعف**

- `HandleParams.type: string` و `Data` خیلی باز.
- `exportType` بی‌اثر روی قرارداد نهایی.
- در `core/helper.ts` مقدار `backwardStep[season]` مشکوک است (`6400000` به‌جای `86400000`) — باگ بالقوه در ناوبری فصلی.
- وابستگی شدید UI به setterها.

### ۴.۵ Type System عمومی — ۵.۰/۱۰

**مشکلات ساختاری**

1. تکرار `ExportType` در `core/type` و `persianDatePicker/type`.
2. `IDate.from/to` اتحاد بیش‌ازحد وسیع؛ بهتر است:
   - `InternalDate = number`
   - `PublicDate = number | string` فقط در مرز API با mapper
3. `HandleParams` باید discriminated union باشد، مثلاً:

```ts
type RangeChangeEvent =
  | { type: 'range' | 'day' | 'week' | 'month' | 'season' | 'year'; date: IDate; compareDate?: IDate | null }
  | { type: 'custom'; key: string; data: unknown };
```

4. خروجی Range با `exportType` باید generic شود: `RangePickerProps<T extends ExportType>`.

### ۴.۶ ارتباط فایل‌ها / مرزبندی — ۶.۰/۱۰

| خوب | بد |
|-----|-----|
| entrypoint تمیز در `src/index.ts` | نام پوشه `persianDatePicker` برای types مشترک همهٔ کامپوننت‌ها گمراه‌کننده است |
| Mask لایه‌بندی شده | منطق ISO formatting کپی‌شده در ۳ جا |
| CSS module مشترک | `core` ↔ `persianDatePicker` circular-ish coupling معنایی |
| peerDeps فقط React | تست خودکار تقریباً غایب |

---

## ۵. اولویت‌های توسعه (Roadmap مربی)

### P0 — صحت قرارداد (باید زود انجام شود)

1. **یک adapter خروجی واحد** مثلاً `formatExport(ts, locale, exportType)` و استفاده در DatePicker / TimePicker / Mask / Range.
2. **اعمال واقعی `exportType` روی RangePicker** در `onChange` و `onSubmit` (و مستند کردن شکل `IDate` خروجی).
3. **اصلاح `backwardStep` فصلی** و افزودن تست برای period navigation.
4. تبدیل `HandleParams` به discriminated union.

### P1 — معماری state

1. `useRangePickerController` مشابه Mask (جدا از JSX).
2. کاهش prop-drilling با Context داخلی محدود به Range (نه public).
3. حذف sentinel `366`؛ استفاده از `ESteps.manual` فقط به‌صورت enum خوانا.

### P2 — پاکسازی لایه‌ها

1. انتقال types مشترک به `src/domain/` یا `src/types/`.
2. نگه داشتن `Calendar` به‌عنوان pure presentational + timestamp-only.
3. یکسان‌سازی timezone policy و نوشتن در README.

### P3 — کیفیت محصول

1. Unit test برای `dateEngine` و `mask/utils` و period helpers.
2. Storybook یا گسترش demo برای قراردادهای controlled/uncontrolled.
3. به‌روزرسانی README (حذف ردپای `moment-jalaali` در بخش‌های قدیمی).

---

## ۶. جمع‌بندی مربی برای نویسندهٔ کتابخانه

شما محصولی ساخته‌اید که **نیاز واقعی بازار ایران** (بازه + مقایسه + ماسک جلالی سبک) را پوشش می‌دهد؛ این امتیاز استراتژیک بالاست. از نظر مهندسی، مسیر درست را با `dateEngine` و جداسازی Mask شروع کرده‌اید — حالا باید همان rigor را به **مرز عمومی کتابخانه** بیاورید:

> داخل همیشه `number` (ms) نگه دارید؛ بیرون فقط از یک تابع، طبق `exportType`، به `number | string` تبدیل کنید؛ و رویداد Range را مثل Mask با تایپ بسته و قابل پیش‌بینی صادر کنید.

تا وقتی این سه اصل برقرار نشوند، مصرف‌کنندهٔ سازمانی همیشه مجبور است لایهٔ نرمال‌سازی خودش بنویسد — و آن نقطه، جایی است که کتابخانه «کامل» به‌نظر نمی‌رسد حتی اگر UI عالی باشد.

**امتیاز نهایی پیشنهادی برای انتشار enterprise-ready: ۶.۵/۱۰ امروز → با P0 به حدود ۸.۰/۱۰ قابل‌وصول در یک اسپرینت متمرکز.**
