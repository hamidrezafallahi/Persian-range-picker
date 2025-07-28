import type { AcceptableDateValue, IDateProps } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";
import { MobileDate } from "../../mobileDate/mobileDatePicker";
import moment from "moment-jalaali";
import { getTimestamp } from "../../core/helper";
type CustomDateProps = Omit<IDateProps, "defaultValue" | "locale"> & {
  defaultValue?: AcceptableDateValue;
};
export function DatePicker({ ...props }: CustomDateProps) {
  const { onChange, exportType = "IsoString" } = props;
  const deviceType =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";
  const { calendarType = "shamsi", defaultValue } = props;
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
          defaultValue={getTimestamp(defaultValue)}
        />
      ) : (
        <MobileDate
          {...props}
          locale={locale}
          defaultValue={getTimestamp(defaultValue)}
        />
      )}
    </>
  );
}
