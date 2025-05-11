import type { Dispatch } from 'react';
import React from 'react';

type TDeviceType = "desktop" | "mobile";
export interface IAdditionalElementType {
  key: string;
  label: string;
  content: React.ReactNode;
}
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
}

export interface RangeProps extends IRangeOptions {
  device: TDeviceType;
  handleReject?: () => void;
  handleSubmit?: (date?: IDate, compareDate?: IDate) => void;
  onCompareDateChange?: (date?: IDate, compareDate?: IDate) => void;
  onNavigateChange?: (date?: IDate, compareDate?: IDate) => void;
  onChange?: (date?: IDate, compareDate?: IDate) => void;
  navigation?: boolean;
}
export interface IRangeOptions {
  type?: "date" | "range";
  locale: "fa" | "en";
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
  compareDate: IDate;
  activeCompareStep: ESteps;
  setStep: Dispatch<React.SetStateAction<ESteps>>;
  setCounter: Dispatch<React.SetStateAction<number>>;
  setCompareDate: Dispatch<React.SetStateAction<IDate>>;
  setDate: Dispatch<React.SetStateAction<IDate>>;
  setActiveCompareStep: Dispatch<React.SetStateAction<ESteps>>;
  setTabKey: Dispatch<React.SetStateAction<ITime | string>>;
  setZone: Dispatch<React.SetStateAction<ITimeZone>>;
  onCompareDateChange?: (date?: IDate, compareDate?: IDate) => void;
  onNavigateChange?: (date?: IDate, compareDate?: IDate) => void;
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
}
export interface ISubmittedData {
  date: IDate;
  compareDate: IDate;
}
