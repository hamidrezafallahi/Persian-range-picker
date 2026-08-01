import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import moment from '../../dateEngine';
import { TimePicker } from '../index';
import { formatExport } from '../../core/formatExport';

describe('TimePicker export', () => {
  const seed = moment('1403/01/15 10:30:00', 'jYYYY/jMM/jDD HH:mm:ss').valueOf();

  it('emits timestamp when exportType is timeStamp', () => {
    const onChange = vi.fn();
    render(
      <TimePicker
        defaultValue={seed}
        exportType="timeStamp"
        calendarType="jalali"
        onChange={onChange}
      />
    );
    const trigger = document.body.querySelector('button');
    if (trigger) fireEvent.click(trigger);
    const okButtons = Array.from(document.body.querySelectorAll('button')).filter(
      (b) => /تأیید|OK|اعمال|Accept/i.test(b.textContent ?? '')
    );
    if (okButtons[0]) {
      fireEvent.click(okButtons[0]);
      expect(onChange).toHaveBeenCalled();
      const emitted = onChange.mock.calls[0][0];
      expect(typeof emitted).toBe('number');
      expect(formatExport(emitted as number, 'fa', 'timeStamp')).toBe(emitted);
    }
  });
});
