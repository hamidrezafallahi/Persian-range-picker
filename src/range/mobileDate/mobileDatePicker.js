import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import moment from "moment-jalaali";
import { Footer } from "../core/footer";
import { toPersianDigits } from "../core/helper";
import { TimeColumns } from "../exportComponents/timePicker/exportComponents";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";
export function MobileDate({ ...props }) {
    const { onChange, defaultValue, locale = "fa", tertiaryColor = "#939393", // رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر - رنگ متن
    highlightColor = "#f4f4f4", // رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
    primaryColor = "#000", chooseTodayClassName = "", showTime = false, showTimeFormat = "HH:mm:ss", hourStep = 1, minuteStep = 1, secondStep = 1, showSecond = true, className, disabled = false, } = props;
    const [showDate, setShowDate] = useState(0);
    const [content, setContent] = useState("Date");
    const popoverRef = useRef(null);
    const device = /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop";
    const dynamicFormat = showSecond ? showTimeFormat : "HH:mm";
    const persian = showDate > 0
        ? toPersianDigits(moment(showDate).format(showTime ? `jYYYY/jMM/jDD\u2003${dynamicFormat}` : `jYYYY/jMM/jDD`))
        : "انتخاب تاریخ";
    const gregorian = showDate > 0
        ? moment(showDate).format(showTime ? `YYYY/MM/DD\u2003${dynamicFormat}` : `YYYY/MM/DD`)
        : "Choose date";
    const title = locale === "fa" ? persian : gregorian;
    const handleDateChange = (e) => {
        if (showTime) {
            setShowDate(e.from);
            setContent("Time");
        }
        else {
            setShowDate(e.from);
            onChange?.(e.from);
            popoverRef.current?.hidePopover();
        }
    };
    const handleSubmit = () => {
        onChange?.(showDate);
        setContent("Date");
        popoverRef.current?.hidePopover();
    };
    const handleTimeChange = (unit, value) => {
        const updated = showDate
            ? moment(showDate).locale(locale).set(unit, value)
            : moment().locale(locale).set(unit, value);
        setShowDate(updated.valueOf());
    };
    const renderOptions = (count, unit, step = 1) => {
        const pad = (num) => num.toString().padStart(2, "0");
        const active = moment(showDate).locale(locale).get(unit);
        return Array.from({ length: Math.ceil(count / step) }, (_, i) => {
            const val = i * step;
            return (_jsx("button", { onClick: () => handleTimeChange(unit, val), className: `flex justify-center items-center !rounded-md w-6 aspect-square ${active === val
                    ? "pointer-events-auto opacity-100 text-gray123 "
                    : ""} `, style: { color: tertiaryColor, fontSize: "14px" }, children: locale == "fa" ? toPersianDigits(pad(val)) : pad(val) }, val));
        });
    };
    const handleClosePopup = () => {
        popoverRef.current?.hidePopover();
    };
    function isDate(value) {
        return value instanceof Date;
    }
    useEffect(() => {
        let temp = 0;
        const temp2 = defaultValue;
        if (temp2 !== undefined) {
            if (isDate(temp2)) {
                temp = temp2.valueOf();
            }
            else if (typeof temp2 === "number") {
                temp = temp2;
            }
        }
        setShowDate(temp);
    }, [defaultValue]);
    return (_jsxs("div", { className: "range", style: { position: "relative", width: device == "desktop" ? "fit-content" : "100%" }, children: [_jsxs("button", { disabled: disabled, popoverTarget: "mobileDateModal", className: `flex justify-between items-center gap-2 px-1 h-9 rounded-md  w-full ${disabled && "cursor-not-allowed"}   ${className}`, style: { color: tertiaryColor, backgroundColor: highlightColor, width: "100%" }, children: [_jsx(CalenderIcon, {}), _jsx("div", { className: "w-full", children: title })] }), _jsxs("div", { popover: "auto", id: "mobileDateModal", ref: popoverRef, className: "relative p-0 border-none w-full h-full", children: [_jsx("div", { className: "p-2", children: content == "Date" ? (_jsx(DatePicker, { ...props, defaultValue: defaultValue ? { from: defaultValue, to: 0 } : undefined, locale: locale, model: "date", onDateChange: handleDateChange, dateFromOutside: {
                                from: showDate ?? new Date().valueOf(),
                                to: 0,
                            } })) : (_jsxs("div", { style: { zIndex: 10 }, children: [_jsx("div", { className: "flex justify-center items-center border-b h-9", style: {
                                        height: "34px",
                                        fontSize: "14px",
                                        color: tertiaryColor,
                                    }, children: locale === "fa"
                                        ? toPersianDigits(moment(showDate).locale(locale).format(dynamicFormat))
                                        : moment(showDate).locale(locale).format(dynamicFormat) }), _jsx(TimeColumns, { TimeColumnsClassName: "flex justify-center items-center  py-2 h-full ", renderHeight: `${280}px`, renderOptions: (count, unit) => renderOptions(count, unit, unit === "hour"
                                        ? hourStep
                                        : unit === "minute"
                                            ? minuteStep
                                            : secondStep), hourStep: hourStep, minuteStep: minuteStep, secondStep: secondStep, showSecond: showSecond })] })) }), _jsx("div", { className: "bottom-0 fixed p-2 w-full", style: { width: "100" }, children: _jsx(Footer, { setShowDate: setShowDate, showDate: showDate, locale: locale, primaryColor: primaryColor, highlightColor: highlightColor, chooseTodayClassName: chooseTodayClassName, showTime: showTime, 
                            // onNowButton={handleClosePopup}
                            onTodayButton: handleClosePopup, onSubmit: handleSubmit, onChange: onChange }) })] })] }));
}
