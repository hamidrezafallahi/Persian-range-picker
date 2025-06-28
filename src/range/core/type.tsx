import type { Dispatch, ReactNode, SetStateAction } from "react";
import React from "react";

// type ContentWithOnChange = {
//   onChange: (e: React.ChangeEvent<any>) => void;
// };

// type MyComponentProps = {
//   content: React.ComponentType<ContentWithOnChange>;
// };
type TDeviceType = "desktop" | "mobile";
export interface IAdditionalElementType {
  key: string;
  label: string;
  content: ReactNode;
  // content: MyComponentProps;
}
export type TLocale = "fa" | "en";
export interface IDateProps {
  calendarType?: "shamsi" | "gregorian";
  primaryColor?: string;
  dangerColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  tertiaryColor?: string;
  locale: TLocale;
  defaultValue?: number;
  onChange?: (e: number | object) => void;
  className?: string;
  calendarBaseWidth?: number;
  dropdownWidth?: number;
  dropdownHeight?: number;
  showTime?: boolean;
  chooseTodayClassName?: string;
  showTimeFormat?: string;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  exportType?: ExportType;
}

export type HandleParams = {
  type: string;
  Data?: { date: IDate; compareDate: IDate } | Record<string, unknown>;
};
export interface RangeProps extends IRangeOptions {
  device?: TDeviceType;
  handleReject?: () => void;
  handleSubmit?: (params: HandleParams) => void;
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  navigation?: boolean;
  isOpenDropdown?: boolean;
}
export interface IRangeOptions {
  model?: "date" | "range";
  calendarType?: "shamsi" | "gregorian";
  isShowNavigationButton?: boolean;
  showComparison?: boolean;
  primaryColor?: string;
  dangerColor?: string;
  backgroundColor?: string;
  neutralColor?: string;
  highlightColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  tertiaryColor?: string;
  maskClassName?: string;
  popoverClassName?: string;
  monthPickerClassName?: string;
  tabClassName?: string;
  additionalElement?: IAdditionalElementType[];
  defaultValue?: IDate;
  periodClassName?: string;
  calenderClassName?: string;
  datePickerBodyClassName?: string;
  yearPickerClassName?: string;
  datePickerHeaderClassName?: string;
  dateClassName?: string;
  periodListClassName?: string;
  chooseTodayClassName?: string;
  onError?: (e: string) => void;
  className?: string;
  buttonClassName?: string;
  device?: "desktop" | "mobile";
  onChange?: (e: HandleParams) => void;
  onCompareDateChange?: (e: HandleParams) => void;
}
export interface IBaseProps extends IRangeOptions {
  neutralColor?: string;
  highlightColor?: string;
  accentColor?: string;
  tertiaryColor?: string;
  step: ESteps;
  counter: number;
  zone: ITimeZone;
  date: IDate;
  tabKey: ITime | string;
  compareDate: IDate | null;
  activeCompareStep: ESteps | null;
  setStep: Dispatch<React.SetStateAction<ESteps>>;
  setCounter: Dispatch<React.SetStateAction<number>>;
  setCompareDate: Dispatch<React.SetStateAction<IDate | null>>;
  setDate: Dispatch<React.SetStateAction<IDate>>;
  setActiveCompareStep: Dispatch<React.SetStateAction<ESteps | null>>;
  setTabKey: Dispatch<React.SetStateAction<ITime | string>>;
  setZone: Dispatch<React.SetStateAction<ITimeZone>>;
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  componentStep?: ESteps;
  open?: boolean;
  setOpen?: Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  type?: "date" | string;
  setType?: Dispatch<SetStateAction<string>>;
  activeTable?: "Day" | "Week" | "Month" | "Year" | "manual";
}
export enum ESteps {
  "day" = 1,
  "week" = 7,
  "month" = 30,
  "season" = 90,
  "year" = 365,
  "manual",
  "custom",
}
export interface IDate {
  from: number;
  to: number;
}
export type ITimeZone =
  | "today"
  | "yesterday"
  | "thisWeek"
  | "lastWeek"
  | "last7Days"
  | "7DayAgo"
  | "thisMonth"
  | "lastMonth"
  | "last30Days"
  | "1MonthAgo"
  | "lastThreeMonth"
  | "threeMonthsAgo"
  | "thisYear"
  | "lastYear"
  | "oneYearAgo"
  | "manual"
  | string;

export type ITime =
  | "Day"
  | "Week"
  | "Month"
  | "ThreeMonth"
  | "Year"
  | "manual"
  | string;

export interface ITimeSections {
  title?: string;
  value: { from: number; to: number };
  timeZone: ITimeZone;
  step: ESteps;
}
export interface IDesktopRangeProps extends IBaseProps {
  handleSubmit?: RangeProps["handleSubmit"];
  handleReject?: RangeProps["handleReject"];
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  buttonClassName?: string;
  showLabel?: boolean;
  device?: "desktop" | "mobile";
  label?: {
    isShowLabel?: boolean;
    label?: ReactNode;
  };
  dropdownWidth?: number;
  dropdownHeight?: number;
}
export interface ISubmittedData {
  date: IDate;
  compareDate: IDate | null;
  Data: unknown;
}
export type TUnit = "hour" | "minute" | "second";
export interface IMobileProps {
  onChange?: (e: HandleParams) => void;
  defaultValue?: IDate;
  locale?: TLocale;
  tertiaryColor?: string;
  highlightColor?: string;
  primaryColor?: string;
  chooseTodayClassName?: string;
  showTime?: boolean;
  showTimeFormat?: string;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showSecond?: boolean;
  dangerColor?: string;
  backgroundColor?: string;
  neutralColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}
export type ExportType = "timeStamp" | "date";
