import { useMemo, useState } from "react";

import moment from "moment-jalaali";

import type { ESteps, IDate, ITime, ITimeZone, RangeProps } from "./core/type";
import { DesktopDate } from "./desktopDate/desktopDatePicker";
import { DesktopRange } from "./desktopRange/desktopRangePicker";
import { MobileDate } from "./mobileDate/mobileDatePicker";
import { MobileRange } from "./mobileRange/mobileRangePicker";

export function Range({ ...props }: RangeProps) {
  const { device, model, additionalElement, defaultValue, locale } = props;
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
  const [compareDate, setCompareDate] = useState<IDate>({ from: 0, to: 0 });
  const [counter, setCounter] = useState(0);
  const [activeCompareStep, setActiveCompareStep] = useState<ESteps>(366);
  const [step, setStep] = useState<ESteps>(7);
  const [zone, setZone] = useState<ITimeZone>("manual");
  const [tabKey, setTabKey] = useState<ITime | string>("manual");
  const [open, setOpen] = useState(false);

  return (
    <div className="range" dir="rtl">
      {device == "desktop" ? (
        model == "date" ? (
          <DesktopDate model={model} {...props} />
        ) : (
          <DesktopRange
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
          />
        )
      ) : (
        <>
          {model == "date" ? (
            <MobileDate model={model} {...props} />
          ) : (
            <MobileRange
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
      )}
    </div>
  );
}
