import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef, useState, } from "react";
import moment from "moment-jalaali";
import { toPersianDigits } from "../core/helper";
import { TimeColumns } from "../exportComponents/timePicker/exportComponents";
export const DesktopTimePicker = ({ defaultValue, calendarType = "shamsi", containerClassName, displayButtonCount = 6, tertiaryColor = "#939393", hourStep = 1, minuteStep = 1, secondStep = 1, onGetValue, showSecond = false, }) => {
    const [time, setTime] = useState(null);
    const buttonRefs = useRef([]);
    const locale = calendarType == "shamsi" ? "fa" : "en";
    const renderHeight = displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 24) +
        20 +
        (displayButtonCount - 1) * 16;
    const handleTimeChange = (unit, value) => {
        const updated = time
            ? moment(time).locale(locale).set(unit, value)
            : moment().locale(locale).set(unit, value);
        setTime(updated.valueOf());
    };
    const renderOptions = (count, unit, step = 1) => {
        const pad = (num) => num.toString().padStart(2, "0");
        const active = moment(time).locale(locale).get(unit);
        return Array.from({ length: Math.ceil(count / step) }, (_, i) => {
            const val = i * step;
            return (_jsx("button", { onClick: () => handleTimeChange(unit, val), className: `flex flex-col justify-evenly items-center !rounded-md w-[clamp(24px,24px,30px)] aspect-square text-center cursor-pointer ${active === val
                    ? "pointer-events-auto opacity-100 text-gray123 text-sm"
                    : ""} `, ref: (el) => {
                    buttonRefs.current[i] = el;
                }, style: { color: tertiaryColor, fontSize: "14px" }, children: locale == "fa" ? toPersianDigits(pad(val)) : pad(val) }, val));
        });
    };
    useEffect(() => {
        if (defaultValue) {
            setTime(defaultValue);
        }
    }, [defaultValue]);
    useEffect(() => {
        if (onGetValue && time) {
            onGetValue(time);
        }
    }, [time]);
    return (_jsx("div", { className: "range", style: { position: "relative" }, children: _jsx("div", { style: { paddingTop: "12px" }, className: `flex justify-center ${containerClassName}`, children: _jsx(TimeColumns, { renderHeight: `${renderHeight}px`, renderOptions: (count, unit) => renderOptions(count, unit, unit === "hour"
                    ? hourStep
                    : unit === "minute"
                        ? minuteStep
                        : secondStep), hourStep: hourStep, minuteStep: minuteStep, secondStep: secondStep, showSecond: showSecond }) }) }));
};
