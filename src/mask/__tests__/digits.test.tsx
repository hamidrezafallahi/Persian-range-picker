import { describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import moment from '../../dateEngine';
import { Mask } from '../../mask';

describe('Mask Separated digit locale', () => {
  const seed = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();

  it('shows Persian digits in year/month/day edit fields for jalali', () => {
    const { container } = render(
      <Mask
        defaultValue={seed}
        exportType="timeStamp"
        calendarType="jalali"
      />
    );

    const display = container.querySelector('[role="button"]');
    expect(display).toBeTruthy();
    fireEvent.click(display!);

    const year = container.querySelector('input[name="year"]') as HTMLInputElement;
    const month = container.querySelector('input[name="month"]') as HTMLInputElement;
    const day = container.querySelector('input[name="day"]') as HTMLInputElement;

    expect(year.value).toBe('۱۴۰۳');
    expect(month.value).toBe('۰۱');
    expect(day.value).toBe('۱۵');
  });

  it('keeps Latin digits in edit fields for gregorian', () => {
    const gSeed = Date.UTC(2024, 5, 15);
    const { container } = render(
      <Mask
        defaultValue={gSeed}
        exportType="timeStamp"
        calendarType="gregorian"
      />
    );

    const display = container.querySelector('[role="button"]');
    fireEvent.click(display!);

    const year = container.querySelector('input[name="year"]') as HTMLInputElement;
    expect(year.value).toMatch(/^\d{4}$/);
    expect(year.value).not.toMatch(/[۰-۹]/);
  });
});
