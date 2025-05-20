import {
  useMemo,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import type {
  ESteps,
  IDate,
  ITime,
  ITimeZone,
  RangeProps,
} from './core/type';
import { DesktopDatePicker } from './desktopDate/desktopDatePicker';
import { DesktopRangePicker } from './desktopRange/desktopRangePicker';
// import { DesktopRange } from "./desktopRange/desktopRangePicker";
import MobileDatePicker from './mobileDate/mobileDatePicker';
import MobileRangePicker from './mobileRange/mobileRangePicker';

export function Range({ ...props }: RangeProps) {
  const userAgent = navigator.userAgent;
  const deviceType =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      userAgent
    )
      ? "mobile"
      : "desktop";
  const {
    device = deviceType,
    model = "range",
    additionalElement,
    defaultValue,
    locale = "fa",
  } = props;
  const initialDate: IDate = useMemo(() => {
    return {
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
    };
  }, [defaultValue]);
  const [date, setDate] = useState<IDate>(initialDate);
  const [compareDate, setCompareDate] = useState<IDate | null>(null);
  const [counter, setCounter] = useState(0);
  const [activeCompareStep, setActiveCompareStep] = useState<ESteps | null>(
    null
  );
  const [step, setStep] = useState<ESteps>(366);
  const [zone, setZone] = useState<ITimeZone>("manual");
  const [tabKey, setTabKey] = useState<ITime | string>("manual");
  const [open, setOpen] = useState(false);
  return (
    <div className="range" dir="rtl">
      {device == "desktop" ? (
        model == "date" ? (
          <DesktopDatePicker {...props} model={model} locale={locale} />
        ) : (
          <DesktopRangePicker
            {...props}
            device={device}
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
          />
        )
      ) : (
        <>
          {model == "date" ? (
            <MobileDatePicker {...props} model={model} locale={locale} />
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
              device={device}
            />
          )}
        </>
      )}
    </div>
  );
}
