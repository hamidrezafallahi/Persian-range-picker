import type { TLocale } from "../core/type";
export declare const isCurrentDay: (timestamp: number) => boolean;
export declare const isEqualDays: (first: number | null | undefined | Date, second: number | null | undefined | Date) => boolean;
export declare const getFirstDayIndexInMonth: (year: number, month: number, locale: TLocale) => number;
export declare const getNumberOfDays: (year: number, month: number, locale: TLocale) => number;
export declare const convertToPersianNumbers: (value: string) => string;
