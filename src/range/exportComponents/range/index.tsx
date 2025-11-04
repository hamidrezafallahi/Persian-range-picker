import {
  useEffect,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import {
  getTimestamp,
  getTimestampByFallBack,
} from '../../core/helper';
import type {
  AcceptableDateValue,
  ESteps,
  IDate,
  IRangePickerProps,
  ITime,
  ITimeZone,
} from '../../core/type';
import { DatePicker } from '../datePicker';
import { RangePicker } from './rangePicker';

type CustomRangePickerProps = Omit<
  IRangePickerProps,
  "defaultValue" | "locale"
> & {
  defaultValue?: { from: AcceptableDateValue; to: AcceptableDateValue };
};
export function Range({ ...props }: CustomRangePickerProps) {
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

  const fallbackFrom =
    model === "date"
      ? moment().locale(locale).startOf("day").valueOf()
      : locale === "fa"
      ? moment().locale(locale).startOf("jYear").valueOf()
      : moment().locale(locale).startOf("year").valueOf();

  const fallbackTo = moment().locale(locale).endOf("day").valueOf();

  const from = getTimestampByFallBack(
    getTimestamp(defaultValue?.from),
    fallbackFrom
  );
  const to = getTimestampByFallBack(getTimestamp(defaultValue?.to), fallbackTo);
  useEffect(() => {
    if (defaultValue) {
      setDate({ from, to });
    }
  }, [defaultValue, locale, model]);

  return (
    <>
      {model == "date" ? (
        <DatePicker
          {...props}
          defaultValue={date?.from}
          onChange={handleChangeDateToRange}
        />
      ) : (
        <RangePicker
          {...props}
          step={step}
          counter={counter}
          zone={zone}
          date={date}
          defaultValue={{ from, to }}
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
