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
      from:new Date(defaultValue.from as string).valueOf() ,
      to: new Date(defaultValue.to as string).valueOf(),
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
    if (value?.from !== undefined) {
      if (isDate(value.from) && isDate(value.to)) {
        setDate({from:new Date(value.from).valueOf(),to:new Date(value.to).valueOf()});
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
      startDate={date?.from as number}
      endDate={moment(date?.to).locale(locale).clone().startOf("day").valueOf()}
      
    />
  );
};
