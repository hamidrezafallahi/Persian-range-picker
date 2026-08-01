import React, {
  useEffect,
  useState,
} from 'react';

import moment from '../dateEngine';

import style from '../main.module.css';
import { Mask } from '../mask';
import type { MaskOutputValue } from '../mask/types';
import type {
  IDate,
  TLocale,
} from './type';

export interface MaskRangeProps {
  date?: IDate;
  onDateChange?: (e: IDate) => void;
  locale?: TLocale;
  onError?: (e: string) => void;
}

function toTimestamp(value: MaskOutputValue): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') return value;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? null : parsed;
}

function MaskRange({ date, onDateChange, locale = 'fa', onError }: MaskRangeProps) {
  const [error, setError] = useState<'from' | 'to' | null>(null);

  const handleChange = (raw: MaskOutputValue, name: 'from' | 'to') => {
    const e = toTimestamp(raw);
    if (e === null) return;

    if (name === 'from') {
      if (date?.to != null && e > Number(date.to)) {
        setError('from');
        return;
      }
      setError(null);
      onDateChange?.({ from: e, to: date?.to });
      return;
    }

    if (date?.from != null && e < Number(date.from)) {
      setError('to');
      return;
    }
    setError(null);
    const endOfDate =
      locale === 'fa'
        ? moment(e).endOf('day').valueOf()
        : moment(e).utc().endOf('day').valueOf();
    onDateChange?.({ from: date?.from, to: endOfDate });
  };

  useEffect(() => {
    if (error === 'from') {
      onError?.(
        locale === 'fa'
          ? 'تاریخ شروع نمیتواند بعد از تاریخ پایان باشد'
          : 'The start date cannot be after the end date.'
      );
    } else if (error === 'to') {
      onError?.(
        locale === 'fa'
          ? 'تاریخ پایان نمیتواند قبل از تاریخ شروع ست شود'
          : 'End date cannot be set before start date.'
      );
    }
  }, [error, locale, onError]);

  return (
    <div
      className={`${style.w_full} ${style.flex} ${style.items_center} ${style.justify_around} ${style.gap_2}`}
    >
      <Mask
        onMaskChange={(e) => handleChange(e, 'from')}
        value={date?.from as number | string | null | undefined}
        maskClassName={`${style.w_32}`}
        Style={{ border: error === 'from' ? '1px solid red' : undefined }}
        prefix={false}
        suffix={false}
        calendarType={locale === 'fa' ? 'jalali' : 'gregorian'}
        onError={() => setError('from')}
        exportType="timeStamp"
      />
      <div>{'_'}</div>
      <Mask
        onMaskChange={(e) => handleChange(e, 'to')}
        value={date?.to as number | string | null | undefined}
        maskClassName={`${style.w_32}`}
        Style={{ border: error === 'to' ? '1px solid red' : undefined }}
        prefix={false}
        suffix={false}
        calendarType={locale === 'fa' ? 'jalali' : 'gregorian'}
        onError={() => setError('to')}
        exportType="timeStamp"
      />
    </div>
  );
}

export default MaskRange;
