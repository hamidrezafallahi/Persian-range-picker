import {
  useEffect,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import {
  CalendarProps,
  IDate,
} from '../../core/type';
import { DatePicker } from '../../persianDatePicker';

export function Calendar({
  locale = "fa",
  model = "date",
  exportType = "IsoString",
  value,
  defaultValue,
  onChange,
  ...props
}: CalendarProps) {
  const isFa = locale === "fa";
  const isDateModel = model === "date";
  const initValue: IDate = (() => {
if(defaultValue  !== undefined){
if (isDateModel) {
      return {
        from: isFa
          ? moment(defaultValue.from).locale("fa").startOf("day").valueOf()
          : moment(defaultValue.from).utc().startOf("day").valueOf(),
        to: isFa
          ? moment(defaultValue.to).locale("fa").endOf("day").valueOf()
          : moment(defaultValue.to).utc().endOf("day").valueOf(),
      };
    } else {
      return {
        from: isFa
          ? moment(defaultValue.from).locale("fa").startOf("jYear").valueOf()
          : moment(defaultValue.from).utc().startOf("year").valueOf(),
        to: isFa
          ? moment(defaultValue.to).locale("fa").endOf("day").valueOf()
          : moment(defaultValue.to).utc().endOf("day").valueOf(),
      };
    }
}else {
  if (isDateModel) {
      return {
        from: isFa
          ? moment().locale("fa").startOf("day").valueOf()
          : moment().utc().startOf("day").valueOf(),
        to: isFa
          ? moment().locale("fa").endOf("day").valueOf()
          : moment().utc().endOf("day").valueOf(),
      };
    } else {
      return {
        from: isFa
          ? moment().locale("fa").startOf("jYear").valueOf()
          : moment().utc().startOf("year").valueOf(),
        to: isFa
          ? moment().locale("fa").endOf("day").valueOf()
          : moment().utc().endOf("day").valueOf(),
      };
    }
}
  })();
  const [showDate, setShowDate] = useState<IDate>(initValue);

  const handleDateChange = (e: IDate) => {

    onChange?.(exportType == "timeStamp"?new Date(e.from).valueOf():new Date(e.from).toISOString());
  };

  useEffect(() => {
    if (value?.from !== undefined) {
      if (isDateModel) {
      setShowDate({
        from: isFa
          ? moment(value.from).locale("fa").startOf("day").valueOf()
          : moment(value.from).utc().startOf("day").valueOf(),
        to: isFa
          ? moment(value.from).locale("fa").endOf("day").valueOf()
          : moment(value.from).utc().endOf("day").valueOf(),
      });
    } else {
      setShowDate({
        from: isFa
          ? moment(value.from).locale("fa").startOf("jYear").valueOf()
          : moment(value.from).utc().startOf("year").valueOf(),
        to: isFa
          ? moment(value.to).locale("fa").endOf("day").valueOf()
          : moment(value.to).utc().endOf("day").valueOf(),
      })
    }
}
  }, [value]);
  return (
    <DatePicker
      {...props}
      model={model}
      locale={locale}
      onDateChange={handleDateChange}
      defaultValue={defaultValue}
      value={showDate}
    />
  );
}
