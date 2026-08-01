import { describe, expect, it } from 'vitest';
import {
  getFirstDayIndexInMonth,
  getNumberOfDays,
  isEqualDays,
} from '../helper';

describe('persianDatePicker/helper', () => {
  it('compares calendar days', () => {
    const a = new Date(2024, 5, 15, 8).getTime();
    const b = new Date(2024, 5, 15, 20).getTime();
    expect(isEqualDays(a, b)).toBe(true);
    expect(isEqualDays(a, null)).toBe(false);
  });

  it('returns month day counts', () => {
    expect(getNumberOfDays(2024, 1, 'en')).toBe(29); // leap Feb
    expect(getNumberOfDays(1403, 0, 'fa')).toBe(31);
    expect(getNumberOfDays(1395, 11, 'fa')).toBe(30);
  });

  it('returns first weekday index in month', () => {
    const faIndex = getFirstDayIndexInMonth(1403, 0, 'fa');
    const enIndex = getFirstDayIndexInMonth(2024, 0, 'en');
    expect(faIndex).toBeGreaterThanOrEqual(0);
    expect(faIndex).toBeLessThan(7);
    expect(enIndex).toBeGreaterThanOrEqual(0);
    expect(enIndex).toBeLessThan(7);
  });
});
