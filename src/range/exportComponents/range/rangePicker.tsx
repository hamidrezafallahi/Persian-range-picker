import { useState } from 'react';

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

export function RangePicker({ ...props }: IRangeProps) {

const {match}=useMediaQuery("XSUP")

  const {
    isOpenDropdown = false,
    additionalElement,
    calendarType = "shamsi",
  } = props;


  const locale = calendarType == "shamsi" ? "fa" : "en";
  const [date, setDate] = useState<IDate>({
    from:
      locale === "fa"
        ? moment().locale("fa").startOf("jYear").valueOf()
        : moment().locale("en").startOf("year").valueOf(),
    to: moment().locale(locale).startOf("day").valueOf(),
  });
  const [compareDate, setCompareDate] = useState<IDate | null>(null);
  const [counter, setCounter] = useState(0);
  const [activeCompareStep, setActiveCompareStep] = useState<ESteps | null>(
    null
  );
  const [step, setStep] = useState<ESteps>(366);
  const [zone, setZone] = useState<ITimeZone>("manual");
  const [tabKey, setTabKey] = useState<ITime | string>("manual");
  const [open, setOpen] = useState(isOpenDropdown);
  return (
    <>
      {match ? (
        <DesktopRangePicker
          {...props}
          step={step}
          counter={counter}
          zone={zone}
          date={date}
          tabKey={tabKey}
          compareDate={compareDate}
          setCompareDate={setCompareDate}
          activeCompareStep={activeCompareStep}
          setStep={setStep}
          setCounter={setCounter}
          setDate={setDate}
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
          locale={locale}
          activeTable="manual"
        />
      )}
    </>
  );
}
