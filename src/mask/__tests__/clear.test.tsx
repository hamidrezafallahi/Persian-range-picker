import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import moment from '../../dateEngine';
import { Mask } from '../../mask';
import { calculateDate } from '../../core/navigateButton';
import { ESteps } from '../../persianDatePicker/enum';

describe('Mask clear contract', () => {
  const seed = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();

  it('user clear emits null and calls onClear', () => {
    const onMaskChange = vi.fn();
    const onClear = vi.fn();
    const { container } = render(
      <Mask
        defaultValue={seed}
        allowClear
        exportType="timeStamp"
        calendarType="jalali"
        onMaskChange={onMaskChange}
        onClear={onClear}
      />
    );
    const clearBtn = container.querySelector('button');
    expect(clearBtn).toBeTruthy();
    fireEvent.click(clearBtn!);
    expect(onMaskChange).toHaveBeenCalledWith(null);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('shows empty mask placeholder when value becomes null', () => {
    const { container, rerender } = render(
      <Mask value={seed} exportType="timeStamp" calendarType="jalali" />
    );
    expect(container.textContent).toMatch(/۱۴۰۳|1403/);
    rerender(
      <Mask value={null} exportType="timeStamp" calendarType="jalali" />
    );
    expect(container.textContent).toContain('____/__/__');
  });
});

describe('calculateDate week locale', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-12T12:00:00Z'));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('thisWeek en starts Sunday for counter 0', () => {
    const { from } = calculateDate(ESteps.week, 'thisWeek', 0, 'en');
    expect(moment.utc(from).day()).toBe(0);
  });

  it('thisWeek fa starts Saturday for counter 0', () => {
    const { from } = calculateDate(ESteps.week, 'thisWeek', 0, 'fa');
    expect(moment(from).day()).toBe(6);
  });
});
