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

A lightweight & customizable Persian (Jalali) date **range picker** for React  
یک کامپوننت انتخاب بازه تاریخ شمسی (Jalali) برای React — ساخته شده با ❤️ توسط  
[Hamidreza Fallahi](https://github.com/hamidrezafallahi)

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

- تنها وابستگی: `moment-jalaali` (و تایپ‌های آن)
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
