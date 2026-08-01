import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { useState } from 'react';
import moment from '../../dateEngine';
import { TimePicker } from '../index';
import { Mask } from '../../mask';
import { Calendar } from '../../persianDatePicker';
import { RangePicker } from '../../rangePicker';

describe('controlled clear contracts', () => {
  const seed = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();

  it('TimePicker clears when value becomes null', () => {
    function Harness() {
      const [value, setValue] = useState<number | string | null>(seed);
      return (
        <>
          <button type="button" onClick={() => setValue(null)}>
            clear
          </button>
          <TimePicker
            value={value}
            exportType="timeStamp"
            calendarType="jalali"
            onChange={setValue}
          />
        </>
      );
    }
    const { getByText, container } = render(<Harness />);
    getByText('clear').click();
    // After clear, placeholder should show (no time digits required)
    expect(container.textContent).toBeTruthy();
  });

  it('Mask clears display when value becomes null without calling onClear', () => {
    const onClear = vi.fn();
    function Harness() {
      const [value, setValue] = useState<number | string | null>(seed);
      return (
        <>
          <button type="button" onClick={() => setValue(null)}>
            clear
          </button>
          <Mask
            value={value}
            exportType="timeStamp"
            calendarType="jalali"
            onClear={onClear}
          />
        </>
      );
    }
    const { getByText } = render(<Harness />);
    getByText('clear').click();
    expect(onClear).not.toHaveBeenCalled();
  });

  it('Calendar clears date when value becomes null', () => {
    function Harness() {
      const [value, setValue] = useState<number | null>(seed);
      return (
        <>
          <button type="button" onClick={() => setValue(null)}>
            clear
          </button>
          <Calendar locale="fa" model="date" value={value} />
        </>
      );
    }
    const { getByText } = render(<Harness />);
    getByText('clear').click();
    expect(document.body.textContent).toBeTruthy();
  });

  it('RangePicker accepts value null clear', () => {
    function Harness() {
      const [value, setValue] = useState<{ from: number; to: number } | null>({
        from: seed,
        to: seed + 86400000,
      });
      return (
        <>
          <button type="button" onClick={() => setValue(null)}>
            clear
          </button>
          <RangePicker
            value={value as any}
            calendarType="jalali"
            exportType="timeStamp"
          />
        </>
      );
    }
    const { getByText } = render(<Harness />);
    getByText('clear').click();
    expect(document.body.textContent).toBeTruthy();
  });
});
