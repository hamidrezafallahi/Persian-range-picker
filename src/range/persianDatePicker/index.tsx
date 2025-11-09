import {
  useEffect,
  useState,
} from 'react';

import moment, { isDate } from 'moment-jalaali';

import type { IDate } from '../core/type';
import Calendar from './Calendar';
import type { IProps } from './type';

export const DatePicker = ({ ...props }: IProps) => {
  const { locale = "fa",
      onDateChange,
      value,
      defaultValue
    } = props;
  const initValue:IDate|undefined = defaultValue
    ? typeof defaultValue.from == "number" && typeof defaultValue.to == "number"
      ?   {
      from: defaultValue.from ,
      to: defaultValue.to,
    }
      : 
      {
      from:new Date(defaultValue.from).valueOf() ,
      to: new Date(defaultValue.to).valueOf(),
    }:{
      from: 0,
      to:0,
    }
  const [date, setDate] = useState<IDate>(initValue);
  const onChange = (e: IDate) => {
    if (e.from === undefined) return;
    const { from, to } = e;
    onDateChange?.({ from, to });
  };
  useEffect(() => {
    if (value !== undefined) {
      if (isDate(value.from) && isDate(value.to)) {
        setDate({from:new Date(value.from),to:new Date(value.to)});
      } else if (typeof value.from === "number" && typeof value.to === "number") {
        setDate({from:value.from,to:value.to});
      }
    }
  }, [value]);
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
