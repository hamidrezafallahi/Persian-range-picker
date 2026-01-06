import type { FC } from 'react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { LeftChevron } from '../assets/icons/LeftChevron';
import { RightChevron } from '../assets/icons/RightChevron';
import { TLocale } from '../core/type';
import style from '../main.module.css';
import { convertToPersianNumbers } from './helper';

interface Props {
  currentYear: number;
  onSelectYear: (year: number) => void;
  yearPickerClassName?: string;
  backgroundColor?: string;
  secondaryColor?: string;
  primaryColor?: string;
  locale?:TLocale
}

const YearPicker: FC<Props> = ({
  currentYear,
  onSelectYear,
  yearPickerClassName,
  backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
  secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه   - متن #585858   ,
  primaryColor = "#000", //رنگ اصلی (برای دکمه‌ها، لینک‌ها یا تأکید اصلی برند)
  locale="fa"
}) => {
  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const yearList = useMemo(() => {
    const firstYear = currentYear + page * 20;
    const yearArray: number[] = [];
    for (let i = 0; i < 20; i++) {
      yearArray.push(firstYear - i);
    }

    return yearArray;
  }, [page, currentYear]);

  const changePageHandler = (offset: -1 | 1) => {
    setPage((prev) => prev + offset);
  };

  const selectYearHandler = (year: number) => {
    onSelectYear(year);
  };
  useEffect(() => {
    if (containerRef.current) {
      const computedDir = getComputedStyle(containerRef.current).direction;
      setDir(computedDir === "rtl" ? "rtl" : "ltr");
    }
  }, []);

  return (
    <div
      className={`
      ${style.w_full}
      ${style.flex}
      ${style.flex_col}
     
      ${yearPickerClassName}
    `} ref={containerRef}
      style={{ minHeight: "327px" }}
    >
      <div
        className={`
  ${style.w_full}
  ${style.flex}
  ${dir === "ltr" ? style.flex_row : style.flex_row_reverse}
  ${style.justify_between}
`}
      >
        <div onClick={() => changePageHandler(1)}>
          <LeftChevron secondaryColor={secondaryColor} />
        </div>
        <div>
          <span
            style={{ color: primaryColor }}
            className={`
              ${style.font_bold}
              ${style.text_sm}
            `}
          >{`${locale == "fa" ? convertToPersianNumbers(yearList[0].toString()):yearList[0].toString()} - ${locale == "fa"?convertToPersianNumbers(yearList[yearList.length - 1].toString()):yearList[yearList.length - 1].toString()}`}</span>
        </div>
        <div onClick={() => changePageHandler(-1)}>
          <RightChevron secondaryColor={secondaryColor} />
        </div>
      </div>
      <div
        className={`
  ${style.w_full}
  ${style.mx_auto}
  ${style.flex}
  ${style.flex_wrap}
  ${style.justify_center}
  ${style.items_center}
  ${style.pt_4}
  ${style.overflow_y_auto}
  ${style.h_full}
`}
      >
        {yearList.map((year) => (
          <div
            style={{
              backgroundColor: year === currentYear ? secondaryColor : "",
              color: year === currentYear ? backgroundColor : secondaryColor,
              fontWeight: year === currentYear ? "500" : "",
              width: "80px",
            }}
            key={year}
            className={`
             
              ${style.h_9}
              ${style.flex}
              ${style.justify_center}
              ${style.items_center}
              ${style.rounded}
            `}
            onClick={() => selectYearHandler(year)}
          >
            <span
              className={`
  ${style.text_sm}
`}
            >
              {locale == "fa" ? convertToPersianNumbers(year.toString()):year.toString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearPicker;
