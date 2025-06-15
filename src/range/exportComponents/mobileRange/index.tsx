import { useMemo, useState } from "react";

import moment from "moment-jalaali";

import type {
  ESteps,
  HandleParams,
  IAdditionalElementType,
  IDate,
  IRangeOptions,
  ITime,
  ITimeZone,
} from "../../core/type";
import MobileRangePicker from "../../mobileRange/mobileRangePicker";

interface IProps {
  handleReject?: () => void;
  handleSubmit?: (date: IDate, compareDate: IDate | null) => void;
  onCompareDateChange?: IRangeOptions["onCompareDateChange"];
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  onChange?: (e: HandleParams) => void;
  isShowNavigationButton?: boolean;
  showComparison?: boolean;
  popoverClassName?: string;
  className?: string;
  additionalElement?: IAdditionalElementType[];
  defaultValue?: IDate;
  calendarType?: "shamsi" | "gregorian";
}

export function MobileRange({ ...props }: IProps) {
  const {
    additionalElement,
    defaultValue,
    calendarType = "shamsi",
    onCompareDateChange,
    onNavigateChange,
    onChange,
    isShowNavigationButton,
    showComparison,
    popoverClassName,
    className,
  } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  const initialDate: IDate = useMemo(() => {
    return {
      from:
        defaultValue && defaultValue.from > 0
          ? defaultValue.from
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

  return (
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
      onCompareDateChange={onCompareDateChange}
      onNavigateChange={onNavigateChange}
      onChange={onChange}
      isShowNavigationButton={isShowNavigationButton}
      showComparison={showComparison}
      popoverClassName={popoverClassName}
      className={className}
    />
  );
}
