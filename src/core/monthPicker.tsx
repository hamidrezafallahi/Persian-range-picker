import { useState } from 'react';

import moment from '../dateEngine';

import style from '../main.module.css';
import { getTimestamp, toPersianDigits } from './helper';
import type {
  IDate,
  TLocale,
} from './type';

interface IMonthPickerType {
  dateFromOutside: IDate;
  onDateChange: (e: IDate) => void;
  monthPickerClassName?: string;
  locale: TLocale;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  tertiaryColor?: string;
}

const MonthPicker = ({
  dateFromOutside = {
    from: moment().locale('fa').clone().startOf('jYear').valueOf(),
    to: moment().locale('fa').clone().endOf('day').valueOf(),
  },
  onDateChange,
  monthPickerClassName,
  locale,
  backgroundColor = '#fff',
  tertiaryColor = '#939393',
  highlightColor = '#cacaca',
  secondaryColor = '#585858',
  primaryColor = '#000',
}: IMonthPickerType) => {
  const [state, setState] = useState<{
    selectedMonth: number;
    hoveredMonth: number;
  }>({
    selectedMonth: 0,
    hoveredMonth: 0,
  });
  const currentDate = moment().locale(locale === 'fa' ? 'fa' : 'en');
  const { from, to } = dateFromOutside;
  const thisYear = locale === 'fa' ? currentDate.jYear() : currentDate.year();
  const thisYearFrom =
    locale === 'fa'
      ? moment(from).locale('fa').jYear()
      : moment(from).locale('en').year();
  const thisYearTo =
    locale === 'fa'
      ? moment(to).locale('fa').jYear()
      : moment(to).locale('en').year();
  const startDate =
    locale === 'fa'
      ? moment(from).locale('fa').jMonth()
      : moment(from).locale('en').month();
  const endDate =
    locale === 'fa'
      ? moment(to).locale('fa').jMonth()
      : moment(to).locale('en').month();

  const handleMonthPicker = (chosenMonth: number) => {
    setState({ selectedMonth: chosenMonth, hoveredMonth: chosenMonth });
    const date = new Date(chosenMonth);
    let newFrom = dateFromOutside.from;
    let newTo = dateFromOutside.to;
    if (
      dateFromOutside.from == 0 ||
      dateFromOutside.from == null ||
      Number.isNaN(dateFromOutside.from)
    ) {
      newFrom =
        locale === 'fa'
          ? moment(chosenMonth).startOf('jMonth').valueOf()
          : new Date(date.getFullYear(), date.getMonth(), 1).valueOf();
    } else if (dateFromOutside.from && dateFromOutside.to == 0) {
      if (chosenMonth < (getTimestamp(dateFromOutside.from) ?? (0 as number))) {
        newFrom =
          locale === 'fa'
            ? moment(chosenMonth).startOf('jMonth').valueOf()
            : new Date(date.getFullYear(), date.getMonth(), 1).valueOf();
        newTo = 0;
      } else {
        newTo =
          locale === 'fa'
            ? moment(chosenMonth).endOf('jMonth').valueOf()
            : new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
              ).valueOf();
      }
    } else if (
      dateFromOutside.from &&
      dateFromOutside.to &&
      (getTimestamp(dateFromOutside.to) as number) > 0
    ) {
      newFrom =
        locale === 'fa'
          ? moment(chosenMonth).startOf('jMonth').valueOf()
          : new Date(date.getFullYear(), date.getMonth(), 1).valueOf();
      newTo = 0;
    }
    if (onDateChange) {
      onDateChange({ from: newFrom, to: newTo });
    }
  };

  const handleHoveredMonth = (index: number) => {
    const hoveredMonth =
      locale === 'fa'
        ? currentDate.clone().jMonth(index).startOf('jMonth').startOf('day').valueOf()
        : currentDate.clone().month(index).startOf('month').startOf('day').valueOf();
    if (dateFromOutside.from && dateFromOutside.to == 0) {
      setState((prev) => ({
        ...prev,
        hoveredMonth,
      }));
    }
  };

  const endpointColor = primaryColor || secondaryColor;

  return (
    <div
      dir={locale == 'fa' ? 'rtl' : 'ltr'}
      className={`
        ${style.justify_between}
        ${style.gap_2}
        ${style.grid}
        ${style.grid_cols_6}
        ${style.w_full}
        ${locale === 'fa' ? style.font_Number_Farsi : ''}
        ${monthPickerClassName ?? ''}
      `}
    >
      {Array.from({ length: 12 }, (_, index) => {
        const chosenMonth =
          locale === 'fa'
            ? currentDate.clone().jMonth(index).startOf('jMonth').startOf('day').valueOf()
            : currentDate.clone().month(index).startOf('month').startOf('day').valueOf();
        const isBetween =
          thisYearFrom == thisYear &&
          thisYearTo == thisYear &&
          startDate <= index &&
          index <= endDate;
        const isStartMonth = startDate == index;
        const isEndMonth = endDate == index && isBetween;
        const isToMonth =
          locale === 'fa'
            ? moment().locale('fa').startOf('jMonth').jMonth() === index
            : moment().locale('en').startOf('month').month() === index;

        const isHovered =
          state.hoveredMonth &&
          state.selectedMonth &&
          chosenMonth <= state.hoveredMonth &&
          chosenMonth > state.selectedMonth;

        const isEndpoint = isStartMonth || isEndMonth;
        const label =
          locale === 'fa'
            ? toPersianDigits(String(index + 1))
            : String(index + 1);

        return (
          <div
            key={index}
            className={`
              ${style.flex}
              ${style.justify_center}
              ${style.items_center}
              ${style.w_full}
              ${style.h_full}
            `}
          >
            <button
              type="button"
              className={`
                ${style.flex}
                ${style.flex_col}
                ${style.justify_evenly}
                ${style.items_center}
                ${style.rounded_md}
                ${style.w_6}
                ${style.aspect_square}
                ${style.text_center}
                ${style.cursor_pointer}
                ${style.border_none}
                ${style.overflow_hidden}
                ${style.p_1}
                ${style.col_span_1}
              `}
              onClick={() => handleMonthPicker(chosenMonth)}
              onMouseOver={() => handleHoveredMonth(index)}
              style={{
                position: 'relative',
                color: isEndpoint ? backgroundColor : tertiaryColor,
                border: isToMonth ? `2px solid ${endpointColor}` : 'none',
                background: isEndpoint
                  ? endpointColor
                  : isHovered || isBetween
                    ? highlightColor
                    : 'transparent',
                fontSize: 14,
              }}
            >
              {label}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MonthPicker;
