import jmoment from '../dateEngine';

import type { TLocale } from '../core/type';

const todayTimestamp = new Date().setHours(0, 0, 0, 0);

export const isCurrentDay = (timestamp: number): boolean => {
  return timestamp === new Date(todayTimestamp).setHours(0, 0, 0, 0);
};

export const isEqualDays = (
  first: number | null | undefined | Date,
  second: number | null | undefined | Date
): boolean => {
  if (!first || !second) return false;
  return (
    new Date(first).setHours(0, 0, 0, 0) ===
    new Date(second).setHours(0, 0, 0, 0)
  );
};

export const getFirstDayIndexInMonth = (
  year: number,
  month: number,
  locale: TLocale
): number => {
  let dayName: string;

  if (locale === "en") {
    dayName = jmoment([year, month, 1]).format("ddd");
  } else {
    dayName = jmoment(`${year}-${month + 1}-01`, "jYYYY-jMM-jDD").format("ddd");
  }
  const dayOrder =
    locale === "fa"
      ? ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return dayOrder.indexOf(dayName);
};


export const getNumberOfDays = (
  year: number,
  month: number,
  locale: TLocale
) => {
  if (locale === "en") {
    return 40 - new Date(year, month, 40).getDate();
  } else {
    return jmoment.jDaysInMonth(year, month);
  }
};

export const convertToPersianNumbers = (value: string) => {
  const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return value.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};
