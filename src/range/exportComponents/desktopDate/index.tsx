import type { ExportType  } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";

interface IProps {
  calendarType?: "shamsi" | "gregorian";
  defaultValue?: Date|number;
  onChange?: (e: number|ExportType) => void;/////////////////////////////////
  tertiaryColor?: string;
  highlightColor?: string;
  showTime?: boolean;
  exportType?:ExportType
}
export function DesktopDate({ ...props }: IProps) {
  const { calendarType = "shamsi" } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  return <DesktopDatePicker {...props} model="date" locale={locale} />;
}
