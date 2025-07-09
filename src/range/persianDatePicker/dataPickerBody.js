import { jsx as _jsx } from "react/jsx-runtime";
const DataPickerBody = ({ datePickerBodyClassName, year, month, renderMonthBody, locale, }) => {
    // const today = moment().locale(locale).clone().startOf("day").valueOf();
    return (_jsx("div", { className: `flex justify-center  w-full ${datePickerBodyClassName} `, style: {
            display: "flex",
            flexDirection: locale === "fa" ? "row" : "row-reverse",
            flexWrap: "wrap",
        }, children: _jsx("div", { className: `w-full`, children: renderMonthBody(year, month) }) }));
};
export default DataPickerBody;
