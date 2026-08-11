import moment from '../dateEngine';
import { formatExport } from '../core/formatExport';
import type { ExportType, TLocale } from '../core/type';
import type { MaskErrorTarget, MaskInputValue, MaskOutputValue, MaskParts } from './types';

export const convertPersianToEnglishNumbers = (input: string): string => {
  const persian = '۰۱۲۳۴۵۶۷۸۹';
  const english = '0123456789';
  return input.replace(/[۰-۹]/g, (d) => english[persian.indexOf(d)] || d);
};

export const toLatinDigits = (input: string): string =>
  convertPersianToEnglishNumbers(input);

export function getLocaleFromCalendar(
  calendarType: 'jalali' | 'gregorian' | undefined
): TLocale {
  return calendarType === 'gregorian' ? 'en' : 'fa';
}

export function resolveMaskTimestamp(value?: MaskInputValue): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.getTime();
}

export function timestampToDateNumbers(
  locale: TLocale,
  timestamp?: number
): MaskParts {
  const source =
    timestamp === undefined || timestamp === 0
      ? moment().locale(locale)
      : moment(timestamp).locale(locale);

  const year =
    locale === 'fa' ? source.format('jYYYY') : source.format('YYYY');
  const month = locale === 'fa' ? source.format('jMM') : source.format('MM');
  const day = locale === 'fa' ? source.format('jDD') : source.format('DD');

  return [
    toLatinDigits(year),
    toLatinDigits(month),
    toLatinDigits(day),
  ];
}

export function partsToCompact(parts: MaskParts): string {
  return `${parts[0]}${parts[1]}${parts[2]}`.substring(0, 8);
}

export function compactToParts(compact: string): MaskParts {
  const raw = toLatinDigits(compact).replace(/\D/g, '').substring(0, 8);
  return [
    raw.slice(0, 4),
    raw.slice(4, 6),
    raw.slice(6, 8),
  ];
}

export function formatDisplayMask(compact: string): string {
  const year = compact.slice(0, 4).padEnd(4, '_');
  const month = compact.slice(4, 6).padEnd(2, '_');
  const day = compact.slice(6, 8).padEnd(2, '_');
  return `${year}/${month}/${day}`;
}

export function changeToTimestamp(fullvalue: string, locale: TLocale): number {
  const value = toLatinDigits(fullvalue);
  switch (value.length) {
    case 1:
    case 2:
    case 3:
    case 4:
      return locale === 'fa'
        ? moment(value, 'jYYYY').valueOf()
        : moment(value, 'YYYY').valueOf();
    case 5:
    case 6:
      return locale === 'fa'
        ? moment(value, 'jYYYYjMM').valueOf()
        : moment(value, 'YYYYMM').valueOf();
    case 7:
    case 8: {
      const parsed =
        locale === 'fa'
          ? moment(value, 'jYYYYjMMjDD')
          : moment(value, 'YYYYMMDD');
      return parsed.isValid() ? parsed.valueOf() : Number.NaN;
    }
    default:
      return Date.now();
  }
}

export function formatFullValueToTimestamp(
  fullValue: string,
  locale: TLocale
): number {
  const value = toLatinDigits(fullValue);
  const parsed =
    locale === 'en'
      ? moment(value, 'YYYYMMDD')
      : moment(value, 'jYYYYjMMjDD');
  return parsed.isValid() ? parsed.valueOf() : Number.NaN;
}

/**
 * True when compact YYYYMMDD (or Jalali) is a real calendar date.
 * Does not trust overflowed Date objects (e.g. 20230231 → March).
 */
export function isValidMaskCompact(compact: string, locale: TLocale): boolean {
  const value = toLatinDigits(compact).replace(/\D/g, '');
  if (value.length !== 8 || Number.isNaN(Number(value))) return false;

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6));
  const day = Number(value.slice(6, 8));
  const dayMax = getEndOfMonth(year, month, locale, undefined, 3);
  if (month < 1 || month > 12 || day < 1 || day > dayMax) return false;

  const parsed =
    locale === 'fa'
      ? moment(value, 'jYYYYjMMjDD')
      : moment(value, 'YYYYMMDD');
  if (!parsed.isValid()) return false;

  const roundTrip =
    locale === 'fa'
      ? toLatinDigits(parsed.format('jYYYYjMMjDD'))
      : parsed.format('YYYYMMDD');
  return roundTrip === value;
}

export function checkDateByRegex(timestamp: number, locale: TLocale): boolean {
  if (!Number.isFinite(timestamp)) return false;
  const dateRegex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
  const formatted =
    locale === 'fa'
      ? moment(timestamp).format('jYYYY/jMM/jDD')
      : moment(timestamp).format('YYYY/MM/DD');
  return dateRegex.test(toLatinDigits(formatted));
}

export function getEndOfMonth(
  year: number,
  month: number,
  locale: TLocale,
  onError: ((message: string) => void) | undefined,
  index: MaskErrorTarget
): number {
  const invalid =
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    month < 1 ||
    month > 12 ||
    (locale === 'fa' && (year < -61 || year > 3177));

  if (invalid) {
    if (index === 2) {
      onError?.(
        locale === 'fa'
          ? 'سال و ماه را اصلاح کنید'
          : 'Please check year and month'
      );
    }
    return 1;
  }

  if (locale === 'fa') {
    try {
      const jMoment = moment(`${year}/${month}/01`, 'jYYYY/jM/jD');
      if (!jMoment.isValid()) {
        if (index === 2) onError?.('سال و ماه را اصلاح کنید');
        return 1;
      }
      const last = jMoment.endOf('jMonth').jDate();
      if (Number.isNaN(last)) {
        if (index === 2) onError?.('سال و ماه را اصلاح کنید');
        return 1;
      }
      return last;
    } catch {
      if (index === 2) onError?.('سال و ماه را اصلاح کنید');
      return 1;
    }
  }

  const gMoment = moment(`${year}-${month}-01`, 'YYYY-M-D');
  const last = gMoment.endOf('month').date();
  if (Number.isNaN(last)) {
    if (index === 2) onError?.('Please check year and month');
    return 1;
  }
  return last;
}

/** Normalize committed date to Mask public output. */
export function formatMaskExport(
  timestamp: number,
  locale: TLocale,
  exportType: ExportType
): MaskOutputValue {
  return formatExport(timestamp, locale, exportType);
}

export function todayTimestamp(locale: TLocale): number {
  return moment().locale(locale).startOf('day').valueOf();
}

export function segmentIndex(name: string): MaskErrorTarget {
  if (name === 'year') return 0;
  if (name === 'month') return 1;
  if (name === 'day') return 2;
  return 3;
}
