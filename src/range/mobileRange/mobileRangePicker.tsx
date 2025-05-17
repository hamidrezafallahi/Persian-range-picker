import { useEffect, useMemo } from "react";

import moment from "moment-jalaali";

import { period } from "../core/helper";
import MainContent from "../core/mainContent";
import NavigateButton from "../core/navigateButton";
import type { IBaseProps, IDate } from "../core/type";
import { CalenderIcon } from "../icons/CalenderIcon";
import { MenuArrowBack } from "../icons/MenuArrowBack";

export function MobileRange(props: IBaseProps) {
  const {
    onCompareDateChange,
    onNavigateChange,
    onChange,
    step,
    counter,
    zone,
    date,
    tabKey,
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
    isShowComparison = true,
    popoverClassName = "",
    additionalElement,
    locale,
    className,
    model,
  } = props;
  const initialDate: IDate = useMemo(() => {
    return {
      from:
        date && date.from > 0
          ? date.from
          : locale === "fa"
          ? moment().locale("fa").startOf("jYear").valueOf()
          : moment().locale("en").startOf("year").valueOf(),
      to:
        date && date.to > 0
          ? date.to
          : moment().locale(locale).startOf("day").valueOf(),
    };
  }, [date]);

  const templatePeriods = period(initialDate, locale, zone);
  useEffect(() => {
    if (onChange && (date || compareDate)) {
      onChange(date, compareDate);
    }
  }, [initialDate]);
  useEffect(() => {
    if (onCompareDateChange && compareDate) {
      onCompareDateChange(date, compareDate);
    }
    if (onChange && (date || compareDate)) {
      onChange(date, compareDate);
    }
  }, [compareDate]);

  useEffect(() => {
    if (onNavigateChange && (date || compareDate)) {
      const temp = templatePeriods.find(
        (item) => item.step == activeCompareStep
      )?.value;
      if (temp) {
        setCompareDate({ from: temp.from, to: temp.to });
      }
      if (activeCompareStep) {
        onNavigateChange(date, {
          from: temp ? temp.from : 0,
          to: temp ? temp.to : 0,
        });
      } else {
        onNavigateChange(date, compareDate);
      }
    }
    if (onChange && (date || compareDate)) {
      onChange(date, compareDate);
    }
  }, [counter]);

  return (
    <div className={`flex ${className}`}>
      <button
        popoverTarget="mobileRangeModal"
        className="flex justify-center items-center gap-2 w-fit"
      >
        <CalenderIcon />
        <div className="w-fit text-gray-gray8 text-center">
          {initialDate &&
            moment(initialDate.from as number).format("jYYYY/jMM/jDD")}
        </div>
        <div className="text-gray-gray8 text-center">{"-"}</div>
        <div className="w-fit text-gray-gray8 text-center">
          {initialDate &&
            moment(initialDate.to as number).format("jYYYY/jMM/jDD")}
        </div>
      </button>
      {zone !== "manual" && isShowNavigationButton && (
        <NavigateButton
          setDate={setDate}
          setCompareDate={setCompareDate}
          step={step}
          zone={zone}
          date={initialDate}
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
        className={`w-full h-full ${popoverClassName} `}
      >
        <div className="flex gap-1">
          <button
            popoverTarget="mobileRangeModal"
            className="flex justify-center items-center gap-2 font-IRANSans font-extrabold !text-black-black3 text-base whitespace-nowrap"
          >
            <MenuArrowBack />
            <span>{locale == "fa" ? "تاریخ" : "Date"}</span>
            {/* <div className="w-fit text-gray-gray8 text-center">
              {moment(showDate.from as any).format("jYYYY/jMM/jDD")}
            </div>
            <div className="text-gray-gray8 text-center">{"-"}</div>
            <div className="w-fit text-gray-gray8 text-center">
              {moment(showDate.to as any).format("jYYYY/jMM/jDD")}
            </div> */}
          </button>
          {/* <NavigateButton {...props} /> */}
        </div>
        <MainContent
          model={model}
          locale={locale}
          compareDate={compareDate}
          setDate={setDate}
          date={initialDate}
          setStep={setStep}
          setZone={setZone}
          step={step}
          zone={zone}
          setCompareDate={setCompareDate}
          activeCompareStep={activeCompareStep}
          setActiveCompareStep={setActiveCompareStep}
          counter={counter}
          setCounter={setCounter}
          setTabKey={setTabKey}
          tabKey={tabKey}
          isShowComparison={isShowComparison}
          additionalElement={additionalElement}
          calenderClassName=""
        />
      </div>
    </div>
  );
}
