import { jsx as _jsx } from "react/jsx-runtime";
// import "../../../main.css";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { DatePicker } from "../datePicker";
import { Range } from "./range";
export function RangePicker({ ...props }) {
    const { model = "range", additionalElement, defaultValue, calendarType = "shamsi", 
    // isOpenDropdown = false,
    onChange, } = props;
    const locale = calendarType == "shamsi" ? "fa" : "en";
    const [date, setDate] = useState({
        from: locale === "fa"
            ? model == "date"
                ? 0
                : moment().locale("fa").startOf("jYear").valueOf()
            : moment().locale("en").startOf("year").valueOf(),
        to: model == "date" ? 0 : moment().locale(locale).startOf("day").valueOf(),
    });
    const [compareDate, setCompareDate] = useState(null);
    const [counter, setCounter] = useState(0);
    const [activeCompareStep, setActiveCompareStep] = useState(null);
    const [step, setStep] = useState(366);
    const [zone, setZone] = useState("manual");
    const [tabKey, setTabKey] = useState("manual");
    const handleChangeDateToRange = (e) => {
        onChange?.({ type: "date", Data: { from: e } });
    };
    useEffect(() => {
        if (defaultValue) {
            setDate({
                from: defaultValue && defaultValue.from > 0
                    ? defaultValue.from
                    : model == "date"
                        ? moment().locale(locale).startOf("day").valueOf()
                        : locale == "fa"
                            ? moment().locale(locale).startOf("jYear").valueOf()
                            : moment().locale(locale).startOf("year").valueOf(),
                to: defaultValue && defaultValue.to > 0
                    ? defaultValue.to
                    : moment().locale(locale).endOf("day").valueOf(),
            });
        }
    }, [defaultValue]);
    return (_jsx("div", { className: "range", style: { position: "relative" }, children: model == "date" ? (_jsx(DatePicker, { ...props, defaultValue: date?.from, onChange: handleChangeDateToRange })) : (_jsx(Range, { ...props, step: step, counter: counter, zone: zone, date: date, tabKey: tabKey, compareDate: compareDate, activeCompareStep: activeCompareStep, setCompareDate: setCompareDate, setDate: setDate, setActiveCompareStep: setActiveCompareStep, setCounter: setCounter, setTabKey: setTabKey, setStep: setStep, setZone: setZone, additionalElement: additionalElement })) }));
}
