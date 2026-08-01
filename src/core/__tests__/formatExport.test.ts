import { describe, expect, it } from 'vitest';
import { formatExport } from '../formatExport';
import moment from '../../dateEngine';

describe('formatExport', () => {
  const ts = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();

  it('returns timestamp for timeStamp export', () => {
    expect(formatExport(ts, 'fa', 'timeStamp')).toBe(ts);
    expect(typeof formatExport(ts, 'en', 'timeStamp')).toBe('number');
  });

  it('returns ISO-like string for IsoString export', () => {
    const fa = formatExport(ts, 'fa', 'IsoString');
    const en = formatExport(ts, 'en', 'IsoString');
    expect(typeof fa).toBe('string');
    expect(typeof en).toBe('string');
    expect(fa).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(en).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(String(fa)).not.toMatch(/[۰-۹]/);
  });
});
