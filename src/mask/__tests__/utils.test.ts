import { describe, expect, it } from 'vitest';
import moment from '../../dateEngine';
import {
  checkDateByRegex,
  compactToParts,
  formatMaskExport,
  getEndOfMonth,
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
