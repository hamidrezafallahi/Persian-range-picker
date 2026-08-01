import moment from '../dateEngine';
import type { ExportType, IDate, TLocale } from './type';
import { getTimestamp } from './helper';

/**
 * Single export adapter for public API boundaries.
 * Internal state stays as Unix ms; consumers receive IsoString or timeStamp.
 */
export function formatExport(
  timestamp: number,
  locale: TLocale,
  exportType: ExportType = 'IsoString'
): number | string {
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
