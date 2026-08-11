# از انتخاب تاریخ ساده تا مقایسه بازه در ERP: معرفی `react-persian-range-picker`

> **مناسب انتشار در:** ویرگول، مدیوم فارسی، هکروون، کانال‌های تلگرام فرانت‌اند، LinkedIn، انجمن‌های React فارسی  
> **کلمات کلیدی:** انتخابگر تاریخ شمسی React، DatePicker جلالی، RangePicker، مقایسه بازه زمانی، ماسک تاریخ، TimePicker، تقویم شمسی کبیسه، ERP

اگر روی داشبورد فروش، پنل مالی یا یک ERP واقعی کار کرده باشید، احتمالاً این صحنه برایتان آشناست:

> «فروش این ماه را با ماه قبل مقایسه کن… حالا یک ماه عقب برو… حالا بازه مقایسه هم باید هم‌زمان عقب برود.»

بیشتر Date Pickerهای رایج فقط «یک تاریخ» یا حداکثر «یک بازه» می‌گیرند. در پروژه‌های بزرگ سازمانی، مسئله اصلی اغلب چیز دیگری است: **مقایسه دو بازه زمانی** با تجربه کاربری شبیه ابزارهای enterprise مثل Dynamics / Analytics — و اگر محصول فارسی باشد، همهٔ این‌ها باید روی **تقویم شمسی (جلالی)** درست کار کند؛ از جمله سال کبیسه.

