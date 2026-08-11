import { describe, expect, it } from 'vitest';
import moment from '../../dateEngine';
import {
  checkDateByRegex,
  changeToTimestamp,
  compactToParts,
  formatMaskExport,
  getEndOfMonth,
  isValidMaskCompact,
  partsToCompact,
  resolveMaskTimestamp,
  timestampToDateNumbers,
  toLatinDigits,
} from '../utils';

describe('mask/utils', () => {
  it('converts persian digits to latin', () => {
    expect(toLatinDigits('۱۴۰۳')).toBe('1403');
  });

  it('resolves mask timestamps', () => {
    expect(resolveMaskTimestamp(null)).toBeUndefined();
    expect(resolveMaskTimestamp('')).toBeUndefined();
    expect(resolveMaskTimestamp(1_700_000_000_000)).toBe(1_700_000_000_000);
  });

  it('round-trips parts and compact', () => {
    expect(partsToCompact(['1403', '01', '15'])).toBe('14030115');
    expect(compactToParts('14030115')).toEqual(['1403', '01', '15']);
  });

  it('builds date numbers from timestamp', () => {
    const ts = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();
    expect(timestampToDateNumbers('fa', ts)).toEqual(['1403', '01', '15']);
  });

  it('validates formatted dates via regex helper', () => {
    const valid = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();
    expect(checkDateByRegex(valid, 'fa')).toBe(true);
  });

  it('rejects Gregorian Feb 31 (no silent overflow)', () => {
    expect(isValidMaskCompact('20230231', 'en')).toBe(false);
    expect(Number.isNaN(changeToTimestamp('20230231', 'en'))).toBe(true);
    expect(isValidMaskCompact('20240229', 'en')).toBe(true);
    expect(isValidMaskCompact('20230229', 'en')).toBe(false);
  });

  it('rejects invalid Jalali day beyond month length', () => {
    expect(isValidMaskCompact('14031231', 'fa')).toBe(false); // Esfand max 29/30
    expect(isValidMaskCompact('14030115', 'fa')).toBe(true);
  });

  it('returns end of month for leap/common Esfand', () => {
    expect(getEndOfMonth(1395, 12, 'fa', undefined, 2)).toBe(30);
    expect(getEndOfMonth(1394, 12, 'fa', undefined, 2)).toBe(29);
  });

  it('does not throw for incomplete/NaN year or month', () => {
    expect(getEndOfMonth(Number.NaN, 1, 'fa', undefined, 2)).toBe(1);
    expect(getEndOfMonth(1403, Number.NaN, 'fa', undefined, 2)).toBe(1);
    expect(getEndOfMonth(1403, 0, 'fa', undefined, 2)).toBe(1);
    expect(getEndOfMonth(99999, 1, 'fa', undefined, 2)).toBe(1);
  });

  it('exports via formatMaskExport', () => {
    const ts = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();
    expect(formatMaskExport(ts, 'fa', 'timeStamp')).toBe(ts);
    expect(typeof formatMaskExport(ts, 'fa', 'IsoString')).toBe('string');
  });
});
