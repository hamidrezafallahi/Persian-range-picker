import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import moment from '../../dateEngine';
import { RangePicker } from '../index';

describe('RangePicker smoke', () => {
  const from = moment('1403/01/01', 'jYYYY/jMM/jDD').startOf('day').valueOf();
  const to = moment('1403/01/10', 'jYYYY/jMM/jDD').endOf('day').valueOf();

  it('renders with defaultValue and opens dropdown', () => {
    const onChange = vi.fn();
    render(
      <RangePicker
        isOpenDropdown
        defaultValue={{ from, to }}
        calendarType="jalali"
        onChange={onChange}
      />
    );
    expect(document.body.textContent).toMatch(/تاریخ|Date|۱۴۰۳|1403/);
  });
});
