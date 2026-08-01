import {
  type FC,
  useEffect,
  useRef,
  useState,
} from 'react';

import { LeftChevron } from '../assets/icons/LeftChevron';
import { RightChevron } from '../assets/icons/RightChevron';
import type { TLocale } from '../core/type';
import style from '../main.module.css';
import { months } from './constants';
import { convertToPersianNumbers } from './helper';

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
  primaryColor?: string;
}

const MonthPicker: FC<Props> = ({
  currentMonth,
  locale,
  onSelectMonth,
  currentYear,
  onChangeYear,
  monthPickerClassName,
  backgroundColor = '#fff',
  secondaryColor = '#585858',
  primaryColor = '#000',
}) => {
  const monthList = months[locale];
  const containerRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    if (containerRef.current) {
      const computedDir = getComputedStyle(containerRef.current).direction;
      setDir(computedDir === 'rtl' ? 'rtl' : 'ltr');
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${style.w_full} ${style.h_full} ${style.flex} ${style.flex_col}`}
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
        <div onClick={() => onChangeYear(1)} style={{ cursor: 'pointer' }}>
          <LeftChevron secondaryColor={secondaryColor} />
        </div>
        <div>
          <span
            className={`${style.font_bold} ${style.text_sm}`}
            style={{ color: secondaryColor }}
          >
            {locale === 'fa'
              ? convertToPersianNumbers(currentYear.toString())
              : currentYear.toString()}
          </span>
        </div>
        <div onClick={() => onChangeYear(-1)} style={{ cursor: 'pointer' }}>
          <RightChevron secondaryColor={secondaryColor} />
        </div>
      </div>

      <div
        className={`${style.w_full} ${monthPickerClassName ?? ''}`}
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          gap: 8,
          paddingTop: 12,
          alignItems: 'stretch',
          justifyItems: 'stretch',
        }}
      >
        {monthList.map((month, index) => (
          <button
            type="button"
            key={index}
            onClick={() => onSelectMonth(index)}
            className={`${style.rounded} ${style.flex} ${style.justify_center} ${style.items_center} ${style.border_none} ${style.w_full} ${style.h_full}`}
            style={{
              backgroundColor: currentMonth === index ? primaryColor : 'transparent',
              color: currentMonth === index ? backgroundColor : secondaryColor,
              fontWeight: currentMonth === index ? 500 : 400,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthPicker;
