import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ESteps } from '../../persianDatePicker/enum';
import PeriodList from '../periodList';
import { getTimestampsForPeriod } from '../helper';

describe('PeriodList onChange payload', () => {
  const today = getTimestampsForPeriod('today', 'fa');

  const baseProps = {
    step: ESteps.day,
    zone: 'today' as const,
    value: { from: today.from - 1, to: today.to - 1 },
    locale: 'fa' as const,
    setStep: vi.fn(),
    setZone: vi.fn(),
    setCompareDate: vi.fn(),
    setCounter: vi.fn(),
    activeCompareStep: null,
    setActiveCompareStep: vi.fn(),
    showComparison: false,
    periodClassName: '',
    primaryColor: '#000',
    highlightColor: '#f4f4f4',
    accentColor: '#2563eb',
    tertiaryColor: '#939393',
    neutralColor: '#9cc5f1',
    componentStep: ESteps.day,
  };

  it('emits Data.date { from, to } when a preset is clicked', () => {
    const onChange = vi.fn();
    const { getByText } = render(
      <PeriodList {...baseProps} onChange={onChange} />
    );

    fireEvent.click(getByText('امروز'));

    expect(onChange).toHaveBeenCalledTimes(1);
    const payload = onChange.mock.calls[0][0];
    expect(payload.type).toBe('range');
    expect(payload.Data).toEqual({
      date: {
        from: today.from,
        to: today.to,
      },
    });
    // Must not be a bare { from, to } at Data root (RangePicker reads Data.date).
    expect(payload.Data.from).toBeUndefined();
    expect(payload.Data.to).toBeUndefined();
  });
});
