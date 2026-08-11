import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import moment from '../../dateEngine';
import { RangePicker } from '../index';

describe('RangePicker Accept same-day', () => {
  it('accepts a range where from and to are the same calendar day', () => {
    const day = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();
    const onSubmit = vi.fn();
    const onError = vi.fn();

    // Controlled path normalizes to startOf/endOf day.
    render(
      <RangePicker
        isOpenDropdown
        value={{ from: day, to: day }}
        calendarType="jalali"
        exportType="timeStamp"
        showComparison={false}
        onSubmit={onSubmit}
        onError={onError}
      />
    );

    fireEvent.click(screen.getByText('اعمال'));

    expect(onError).not.toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledTimes(1);
    const payload = onSubmit.mock.calls[0][0];
    expect(payload.Data.date.from).toBe(
      moment(day).startOf('day').valueOf()
    );
    expect(payload.Data.date.to).toBe(moment(day).endOf('day').valueOf());
  });

  it('still rejects when end is before start', () => {
    const from = moment('1403/01/20', 'jYYYY/jMM/jDD').startOf('day').valueOf();
    const to = moment('1403/01/10', 'jYYYY/jMM/jDD').startOf('day').valueOf();
    const onSubmit = vi.fn();
    const onError = vi.fn();

    render(
      <RangePicker
        isOpenDropdown
        value={{ from, to }}
        calendarType="jalali"
        exportType="timeStamp"
        showComparison={false}
        onSubmit={onSubmit}
        onError={onError}
      />
    );

    fireEvent.click(screen.getByText('اعمال'));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalled();
  });
});
