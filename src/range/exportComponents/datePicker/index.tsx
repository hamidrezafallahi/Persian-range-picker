import type { IDateProps } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";
import { MobileDate } from "../../mobileDate/mobileDatePicker";
import moment from "moment-jalaali";
export function DatePicker({ ...props }: Omit<IDateProps, "locale">) {
  const { onChange, exportType = "IsoString" } = props;
  const deviceType =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";
  const { calendarType = "shamsi" } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  const changeHandler = (e: number | string) => {
    if (!e) return;
    onChange?.(
      exportType == "timeStamp"
        ? e
        : locale == "fa"
        ? moment(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        : moment.utc(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    );
  };

  return (
    <>
      {deviceType == "desktop" ? (
        <DesktopDatePicker
          {...props}
          locale={locale}
          onChange={changeHandler}
        />
      ) : (
        <MobileDate {...props} locale={locale} />
      )}
    </>
  );
}
