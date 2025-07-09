import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LeftChevron } from '../icons/LeftChevron';
import { RightChevron } from '../icons/RightChevron';
import { monthMap, PmonthMap, } from './constants';
import { CalendarViews } from './enum';
import { convertToPersianNumbers } from './helper';
const DatePickerHeader = ({ setMonth, year, month, onViewChange, locale, datePickerHeaderClassName, tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
highlightColor = "#f4f4f4", //رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه   - متن #585858   ,
 }) => {
    const currentMonth = locale === "fa" ? PmonthMap[month] : monthMap[month];
    return (_jsxs("div", { className: `flex h-6 relative justify-around items-center  w-full  ${datePickerHeaderClassName}
      ${locale === "fa" ? "flex-row" : "flex-row-reverse"} `, children: [_jsx("div", { style: { backgroundColor: highlightColor }, className: `absolute left-0 w-6 h-6 flex justify-center items-center rounded`, onClick: () => (locale === "fa" ? setMonth(+1) : setMonth(-1)), children: _jsx(LeftChevron, { secondaryColor: secondaryColor }) }), _jsxs("div", { className: "flex gap-4 mx-auto", children: [_jsxs("span", { className: "font-bold", onClick: () => onViewChange(CalendarViews.MONTH), style: { fontSize: "14px", color: tertiaryColor }, children: [currentMonth, " ,"] }), _jsx("span", { className: "font-bold", onClick: () => onViewChange(CalendarViews.YEAR), style: { fontSize: "14px", color: tertiaryColor }, children: convertToPersianNumbers(year.toString()) })] }), _jsx("div", { style: { backgroundColor: highlightColor }, className: `absolute right-0 w-[25px] h-[25px]  flex justify-center items-center rounded
          `, onClick: () => (locale === "fa" ? setMonth(-1) : setMonth(1)), children: _jsx(RightChevron, { secondaryColor: secondaryColor }) })] }));
};
export default DatePickerHeader;
