import {
  useEffect,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import type {
  ESteps,
  IDate,
  IRangeProps,
  ITime,
  ITimeZone,
} from '../../core/type';
import { DesktopRangePicker } from '../../desktopRange/desktopRangePicker';
import { MobileRangePicker } from '../../mobileRange/mobileRangePicker';
import { useMediaQuery } from '../useMediaQuery';

export function RangePicker({ ...props }: Omit<IRangeProps,"locale">) {
  const {match}=useMediaQuery("XSUP")
  const {
    isOpenDropdown = false,
    additionalElement,
    calendarType = "shamsi",
    defaultValue,
    value
  } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  const isFa = locale === "fa";
 const initValue: IDate = (() => {
    if (defaultValue !== undefined) {
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
            ? moment().locale("fa").startOf("jYear").valueOf()
            : moment().utc().startOf("year").valueOf(),
          to: isFa
            ? moment().locale("fa").endOf("day").valueOf()
            : moment().utc().endOf("day").valueOf(),
        };
    }
  })();

  const [range, setRange] = useState<IDate>(initValue);
  const [compareDate, setCompareDate] = useState<IDate | null>(null);
  const [counter, setCounter] = useState(0);
  const [activeCompareStep, setActiveCompareStep] = useState<ESteps | null>(
    null
  );
  const [step, setStep] = useState<ESteps>(366);
  const [zone, setZone] = useState<ITimeZone>("manual");
  const [tabKey, setTabKey] = useState<ITime | string>("manual");
  const [open, setOpen] = useState(isOpenDropdown);





    useEffect(() => {
      if (value!== undefined) {
          setRange({
            from: isFa
              ? moment(value.from).locale("fa").startOf("day").valueOf()
              : moment(value.from).utc().startOf("day").valueOf(),
            to: isFa
              ? moment(value.to).locale("fa").endOf("day").valueOf()
              : moment(value.to).utc().endOf("day").valueOf(),
          });
       
      }
    }, [value]);
  return (
    <>
      {match ? (
        <DesktopRangePicker
          {...props}
          step={step}
          counter={counter}
          zone={zone}
          date={range}
          tabKey={tabKey}
          compareDate={compareDate}
          setCompareDate={setCompareDate}
          activeCompareStep={activeCompareStep}
          setStep={setStep}
          setCounter={setCounter}
          setDate={setRange}
          setActiveCompareStep={setActiveCompareStep}
          setTabKey={setTabKey}
          setZone={setZone}
          setOpen={setOpen}
          open={open}
          additionalElement={additionalElement}
          activeTable="manual"
          locale={locale}
        />
      ) : (
        <MobileRangePicker
          {...props}
          step={step}
          counter={counter}
          zone={zone}
          date={range}
          tabKey={tabKey}
          compareDate={compareDate}
          activeCompareStep={activeCompareStep}
          setCompareDate={setCompareDate}
          setDate={setRange}
          setActiveCompareStep={setActiveCompareStep}
          setCounter={setCounter}
          setTabKey={setTabKey}
          setStep={setStep}
          setZone={setZone}
          additionalElement={additionalElement}
          locale={locale}
          activeTable="manual"
        />
      )}
    </>
  );
}
