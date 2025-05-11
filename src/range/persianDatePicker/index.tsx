import { useCallback, useEffect, useState } from "react";
import moment from "moment-jalaali";
import Calendar from "./Calendar";
import type { IProps } from "./type";
import type { IDate } from "../core/type";
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
  const [confirmed, setConfirmed] = useState({ state: false });
  const onChange = useCallback(
    (e: IDate) => {
      if (e.from === undefined) return;
      const startDate = new Date(date.from).valueOf();
      const endDate = date.to
        ? moment(date.to).locale("fa").clone().endOf("day").valueOf()
        : 0;
      onDateChange?.({ from: startDate, to: endDate });
    },
    [date, onDateChange]
  );
  useEffect(() => {
    if (dateFromOutside && dateFromOutside.from && dateFromOutside.to) {
      setDate(dateFromOutside);
    }
  }, [dateFromOutside]);
  useEffect(() => {
    // if (!visible) return;
    if (!confirmed.state) {
      // setDate({ from: null, to: null });
      onChange({ from: 0, to: 0 });
    } else if (confirmed.state && date.from) {
      const startDate = new Date(date.from).valueOf();
      const endDate = date.to ? new Date(date.to).valueOf() : 0;
      onChange({ from: startDate, to: endDate });
    }
  }, [confirmed, date, onChange]);
  return (
    <Calendar
      onChange={(from, to) => {
        if (onDateChange) {
          onDateChange({
            from: from ?? 0,
            to: moment(to).locale("fa").clone().endOf("day").valueOf(),
          });
        }
        setDate({ from: from ?? 0, to: to ?? 0 });
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
