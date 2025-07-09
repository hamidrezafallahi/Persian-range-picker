import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { ESteps } from "../core/type";
import { TickIcon } from "../icons/TickIcon";
function ManualCompare({ ...props }) {
    const { date, step, setCompareDate, locale, accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    neutralColor = "#9cc5f1", //رنگ خنثی، اغلب برای پس‌زمینه یا متن - آبی کمرنگ
     } = props;
    const [compare, setCompare] = useState(date);
    const [oneYearCompareDate, setOneYearCompareDate] = useState(date);
    const [active, setActive] = useState("");
    const [disableButton, setDisableButton] = useState("");
    const stringDateFrom = new Date(compare?.from).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
    });
    const stringDateTo = new Date(compare?.to).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
    });
    const stringDateOneYearFrom = new Date(oneYearCompareDate.from).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
    });
    const stringDateOneYearTo = new Date(oneYearCompareDate.to).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
    });
    const timeHandler = (key) => {
        if (key == "manual") {
            setCompareDate({ from: Number(compare.from), to: Number(compare.to) });
            setActive(key);
            setDisableButton("manual");
        }
        else {
            setCompareDate({
                from: Number(oneYearCompareDate.from),
                to: Number(oneYearCompareDate.to),
            });
            setActive(key);
            setDisableButton("collapse");
        }
    };
    useEffect(() => {
        if (step == ESteps.manual) {
            const newStep = {
                from: Number(date.from) - (Number(date.to) - Number(date.from) - 1),
                to: Number(date.from) - 1,
            };
            const newStepOneYearAgo = {
                from: moment(date.from)
                    .locale("fa")
                    .clone()
                    .startOf("day")
                    .subtract(1, "jYear")
                    .valueOf(),
                to: moment(date.to)
                    .locale("fa")
                    .clone()
                    .endOf("day")
                    .subtract(1, "jYear")
                    .valueOf(),
            };
            setCompare({ from: newStep.from, to: newStep.to });
            setOneYearCompareDate({
                from: newStepOneYearAgo.from,
                to: newStepOneYearAgo.to,
            });
        }
    }, [date]);
    return (_jsxs("div", { className: "flex flex-col", children: [_jsxs("button", { disabled: disableButton == "manual", onClick: () => timeHandler("manual"), className: "relative flex flex-col items-start gap-2 w-full h-fit", children: [_jsx("div", { style: { color: active == "manual" ? accentColor : tertiaryColor }, children: locale == "fa" ? "یک بازه عقبتر" : "One step before" }), _jsxs("div", { style: { color: active == "manual" ? neutralColor : tertiaryColor }, className: `text-xs 
          }`, children: [stringDateFrom, " - ", " ", stringDateTo, " "] }), active == "manual" && (_jsx("span", { className: ` absolute my-auto ${locale == "en" ? "right-5" : "left-5"}`, children: _jsx(TickIcon, { accentColor: accentColor }) })), _jsx("div", { style: { backgroundColor: tertiaryColor }, className: "m-0 w-px h-full" })] }, "manual"), _jsxs("button", { disabled: disableButton == "collapse", onClick: () => timeHandler("collapse"), className: "relative flex flex-col items-start w-full h-fit", children: [_jsx("div", { style: { color: active == "collapse" ? accentColor : tertiaryColor }, children: locale == "fa"
                            ? "همین بازه یک سال پیش"
                            : "Same duration noe year ago" }), _jsxs("div", { style: { color: active == "collapse" ? neutralColor : tertiaryColor }, children: [stringDateOneYearFrom, " - ", stringDateOneYearTo] }), active == "collapse" && (_jsx("span", { className: ` absolute my-auto ${locale == "en" ? "right-5" : "left-5"}`, children: _jsx(TickIcon, { accentColor: accentColor }) }))] }, "collapse")] }));
}
export default ManualCompare;
