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
  | number                // Single date
  | number[];             // Multiple date

export interface IProps {
  onDateChange?: (e: IDate) => void;
  tabIndex?: number;
  value?: IDate | null;
  defaultValue?: IDate | null;
  inputClassName?: string;
  model?: "range" | "date";
  name?: string;
  disablePreviousDays?: boolean;
  calenderClassName?: string;
  renderDayFn?: (
    day: { timestamp: number; currentMonth: boolean },
    index: number
  ) => ReactNode;
  label?: string;
  locale: TLocale;
  onClear?: () => void;
  padding?: string;
  disabled?: boolean;
  datePickerBodyClassName?: string;
  chooseTodayClassName?: string;
  primaryColor?: string;
  backgroundColor?: string;
  tertiaryColor?: string;
  highlightColor?: string;
  accentColor?: string;
  secondaryColor?: string;
  neutralColor?: string;
  calendarBaseWidth?: number;

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
  selectableCols?: boolean
  renderColContent?: (info: {
    isSelectedCol: boolean;
    name: string;
  }) => ReactNode;
  WeekHeaderClassName?: string;
  WeekHeaderStyle?: React.CSSProperties;

}
export interface WeekDaySelectResponse {
  indexOfDay: number;
  month: number;
  year: number;
  timestamp: number;
  gregorian: string;
  jalali: string;
  isoGregorian: string;
  isoJalali: string;
}
export interface CalendarProps {
  manualContainerRef?: RefObject<HTMLDivElement | null>;
  onChange: (e: DateValue) => void;
  // Display & behavior
  model?: "range" | "date";
  locale?: TLocale;
  disablePreviousDays?: boolean;
  value?: IDate | null;
  defaultValue?: IDate | null;
  // Custom render
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
  selectableCols?: boolean
  renderColContent?: (info: {
    isSelectedCol: boolean;
    name: string;
  }) => ReactNode;
  WeekHeaderClassName?: string;
  WeekHeaderStyle?: React.CSSProperties;
  // State
  startDate?: number;
  endDate?: number;
  specialDays?: number[];
  disabledDays?: number[];
  // Styles
  primaryColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  calendarBaseWidth?: number;
  containerClassName?: string;
  datePickerHeaderClassName?: string;
  datePickerBodyClassName?: string;
  yearPickerClassName?: string;
  selectMultiple?: boolean

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