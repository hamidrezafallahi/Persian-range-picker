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
  // maskClassName?: string;
  // buttonClassName?: string;
  // calenderClassName?: string;
  // chooseTodayClassName?: string;
  // dateClassName?: string;
  // datePickerBodyClassName?: string;
  // datePickerHeaderClassName?: string;
  // periodListClassName?: string;
  // popoverClassName?: string;
  // monthPickerClassName?: string;
  // additionalElement?: IAdditionalElementType[];
  // dangerColor?: string;
  // backgroundColor?: string;
  // secondaryColor?: string;
  // yearPickerClassName?: string;
  // tabClassName?: string;
  // model?: "date" | "range";
  // locale?: TLocale;
  // defaultValue?: IDate;
  // onError?: (e: string) => void;
  // primaryColor?: string;
  // isShowNavigationButton?: boolean;
  // isShowComparison?: boolean;
  // key?: ITime | string;
  // zone: ITimeZone;
  // neutralColor?: string;
  // highlightColor?: string;
  // accentColor?: string;
  // tertiaryColor?: string;
  // step: ESteps;
  // counter: number;
  // date: IDate;
  // tabKey: ITime | string;
  // compareDate: IDate | null;
  // activeCompareStep: ESteps | null;
  // setStep: Dispatch<React.SetStateAction<ESteps>>;
  // setCounter: Dispatch<React.SetStateAction<number>>;
  // setCompareDate: Dispatch<React.SetStateAction<IDate | null>>;
  // setDate: Dispatch<React.SetStateAction<IDate>>;
  // setActiveCompareStep: Dispatch<React.SetStateAction<ESteps | null>>;
  // setTabKey: Dispatch<React.SetStateAction<ITime | string>>;
  // setZone: Dispatch<React.SetStateAction<ITimeZone>>;
  // onCompareDateChange?: (date: IDate, compareDate: IDate) => void;
  // onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  // onChange?: RangeProps["onChange"];
  // componentStep?: ESteps;
  // open?: boolean;
  // setOpen?: Dispatch<React.SetStateAction<boolean>>;
  // className?: string;
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
  // const {
  //   monthPickerClassName,
  //   activeCompareStep,
  //   compareDate,
  //   counter,
  //   date,
  //   setActiveCompareStep,
  //   setCompareDate,
  //   setCounter,
  //   setDate,
  //   setStep,
  //   setTabKey,
  //   step,
  //   setZone,
  //   tabKey,
  //   accentColor,
  //   additionalElement,
  //   backgroundColor,
  //   buttonClassName,
  //   calenderClassName,
  //   chooseTodayClassName,
  //   className,
  //   dangerColor,
  //   dateClassName,
  //   datePickerBodyClassName,
  //   datePickerHeaderClassName,
  //   defaultValue,
  //   highlightColor,
  //   locale,
  //   maskClassName,
  //   model,
  //   neutralColor,
  //   onChange,
  //   onCompareDateChange,
  //   onError,
  //   onNavigateChange,
  //   open,
  //   periodListClassName,
  //   popoverClassName,
  //   secondaryColor,
  //   setOpen,
  //   tabClassName,
  //   tertiaryColor = "#939393", // رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر - رنگ متن
  //   yearPickerClassName,
  //   componentStep,
  //   primaryColor = "#000",
  //   isShowNavigationButton,
  //   isShowComparison,
  //   key,
  //   zone,
  // } = props;

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
  const [step, setStep] = useState<ESteps>(7);
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
    // <MobileRangePicker
    //   componentStep={componentStep}
    //   activeCompareStep={activeCompareStep}
    //   compareDate={compareDate}
    //   counter={counter}
    //   date={date}
    //   setActiveCompareStep={setActiveCompareStep}
    //   setCompareDate={setCompareDate}
    //   setCounter={setCounter}
    //   setDate={setDate}
    //   setStep={setStep}
    //   setTabKey={setTabKey}
    //   step={step}
    //   setZone={setZone}
    //   tabKey={tabKey}
    //   zone={zone}
    //   accentColor={accentColor}
    //   additionalElement={additionalElement}
    //   backgroundColor={backgroundColor}
    //   buttonClassName={buttonClassName}
    //   calenderClassName={calenderClassName}
    //   chooseTodayClassName={chooseTodayClassName}
    //   className={className}
    //   dangerColor={dangerColor}
    //   dateClassName={dateClassName}
    //   datePickerBodyClassName={datePickerBodyClassName}
    //   datePickerHeaderClassName={datePickerHeaderClassName}
    //   defaultValue={defaultValue}
    //   highlightColor={highlightColor}
    //   isShowComparison={isShowComparison}
    //   isShowNavigationButton={isShowNavigationButton}
    //   locale={locale}
    //   maskClassName={maskClassName}
    //   model={model}
    //   monthPickerClassName={monthPickerClassName}
    //   neutralColor={neutralColor}
    //   onChange={onChange}
    //   onCompareDateChange={onCompareDateChange}
    //   onError={onError}
    //   onNavigateChange={onNavigateChange}
    //   open={open}
    //   periodClassName={periodListClassName}
    //   periodListClassName={periodListClassName}
    //   popoverClassName={popoverClassName}
    //   primaryColor={primaryColor}
    //   secondaryColor={secondaryColor}
    //   setOpen={setOpen}
    //   tabClassName={tabClassName}
    //   tertiaryColor={tertiaryColor}
    //   yearPickerClassName={yearPickerClassName}
    // />
  );
}
