import type { FC } from 'react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { LeftChevron } from '../assets/icons/LeftChevron';
import { RightChevron } from '../assets/icons/RightChevron';
import type { TLocale } from '../core/type';
import style from '../main.module.css';
import { convertToPersianNumbers } from './helper';

interface Props {
  currentYear: number;
  onSelectYear: (year: number) => void;
  yearPickerClassName?: string;
  backgroundColor?: string;
  secondaryColor?: string;
  primaryColor?: string;
  locale?: TLocale;
}

const YearPicker: FC<Props> = ({
  currentYear,
  onSelectYear,
  yearPickerClassName,
  backgroundColor = '#fff',
  secondaryColor = '#585858',
  primaryColor = '#000',
  locale = 'fa',
}) => {
  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  const yearList = useMemo(() => {
    const firstYear = currentYear + page * 20;
    const yearArray: number[] = [];
    for (let i = 0; i < 20; i++) {
      yearArray.push(firstYear - i);
    }
    return yearArray;
  }, [page, currentYear]);

  useEffect(() => {
    if (containerRef.current) {
      const computedDir = getComputedStyle(containerRef.current).direction;
      setDir(computedDir === 'rtl' ? 'rtl' : 'ltr');
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
        ${style.w_full}
        ${style.h_full}
        ${style.flex}
        ${style.flex_col}
        ${yearPickerClassName ?? ''}
      `}
      style={{ minHeight: 0 }}
    >
      <div
        className={`
          ${style.w_full}
          ${style.flex}
          ${style.h_6}
          ${style.items_center}
          ${dir === 'ltr' ? style.flex_row : style.flex_row_reverse}
          ${style.justify_between}
        `}
      >
        <div
          onClick={() => setPage((prev) => prev + 1)}
          style={{ cursor: 'pointer' }}
        >
          <LeftChevron secondaryColor={secondaryColor} />
        </div>
        <div>
          <span
            style={{ color: primaryColor }}
            className={`${style.font_bold} ${style.text_sm}`}
          >
            {`${
              locale === 'fa'
                ? convertToPersianNumbers(yearList[0].toString())
                : yearList[0].toString()
            } - ${
              locale === 'fa'
                ? convertToPersianNumbers(
                    yearList[yearList.length - 1].toString()
                  )
                : yearList[yearList.length - 1].toString()
            }`}
          </span>
        </div>
        <div
          onClick={() => setPage((prev) => prev - 1)}
          style={{ cursor: 'pointer' }}
        >
          <RightChevron secondaryColor={secondaryColor} />
        </div>
      </div>

      <div
        className={`${style.w_full}`}
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(5, 1fr)',
          gap: 8,
          paddingTop: 12,
          alignItems: 'stretch',
          justifyItems: 'stretch',
        }}
      >
        {yearList.map((year) => (
          <button
            type="button"
            key={year}
            onClick={() => onSelectYear(year)}
            className={`${style.rounded} ${style.flex} ${style.justify_center} ${style.items_center} ${style.border_none} ${style.w_full} ${style.h_full}`}
            style={{
              backgroundColor: year === currentYear ? primaryColor : 'transparent',
              color: year === currentYear ? backgroundColor : secondaryColor,
              fontWeight: year === currentYear ? 500 : 400,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {locale === 'fa'
              ? convertToPersianNumbers(year.toString())
              : year.toString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearPicker;
