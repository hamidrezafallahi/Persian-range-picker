import type { ExportType } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";
import { MobileDate } from "../../mobileDate/mobileDatePicker";

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

export function DatePicker({ ...props }:IProps) {
  const deviceType =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";
      const { calendarType = "shamsi" } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";

  return (
    <>
      {deviceType == "desktop" ? (
        <DesktopDatePicker {...props} locale={locale} />
      ) : (
        <MobileDate {...props} locale={locale}/>
      )}
    </>
  );
}
