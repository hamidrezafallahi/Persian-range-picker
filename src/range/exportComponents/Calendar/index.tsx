import {
  useEffect,
  useMemo,
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
  onChange,
  ...props
}: CalendarProps) {
  const { dateFromOutside } = props;
  const defaultDate: IDate = (() => {
    const isFa = locale === "fa";
    const isDateModel = model === "date";

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
  })();
  const initDate: IDate = useMemo(() => {
    if (dateFromOutside) {
      return {
        from: dateFromOutside.from,
        to: dateFromOutside.to,
      };
    } else {
      return defaultDate;
    }
  }, [dateFromOutside]);
  const [date, setDate] = useState<IDate>(initDate);

  const handleDateChange = (e: IDate) => {

    onChange?.(exportType == "timeStamp"?new Date(e.from).valueOf():new Date(e.from).toISOString());
  };

  useEffect(() => {
    if (dateFromOutside) {
      setDate(dateFromOutside);
    }
  }, [dateFromOutside]);
  return (
    <DatePicker
      {...props}
      model={model}
      locale={locale}
      onDateChange={handleDateChange}
      dateFromOutside={date}
    />
  );
}
