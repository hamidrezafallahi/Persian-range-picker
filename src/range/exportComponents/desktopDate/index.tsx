import type { IDate } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";

interface IProps {
  calendarType?: "shamsi" | "gregorian";
  defaultValue?: IDate;
  onChange?: (e: { type: "date"; date: IDate }) => void;
  tertiaryColor?: string;
  highlightColor?: string;
  showTime?: boolean;
}
export function DesktopDate({ ...props }: IProps) {
  const { calendarType = "shamsi" } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  return <DesktopDatePicker {...props} model="date" locale={locale} />;
}
