import type { IDateProps } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";
import { MobileDate } from "../../mobileDate/mobileDatePicker";
import "../../../main.css";

export function DatePicker({ ...props }: Omit<IDateProps, "locale">) {
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
        <MobileDate {...props} locale={locale} />
      )}
    </>
  );
}
