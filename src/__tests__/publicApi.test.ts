import { describe, expect, it } from 'vitest';
import * as Lib from '../index';

describe('public API surface', () => {
  it('exports all required components and hooks', () => {
    expect(typeof Lib.DatePicker).toBe('function');
    expect(typeof Lib.TimePicker).toBe('function');
    expect(typeof Lib.RangePicker).toBe('function');
    expect(typeof Lib.Mask).toBe('function');
    expect(typeof Lib.Calendar).toBe('function');
    expect(typeof Lib.useRenderPosition).toBe('function');
    expect(typeof Lib.useMediaQuery).toBe('function');
  });

  it('exports format helpers and MaskMode', () => {
    expect(typeof Lib.formatExport).toBe('function');
    expect(typeof Lib.formatIDateExport).toBe('function');
    expect(Lib.MaskMode).toEqual({ Display: 0, Separated: 1, Full: 2 });
  });
});
