import type { ReactNode } from "react";
import type { IDate, TLocale } from "../core/type";

export interface IProps {
  dateFromOutside: IDate;
  onDateChange?: (e: IDate) => void;
  tabIndex?: number;
  value?: IDate;
  defaultValue?: string | IDate;
  inputClassName?: string;
  model?: "range" | "date";
  mode?: "modal" | "dropdown";
  name: string;
  doubleMonth?: boolean;
  defaultVal?: string;
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
  setDateToOutside?: IDate;
  datePickerBodyClassName?: string;
  chooseTodayClassName?: string;
  primaryColor?: string;
  backgroundColor?: string;
  tertiaryColor?: string;
  highlightColor?: string;
  accentColor?: string;
  secondaryColor?: string;
  neutralColor?: string;
}
