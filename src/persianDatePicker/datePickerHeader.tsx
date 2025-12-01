import type { FC } from 'react';

import { LeftChevron } from '../assets/icons/LeftChevron';
import { RightChevron } from '../assets/icons/RightChevron';
import type { TLocale } from '../core/type';
import style from '../main.module.css';
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
  tertiaryColor = "#939393",
  highlightColor = "#f4f4f4",
  secondaryColor = "#585858",
}) => {
  const currentMonth = locale === "fa" ? PmonthMap[month] : monthMap[month];

  return (
    <div
      className={`
      ${style.flex}
      ${style.h_6}
      ${style.relative}
      ${style.justify_around}
      ${style.items_center}
      ${style.w_full}
      ${datePickerHeaderClassName}
      ${locale === "fa" ? style.flex_row : style.flex_row_reverse}
    `}
    >
      <div
        style={{ backgroundColor: highlightColor }}
        className={`
          ${style.absolute}
          ${style.left_0}
          ${style.w_6}
          ${style.h_6}
          ${style.flex}
          ${style.justify_center}
          ${style.items_center}
          ${style.rounded}
        `}
        onClick={() => (locale === "fa" ? setMonth(+1) : setMonth(-1))}
      >
        {/* <RightChevron secondaryColor={secondaryColor} /> */}
        <LeftChevron secondaryColor={secondaryColor} />
      </div>
      <div
        className={`
  ${style.flex}
  ${style.gap_4}
  ${style.mx_auto}
`}
      >
        <span
          className={`
  ${style.font_bold}
`}
          onClick={() => onViewChange(CalendarViews.MONTH)}
          style={{ fontSize: "14px", color: tertiaryColor }}
        >
          {currentMonth} ,
        </span>
        <span
          className={`
  ${style.font_bold}
`}
          onClick={() => onViewChange(CalendarViews.YEAR)}
          style={{ fontSize: "14px", color: tertiaryColor }}
        >
          {convertToPersianNumbers(year.toString())}
        </span>
      </div>
      <div
        style={{
          backgroundColor: highlightColor,
          width: "25px",
          height: "25px",
        }}
        className={`
          ${style.absolute}
          ${style.right_0}
          ${style.flex}
          ${style.justify_center}
          ${style.items_center}
          ${style.rounded}
        `}
        onClick={() => (locale === "fa" ? setMonth(-1) : setMonth(1))}
      >
        <RightChevron secondaryColor={secondaryColor} />
      </div>
    </div>
  );
};

export default DatePickerHeader;
