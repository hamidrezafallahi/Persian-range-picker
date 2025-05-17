import { useEffect, useMemo, useState } from "react";

import moment from "moment-jalaali";

import type { IDate } from "../core/type";
import Calendar from "./Calendar";
import type { IProps } from "./type";

export const DatePicker = ({
  datePickerBodyClassName,
  locale = "fa",
  dateFromOutside,
  onDateChange,
  model = "range",
  disablePreviousDays,
  renderDayFn,
  calenderClassName,
  primaryColor = "#000",
  backgroundColor = "#fff",
  tertiaryColor = "#939393",
  highlightColor = "#f4f4f4",
  accentColor = "#2563eb",
  secondaryColor = "#585858",
}: IProps) => {
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
      containerClassName=""
      locale={locale}
      disablePreviousDays={disablePreviousDays}
      model={model}
      renderDayFn={renderDayFn}
      calenderClassName={calenderClassName}
      datePickerBodyClassName={datePickerBodyClassName}
      primaryColor={primaryColor}
      accentColor={accentColor}
      tertiaryColor={tertiaryColor}
      backgroundColor={backgroundColor}
      highlightColor={highlightColor}
      secondaryColor={secondaryColor}
    />
  );
};
