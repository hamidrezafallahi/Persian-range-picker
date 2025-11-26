import type {
  ReactNode,
  RefObject,
} from 'react';

import type {
  IDate,
  TLocale,
} from '../core/type';
import { CalendarViews } from './enum';

export type DateValue =
  | IDate                 // RANGE
  | number  
  | string              // Single date
  | number[]
  | string[]
  |null;             // Multiple date
export type ExportType = "timeStamp" | "IsoString";
export type CalendarType = "jalali" | "gregorian";
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

export interface CalendarProps2 extends IColorProps {
  manualContainerRef?: RefObject<HTMLDivElement | null>;
  onChange?: (e:DateValue) => void;
  model?: "range" | "date";
  value?:DateValue;
  defaultValue?: DateValue;
  locale?: TLocale;
  disablePreviousDays?: boolean;
  renderDayFn?: (
    day: { timestamp: number; currentMonth: boolean },
    index: number
  ) => ReactNode;
  renderDayStyle?: (args: {
    timestamp?: number;
    isSpecial?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isToday?: boolean;
    isInRange?: boolean;
    isFrom?: boolean;
    isTo?: boolean;
  }) => React.CSSProperties;
  renderColStyle?: (args: {
    isSelectedCol: boolean;
    name: string;
    index: number;
  }) => React.CSSProperties;
  renderDayContent?: (info: {
    day: string | number;
    timestamp: number;
    isSpecial: boolean;
  }) => ReactNode;
  selectableCols?: boolean;
  renderColContent?: (info: {
    isSelectedCol: boolean;
    name: string;
  }) => ReactNode;
  WeekHeaderClassName?: string;
  WeekHeaderStyle?: React.CSSProperties;
  specialDays?: number[];
  disabledDays?: number[];
 
  calendarBaseWidth?: number;
  containerClassName?: string;
  datePickerHeaderClassName?: string;
  datePickerBodyClassName?: string;
  yearPickerClassName?: string;
  selectMultiple?: boolean;
  exportType?: ExportType;
  calendarType?: CalendarType;

  // onDateChange?: (e: IDate) => void;
  // tabIndex?: number;
  // inputClassName?: string;
  // name?: string;
  // calenderClassName?: string;
  // label?: string;
  // onClear?: () => void;
  // padding?: string;
  // disabled?: boolean;
  // chooseTodayClassName?: string;
  // accentColor?: string;
  // neutralColor?: string;

}

export interface DesktopProps2 extends CalendarProps2, ITimePickerProps {
  showTime?:boolean
  chooseTodayClassName?:string
  showTimeFormat?:string
  isOpenDropdown?:boolean
  showMask?:boolean
  allowClear?:boolean
  onClear?:()=>void
}


export interface ITimePickerProps extends IColorProps {
  className?: string
  Style?: React.CSSProperties;
  containerClassName?: string;
  okButtonClassName?: string;
  nowButtonClassName?: string;
  timeButtonClassName?: string;
  displayButtonCount?: number;
  icon?: ReactNode | null;
  format?: string;
  showNow?: boolean;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabled?: boolean;
  exportType?: ExportType;
  placeholder?: string | ReactNode | boolean

}

export interface IMaskProps extends IColorProps {
  maskClassName?:string
  defaultValue?: DateValue;
  value?:DateValue;
  onError?: (e: string) => void;
  onMaskChange?: (e: DateValue) => void;
  calendarType?: CalendarType
  inputClassName?: string;
  suffix?: ReactNode | boolean;
  prefix?: ReactNode | boolean;
  maskHeight?: number;
  MaskFontStyle?: Pick<
    React.CSSProperties,
    "fontFamily" | "fontSize" | "color"
  >;
  ErrorClass?: string;
  allowClear?: boolean;
  onClear?: () => void
  dir?: "ltr" | "rtl";

  disabled?: boolean;
  maskPlaceHolder?: string;
  isTodaySelectPreset?: boolean;
  exportType?: ExportType;
  Style?: React.CSSProperties;

}
export interface DesktopTimePickerProps extends IColorProps {
  defaultValue?: number;
  calendarType?: CalendarType
  containerClassName?: string;
  displayButtonCount?: number;
  format?: string;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  onGetValue?: (e: number) => void;
  onChange?: (e: number) => void;
  showSecond?: boolean;
}
 

export type CalendarAction =
  { type: "SET_FROM"; payload: number | null }
  | { type: "SET_TO"; payload: number | null }
  | { type: "SET_DATE"; payload: number | null }
  | { type: "SET_RANGE"; payload: { from: number | null, to: number | null } }
  | { type: "SET_MULTIPLE"; payload: number }
  | { type: "SET_WEEK_DAYS"; payload: { multiple: number[] } }
  | { type: "SET_MULTIPLE_BY_ARRAY"; payload: { multiple: number[] } }
  | { type: "CHANGE_HOVERED_DAY"; payload: number | null }
  | { type: "HOVER"; payload: any }
  | { type: "CHANGE_YEAR"; payload: number }
  | { type: "SHIFT_YEAR"; payload: number }
  | { type: "SHIFT_MONTH"; payload: { year: number, month: number } }
  | { type: "CHANGE_MONTH"; payload: number }
  | { type: "CHANGE_VIEW"; payload: CalendarViews }
  | { type: "RESET" }
  | { type: "RESET_RANGE" }
  ;