import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import moment from "moment-jalaali";
import MainContent from "../core/mainContent";
import NavigateButton from "../core/navigateButton";
import { CalenderIcon } from "../icons/CalenderIcon";
import { MenuArrowBack } from "../icons/MenuArrowBack";
export function MobileRangePicker(props) {
    const { onCompareDateChange, onChange, step, counter, zone, date, compareDate, activeCompareStep, setCompareDate, setDate, setActiveCompareStep, setCounter, setTabKey, setStep, setZone, isShowNavigationButton = true, popoverClassName = "", calendarType = "shamsi", className, device, disabled, } = props;
    const locale = calendarType == "shamsi" ? "fa" : "en";
    const [type, setType] = useState("date");
    const [customData, setCustomData] = useState(null);
    const isInitialRender = useRef(true);
    const prevDate = useRef(date);
    const prevCompareDate = useRef(compareDate);
    useEffect(() => {
        const hasCompareDateChanged = compareDate?.from !== prevCompareDate.current?.from ||
            compareDate?.to !== prevCompareDate.current?.to;
        if (onCompareDateChange && compareDate && hasCompareDateChanged) {
            onCompareDateChange({ type: "date", Data: { date, compareDate } });
        }
        prevCompareDate.current = compareDate;
        const hasDateChanged = date?.from !== prevDate.current?.from ||
            date?.to !== prevDate.current?.to;
        if (isInitialRender.current) {
            isInitialRender.current = false;
        }
        else if (hasDateChanged && onChange) {
            const isEmpty = !date && !compareDate;
            const isInvalidDateTo = date?.to == null || Number.isNaN(date?.to);
            const isInvalid = date?.from && isInvalidDateTo;
            if (!(isEmpty || isInvalid)) {
                onChange({ type, Data: { date, compareDate } });
            }
        }
        prevDate.current = date;
    }, [date, compareDate]);
    useEffect(() => {
        if (customData) {
            onChange?.({ type, Data: { date, data: customData } });
        }
    }, [customData]);
    return (_jsx("div", { className: "range", children: _jsxs("div", { className: `flex ${className}`, children: [_jsxs("button", { disabled: disabled, popoverTarget: "mobileRangeModal", className: `flex justify-center items-center gap-2 w-full sm:w-fit ${disabled && "cursor-not-allowed"}`, children: [_jsx(CalenderIcon, {}), _jsx("div", { className: "w-fit text-gray-gray8 text-center", children: date && moment(date.from).format("jYYYY/jMM/jDD") }), _jsx("div", { className: "text-gray-gray8 text-center", children: "-" }), _jsx("div", { className: "w-fit text-gray-gray8 text-center", children: date && moment(date.to).format("jYYYY/jMM/jDD") })] }), zone !== "manual" && isShowNavigationButton && (_jsx(NavigateButton, { compareDate: compareDate, setDate: setDate, setCompareDate: setCompareDate, step: step, zone: zone, date: date, setActiveCompareStep: setActiveCompareStep, activeCompareStep: activeCompareStep, counter: counter, setCounter: setCounter, setTabKey: setTabKey, setStep: setStep, setZone: setZone, locale: locale })), _jsxs("div", { popover: "auto", id: "mobileRangeModal", className: `w-full h-full ${popoverClassName} border-none`, children: [_jsx("div", { className: "flex gap-1", dir: locale == "fa" ? "rtl" : "ltr", children: _jsxs("button", { popoverTarget: "mobileRangeModal", className: "flex justify-center items-center gap-2 font-IRANSans font-extrabold !text-black-black3 text-base whitespace-nowrap", children: [_jsx(MenuArrowBack, {}), _jsx("span", { children: locale == "fa" ? "تاریخ" : "Date" })] }) }), _jsx(MainContent, { ...props, model: "range", locale: locale, device: device, setCustomData: setCustomData, setType: setType })] })] }) }));
}
