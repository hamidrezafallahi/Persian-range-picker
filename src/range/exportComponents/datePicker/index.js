import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";
import { MobileDate } from "../../mobileDate/mobileDatePicker";
import "../../../main.css";
import moment from "moment-jalaali";
export function DatePicker({ ...props }) {
    const { onChange, exportType = "IsoString" } = props;
    const deviceType = /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop";
    const { calendarType = "shamsi" } = props;
    const locale = calendarType == "shamsi" ? "fa" : "en";
    const changeHandler = (e) => {
        if (!e)
            return;
        onChange?.(exportType == "timeStamp"
            ? e
            : locale == "fa"
                ? moment(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                : moment.utc(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
    };
    return (_jsx(_Fragment, { children: deviceType == "desktop" ? (_jsx(DesktopDatePicker, { ...props, locale: locale, onChange: changeHandler })) : (_jsx(MobileDate, { ...props, locale: locale })) }));
}
