import type {
  Dispatch,
  ReactNode,
} from 'react';
import React from 'react';

type TDeviceType = "desktop" | "mobile";
export interface IAdditionalElementType {
  key: string;
  label: string;
  content: React.ReactNode;
}
export type TLocale = "fa" | "en";
export interface IDateProps {
  primaryColor?: string;
  dangerColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  tertiaryColor?: string;
  model: "date" | "range";
  locale: IRangeOptions["locale"];
  defaultValue?: IDate;
  onChange?: (date: IDate, compareDate?: IDate) => void;
  className?: string;
  dropdownWidth?: number;
  dropdownHeight?: number;
}

export interface RangeProps extends IRangeOptions {
  device?: TDeviceType;
  handleReject?: () => void;
  handleSubmit?: (date: IDate, compareDate: IDate | null) => void;
  onCompareDateChange?: (date: IDate, compareDate: IDate) => void;
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  onChange?: (date: IDate, compareDate?: IDate | undefined | null) => void;
  navigation?: boolean;
}
export interface IRangeOptions {
  model?: "date" | "range";
  locale?: TLocale;
  isShowNavigationButton?: boolean;
  isShowComparison?: boolean;
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
  onCompareDateChange?: (date: IDate, compareDate: IDate) => void;
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  onChange?: RangeProps["onChange"];
  componentStep?: ESteps;
  open?: boolean;
  setOpen?: Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}
export enum ESteps {
  "day" = 1,
  "week" = 7,
  "month" = 30,
  "season" = 90,
  "year" = 365,
  "manual",
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
  | "manual";

export type ITime = "Day" | "Week" | "Month" | "ThreeMonth" | "Year" | "manual";

export interface ITimeSections {
  title?: string;
  value: { from: number; to: number };
  timeZone: ITimeZone;
  step: ESteps;
}
export interface IDesktopProps extends IBaseProps {
  handleSubmit?: RangeProps["handleSubmit"];
  handleReject?: RangeProps["handleReject"];
  onChange?: RangeProps["onChange"];
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
}
