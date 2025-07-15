import type { FC } from "react";
import style from "../../main.module.css";
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
    <div className={`${style.h_full} `}>
      <div
        className={`
  ${style.w_full}
  ${style.flex}
  ${style.justify_between}
`}
      >
        <div onClick={() => onChangeYear(1)}>
          <LeftChevron secondaryColor={secondaryColor} />
        </div>
        <div>
          <span
            className={`
  ${style.font_bold}
  ${style.text_sm}
`}
            style={{ color: secondaryColor }}
          >
            {convertToPersianNumbers(currentYear.toString())}
          </span>
        </div>
        <div onClick={() => onChangeYear(-1)}>
          <RightChevron secondaryColor={secondaryColor} />
        </div>
      </div>
      <div
        className={`
  ${style.w_full}
  ${style.flex}
  ${style.flex_wrap}
  ${style.gap_x_2}
  ${style.gap_y_5}
  ${style.justify_center}
  ${style.items_center}
  ${style.pt_5}
  ${monthPickerClassName}
`}
      >
        {monthList.map((month, index) => (
          <div
            style={{
              backgroundColor: currentMonth === index ? secondaryColor : "",
              color: currentMonth === index ? backgroundColor : secondaryColor,
              fontWeight: currentMonth === index ? "  500 " : "",
            }}
            key={index}
            className={`
              ${style.w_20}
              ${style.h_9}
              ${style.rounded}
              ${style.flex}
              ${style.justify_center}
              ${style.items_center}
            `}
            onClick={() => onSelectMonth(index)}
          >
            <span
              className={`
  ${style.text_sm}
`}
            >
              {month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthPicker;
