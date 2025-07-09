import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { period } from "../core/helper";
import { TickIcon } from "../icons/TickIcon";
const CompareList = ({ ...props }) => {
    const { date, zone, setActiveCompareStep, activeCompareStep, setCompareDate, componentStep, locale = "fa", accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    neutralColor = "#9cc5f1", //رنگ خنثی، اغلب برای پس‌زمینه یا متن - آبی کمرنگ
     } = props;
    const timeHandler = (item) => {
        setCompareDate(item.value);
        setActiveCompareStep(item.step);
    };
    const templatePeriods = period(date, locale, zone);
    const filteredPeriod = templatePeriods.filter((item) => componentStep &&
        item.step >= componentStep &&
        !(item.timeZone === "lastMonth" && zone === "lastThreeMonth"));
    // useEffect(() => {
    //   const temp = templatePeriods.find(
    //     (item) => item.step == activeCompareStep
    //   )?.value;
    //   if (temp) {
    //     setCompareDate({ from: temp.from, to: temp.to });
    //   }
    // }, [counter]);
    return (_jsx(_Fragment, { children: filteredPeriod.map((item, index) => {
            const active = item.step == activeCompareStep;
            // if (
            //   active &&
            //   compareDate.from !== item.value.from &&
            //   compareDate.to !== item.value.to
            // ) {
            //   setCompareDate(item.value);
            // }
            const stringDateFrom = new Date(item.value.from).toLocaleDateString(`${locale == "fa" ? "fa-IR" : "en-UK"}`, {
                weekday: "long",
                month: "long",
                day: "numeric",
            });
            const stringDateTo = new Date(item.value.to).toLocaleDateString(`${locale == "fa" ? "fa-IR" : "en-UK"}`, {
                weekday: "long",
                month: "long",
                day: "numeric",
            });
            return (_jsxs("button", { onClick: () => timeHandler(item), className: `relative  flex flex-col items-start gap-y-2 pb-2 w-full h-fit
                ${index < filteredPeriod.length - 1 && "border-b"}
                `, dir: locale == "fa" ? "rtl" : "ltr", children: [_jsx("div", { style: { color: active ? accentColor : tertiaryColor }, children: item.title }), _jsxs("div", { style: {
                            color: active ? neutralColor : tertiaryColor,
                        }, className: `text-xs whitespace-nowrap overflow-hidden`, children: [locale == "fa" ? " از " : "From ", stringDateFrom, locale == "fa" ? " تا " : "To ", stringDateTo] }), active && (_jsx("span", { className: ` absolute my-auto ${locale == "en" ? "right-5" : "left-5"}`, children: _jsx(TickIcon, { ...props }) }))] }, index));
        }) }));
};
export default CompareList;
