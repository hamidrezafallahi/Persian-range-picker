import moment from '../dateEngine';
import type { ExportType, IDate, TLocale } from './type';
import { calendarMoment, getTimestamp } from './helper';

/**
 * Single export adapter for public API boundaries.
 * Internal state stays as Unix ms; consumers receive IsoString or timeStamp.
 *
 * Policy: both fa and en use local wall-clock for IsoString (offset in Z).
 * `timeStamp` is absolute ms (identical regardless of utc/local).
 */
export function formatExport(
  timestamp: number,
  locale: TLocale,
  exportType: ExportType = 'IsoString'
): number | string {
  if (exportType === 'IsoString') {
    const formatted = calendarMoment(timestamp, locale).format(
      'YYYY-MM-DDTHH:mm:ss.SSSZ'
    );
    // Guard against accidental Persian digits from host fonts / engines.
    return formatted.replace(/[۰-۹]/g, (d) =>
      '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()
    );
  }

  return calendarMoment(timestamp, locale).valueOf();
}

/** Map an internal IDate (ms) to public export shape. */
export function formatIDateExport(
  date: IDate | null | undefined,
  locale: TLocale,
  exportType: ExportType = 'IsoString'
): IDate | null {
  if (!date) return null;
  const fromTs = getTimestamp(date.from);
  const toTs = getTimestamp(date.to);
  return {
    from:
      fromTs === undefined || date.from == null
        ? date.from ?? null
        : formatExport(fromTs, locale, exportType),
    to:
      toTs === undefined || date.to == null
        ? date.to ?? null
        : formatExport(toTs, locale, exportType),
  };
}
