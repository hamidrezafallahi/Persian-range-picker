import type { ExportType } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";

interface IProps {
  calendarType?: "shamsi" | "gregorian";
  defaultValue?: number;
  onChange?: (e: number | object) => void; /////////////////////////////////
  tertiaryColor?: string;
  highlightColor?: string;
  showTime?: boolean;
  exportType?: ExportType;
  className?: string;
}
export function DesktopDate({ ...props }: IProps) {
  const { calendarType = "shamsi" } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  return <DesktopDatePicker {...props} model="date" locale={locale} />;
}
