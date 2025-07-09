import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import moment from "moment-jalaali";
import { DesktopRangePicker } from "../../desktopRange/desktopRangePicker";
import { MobileRangePicker } from "../../mobileRange/mobileRangePicker";
export function Range({ ...props }) {
    const deviceType = /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop";
    const { isOpenDropdown = false, additionalElement, calendarType = "shamsi", } = props;
    const locale = calendarType == "shamsi" ? "fa" : "en";
    const [date, setDate] = useState({
        from: locale === "fa"
            ? moment().locale("fa").startOf("jYear").valueOf()
            : moment().locale("en").startOf("year").valueOf(),
        to: moment().locale(locale).startOf("day").valueOf(),
    });
    const [compareDate, setCompareDate] = useState(null);
    const [counter, setCounter] = useState(0);
    const [activeCompareStep, setActiveCompareStep] = useState(null);
    const [step, setStep] = useState(366);
    const [zone, setZone] = useState("manual");
    const [tabKey, setTabKey] = useState("manual");
    const [open, setOpen] = useState(isOpenDropdown);
    return (_jsx(_Fragment, { children: deviceType == "desktop" ? (_jsx(DesktopRangePicker, { ...props, device: deviceType, step: step, counter: counter, zone: zone, date: date, tabKey: tabKey, compareDate: compareDate, setCompareDate: setCompareDate, activeCompareStep: activeCompareStep, setStep: setStep, setCounter: setCounter, setDate: setDate, setActiveCompareStep: setActiveCompareStep, setTabKey: setTabKey, setZone: setZone, setOpen: setOpen, open: open, additionalElement: additionalElement, activeTable: "Year", locale: locale })) : (_jsx(MobileRangePicker, { ...props, step: step, counter: counter, zone: zone, date: date, tabKey: tabKey, compareDate: compareDate, activeCompareStep: activeCompareStep, setCompareDate: setCompareDate, setDate: setDate, setActiveCompareStep: setActiveCompareStep, setCounter: setCounter, setTabKey: setTabKey, setStep: setStep, setZone: setZone, additionalElement: additionalElement, device: deviceType, locale: locale })) }));
}
