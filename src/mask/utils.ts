import moment from '../dateEngine';
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
      ? locale === 'fa'
        ? moment()
        : moment.utc()
      : locale === 'fa'
        ? moment(timestamp)
        : moment.utc(timestamp);

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
    case 8:
      return locale === 'fa'
        ? moment(value, 'jYYYYjMMjDD').valueOf()
        : moment(value, 'YYYYMMDD').valueOf();
    default:
      return Date.now();
  }
}

export function formatFullValueToTimestamp(
  fullValue: string,
  locale: TLocale
): number {
  const value = toLatinDigits(fullValue);
  return locale === 'en'
    ? moment(value, 'YYYYMMDD').valueOf()
    : moment(value, 'jYYYYjMMjDD').valueOf();
}

export function checkDateByRegex(timestamp: number, locale: TLocale): boolean {
  const dateRegex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
  const formatted =
    locale === 'fa'
      ? moment(timestamp).format('jYYYY/jMM/jDD')
      : moment(timestamp).format('YYYY/MM/DD');
  return dateRegex.test(formatted);
}

export function getEndOfMonth(
  year: number,
  month: number,
  locale: TLocale,
  onError: ((message: string) => void) | undefined,
  index: MaskErrorTarget
): number {
  if (locale === 'fa') {
    const jMoment = moment(`${year}/${month}/01`, 'jYYYY/jM/jD');
    const last = jMoment.endOf('jMonth').jDate();
    if (Number.isNaN(last)) {
      if (index === 2) onError?.('سال و ماه را اصلاح کنید');
      return 1;
    }
    return last;
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
  if (exportType === 'IsoString') {
    if (locale === 'fa') {
      return moment(timestamp)
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    }
    return moment.utc(timestamp).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  }

  return locale === 'fa'
    ? moment(timestamp).valueOf()
    : moment.utc(timestamp).valueOf();
}

export function todayTimestamp(locale: TLocale): number {
  return locale === 'fa'
    ? moment().startOf('day').valueOf()
    : moment.utc().startOf('day').valueOf();
}

export function segmentIndex(name: string): MaskErrorTarget {
  if (name === 'year') return 0;
  if (name === 'month') return 1;
  if (name === 'day') return 2;
  return 3;
}
