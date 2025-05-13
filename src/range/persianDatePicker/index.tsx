import { useState } from "react";

import moment from "moment-jalaali";

import type { IDate } from "../core/type";
import Calendar from "./Calendar";
import type { IProps } from "./type";

export const DatePicker = ({
  datePickerBodyClassName,
  locale,
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
  const [date, setDate] = useState<IDate>(dateFromOutside);
  const onChange = (e: IDate) => {
    if (e.from === undefined) return;
    const { from, to } = e;
    onDateChange?.({ from, to });
  };
  return (
    <Calendar
      onChange={(from, to) => {
        onChange({ from, to });
        setDate({ from, to });
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
