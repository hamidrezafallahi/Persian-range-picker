import { useEffect, useRef, useState } from "react";

import moment from "moment-jalaali";

import MainContent from "../core/mainContent";
import NavigateButton from "../core/navigateButton";
import type { IBaseProps } from "../core/type";
import { CalenderIcon } from "../icons/CalenderIcon";
import { MenuArrowBack } from "../icons/MenuArrowBack";

const MobileRangePicker = (props: IBaseProps) => {
  const {
    onCompareDateChange,
    onChange,
    step,
    counter,
    zone,
    date,
    compareDate,
    activeCompareStep,
    setCompareDate,
    setDate,
    setActiveCompareStep,
    setCounter,
    setTabKey,
    setStep,
    setZone,
    isShowNavigationButton = true,
    popoverClassName = "",
    locale = "fa",
    className,
    device,
  } = props;
  const [type, setType] = useState<string>("date");
  const [customData, setCustomData] = useState<unknown>(null);
  const isInitialRender = useRef(true);
  const prevDate = useRef(date);
  const prevCompareDate = useRef(compareDate);

  useEffect(() => {
    const hasCompareDateChanged =
      compareDate?.from !== prevCompareDate.current?.from ||
      compareDate?.to !== prevCompareDate.current?.to;
    if (onCompareDateChange && compareDate && hasCompareDateChanged) {
      onCompareDateChange({ type: "date", Data: { date, compareDate } });
    }
    prevCompareDate.current = compareDate;

    const hasDateChanged =
      date?.from !== prevDate.current?.from ||
      date?.to !== prevDate.current?.to;

    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else if (hasDateChanged && onChange) {
      const isEmpty = !date && !compareDate;
      const isInvalidDateTo = date?.to == null || Number.isNaN(date?.to);
      const isInvalid = date?.from && isInvalidDateTo;

      if (!(isEmpty || isInvalid)) {
        onChange({ type, Data: { date, compareDate } });
      }
    }

    prevDate.current = date;
  }, [date, compareDate]);
  useEffect(() => {
    if (customData) {
      onChange?.({ type, Data: { date, data: customData } });
    }
  }, [customData]);
  return (
    <div className="range">
      <div className={`flex ${className}`}>
        <button
          popoverTarget="mobileRangeModal"
          className="flex justify-center items-center gap-2 w-full sm:w-fit"
        >
          <CalenderIcon />
          <div className="w-fit text-gray-gray8 text-center">
            {date && moment(date.from as number).format("jYYYY/jMM/jDD")}
          </div>
          <div className="text-gray-gray8 text-center">{"-"}</div>
          <div className="w-fit text-gray-gray8 text-center">
            {date && moment(date.to as number).format("jYYYY/jMM/jDD")}
          </div>
        </button>
        {zone !== "manual" && isShowNavigationButton && (
          <NavigateButton
            compareDate={compareDate}
            setDate={setDate}
            setCompareDate={setCompareDate}
            step={step}
            zone={zone}
            date={date}
            setActiveCompareStep={setActiveCompareStep}
            activeCompareStep={activeCompareStep}
            counter={counter}
            setCounter={setCounter}
            setTabKey={setTabKey}
            setStep={setStep}
            setZone={setZone}
            locale={locale}
          />
        )}

        <div
          popover="auto"
          id="mobileRangeModal"
          className={`w-full h-full ${popoverClassName} border-none`}
        >
          <div className="flex gap-1" dir={locale == "fa" ? "rtl" : "ltr"}>
            <button
              popoverTarget="mobileRangeModal"
              className="flex justify-center items-center gap-2 font-IRANSans font-extrabold !text-black-black3 text-base whitespace-nowrap"
            >
              <MenuArrowBack />
              <span>{locale == "fa" ? "تاریخ" : "Date"}</span>
            </button>
          </div>
          <MainContent
            {...props}
            model="range"
            locale={locale}
            device={device}
            setCustomData={setCustomData}
            setType={setType}
          />
        </div>
      </div>
    </div>
  );
};
export default MobileRangePicker;