اینجا است که [`react-persian-range-picker`](https://www.npmjs.com/package/react-persian-range-picker) معنا پیدا می‌کند: کتابخانه‌ای سبک برای React که از ساده‌ترین سناریو (یک تاریخ) تا پیچیده‌ترین (حرکت هم‌زمان بازه + مقایسه) را پوشش می‌دهد.

---

## طیف نیازمندی‌ها: از ساده تا سازمانی

| سطح | نیاز | کامپوننت |
|-----|------|----------|
| ۱ | یک تاریخ (فرم ثبت‌نام، فاکتور) | `DatePicker` |
| ۲ | تایپ سریع با کیبورد `YYYY/MM/DD` | `Mask` یا `DatePicker` با `showMask` |
| ۳ | انتخاب ساعت | `TimePicker` / `DatePicker` با `showTime` |
| ۴ | یک بازه (گزارش روزانه تا ماهانه) | `RangePicker` |
| ۵ | دو بازه برای مقایسه (این دوره vs دوره قبل) | `RangePicker` + `showComparison` |
| ۶ | جابه‌جایی گامی بازه و مقایسه با هم | `isShowNavigationButton` |
| ۷ | رندر امن پاپ‌آپ / واکنش‌گرایی | `useRenderPosition` / `useMediaQuery` |

همین طیف است که کتابخانه را برای پروژه‌های بزرگ (ERP، BI، پنل‌های مالی) مناسب می‌کند — نه فقط یک تقویم زیبا.

---

## مشکل واقعی در پروژه‌های بزرگ

در اپلیکیشن‌های ERP و BI معمولاً این نیازها هم‌زمان وجود دارند:

1. انتخاب بازه جاری (مثلاً ۱ تا ۳۰ فروردین)
2. تعریف بازه مقایسه (مثلاً همان بازه در ماه قبل یا سال قبل)
3. جابه‌جایی سریع دوره با دکمه‌های «یک گام عقب / جلو»
4. پشتیبانی بومی از **تقویم شمسی** بدون تبدیل‌های شکننده
5. رعایت **سال کبیسه جلالی** در اعتبارسنجی و محاسبه طول ماه
6. خروجی استاندارد برای API (`timestamp` یا `ISO string`)
7. نسخه میلادی برای محصولات دوزبانه (`calendarType="gregorian"`)

بسیاری از کتابخانه‌های Jalali فقط تقویم را نمایش می‌دهند؛ لایهٔ «مقایسه سازمانی + ناوبری هم‌زمان» را خودتان باید از صفر بسازید.

---

## این کتابخانه چه تمایزی دارد؟

### ۱) Range Comparison به سبک ابزارهای سازمانی
`RangePicker` برای سناریوی analytics/ERP طراحی شده: بازه اصلی + بازه مقایسه، تب‌های Day / Week / Month / Year و انتخاب دستی.

### ۲) ناوبری هم‌زمان بازه و مقایسه (تمایز محصول)
یکی از نقاط قوت مهم این پروژه، دکمهٔ حرکت گامی است:

- با یک کلیک، بازه اصلی یک گام عقب/جلو می‌رود
- **هم‌زمان** بازه مقایسه هم یک گام متناظر جابه‌جا می‌شود

این رفتار برای تحلیل روند در ERP حیاتی است و در تجربهٔ کلاسیک بسیاری از pickerهای عمومی — و حتی الگوهای رایج enterprise — به‌صورت آماده کمتر دیده می‌شود.

### ۳) جلالی‌محور، نه تبدیل وصله‌ای
موتور تاریخ روی [`jalaali-js`](https://www.npmjs.com/package/jalaali-js) (الگوریتم Borkowski) بنا شده و برای سال کبیسه و طول ماه‌های شمسی طراحی شده است؛ نه اینکه فقط روی یک موتور میلادی یک adapter بدلی سوار شود. پشتیبانی میلادی هم از طریق `calendarType` در دسترس است.

### ۴) مجموعه کامل برای فرم و داشبورد
علاوه بر Range:

- `DatePicker` (با ماسک و زمان)
- `Mask` کیبوردی `YYYY/MM/DD` با فوکوس سگمنت (سال → ماه → روز)
- `TimePicker`
- `Calendar` قابل‌embed
- هوک‌های `useRenderPosition` و `useMediaQuery`
- توابع `formatExport` / `formatIDateExport`

### ۵) سبک برای production
وابستگی runtime تاریخ فقط `jalaali-js` است و React به‌صورت peer dependency مصرف می‌شود — مناسب bundleهای سازمانی که از سنگین‌شدن پکیج‌ها حساس‌اند. بدون نیاز به `moment-jalaali`.

---

## نصب و شروع سریع

```bash
npm i react-persian-range-picker
# یا
yarn add react-persian-range-picker
```

**Peer dependencies:** `react` و `react-dom` (نسخه ۱۷ / ۱۸ / ۱۹).

### مثال ۱ — DatePicker ساده (سطح ۱)

```tsx
import { useState } from 'react';
import { DatePicker } from 'react-persian-range-picker';
import type { DatePickerValue } from 'react-persian-range-picker';

export function InvoiceDateField() {
  const [value, setValue] = useState<DatePickerValue>(null);

  return (
    <DatePicker
      calendarType="jalali"
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

### مثال ۲ — Mask مستقل (سطح ۲)

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

### مثال ۳ — TimePicker (سطح ۳)

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

### مثال ۴ — Range + Comparison + ناوبری (سطح ۵ و ۶)

```tsx
import { useState } from 'react';
import { RangePicker } from 'react-persian-range-picker';
import type { HandleParams, IDate } from 'react-persian-range-picker';

export function SalesFilter() {
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

> نکته API: خروجی `onChange` در `RangePicker` داخل `e.Data.date` و `e.Data.compareDate` قرار دارد (نه `e.date`).

### خروجی برای API

| `exportType` | خروجی |
|--------------|--------|
| `"timeStamp"` | `number` (میلی‌ثانیه) |
| `"IsoString"` | رشته ISO-8601 |
| پاک‌کردن / نامعتبر | `null` |

---

## چه زمانی این کتابخانه انتخاب درستی است؟

**انتخاب کنید اگر:**

- داشبورد/ERP دارید و مقایسه بازه بخشی از UX اصلی است
- تقویم شمسی باید first-class باشد (نه adapter فرعی)
- می‌خواهید ناوبری دوره روی بازه + مقایسه هم‌زمان کار کند
- محصولات دوزبانه دارید و گاهی به Gregorian هم نیاز است
- نمی‌خواهید فقط برای تاریخ، کل Ant Design یا MUI را به پروژه تحمیل کنید

**شاید گزینه دیگری بهتر باشد اگر:**

- فقط به یک DatePicker ساده داخل اکوسیستم Ant/MUI نیاز دارید
- جامعه و پلاگین بسیار وسیع اولویت اول شماست (`react-multi-date-picker`)

---

## مقایسه سریع

| قابلیت | react-persian-range-picker | react-multi-date-picker | MUI + Jalali adapter | antd-jalali |
|--------|---------------------------|-------------------------|----------------------|-------------|
| Range | بله | بله | محدود | بله |
| Compare range | بله (first-class) | خیر / سفارشی | خیر | خیر |
| حرکت هم‌زمان بازه+مقایسه | بله | خیر | خیر | خیر |
| Mask کیبوردی | بله | محدود | خیر | محدود |
| TimePicker | بله | بله | بله | بله |
| وابستگی | بسیار کم (`jalaali-js`) | بالاتر | بالا | بالا |

---

## سوالات متداول

**آیا سال کبیسه شمسی پشتیبانی می‌شود؟**  
بله. موتور روی `jalaali-js` است و اعتبارسنجی ماسک/تقویم با آگاهی از کبیسه انجام می‌شود.

**آیا فقط شمسی است؟**  
خیر. با `calendarType="gregorian"` می‌توانید میلادی کار کنید.

**React 19؟**  
بله؛ peer برای React ۱۷ / ۱۸ / ۱۹ تعریف شده است.

**TypeScript؟**  
بله؛ تایپ‌ها در پکیج منتشر می‌شوند.

---

## لینک‌ها

- **دمو زنده:** [GitHub Pages](https://hamidrezafallahi.github.io/react-persian-range-picker/)
- **npm:** [react-persian-range-picker](https://www.npmjs.com/package/react-persian-range-picker)
- **GitHub:** [react-persian-range-picker](https://github.com/hamidrezafallahi/react-persian-range-picker)
- **نویسنده:** [Hamidreza Fallahi](https://github.com/hamidrezafallahi)

---

## جمع‌بندی

`react-persian-range-picker` فقط «یک تقویم شمسی دیگر» نیست؛ یک **جعبه ابزار زمانی برای React** است: از DatePicker و Mask تا Range Comparison و ناوبری هم‌زمان بازه/مقایسه — با موتور جلالی واقعی، پشتیبانی میلادی، و footprint سبک برای production.

اگر روی محصول فارسی‌زبان سازمانی کار می‌کنید، یک‌بار دمو را با `showComparison` و دکمه‌های ناوبری امتحان کنید — همان جایی است که تفاوت را حس می‌کنید.

```bash
npm i react-persian-range-picker
```
