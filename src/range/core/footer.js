import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import moment from "moment-jalaali";
export const Footer = ({ ...props }) => {
    const { setShowDate, setIsOpen, locale = "fa", highlightColor, primaryColor, chooseTodayClassName, showTime, onChange, onSubmit, onNowButton, onTodayButton, showDate, } = props;
    const handleSelect = (key) => {
        const todayStart = moment().locale(locale).startOf("day").valueOf();
        if (key === "today") {
            setShowDate(todayStart);
            onChange?.(todayStart);
            onTodayButton?.();
            setIsOpen?.(false);
        }
        else if (key === "now") {
            const now = locale === "fa" ? moment() : moment.utc();
            let updated;
            const isInvalid = !showDate || isNaN(showDate) || !moment(showDate).isValid();
            if (isInvalid) {
                updated = locale === "fa" ? moment() : moment.utc();
            }
            else {
                updated =
                    locale === "fa" ? moment(showDate) : moment.utc(moment(showDate));
            }
            updated = updated
                .set("hour", now.hour())
                .set("minute", now.minute())
                .set("second", now.second());
            setShowDate(updated.valueOf());
            onNowButton?.();
        }
        else if (key === "submit") {
            onSubmit?.();
            setIsOpen?.(false);
        }
    };
    return (_jsx("div", { className: "flex gap-2 mt-2 px-2", children: showTime ? (_jsxs("div", { className: "flex justify-between w-full", children: [_jsx(NowButton, { handleSelect: handleSelect }), _jsx(SubmitTimeButton, { handleSelect: handleSelect })] })) : (_jsx("button", { onClick: () => handleSelect("today"), style: { backgroundColor: highlightColor, color: primaryColor }, className: `w-full h-10 text-center ${chooseTodayClassName}`, children: locale === "fa" ? "انتخاب امروز" : "Choose today" })) }));
};
const NowButton = ({ ...props }) => {
    const { handleSelect, nowButtonClassName = "" } = props;
    return (_jsx("button", { className: `p-2 px-3 border rounded-md ${nowButtonClassName}`, onClick: () => handleSelect("now"), children: "now" }));
};
const SubmitTimeButton = ({ ...props }) => {
    const { handleSelect, okButtonClassName = "" } = props;
    return (_jsx("button", { onClick: () => handleSelect("submit"), className: `p-2 px-3 border rounded-md ${okButtonClassName}`, style: {
            background: "black",
            borderColor: "black",
            color: "white",
        }, children: "Ok" }));
};
