import type { ReactNode } from 'react';

import type {
  IDate,
  TLocale,
} from '../core/type';

interface WeekDaySelectResponse {
  indexOfDay: number;
  month: number;
  year: number;
  timestamp: number;
  gregorian: string;
  jalali: string;
  isoGregorian: string;
  isoJalali: string;
}
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
    isColSelected: boolean;
  }) => ReactNode;
  renderColContent?: (info: {
    isSelectedCol: boolean;
    name: string;
  }) => ReactNode;
  onWeekdaySelect?: (e: WeekDaySelectResponse[]) => void;
  WeekHeaderClassName?: string;
  WeekHeaderStyle?: React.CSSProperties;

}
