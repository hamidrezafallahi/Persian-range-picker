import "./core/rangeStyle.css";

import { useState } from "react";

import type { ESteps, IDate, ITime, ITimeZone, RangeProps } from "./core/type";
import DesktopDate from "./desktopDate";
import DesktopRange from "./desktopRange";
import MobileDate from "./mobileDate";
import MobileRange from "./mobileRange";

function Range({ ...props }: RangeProps) {
  const { device, type, additionalElement, defaultValue } = props;
  const [date, setDate] = useState<IDate>(defaultValue ?? { from: 0, to: 0 });
  const [compareDate, setCompareDate] = useState<IDate>({ from: 0, to: 0 });
  const [counter, setCounter] = useState(0);
  const [activeCompareStep, setActiveCompareStep] = useState<ESteps>(366);
  const [step, setStep] = useState<ESteps>(7);
  const [zone, setZone] = useState<ITimeZone>("manual");
  const [tabKey, setTabKey] = useState<ITime | string>("manual");
  const [open, setOpen] = useState(false);

  return (
    <div className="range">
      {device == "desktop" ? (
        type == "date" ? (
          <DesktopDate model={type} {...props} />
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
          {type == "date" ? (
            <MobileDate model={type} {...props} />
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

export default Range;
