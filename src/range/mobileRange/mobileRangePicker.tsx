import {
  useEffect,
  useRef,
} from 'react';

import moment from 'moment-jalaali';

import { period } from '../core/helper';
import MainContent from '../core/mainContent';
import NavigateButton from '../core/navigateButton';
import type { IBaseProps } from '../core/type';
import { CalenderIcon } from '../icons/CalenderIcon';
import { MenuArrowBack } from '../icons/MenuArrowBack';

const MobileRangePicker = (props: IBaseProps) => {
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
    locale = "fa",
    className,
    model = "range",
    device,
  } = props;
  const compareDateDidMountRef = useRef(false);
  const counterDidMountRef = useRef(false);
  const templatePeriods = period(date, locale, zone);
  useEffect(() => {
    if (compareDateDidMountRef.current) {
      if (onCompareDateChange && compareDate) {
        onCompareDateChange(date, compareDate);
      }
      if (onChange && (date || compareDate)) {
        onChange(date, compareDate);
      }
    } else {
      compareDateDidMountRef.current = true;
    }
  }, [compareDate]);

  useEffect(() => {
    if (counterDidMountRef.current) {
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
    } else {
      counterDidMountRef.current = true;
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
          {date && moment(date.from as number).format("jYYYY/jMM/jDD")}
        </div>
        <div className="text-gray-gray8 text-center">{"-"}</div>
        <div className="w-fit text-gray-gray8 text-center">
          {date && moment(date.to as number).format("jYYYY/jMM/jDD")}
        </div>
      </button>
      {zone !== "manual" && isShowNavigationButton && (
        <NavigateButton
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
          date={date}
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
          device={device}
        />
      </div>
    </div>
  );
};
export default MobileRangePicker;
