export type ExportType = "timeStamp" | "IsoString";
/**
 * خروجی استاندارد کتابخانه:
 * - `timeStamp`: Unix epoch به میلی‌ثانیه (number) — مناسب analytics و ذخیره‌سازی فشرده
 * - `IsoString`: ISO 8601 — مناسب API/serialization بین‌سیستمی
 * هر دو در صنعت استانداردند؛ برای مرز سرویس‌ها IsoString خواناتر و بدون ابهام‌تر است.
 * رشته جلالی (مثل 1403/01/15) فقط برای نمایش UI است، نه قرارداد پایدار خروجی.
 */
export type TLocale = "fa" | "en";
export interface IDate {
  from: number | string | null | undefined;
  to: number | string | null | undefined;
}

