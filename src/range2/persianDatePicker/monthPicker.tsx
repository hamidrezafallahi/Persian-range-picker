import type { FC } from "react";

import { LeftChevron } from "../icons/LeftChevron";
import { RightChevron } from "../icons/RightChevron";
import { months } from "./constants";
import { convertToPersianNumbers } from "./helper";
import type { TLocale } from "../core/type";

interface Props {
  currentMonth: number;
  onSelectMonth: (month: number) => void;
  locale: TLocale;
  currentYear: number;
  onChangeYear: (offset: -1 | 1) => void;
  monthPickerClassName?: string;
  backgroundColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
}

const MonthPicker: FC<Props> = ({
  currentMonth,
  locale,
  onSelectMonth,
  currentYear,
  onChangeYear,
  monthPickerClassName,
  backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
  //tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
  secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه- متن #585858   ,
}) => {
  const monthList = months[locale];

  return (
    <div className={`!h-full `}>
      <div className={`w-full flex justify-between `}>
        <div onClick={() => onChangeYear(1)}>
          <RightChevron secondaryColor={secondaryColor} />
        </div>
        <div>
          <span className="font-bold text-sm" style={{ color: secondaryColor }}>
            {convertToPersianNumbers(currentYear.toString())}
          </span>
        </div>
        <div onClick={() => onChangeYear(-1)}>
          <LeftChevron secondaryColor={secondaryColor} />
        </div>
      </div>
      <div
        className={`w-full flex flex-wrap gap-x-2 gap-y-5  justify-center items-center pt-5  ${monthPickerClassName}`} //need classname
      >
        {monthList.map((month, index) => (
          <div
            style={{
              backgroundColor: currentMonth === index ? secondaryColor : "",
              color: currentMonth === index ? backgroundColor : secondaryColor,
              fontWeight: currentMonth === index ? "  500 " : "",
            }}
            key={index}
            className={`w-20 h-9 rounded flex justify-center items-center `} //need classname
            onClick={() => onSelectMonth(index)}
          >
            <span className="text-sm">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthPicker;
