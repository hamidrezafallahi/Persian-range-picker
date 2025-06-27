import { useEffect, useState } from "react";

import moment from "moment-jalaali";

import type { ESteps, IDate, ITime, ITimeZone, RangeProps } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";
import { DesktopRangePicker } from "../../desktopRange/desktopRangePicker";
import { MobileDate } from "../../mobileDate/mobileDatePicker";
import {MobileRangePicker} from "../../mobileRange/mobileRangePicker";

export function RangePicker({ ...props }: RangeProps) {
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
    calendarType = "shamsi",
    isOpenDropdown = false,
    onChange,
  } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
 

  const [date, setDate] = useState<IDate>({
      from: locale === "fa"
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
  const handleChangeDateToRange = (e: number | object) => {
    onChange?.({ type: "date", Data: { from: e } });
  };
 useEffect(() => {
  if(defaultValue){
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
    <div className="range">
      {device == "desktop" ? (
        model == "date" ? (
          <DesktopDatePicker
            {...props}
            locale={locale}
            defaultValue={date?.from}
            onChange={handleChangeDateToRange}
          />
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
            activeTable="Year"
          />
        )
      ) : (
        <>
          {model == "date" ? (
            <MobileDate
              locale="fa"
              {...props}
              defaultValue={date?.from}
              onChange={handleChangeDateToRange}
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
              device={device}
            />
          )}
        </>
      )}
    </div>
  );
}
