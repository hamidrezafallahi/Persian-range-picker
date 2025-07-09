import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import type { ChangeEvent } from "react";
import moment from "moment-jalaali";
import Comparison from "../comparison";
import { DatePicker } from "../persianDatePicker";
import MaskRange from "./maskRange";
import MonthPicker from "./monthPicker";
import { ESteps } from "./type";
const Manual = (props) => {
    const { date, locale = "fa", 
    // defaultValue,
    setDate, setZone, setStep, showComparison = false, monthPickerClassName, model,
    // secondaryColor,
    // tertiaryColor,
    // dangerColor,
    // InputHandleChange,
     } = props;
    const switchHandler = () => { };
    return (_jsxs("div", { className: "flex flex-col justify-center items-center gap-2 mx-auto xs:w-60", children: [_jsx(MonthPicker, { ...props, monthPickerClassName: monthPickerClassName, dateFromOutside: date, onDateChange: (e) => {
                    setDate(e);
                    setZone("manual");
                    setStep(ESteps.manual);
                }, locale: locale }), _jsx(MaskRange, { locale: locale, 
                // secondaryColor={secondaryColor}
                // tertiaryColor={tertiaryColor}
                // dangerColor={dangerColor}
                // InputHandleChange={InputHandleChangeFrom}
                // dateFromOutside={date}
                date: date, setDate: setDate }), _jsx(DatePicker, { ...props, chooseTodayClassName: "bg-red-500", name: "custom range", dateFromOutside: date, onDateChange: (e) => {
                    setDate({
                        from: e.from,
                        to: moment(e.to).locale("fa").clone().endOf("day").valueOf(),
                    });
                    setZone("manual");
                    setStep(ESteps.manual);
                }, model: model, locale: locale }), showComparison && (_jsx(Comparison, { ...props, switchHandler: switchHandler }))] }));
};
export default Manual;
