import { type ReactNode, useMemo, useState } from "react";

import moment from "moment-jalaali";

import type {
  ESteps,
  HandleParams,
  IAdditionalElementType,
  IDate,
  ITime,
  ITimeZone,
  RangeProps,
} from "../../core/type";
import { DesktopRangePicker } from "../../desktopRange/desktopRangePicker";

interface IDesktopRangeProps {
  handleSubmit?: RangeProps["handleSubmit"];
  handleReject?: () => void;
  onChange?: (e: HandleParams) => void;
  onCompareDateChange?: (e: HandleParams) => void;
  defaultValue?: IDate;
  isShowNavigationButton?: boolean;
  additionalElement?: IAdditionalElementType[]; //=====================================================================
  showComparison?: boolean;
  primaryColor?: string;
  backgroundColor?: string;
  tertiaryColor?: string;
  dateClassName?: string;
  calendarType?: "shamsi" | "gregorian";
  onError?: (e: string) => void;
  buttonClassName?: string;
  label?: {
    isShowLabel: boolean;
    label: ReactNode;
  };
}
export function DesktopRange(props: IDesktopRangeProps) {
  const {
    handleSubmit,
    handleReject,
    onChange,
    onCompareDateChange,
    defaultValue,
    additionalElement,
    isShowNavigationButton = true,
    showComparison = false,
    primaryColor = "#000",
    backgroundColor = "#fff",
    tertiaryColor = "#939393",
    dateClassName,
    calendarType = "shamsi",
    onError,
    buttonClassName,
    label = {
      isShowLabel: true,
      label: (
        <label
          className="text-xs"
          style={{
            color: tertiaryColor,
          }}
        >
          {props.label?.label ??
            (calendarType === "gregorian" ? "Date" : "تاریخ")}
        </label>
      ),
    },
  } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  const device = "desktop";
  const model = "range";

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
  const [open, setOpen] = useState(false);
  return (
    <DesktopRangePicker
      activeCompareStep={activeCompareStep}
      showComparison={showComparison}
      setActiveCompareStep={setActiveCompareStep}
      compareDate={compareDate}
      counter={counter}
      date={date}
      device={device}
      open={open}
      setCounter={setCounter}
      setDate={setDate}
      setOpen={setOpen}
      step={step}
      setStep={setStep}
      setTabKey={setTabKey}
      tabKey={tabKey}
      model={model}
      zone={zone}
      setZone={setZone}
      setCompareDate={setCompareDate}
      isShowNavigationButton={isShowNavigationButton}
      primaryColor={primaryColor}
      backgroundColor={backgroundColor}
      tertiaryColor={tertiaryColor}
      dateClassName={dateClassName}
      locale={locale}
      onError={onError}
      buttonClassName={buttonClassName}
      label={label}
      additionalElement={additionalElement}
      handleSubmit={handleSubmit}
      handleReject={handleReject}
      onChange={onChange}
      onCompareDateChange={onCompareDateChange}
    />
  );
}
