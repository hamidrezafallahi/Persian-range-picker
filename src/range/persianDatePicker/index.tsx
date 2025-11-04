import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import type { IDate } from '../core/type';
import Calendar from './Calendar';
import type { IProps } from './type';

export const DatePicker = ({ ...props }: IProps) => {
  const { locale = "fa", dateFromOutside, onDateChange } = props;
  



  const initDate: IDate = useMemo(() => {
    return {
      from: dateFromOutside.from,
      to: dateFromOutside.to,
    };
  }, [dateFromOutside]);
  const [date, setDate] = useState<IDate>(initDate);
  const onChange = (e: IDate) => {
    if (e.from === undefined) return;
    const { from, to } = e;
    onDateChange?.({ from, to });
  };
  useEffect(() => {
    setDate(dateFromOutside);
  }, [dateFromOutside]);
  return (
    <Calendar
      {...props}
      onChange={(from, to) => {
        onChange({ from, to } as IDate);
        setDate({ from, to } as IDate);
      }}
      startDate={moment(date?.from)
        .locale(locale)
        .clone()
        .startOf("day")
        .valueOf()}
      endDate={moment(date?.to).locale(locale).clone().startOf("day").valueOf()}
      
    />
  );
};
