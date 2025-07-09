import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment-jalaali";
import MainContent from "../core/mainContent";
import NavigateButton from "../core/navigateButton";
import { useRenderPosition } from "../exportComponents/useRenderPosition";
import { DownTriangle } from "../icons/DownTriangle";
export function DesktopRangePicker(props) {
    const userAgent = navigator.userAgent;
    const deviceType = /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(userAgent)
        ? "mobile"
        : "desktop";
    const { setDate, date, zone, compareDate = { from: 0, to: 0 }, setOpen, open, handleSubmit, handleReject, onChange, onCompareDateChange, setCompareDate, counter, setStep, isShowNavigationButton = true, primaryColor = "#000", //رنگ اصلی (برای دکمه‌ها، لینک‌ها یا تأکید اصلی برند)
    backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    // tabClassName = "",
    dateClassName, locale = "fa", onError, 
    // className,
    buttonClassName, dropdownWidth = 460, dropdownHeight = 460, device = deviceType, label = {
        isShowLabel: true,
        label: (_jsx("label", { className: "text-xs", style: {
                color: tertiaryColor,
            }, children: props.label?.label ?? (locale == "en" ? "Date" : "تاریخ") })),
    }, } = props;
    const isInitialRender = useRef(true);
    const prevDate = useRef(date);
    const prevCompareDate = useRef(compareDate);
    const [showDate, setShowDate] = useState({
        date: {
            from: locale === "fa"
                ? moment().locale("fa").startOf("jYear").valueOf()
                : moment().locale("en").startOf("year").valueOf(),
            to: moment().locale(locale).startOf("day").valueOf(),
        },
        compareDate: null,
        Data: null, // or any default value you want for Data
    });
    const [type, setType] = useState("date");
    const [customData, setCustomData] = useState(null);
    const handleAccept = () => {
        console.log("handleAccept");
        if (date) {
            if (date.from && date.to && date.from < date.to) {
                if (handleSubmit) {
                    if (type == "date") {
                        handleSubmit({ type, Data: { date, compareDate } });
                    }
                    else {
                        handleSubmit({ type, Data: { customData } });
                    }
                }
                setShowDate({
                    date,
                    compareDate,
                    Data: customData,
                });
                setOpen?.(false);
            }
            else {
                if (onError) {
                    onError(`${locale == "fa"
                        ? "تاریخ پایان نمی‌تواند زودتر از تاریخ آغاز باشد."
                        : "The end date must not be earlier than the start date."}`);
                }
            }
        }
        else {
            if (handleSubmit) {
                if (type == "date") {
                    handleSubmit({ type, Data: { date, compareDate } });
                }
                else {
                    handleSubmit({ type, Data: { customData } });
                }
            }
            setShowDate({ date, compareDate, Data: customData });
            setOpen?.(false);
        }
    };
    const handleCancel = () => {
        setOpen?.(false);
        setDate(showDate?.date);
        setStep(366);
        setCompareDate(showDate.compareDate);
        if (handleReject) {
            handleReject();
        }
    };
    const buttonRef = useRef(null);
    const popupRef = useRef(null);
    useRenderPosition({
        buttonRef: buttonRef,
        popupRef: popupRef,
        setIsOpen: setOpen ?? (() => { }),
        isOpen: open ?? false,
    });
    const handleDropdown = () => {
        setOpen?.((prev) => !prev);
    };
    useEffect(() => {
        if (date) {
            setShowDate((prev) => ({
                ...prev,
                Data: null,
            }));
        }
    }, [counter]);
    useEffect(() => {
        const hasCompareDateChanged = compareDate?.from !== prevCompareDate.current?.from ||
            compareDate?.to !== prevCompareDate.current?.to;
        if (onCompareDateChange && compareDate && hasCompareDateChanged) {
            onCompareDateChange({ type: "date", Data: { date, compareDate } });
            setShowDate((prev) => ({
                ...prev,
                compareDate,
            }));
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
            onChange?.({ type, Data: { customData } });
        }
    }, [customData]);
    useEffect(() => {
        setShowDate({
            date,
            compareDate,
            Data: null,
        });
    }, [date, compareDate]);
    return (_jsxs("div", { className: `flex flex-col  justify-center w-fit h-14 relative  ${buttonClassName}`, ref: buttonRef, children: [_jsx("div", { dir: locale == "fa" ? "rtl" : "ltr", children: label.isShowLabel && label.label }), _jsxs("div", { className: "flex gap-2", children: [_jsxs("button", { className: `flex justify-center items-center gap-2 px-2 border border-gray-300 rounded-lg w-72 h-8 cursor-pointer ${dateClassName}`, onClick: handleDropdown, dir: "ltr", children: [_jsx(DownTriangle, {}), _jsx("div", { className: `"px-2 w-fit text-center`, style: {
                                    color: tertiaryColor,
                                }, children: locale === "fa"
                                    ? moment(showDate.date?.to)
                                        .locale("fa")
                                        .format("jYYYY/ jMM /jDD  ")
                                    : moment(showDate.date?.to)
                                        .locale("en")
                                        .format("  YYYY / MM / DD") }), _jsx("div", { className: `text-center`, style: {
                                    color: tertiaryColor,
                                }, children: "-" }), _jsx("div", { className: `px-2 w-fit  text-center `, style: {
                                    color: tertiaryColor,
                                }, children: locale === "fa"
                                    ? moment(showDate.date?.from)
                                        .locale("fa")
                                        .format("jYYYY / jMM / jDD")
                                    : moment(showDate.date?.from)
                                        .locale("en")
                                        .format("YYYY / MM / DD") })] }), zone !== "manual" && isShowNavigationButton && (_jsx(NavigateButton, { ...props, locale: locale }))] }), open && (_jsx("div", { ref: popupRef, style: {
                    backgroundColor: backgroundColor,
                    position: "absolute",
                    width: dropdownWidth,
                    height: dropdownHeight,
                }, className: `absolute z-50  p-2  border border-gray-300 rounded-lg shadow-md  overflow-hidden  ${locale === "fa" ? "right-0" : "left-0"}`, children: _jsxs("div", { className: "relative w-full h-full", children: [_jsx(MainContent, { ...props, model: "range", locale: locale, device: device, setCustomData: setCustomData, setType: setType }), _jsxs("div", { className: `w-full flex gap-2 absolute bottom-0 flex-row-reverse justify-end`, dir: locale == "fa" ? "ltr" : "rtl", children: [_jsx("button", { style: { color: primaryColor }, className: "p-2 px-3 rounded-md", onClick: handleCancel, children: locale == "fa" ? "لغو" : "Cancel" }), _jsx("button", { onClick: () => handleAccept(), style: {
                                        background: primaryColor,
                                        borderColor: primaryColor,
                                        color: backgroundColor,
                                    }, className: ` p-2 px-3 border  rounded-md`, children: locale == "fa" ? "اعمال" : "Accept" })] })] }) }))] }));
}
