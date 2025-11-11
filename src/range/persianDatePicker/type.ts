import type { ReactNode } from 'react';

import type {
  IDate,
  TLocale,
} from '../core/type';

export interface IProps {
  onDateChange?: (e: IDate) => void;
  tabIndex?: number;
 value?: IDate | null;        // اضافه کردن null
  defaultValue?: IDate | null;
  inputClassName?: string;
  model?: "range" | "date";
  mode?: "modal" | "dropdown";
  name?: string;
  doubleMonth?: boolean;
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
 
}
