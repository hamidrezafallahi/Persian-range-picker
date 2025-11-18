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
  const getMomentValue = (val: string | number | null | undefined) => {
    if (
      val === null ||
      val === undefined ||
      isNaN(Number(moment(val).valueOf()))
    )
      return NaN;
    return isFa
      ? moment(val).locale("fa").startOf("day").valueOf()
      : moment(val).utc().startOf("day").valueOf();
  };
  const initValue: IDate = (() => {
    if (isDateModel) {
      const fromValue =
        typeof defaultValue === "object"
          ? getMomentValue(defaultValue?.from)
          : getMomentValue(defaultValue as string | number);
      return { from: fromValue, to: NaN };
    } else {
      const from = getMomentValue(
        typeof defaultValue === "object" ? defaultValue?.from : undefined
      );
      const to = getMomentValue(
        typeof defaultValue === "object" ? defaultValue?.to : undefined
      );
      return { from, to };
    }
  })();

  const [showDate, setShowDate] = useState<IDate>(initValue);
  const handleDateChange = (e: IDate) => {
    if (e.from !== null  ) {
      if (isDateModel) {
        const val: IDate["from"] =
          exportType === "IsoString"
            ? locale === "fa"
              ? moment(e.from).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
              : moment.utc(e.from).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            : locale === "fa"
            ? moment(e.from).valueOf()
            : moment.utc(e.from).valueOf();

        onChange?.(val as any);
      } else {
        if (e.to) {
          const val: IDate =
            exportType === "IsoString"
              ? {
                  from:
                    locale === "fa"
                      ? moment(e.from).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                      : moment.utc(e.from).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                  to:
                    locale === "fa"
                      ? moment(e.to).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                      : moment.utc(e.to).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                }
              : {
                  from:
                    locale === "fa"
                      ? moment(e.from).valueOf()
                      : moment.utc(e.from).valueOf(),
                  to:
                    locale === "fa"
                      ? moment(e.to).valueOf()
                      : moment.utc(e.to).valueOf(),
                };
          onChange?.(val as any);
        }
      }
    }
  };


  useEffect(() => {
    if (isDateModel) {
      if (typeof value === "string" || typeof value === "number") {
        setShowDate({
          from: getMomentValue(value),
          to: isFa
            ? moment(value).locale("fa").endOf("day").valueOf()
            : moment(value).utc().endOf("day").valueOf(),
        });
      } else if (value === null) {
        setShowDate({
          from: NaN,
          to: NaN,
        });
      }
    } else if (typeof value === "object" && value?.from !== undefined) {
      setShowDate({
        from: getMomentValue(value.from),
        to: getMomentValue(value.to),
      });
    }
  }, [value]);
  return (
    <DatePicker
      {...props}
      model={model}
      locale={locale}
      onDateChange={handleDateChange}
      defaultValue={defaultValue as any}
      value={showDate}
    />
  );
}
