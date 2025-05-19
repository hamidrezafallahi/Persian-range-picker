import { useMemo, useState } from "react";

import moment from "moment-jalaali";

import type {
  ESteps,
  IAdditionalElementType,
  IDate,
  ITime,
  ITimeZone,
  TLocale,
} from "../../core/type";
import MobileRangePicker from "../../mobileRange/mobileRangePicker";

interface IProps {
  handleReject?: () => void;
  handleSubmit?: (date: IDate, compareDate: IDate | null) => void;
  onCompareDateChange?: (date: IDate, compareDate: IDate) => void;
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  onChange?: (date: IDate, compareDate?: IDate | undefined | null) => void;
  isShowNavigationButton?: boolean;
  isShowComparison?: boolean;
  popoverClassName?: string;
  className?: string;
  additionalElement?: IAdditionalElementType[];
  defaultValue?: IDate;
  locale?: TLocale;
}

export function MobileRange({ ...props }: IProps) {
  const {
    additionalElement,
    defaultValue,
    locale = "fa",
    onCompareDateChange,
    onNavigateChange,
    onChange,
    isShowNavigationButton,
    isShowComparison,
    popoverClassName,
    className,
  } = props;
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
      isShowComparison={isShowComparison}
      popoverClassName={popoverClassName}
      className={className}
    />
  );
}
