import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LeftChevron } from "../icons/LeftChevron";
import { RightChevron } from "../icons/RightChevron";
import { months } from "./constants";
import { convertToPersianNumbers } from "./helper";
const MonthPicker = ({ currentMonth, locale, onSelectMonth, currentYear, onChangeYear, monthPickerClassName, backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
//tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه- متن #585858   ,
 }) => {
    const monthList = months[locale];
    return (_jsxs("div", { className: `!h-full `, children: [_jsxs("div", { className: `w-full flex justify-between `, children: [_jsx("div", { onClick: () => onChangeYear(1), children: _jsx(LeftChevron, { secondaryColor: secondaryColor }) }), _jsx("div", { children: _jsx("span", { className: "font-bold text-sm", style: { color: secondaryColor }, children: convertToPersianNumbers(currentYear.toString()) }) }), _jsx("div", { onClick: () => onChangeYear(-1), children: _jsx(RightChevron, { secondaryColor: secondaryColor }) })] }), _jsx("div", { className: `w-full flex flex-wrap gap-x-2 gap-y-5  justify-center items-center pt-5  ${monthPickerClassName}`, children: monthList.map((month, index) => (_jsx("div", { style: {
                        backgroundColor: currentMonth === index ? secondaryColor : "",
                        color: currentMonth === index ? backgroundColor : secondaryColor,
                        fontWeight: currentMonth === index ? "  500 " : "",
                    }, className: `w-20 h-9 rounded flex justify-center items-center `, onClick: () => onSelectMonth(index), children: _jsx("span", { className: "text-sm", children: month }) }, index))) })] }));
};
export default MonthPicker;
