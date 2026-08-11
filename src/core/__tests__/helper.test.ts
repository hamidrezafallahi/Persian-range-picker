import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { ESteps } from '../../persianDatePicker/enum';
import {
  backwardStep,
  getTimestamp,
  getTimestampsForPeriod,
  toPersianDigits,
} from '../helper';

describe('core/helper', () => {
  it('converts digits to persian', () => {
    expect(toPersianDigits('1403/01/15')).toBe('۱۴۰۳/۰۱/۱۵');
  });

  it('parses timestamps via getTimestamp', () => {
    expect(getTimestamp(null)).toBeUndefined();
    expect(getTimestamp(undefined)).toBeUndefined();
    expect(getTimestamp(1_700_000_000_000)).toBe(1_700_000_000_000);
  });

  it('uses correct season step length (90 days)', () => {
    expect(backwardStep[ESteps.season]).toBe(86_400_000 * 90);
    expect(backwardStep[ESteps.day]).toBe(86_400_000);
    expect(backwardStep[ESteps.week]).toBe(86_400_000 * 7);
  });

  describe('getTimestampsForPeriod', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-06-15T12:00:00'));
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns today range with from <= to', () => {
      const { from, to } = getTimestampsForPeriod('today', 'fa');
      expect(from).toBeGreaterThan(0);
      expect(to).toBeGreaterThan(from);
    });

    it('returns yesterday before today', () => {
      const today = getTimestampsForPeriod('today', 'fa');
      const yesterday = getTimestampsForPeriod('yesterday', 'fa');
      expect(yesterday.to).toBeLessThan(today.from);
    });

    it('lastMonth fa ends on Shahrivar 31 when today is in Mehr', async () => {
      // 2024-10-06 ≈ 1403/07/15 (Mehr) — previous month Shahrivar has 31 days
      vi.setSystemTime(new Date('2024-10-06T12:00:00'));
      const { from, to } = getTimestampsForPeriod('lastMonth', 'fa');
      const moment = (await import('../../dateEngine')).default;
      expect(moment(from).format('jYYYY/jMM/jDD')).toBe('1403/06/01');
      expect(moment(to).format('jYYYY/jMM/jDD')).toBe('1403/06/31');
    });

    it('lastMonth en ends on last day of previous Gregorian month', async () => {
      // March 15 → February end (2024 leap → 29)
      vi.setSystemTime(new Date('2024-03-15T12:00:00'));
      const { from, to } = getTimestampsForPeriod('lastMonth', 'en');
      const moment = (await import('../../dateEngine')).default;
      expect(moment(from).format('YYYY-MM-DD')).toBe('2024-02-01');
      expect(moment(to).format('YYYY-MM-DD')).toBe('2024-02-29');
    });
  });
});
