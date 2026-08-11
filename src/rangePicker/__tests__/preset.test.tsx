import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import moment from '../../dateEngine';
import { RangePicker } from '../index';
import { getTimestampsForPeriod } from '../../core/helper';

describe('RangePicker period presets', () => {
  const from = moment('1403/01/01', 'jYYYY/jMM/jDD').startOf('day').valueOf();
  const to = moment('1403/01/10', 'jYYYY/jMM/jDD').endOf('day').valueOf();

  it('applies Today preset into onChange via Data.date', () => {
    const onChange = vi.fn();
    const today = getTimestampsForPeriod('today', 'fa');

    render(
      <RangePicker
        isOpenDropdown
        defaultValue={{ from, to }}
        calendarType="jalali"
        exportType="timeStamp"
        showComparison={false}
        onChange={onChange}
      />
    );

    // Default tab is "manual"; open Day presets first.
    fireEvent.click(screen.getByText('روز'));
    fireEvent.click(screen.getByText('امروز'));

    expect(onChange).toHaveBeenCalled();
    const last = onChange.mock.calls[onChange.mock.calls.length - 1][0];
    expect(last.Data?.date?.from).toBe(today.from);
    expect(last.Data?.date?.to).toBe(today.to);
    // Guard against double-wrap: Data.date.date must not exist.
    expect((last.Data?.date as { date?: unknown })?.date).toBeUndefined();
  });
});
