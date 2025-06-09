import type { FC } from 'react';

import type { TLocale } from '../core/type';
import { LeftChevron } from '../icons/LeftChevron';
import { RightChevron } from '../icons/RightChevron';
import {
  monthMap,
  PmonthMap,
} from './constants';
import { CalendarViews } from './enum';
import { convertToPersianNumbers } from './helper';

interface Props {
  setMonth: (offset: 1 | -1) => void;
  year: number;
  month: number;
  locale: TLocale;
  onViewChange: (viewName: CalendarViews) => void;
  datePickerHeaderClassName?: string;
  highlightColor?: string;
  tertiaryColor?: string;
  secondaryColor?: string;
}

const DatePickerHeader: FC<Props> = ({
  setMonth,
  year,
  month,
  onViewChange,
  locale,
  datePickerHeaderClassName,
  tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
  highlightColor = "#f4f4f4", //رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
  secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه   - متن #585858   ,
}) => {
  const currentMonth = locale === "fa" ? PmonthMap[month] : monthMap[month];

  return (
    <div
      className={`flex h-6 relative justify-around items-center  w-full  ${datePickerHeaderClassName}
      ${locale === "fa" ? "flex-row" : "flex-row-reverse"} `}
    >
      <div
        style={{ backgroundColor: highlightColor }}
        className={`absolute left-0 w-6 h-6 flex justify-center items-center rounded`}
        onClick={() => (locale === "fa" ? setMonth(+1) : setMonth(-1))}
      >
        {/* <RightChevron secondaryColor={secondaryColor} /> */}
        <LeftChevron secondaryColor={secondaryColor} />
      </div>
      <div className="flex gap-4 mx-auto">
        <span
          className="font-bold"
          onClick={() => onViewChange(CalendarViews.MONTH)}
          style={{ fontSize: "14px", color: tertiaryColor }}
        >
          {currentMonth} ,
        </span>
        <span
          className="font-bold"
          onClick={() => onViewChange(CalendarViews.YEAR)}
          style={{ fontSize: "14px", color: tertiaryColor }}
        >
          {convertToPersianNumbers(year.toString())}
        </span>
      </div>
      <div
        style={{ backgroundColor: highlightColor }}
        className={`absolute right-0 w-[25px] h-[25px]  flex justify-center items-center rounded
          `}
        onClick={() => (locale === "fa" ? setMonth(-1) : setMonth(1))}
      >
        <RightChevron secondaryColor={secondaryColor} />
      </div>
    </div>
  );
};

export default DatePickerHeader;
