import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import moment from "moment-jalaali";
import { LeftChevron } from "../icons/LeftChevron";
import { RightChevron } from "../icons/RightChevron";
import { ESteps } from "./type";
import { period } from "./helper";
function NavigateButton({ ...props }) {
    const { step, zone, setDate, counter, setCounter, activeCompareStep, compareDate, setCompareDate, locale = "fa", } = props;
    const stepChangeHandler = (phase) => {
        if (phase == "increment") {
            if (counter < 0) {
                const { from, to } = calculateDate(step, zone, counter + 1, locale);
                setDate({ from, to });
                setCounter((prev) => (prev += 1));
                const templatePeriods = period(calculateDate(step, zone, counter + 1, locale), locale, zone);
                templatePeriods.map((item) => {
                    const active = item.step == activeCompareStep;
                    if (active &&
                        compareDate &&
                        compareDate.from !== item.value.from &&
                        compareDate.to !== item.value.to) {
                        setCompareDate(item.value);
                    }
                });
            }
        }
        else if (phase == "decrement") {
            setDate(calculateDate(step, zone, counter - 1, locale));
            const templatePeriods = period(calculateDate(step, zone, counter - 1, locale), locale, zone);
            templatePeriods.map((item) => {
                const active = item.step == activeCompareStep;
                if (active &&
                    compareDate &&
                    compareDate.from !== item.value.from &&
                    compareDate.to !== item.value.to) {
                    setCompareDate(item.value);
                }
            });
            setCounter((prev) => (prev -= 1));
        }
    };
    useEffect(() => {
        setCounter(0);
    }, [zone]);
    return (_jsxs("div", { dir: locale == "fa" ? "rtl" : "ltr", className: "flex gap-2", children: [_jsx("button", { className: "px-1 xs:border rounded-lg", disabled: step == ESteps.manual, onClick: () => {
                    stepChangeHandler("increment");
                }, children: _jsx(RightChevron, {}) }), _jsx("button", { className: "px-1 xs:border rounded-lg", disabled: step == ESteps.manual, onClick: () => {
                    stepChangeHandler("decrement");
                }, children: _jsx(LeftChevron, {}) })] }));
}
export default NavigateButton;
export const calculateDate = (step, zone, counter, locale) => {
    let from = (locale === "fa" ? moment().startOf("jYear") : moment().startOf("year")).valueOf();
    let to = locale === "fa"
        ? moment().locale("fa").valueOf()
        : moment().locale("en").valueOf();
    if (step == ESteps.day) {
        if (zone == "today") {
            from = moment()
                .startOf("day")
                .subtract(Math.abs(counter), "day")
                .valueOf();
            to = moment()
                .locale(locale)
                .endOf("day")
                .subtract(Math.abs(counter), "day")
                .valueOf();
        }
        else {
            from = moment()
                .startOf("day")
                .subtract(1 + Math.abs(counter), "day")
                .valueOf();
            to = moment()
                .locale(locale)
                .endOf("day")
                .subtract(1 + Math.abs(counter), "day")
                .valueOf();
        }
    }
    else if (step == ESteps.week) {
        if (zone == "thisWeek") {
            if (locale == "fa" &&
                moment().locale("fa").day() == 6 &&
                locale == "fa") {
                from = moment()
                    .locale("fa")
                    .clone()
                    .day(6)
                    .startOf("day")
                    .subtract(7 * Math.abs(counter), "day")
                    .valueOf();
                to = moment()
                    .locale("fa")
                    .clone()
                    .day(6)
                    .endOf("day")
                    .subtract(7 * Math.abs(counter), "day")
                    .valueOf();
            }
            else {
                from = moment()
                    .locale(locale)
                    .clone()
                    .day(-1)
                    .startOf("day")
                    .subtract(7 * Math.abs(counter), "day")
                    .valueOf();
                to = moment()
                    .locale(locale)
                    .clone()
                    .endOf("day")
                    .subtract(7 * Math.abs(counter), "day")
                    .valueOf();
            }
        }
        else if (zone == "lastWeek") {
            if (locale == "fa" && moment().locale("fa").clone().day() == 6) {
                from = moment()
                    .locale("fa")
                    .clone()
                    .day(6)
                    .startOf("day")
                    .subtract(7 + 7 * Math.abs(counter), "day")
                    .valueOf();
                to = moment()
                    .locale("fa")
                    .clone()
                    .day(6)
                    .endOf("day")
                    .subtract(1 + 7 * Math.abs(counter), "day")
                    .valueOf();
            }
            else {
                from = moment()
                    .locale(locale)
                    .clone()
                    .day(-1)
                    .startOf("day")
                    .subtract(7 + 7 * Math.abs(counter), "day")
                    .valueOf();
                to = moment()
                    .locale(locale)
                    .clone()
                    .endOf("day")
                    .subtract(1 + 7 * Math.abs(counter), "day")
                    .valueOf();
            }
            from = moment()
                .locale(locale)
                .clone()
                .day(-1)
                .subtract(7 + 7 * Math.abs(counter), "day")
                .startOf("day")
                .valueOf();
            to = moment()
                .locale(locale)
                .clone()
                .day(-1)
                .subtract(1 + 7 * Math.abs(counter), "day")
                .endOf("day")
                .valueOf();
        }
        else if (zone == "last7Days") {
            from = moment()
                .locale(locale)
                .clone()
                .startOf("day")
                .subtract(6 + 7 * Math.abs(counter), "day")
                .valueOf();
            to = moment()
                .locale(locale)
                .clone()
                .endOf("day")
                .subtract(7 * Math.abs(counter), "day")
                .valueOf();
        }
    }
    else if (step == ESteps.month) {
        if (zone == "thisMonth") {
            from =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .startOf("jMonth")
                        .subtract(Math.abs(counter), "jMonth")
                        .startOf("day")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .startOf("month")
                        .subtract(Math.abs(counter), "month")
                        .startOf("day")
                        .valueOf();
            to =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .endOf("day")
                        .subtract(Math.abs(counter), "jMonth")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .endOf("day")
                        .subtract(Math.abs(counter), "month")
                        .valueOf();
        }
        else if (zone == "lastMonth") {
            from =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .startOf("jMonth")
                        .subtract(1 + Math.abs(counter), "jMonth")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .startOf("month")
                        .subtract(1 + Math.abs(counter), "month")
                        .valueOf();
            to =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .endOf("jMonth")
                        .subtract(1 + Math.abs(counter), "jMonth")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .endOf("month")
                        .subtract(1 + Math.abs(counter), "month")
                        .valueOf();
        }
        else if (zone == "last30Days") {
            from = moment()
                .locale(locale)
                .clone()
                .startOf("day")
                .subtract(29 + Math.abs(counter) * 30, "day")
                .valueOf();
            to = moment()
                .locale(locale)
                .clone()
                .endOf("day")
                .subtract(Math.abs(counter) * 30, "day")
                .valueOf();
        }
    }
    else if (step == ESteps.season) {
        if (zone == "lastThreeMonth") {
            from =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .startOf("day")
                        .subtract(3 + Math.abs(counter) * 3, "jMonth")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .startOf("day")
                        .subtract(3 + Math.abs(counter) * 3, "month")
                        .valueOf();
            to =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .endOf("day")
                        .subtract(Math.abs(counter) * 3, "jMonth")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .endOf("day")
                        .subtract(Math.abs(counter) * 3, "month")
                        .valueOf();
        }
    }
    else if (step == ESteps.year) {
        if (zone == "thisYear") {
            from =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .startOf("jYear")
                        .subtract(Math.abs(counter), "jYear")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .startOf("year")
                        .subtract(Math.abs(counter), "year")
                        .valueOf();
            to =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .endOf("day")
                        .subtract(Math.abs(counter), "jYear")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .endOf("day")
                        .subtract(Math.abs(counter), "year")
                        .valueOf();
        }
        else if (zone == "lastYear") {
            from =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .startOf("jYear")
                        .subtract(1 + Math.abs(counter), "jYear")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .startOf("year")
                        .subtract(1 + Math.abs(counter), "year")
                        .valueOf();
            to =
                locale == "fa"
                    ? moment()
                        .locale("fa")
                        .clone()
                        .endOf("jYear")
                        .subtract(1 + Math.abs(counter), "jYear")
                        .valueOf()
                    : moment()
                        .locale("en")
                        .clone()
                        .endOf("year")
                        .subtract(1 + Math.abs(counter), "year")
                        .valueOf();
        }
    }
    return {
        from,
        to,
    };
};
