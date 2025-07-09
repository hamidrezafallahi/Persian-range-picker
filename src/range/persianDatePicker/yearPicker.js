import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, } from 'react';
import { LeftChevron } from '../icons/LeftChevron';
import { RightChevron } from '../icons/RightChevron';
import { convertToPersianNumbers } from './helper';
const YearPicker = ({ currentYear, onSelectYear, yearPickerClassName, backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه   - متن #585858   ,
primaryColor = "#000", //رنگ اصلی (برای دکمه‌ها، لینک‌ها یا تأکید اصلی برند)
 }) => {
    const [page, setPage] = useState(0);
    const yearList = useMemo(() => {
        const firstYear = currentYear + page * 20;
        const yearArray = [];
        for (let i = 0; i < 20; i++) {
            yearArray.push(firstYear - i);
        }
        return yearArray;
    }, [page, currentYear]);
    const changePageHandler = (offset) => {
        setPage((prev) => prev + offset);
    };
    const selectYearHandler = (year) => {
        onSelectYear(year);
    };
    return (_jsxs("div", { className: `w-full flex flex-col min-h-[327px] ${yearPickerClassName}`, children: [_jsxs("div", { className: `w-full flex justify-between`, children: [_jsx("div", { onClick: () => changePageHandler(1), children: _jsx(LeftChevron, { secondaryColor: secondaryColor }) }), _jsx("div", { children: _jsx("span", { style: { color: primaryColor }, className: "font-bold text-sm", children: `${convertToPersianNumbers(yearList[0].toString())} - ${convertToPersianNumbers(yearList[yearList.length - 1].toString())}` }) }), _jsx("div", { onClick: () => changePageHandler(-1), children: _jsx(RightChevron, { secondaryColor: secondaryColor }) })] }), _jsx("div", { className: `w-full mx-auto flex flex-wrap justify-center items-center pt-4  overflow-y-auto  !h-full`, children: yearList.map((year) => (_jsx("div", { style: {
                        backgroundColor: year === currentYear ? secondaryColor : "",
                        color: year === currentYear ? backgroundColor : secondaryColor,
                        fontWeight: year === currentYear ? "500" : "",
                    }, className: `w-[80px] h-9 flex justify-center items-center rounded 
           

            `, onClick: () => selectYearHandler(year), children: _jsx("span", { className: "text-sm", children: convertToPersianNumbers(year.toString()) }) }, year))) })] }));
};
export default YearPicker;
