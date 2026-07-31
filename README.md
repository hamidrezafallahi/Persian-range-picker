<!-- # 📆 Persian Range Picker
A lightweight, customizable, Persian range picker for React
یک کامپوننت انتخاب بازه‌ی تاریخ شمسی (Jalali) برای React — ساخته شده با ❤️ توسط [Hamidreza Fallahi](https://github.com/hamidrezafallahi)

---

## ✨ ویژگی‌ها

- وابستگی های مورد نیاز برای این کتابخانه فقط `moment-jalaali` و برای پشتیبانی type آن "@types/moment-jalaali"
- انتخاب بازه‌ی تاریخ به‌صورت گرافیکی و واکنش‌گرا
- سازگار با React 18 و 19
- طراحی ساده، تمیز و قابل شخصی‌سازی
- مناسب برای پروژه‌های تجاری یا متن‌باز
- مناسب برای پروژه‌هایی که نیاز به انتخاب بازه زمانی دارند و همچنین نیاز به مقایسه دو بازه زمانی مختلف در زمان های مختلف دارند .
- دارای کامپوننت ماسک برای تایپ تاریخ بدون نیاز به نصب هیچگونه کتابخانه ای
- دارای هوک useRenderPosition برای شناسایی محل دکمه و رندر کردن popup در پوزیشن قابل رویت در صفحه نمایش
- دارای چهار کامپوننت مجزا برای حالت انتخاب یک زمان و یا بازه زمانی و همچنین حالت موبایل و یا دسکتاپ

---

## 🚀 نصب

برای نصب این کتابخانه از npm استفاده کنید:

```bash

npm i react-persian-range-picker
# یا با yarn:
# yarn add react-persian-range-picker



### Dependencies

- react , react-dom , moment-jalaali






``` -->






# 📆 Persian Range Picker

## 🇬🇧 English

# **react-persian-range-picker**  
A lightweight, modern, and fully customizable **Persian (Jalali) date & date-range picker** for React — designed with performance, accessibility, and real-world product needs in mind.

Built with ❤️ by  
**[Hamidreza Fallahi](https://github.com/hamidrezafallahi)**

### ✨ Why this library?
---

## 🚀 Advanced Features

### 1. **Accurate Jalali Calendar Engine**
This library is built **natively on the Jalali/Shamsi calendar system**, including:
- Full support for **leap years**  
- Correct month calculations  
- Reliable date generation without relying on the flawed JS `Date()` fallback  

This ensures long-term accuracy for financial, statistical, and enterprise apps.

---

### 2. **Full Jalali Date Mask (Keyboard-Friendly)**
A complete and smart **Jalali input mask** is included, with:
- Full keyboard navigation  
- Real-time validation  
- Leap-year awareness  
- Error detection for invalid days/months/years  
- Auto-correct behavior  

Perfect for forms, dashboards, admin panels, and high-precision inputs.

---

### 3. **Advanced Range Selection (Inspired by Google Analytics—but improved)**
Range selection in this package goes beyond typical pickers:

- Compare any date range to **another period**  
- Step forward/backward through time (like GA’s date navigation)  
- "Offset mode" for comparing similar weekdays/weeks/months  
- Intuitive UX for non-technical users despite complex logic  

This makes it ideal for **analytics dashboards**, reporting tools, and commercial systems.

---

### 4. **Three Modes of Time Selection**
You can select dates in **three powerful modes**:

1. **Single Day** — pick one date  
2. **Range Mode** — e.g., *2 Mehr → 18 Mehr*  
3. **Column-Based Selection** — pick all Sundays, all Mondays, etc. in a month  

This level of flexibility is not common in other Jalali libraries.

---

### 5. **Mobile-First Fullscreen UI**
On mobile devices:
- The picker opens in **true fullscreen mode**  
- Renders above the page with layered UX  
- Highly touch-friendly with large tap areas  

This improves usability for real users—not just demo pages.

---

### 6. **Grid-Based Calendar Renderer**
The calendar is built using a **pure CSS grid**, which allows:
- Full UI customization  
- Any size, any layout  
- Theming (light/dark/custom styles)  
- Embeddable calendar blocks for analytics or dashboards  

The grid architecture makes this library more flexible than many existing solutions.

---

### 7. **Full Support for Shamsi & Gregorian**
Although the default calendar is **Jalali**, the library:
- Supports Gregorian dates everywhere  
- Has dual converters  
- Works seamlessly with both systems in all components  

---

### 📸 Usage Examples & UI Previews
See the images below for usage patterns, modes, and visual examples of the components.


- **Modern architecture** (functional React, TypeScript-ready)  
- **Fully customizable UI** (easy styling, overriding, theming)  
- **Accurate Jalali calculations** (Moment-Jalaali or custom adapters)  
- **Smart date-range selection**  
- **Calendar + TimePicker support**  
- **RTL & LTR support**  
- **Minimal dependencies** (fast & tree-shakeable)

### 📦 Included Components
- **Calendar** — Jalali calendar with navigation  
- **DatePicker** — single date selection  
- **RangePicker** — advanced date-range selection  
- **TimePicker** — hour/minute/second selection  
- **Inline & Modal modes** — desktop and mobile friendly  
- **Utility helpers** — formatting, validation, min/max limiting

### 🆚 Comparison with Other Libraries
| Library | Last Updated | Range Support | TimePicker | Customizable | Mobile Friendly | Dependencies |
|--------|--------------|---------------|-------------|--------------|------------------|--------------|
| **react-persian-range-picker** | ✔ Active | ✔ Yes | ✔ Yes | ✔ Full | ✔ Excellent | 🔥 Very Low |
| react-multi-date-picker | Medium | ✔ Yes | ✔ Yes | Good | Medium | High |
| material-ui/pickers (Jalali adapter) | Low | ❌ No | ✔ Yes | Medium | Good | Very High |
| antd-jalali | Low | ✔ Yes | ✔ Yes | ❌ Limited | Medium | Very High |


---

## 🇮🇷 فارسی

# **react-persian-range-picker**  
یک کتابخانه‌ی سبک، مدرن و کاملاً قابل سفارشی‌سازی برای **انتخاب تاریخ و بازه تاریخ شمسی (Jalali)** در React — ساخته شده برای نیازهای واقعی محصولات و تمرکز بر عملکرد و تجربه کاربری.

ساخته شده با ❤️ توسط  
**[حمیدرضا فلاحی](https://github.com/hamidrezafallahi)**

### ✨ چرا این کتابخانه؟
## 🚀 قابلیت‌های پیشرفته

### 1. **هستهٔ دقیق تقویم جلالی**
این کتابخانه از پایه بر اساس **تقویم جلالی/شمسی** پیاده‌سازی شده و شامل:
- پشتیبانی کامل از **سال‌های کبیسه**  
- محاسبه درست ماه‌ها  
- جلوگیری از وابستگی به Date() جاوااسکریپت  

این موضوع برای پروژه‌های مالی، داشبوردهای تحلیلی و سیستم‌های سازمانی بسیار حیاتی است.

---

### 2. **ماسک ورودی کاملاً شمسی (کاملاً سازگار با کیبورد)**
این کتابخانه دارای یک **ماسک ورودی دقیق شمسی** است که:
- با کیبورد کاملاً کار می‌کند  
- در لحظه اعتبارسنجی می‌کند  
- سال کبیسه را تشخیص می‌دهد  
- خطاهای روز/ماه/سال را شناسایی می‌کند  
- رفتار اصلاح خودکار دارد  

این ویژگی برای فرم‌ها و پنل‌های مدیریتی ایده‌آل است.

---

### 3. **انتخاب بازه زمانی پیشرفته (الهام گرفته از Google Analytics؛ اما کامل‌تر)**
انتخاب بازه در این کتابخانه فراتر از DatePickerهای معمولی است:

- مقایسه بازه زمانی با **بازه مشابه در زمان دیگر**  
- حرکت رو به جلو/عقب در زمان مانند Google Analytics  
- حالت مقایسهٔ هوشمند برای هفته/ماه مشابه  
- رابط کاربری بسیار ساده، حتی با وجود منطق پیچیده  

برای **داشبوردهای تحلیلی**، سیستم‌های گزارش‌گیری و پروژه‌های تجاری فوق‌العاده است.

---

### 4. **سه مدل انتخاب تاریخ**
این کتابخانه سه روش انتخاب زمان را پشتیبانی می‌کند:

1. **روز شمار** — انتخاب یک تاریخ  
2. **بازه زمانی** — مانند ۲ مهر تا ۱۸ مهر  
3. **انتخاب ستونی** — انتخاب یک روز خاص مانند همهٔ یکشنبه‌ها  

این میزان انعطاف در کتابخانه‌های مشابه کمتر دیده می‌شود.

---

### 5. **رابط کاربری موبایل به‌صورت تمام صفحه**
روی موبایل:
- به‌صورت **تمام صفحه واقعی** باز می‌شود  
- روی صفحه رندر می‌شود و تجربهٔ بهتری ارائه می‌دهد  
- لمس‌پذیری و کاربردپذیری بسیار بالایی دارد  

این ویژگی تجربهٔ کاربر را به شدت بهبود می‌دهد.

---

### 6. **استفاده از Grid برای ساخت تقویم**
تقویم بر اساس **Grid** ساخته شده که:
- امکان سفارشی‌سازی کامل را می‌دهد  
- در هر سایز و هر استایل قابل استفاده است  
- برای ساخت ویجت‌های تحلیلی و داشبوردی عالی است  

---

### 7. **پشتیبانی کامل از تاریخ شمسی و میلادی**
اگرچه پیش‌فرض تقویم **شمسی** است، اما:
- تاریخ میلادی را در تمام بخش‌ها هندل می‌کند  
- به‌صورت دوطرفه قابل تبدیل است  
- با هر دو سیستم بدون مشکل کار می‌کند  

---

### 📸 نمونه استفاده و پیش‌نمایش‌ها
برای مشاهده نحوه استفاده و نمایش، تصاویر زیر را بررسی کنید.

- **معماری مدرن و سازگار با TypeScript**  
- **سفارشی‌سازی کامل رابط کاربری**  
- **دقت بالا در محاسبات جلالی**  
- **منطق هوشمند برای انتخاب بازه تاریخ**  
- **پشتیبانی کامل از TimePicker**  
- **سازگاری با حالت RTL و LTR**  
- **وابستگی‌های بسیار کم و سرعت بالا**

### 📦 کامپوننت‌های ارائه‌شده
- **Calendar** — تقویم شمسی  
- **DatePicker** — انتخاب تاریخ  
- **RangePicker** — انتخاب بازه تاریخ  
- **TimePicker** — انتخاب ساعت/دقیقه/ثانیه  
- **نسخه‌های Inline و Modal** — مناسب برای دسکتاپ و موبایل  
- **ابزارهای کمکی** — فرمت، اعتبارسنجی، محدودیت‌ها

### 🆚 مقایسه با سایر کتابخانه‌ها
| کتابخانه | بروزرسانی | انتخاب بازه | تایم‌پیکر | سفارشی‌سازی | موبایل | وابستگی‌ها |
|---------|-----------|--------------|------------|--------------|----------|-------------|
| **react-persian-range-picker** | ✔ فعال | ✔ دارد | ✔ دارد | ✔ عالی | ✔ عالی | 🔥 بسیار کم |
| react-multi-date-picker | متوسط | ✔ دارد | ✔ دارد | خوب | متوسط | زیاد |
| material-ui/pickers | کم | ❌ ندارد | ✔ دارد | متوسط | خوب | خیلی زیاد |
| antd-jalali | کم | ✔ دارد | ✔ دارد | ❌ محدود | متوسط | خیلی زیاد |

<p align="center">
  <a href="https://github.com/hamidrezafallahi/persian-range-picker" target="_blank">
    <img src="https://img.shields.io/github/stars/hamidrezafallahi/persian-range-picker?style=social" alt="GitHub Stars"/>
  </a>
</p>

![npm version](https://img.shields.io/npm/v/react-persian-range-picker)
![npm downloads](https://img.shields.io/npm/dm/react-persian-range-picker)
![license](https://img.shields.io/npm/l/react-persian-range-picker)

---



 
## 🌐 Demo & Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/calendar-range-picker.PNG" width="700" alt="Persian Range Picker Desktop Preview"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/desktop-gregorian.PNG" width="700" alt="Desktop Gregorian Picker"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/mobile-range-picker.PNG" width="320" alt="Mobile Range Picker"/>
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/mobile-compare-range.PNG" width="320" alt="Mobile Compare Range"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/range-mask-error.PNG" width="320" alt="Mask Error"/>
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/calendar-new-design.PNG" width="320" alt="New Calendar Design"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/mask.PNG" width="300" alt="Date Mask"/>
  <img src="https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/time-picker.PNG" width="300" alt="Time Picker"/>
</p>


---

## ✨ ویژگی‌ها

- تنها وابستگی تاریخ: `jalaali-js` (سبک و دقیق، الگوریتم Borkowski)
- انتخاب بازه زمانی به‌صورت واکنش‌گرا (Responsive)
- پشتیبانی کامل از React 18 و 19
- طراحی سبک، تمیز و قابل کاستوم‌سازی
- مناسب برای پروژه‌های تجاری و متن‌باز
- **امکان مقایسه دو بازه زمانی متفاوت**
- دارای **کامپوننت ماسک ورودی تاریخ** بدون نیاز به پکیج اضافی
- دارای هوک `useRenderPosition` برای نمایش Popup در موقعیت امن
- دارای هوک `useMediaQuery` برای پیاده سازی منطق در ابعاد متفاوت تصویر. تمایز بین موبایل و دسکتاپ 
- شامل شش کامپوننت:
  - RangePicker
  - MobileDate
  - DesktopDatePicker
  - Calendar
  - Mask
  - TimePicker

---

## 🚀 نصب

```bash
npm i react-persian-range-picker

# یا:
# yarn add react-persian-range-picker
