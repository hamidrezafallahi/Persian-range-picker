import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import type {
  ESteps,
  IDate,
  ITime,
  ITimeZone,
  IRangePickerProps,
} from "../../core/type";
import { DatePicker } from "../datePicker";
import { Range } from "./range";

export function RangePicker({ ...props }: IRangePickerProps) {
  const {
    model = "range",
    additionalElement,
    defaultValue,
    calendarType = "shamsi",
    // isOpenDropdown = false,
    onChange,
  } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  const [date, setDate] = useState<IDate>({
    from:
      locale === "fa"
        ? model == "date"
          ? 0
          : moment().locale("fa").startOf("jYear").valueOf()
        : moment().locale("en").startOf("year").valueOf(),
    to: model == "date" ? 0 : moment().locale(locale).startOf("day").valueOf(),
  });
  const [compareDate, setCompareDate] = useState<IDate | null>(null);
  const [counter, setCounter] = useState(0);
  const [activeCompareStep, setActiveCompareStep] = useState<ESteps | null>(
    null
  );
  const [step, setStep] = useState<ESteps>(366);
  const [zone, setZone] = useState<ITimeZone>("manual");
  const [tabKey, setTabKey] = useState<ITime | string>("manual");
  const handleChangeDateToRange = (e: number | string) => {
    onChange?.({ type: "date", Data: { from: e } });
  };
  useEffect(() => {
    if (defaultValue) {
      setDate({
        from:
          defaultValue && defaultValue.from > 0
            ? defaultValue.from
            : model == "date"
            ? moment().locale(locale).startOf("day").valueOf()
            : locale == "fa"
            ? moment().locale(locale).startOf("jYear").valueOf()
            : moment().locale(locale).startOf("year").valueOf(),
        to:
          defaultValue && defaultValue.to > 0
            ? defaultValue.to
            : moment().locale(locale).endOf("day").valueOf(),
      });
    }
  }, [defaultValue]);
  return (
    <>
      {model == "date" ? (
        <DatePicker
          {...props}
          defaultValue={date?.from}
          onChange={handleChangeDateToRange}
        />
      ) : (
        <Range
          {...props}
          step={step}
          counter={counter}
          zone={zone}
          date={date}
          tabKey={tabKey}
          compareDate={compareDate}
          activeCompareStep={activeCompareStep}
          setCompareDate={setCompareDate}
          setDate={setDate}
          setActiveCompareStep={setActiveCompareStep}
          setCounter={setCounter}
          setTabKey={setTabKey}
          setStep={setStep}
          setZone={setZone}
          additionalElement={additionalElement}
        />
      )}
    </>
  );
}
