import type { Dispatch, ReactNode, SetStateAction } from "react";

export type ExportType = "timeStamp" | "IsoString";
type TDeviceType = "desktop" | "mobile";
export type HandleParams = {
  type: string;
  Data?: { date: IDate; compareDate: IDate } | Record<string, unknown>;
};
export type TLocale = "fa" | "en";

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

export type TUnit = "hour" | "minute" | "second";

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

export interface IAdditionalElementType {
  key: string;
  label: string;
  content: ReactNode;
}

export interface IDateProps
  extends IColorProps,
    IClassNameProps,
    ITimeSettings,
    ITimePicker,
    MaskProps,
    IDeviceLocale {
  calendarType?: "shamsi" | "gregorian";
  defaultValue?: number;
  showMask?: boolean;
  onChange?: (e: number | string) => void;
  calendarBaseWidth?: number;
  dropdownWidth?: number;
  dropdownHeight?: number;
  exportType?: ExportType;
  isOpenDropdown?: boolean;
  disabled?: boolean;
  Style?: React.CSSProperties;
}

export interface IColorProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  tertiaryColor?: string;
  dangerColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  neutralColor?: string;
}

export interface IClassNameProps {
  className?: string;
  maskClassName?: string;
  popoverClassName?: string;
  monthPickerClassName?: string;
  tabClassName?: string;
  periodClassName?: string;
  calenderClassName?: string;
  datePickerBodyClassName?: string;
  yearPickerClassName?: string;
  datePickerHeaderClassName?: string;
  dateClassName?: string;
  periodListClassName?: string;
  chooseTodayClassName?: string;
  buttonClassName?: string;
}

export interface ITimeSettings {
  showTime?: boolean;
  showTimeFormat?: string;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
}

export interface IDeviceLocale {
  device?: TDeviceType;
  locale?: TLocale;
}

export interface RangeProps
  extends IRangeOptions,
    Omit<
      IRangeProps,
      "defaultValue" | "onChange" | "calendarType" | "device" | "isOpenDropdown"
    > {
  defaultValue?: IDate;
  onChange?: (e: HandleParams) => void;
  calendarType?: "shamsi" | "gregorian";
  isOpenDropdown?: boolean;
  device?: TDeviceType;
  handleReject?: () => void;
  handleSubmit?: (params: HandleParams) => void;
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  navigation?: boolean;
}

export interface IRangeOptions extends IColorProps, IClassNameProps {
  model?: "date" | "range";
  calendarType?: "shamsi" | "gregorian";
  isShowNavigationButton?: boolean;
  showComparison?: boolean;
  additionalElement?: IAdditionalElementType[];
  defaultValue?: IDate;
  onError?: (e: string) => void;
  onChange?: (e: HandleParams) => void;
  onCompareDateChange?: (e: HandleParams) => void;
  isOpenDropdown?: boolean;
  device?: TDeviceType;
}

export interface IBaseProps extends IRangeOptions, IDeviceLocale {
  step: ESteps;
  counter: number;
  zone: ITimeZone;
  date: IDate;
  tabKey: ITime | string;
  compareDate: IDate | null;
  activeCompareStep: ESteps | null;
  setStep: Dispatch<SetStateAction<ESteps>>;
  setCounter: Dispatch<SetStateAction<number>>;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  setDate: Dispatch<SetStateAction<IDate>>;
  setActiveCompareStep: Dispatch<SetStateAction<ESteps | null>>;
  setTabKey: Dispatch<SetStateAction<ITime | string>>;
  setZone: Dispatch<SetStateAction<ITimeZone>>;
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  componentStep?: ESteps;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  type?: string;
  setType?: Dispatch<SetStateAction<string>>;
  activeTable?: "Day" | "Week" | "Month" | "Year" | "manual";
  disabled?: boolean;
}

export interface ITimeSections {
  title?: string;
  value: { from: number; to: number };
  timeZone: ITimeZone;
  step: ESteps;
}

export interface IRangeProps extends IBaseProps, IDeviceLocale {
  handleSubmit?: RangeProps["handleSubmit"];
  handleReject?: RangeProps["handleReject"];
  label?: boolean | ReactNode | string;
  dropdownWidth?: number;
  dropdownHeight?: number;
  disabled?: boolean;
}

export interface IMobileProps
  extends IColorProps,
    ITimeSettings,
    IDeviceLocale {
  onChange?: (e: HandleParams) => void;
  defaultValue?: IDate;
  chooseTodayClassName?: string;
}

export interface MaskProps
  extends Pick<IColorProps, "tertiaryColor" | "highlightColor">,
    Pick<IClassNameProps, "maskClassName" | "className"> {
  defaultValue?: IDate["from"];
  onError?: (e: string) => void;
  onMaskChange?: (e: IDate["from"] | number | string | null) => void;
  calendarType?: "shamsi" | "gregorian";
  inputClassName?: string;
  suffix?: ReactNode | boolean;
  prefix?: ReactNode | boolean;
  maskHeight?: number;
  maskFontSize?: number;
  ErrorClass?: string;
  dir?: "ltr" | "rtl";
  autoComplete?: "on" | "off";
  disabled?: boolean;
  maskPlaceHolder?: string;
  isTodaySelectPreset?: boolean;
  exportType?: ExportType;
}

export interface ITimePicker extends IClassNameProps {
  defaultValue?: number;
  calendarType?: "shamsi" | "gregorian";
  onChange?: (e: number | string) => void;
  containerClassName?: string;
  okButtonClassName?: string;
  nowButtonClassName?: string;
  timeButtonClassName?: string;
  width?: number;
  height?: number;
  displayButtonCount?: number;
  icon?: ReactNode | null;
  tertiaryColor?: string;
  highlightColor?: string;
  format?: string;
  showNow?: boolean;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabled?: boolean;
  exportType?: ExportType;
}
export interface ISubmittedData {
  date: IDate;
  compareDate: IDate | null;
  Data: unknown;
}
export interface IRangePickerProps
  extends Omit<IRangeOptions, "defaultValue" | "onChange">,
    Omit<IDateProps, "defaultValue" | "onChange">,
    IDeviceLocale {
  handleSubmit?: RangeProps["handleSubmit"];
  handleReject?: RangeProps["handleReject"];
  label?: boolean | ReactNode | string;
  dropdownWidth?: number;
  dropdownHeight?: number;
  disabled?: boolean;
  onNavigateChange?: (date: IDate, compareDate: IDate | null) => void;
  componentStep?: ESteps;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  type?: string;
  setType?: Dispatch<SetStateAction<string>>;
  activeTable?: "Day" | "Week" | "Month" | "Year" | "manual";
  defaultValue?: IDate;
  onChange?: (e: HandleParams) => void;
}
export interface IDatePickerProps extends IDate {}
export interface IMaskProps extends IDate {}
export interface ITimePickerProps extends IDate {}
