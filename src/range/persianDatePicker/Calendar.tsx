import {
  FC,
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useState,
} from 'react';

import jmoment from 'moment-jalaali';

import style from '../../main.module.css';
import type { TLocale } from '../core/type';
import DataPickerBody from './dataPickerBody';
import DatePickerHeader from './datePickerHeader';
import { CalendarViews } from './enum';
import {
  getFirstDayIndexInMonth,
  getNumberOfDays,
  isEqualDays,
} from './helper';
import MonthPicker from './monthPicker';
import YearPicker from './yearPicker';

const todayTimestamp = new Date().setHours(0, 0, 0, 0);
const today = jmoment();
export interface WeekDaySelectResponse {
  indexOfDay: number;
  month: number;
  year: number;
  timestamp: number;
  gregorian: string;
  jalali: string;
  isoGregorian: string;
  isoJalali: string;
}
interface Props {
  manualContainerRef?: RefObject<HTMLDivElement | null>;
  onChange: (start: number | null, end: number | null) => void;
  // Display & behavior
  model?: "range" | "date";
  locale?: TLocale;
  disablePreviousDays?: boolean;
  // Custom render
  renderDayFn?: (
    day: { timestamp: number; currentMonth: boolean },
    index: number
  ) => ReactNode;
  renderDayStyle?: (args: {
    timestamp?: number;
    isSpecial?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isToday?: boolean;
    isInRange?: boolean;
    isFrom?: boolean;
    isTo?: boolean;
  }) => React.CSSProperties;
  renderColStyle?: (args: {
    isSelectedCol: boolean;
    name: string;
    index: number;
  }) => React.CSSProperties;
  renderDayContent?: (info: {
    day: string | number;
    timestamp: number;
    isSpecial: boolean;
    isColSelected: boolean;
  }) => ReactNode;
  selectableCols?:boolean
  renderColContent?: (info: {
    isSelectedCol: boolean;
    name: string;
  }) => ReactNode;
  onWeekdaySelect?: (e: WeekDaySelectResponse[]) => void;
  WeekHeaderClassName?: string;
  WeekHeaderStyle?: React.CSSProperties;
  // State
  startDate?: number;
  endDate?: number;
  specialDays?: number[];
  disabledDays?: number[];
  // Styles
  primaryColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  calendarBaseWidth?: number;
  containerClassName?: string;
  datePickerHeaderClassName?: string;
  datePickerBodyClassName?: string;
  yearPickerClassName?: string;
  selectMultiple?:boolean

}

interface State {
  year: number;
  month: number;
  hoveredDay: number | null;
}

const Calendar: FC<Props> = ({
  onChange,
  model = "date",
  startDate,
  endDate,
  locale = "fa",
  disablePreviousDays = false,
  renderDayFn,
  renderDayContent,
  renderDayStyle,
  renderColStyle,
  specialDays = [],
  disabledDays = [],
  calendarBaseWidth,
  containerClassName = "",
  datePickerHeaderClassName = "",
  datePickerBodyClassName = "",
  yearPickerClassName = "",
  primaryColor = "#000",
  backgroundColor = "#fff",
  highlightColor = "#cacaca",
  secondaryColor = "#585858",
  tertiaryColor = "#939393",
  onWeekdaySelect,
  selectableCols=false,
  WeekHeaderClassName,
  WeekHeaderStyle,
  renderColContent,
  selectMultiple=false
}) => {
  // -------------------------------
  // STATE & VIEW MANAGEMENT
  // -------------------------------
  const [state, setState] = useState<State>({
    year: locale === "fa" ? today.jYear() : today.year(),
    month: locale === "fa" ? today.jMonth() : today.month(),
    hoveredDay: null,
  });
  const [colSelected, setColSelected] = useState<number[]>([]);

  const [view, setView] = useState<CalendarViews>(CalendarViews.DAY);

  // -------------------------------
  // NAVIGATION HANDLERS
  // -------------------------------
  const changeView = useCallback((v: CalendarViews) => setView(v), []);
  const changeYear = useCallback((y: number) => {
    setState((prev) => ({ ...prev, year: y }));
    setView(CalendarViews.MONTH);
  }, []);

  const changeMonth = useCallback((m: number) => {
    setState((prev) => ({ ...prev, month: m }));
    setView(CalendarViews.DAY);
  }, []);

  const shiftMonth = (offset: 1 | -1) => {
    let { year, month } = state;
    month += offset;

    if (month < 0) {
      month = 11;
      year--;
    } else if (month > 11) {
      month = 0;
      year++;
    }
    setState({ ...state, year, month });
  };

  const shiftYear = (offset: 1 | -1) =>
    setState((prev) => ({ ...prev, year: prev.year + offset }));

  // -------------------------------
  // RANGE HANDLING
  // -------------------------------
  const handleRangeSelection = useCallback(
    (day: number) => {
      if (startDate && endDate && startDate === endDate && startDate === day) {
        onChange(null, null);
        setState((s) => ({ ...s, hoveredDay: null }));
        return;
      }
      if (!startDate) {
        onChange(day, null);
        setState((s) => ({ ...s, hoveredDay: day }));
        return;
      }
      if (startDate && !endDate) {
        if (day > startDate) {
          onChange(startDate, day);
        } else onChange(day, startDate);
        setState((s) => ({ ...s, hoveredDay: day }));
        return;
      }

      // Restart selection
      onChange(day, null);
      setState((s) => ({ ...s, hoveredDay: day }));
    },
    [startDate, endDate, onChange]
  );

  // -------------------------------
  // DATE CLICK HANDLER
  // -------------------------------
  const handleDateClick = useCallback(
    (timestamp: number) => {
      setColSelected([]);
      if (model === "range") handleRangeSelection(timestamp);
      else onChange(timestamp, null);
    },
    [model, handleRangeSelection, onChange]
  );

  // -------------------------------
  // CALENDAR DAYS GENERATOR
  // -------------------------------
  const getCalendarDays = (year: number, month: number) => {
    const daysInMonth = getNumberOfDays(year, month, locale);
    const days: { timestamp: number; currentMonth: boolean }[] = [];
    const prevOffset = getFirstDayIndexInMonth(year, month, locale);
    const nextOffset = 42 - daysInMonth - prevOffset;

    // Previous month
    if (prevOffset > 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const prevDays = getNumberOfDays(prevYear, prevMonth, locale);

      for (let i = prevOffset; i > 0; i--) {
        const date = new Date(
          locale === "fa"
            ? jmoment(
                `${prevYear}/${prevMonth + 1}/${prevDays - i + 1}`,
                "jYYYY/jM/jD"
              ).format()
            : `${prevYear}/${prevMonth + 1}/${prevDays - i + 1}`
        );
        days.push({
          timestamp: date.setHours(0, 0, 0, 0),
          currentMonth: false,
        });
      }
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        locale === "fa"
          ? jmoment(`${year}/${month + 1}/${i}`, "jYYYY/jM/jD").format()
          : `${year}/${month + 1}/${i}`
      );
      days.push({ timestamp: date.setHours(0, 0, 0, 0), currentMonth: true });
    }

    // Next month
    for (let i = 1; i <= nextOffset; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const date = new Date(
        locale === "fa"
          ? jmoment(`${nextYear}/${nextMonth + 1}/${i}`, "jYYYY/jM/jD").format()
          : `${nextYear}/${nextMonth + 1}/${i}`
      );
      days.push({ timestamp: date.setHours(0, 0, 0, 0), currentMonth: false });
    }

    return days;
  };

  // -------------------------------
  // RENDER DAY BUTTON
  // -------------------------------
  const renderDay = useCallback(
    (day: { currentMonth: boolean; timestamp: number }, index: number) => {
      const currentDay = jmoment(day.timestamp);
      const isSpecial = specialDays.includes(day.timestamp);
      const isHoliday = disabledDays?.includes(day.timestamp);
      const isDisabled =
        (model === "date" &&
          disablePreviousDays &&
          day.timestamp < todayTimestamp) ||
        isHoliday;

      const isToday = isEqualDays(day.timestamp, todayTimestamp);
      const isSelected =
        model === "date" && isEqualDays(day.timestamp, startDate || 0);
      const isHoveredDay =
        model === "range" &&
        startDate &&
        !endDate &&
        (state.hoveredDay as number) >= day.timestamp &&
        day.timestamp > startDate;
      const isColSelected = colSelected.includes(day.timestamp);
      const isFrom = model === "range" && isEqualDays(day.timestamp, startDate);
      const isTo = model === "range" && isEqualDays(day.timestamp, endDate);
      const isInRange =
        model === "range" &&
        startDate &&
        endDate &&
        day.timestamp > startDate &&
        day.timestamp < endDate;
      return (
        <div
          key={index}
          className={`${style.flex} ${style.justify_center} ${style.items_center} ${style.w_full} ${style.h_full}  `}
        >
          <button
            type="button"
            disabled={isDisabled}
            onClick={() => day.currentMonth && handleDateClick(day.timestamp)}
            onMouseOver={() => {
              if (!endDate && state.hoveredDay) {
                setState((prev) => {
                  return {
                    ...prev,
                    hoveredDay: day.timestamp,
                  };
                });
              }
            }}
            className={`
              ${style.flex} 
              ${style.flex_col} 
              ${style.justify_evenly} 
              ${style.items_center} 
              ${style.rounded_md} 
              ${style.w_6} ${style.aspect_square} ${style.text_center} ${style.cursor_pointer}`}
            style={{
              position: "relative",
              pointerEvents: isDisabled ? "none" : "auto",
              opacity: isDisabled ? 0.5 : day.currentMonth ? 1 : 0,
              color:
                isTo || isFrom || isSelected || isColSelected
                  ? backgroundColor
                  : tertiaryColor,
              border: isToday ? `2px solid ${secondaryColor}` : "none",
              background:
                isTo || isFrom || isColSelected
                  ? secondaryColor
                  : isSelected
                  ? tertiaryColor
                  : isInRange || isHoveredDay
                  ? highlightColor
                  : "",
              fontSize: "14px",
              ...(renderDayStyle
                ? renderDayStyle({
                    timestamp: day.timestamp,
                    isSpecial,
                    isSelected,
                    // isColSelected,
                    isDisabled,
                    isToday,
                    isInRange: !!isInRange, // 👈 اینجا
                    isFrom,
                    isTo,
                  })
                : {}),
            }}
          >
            {renderDayContent
              ? renderDayContent({
                  day:
                    locale === "fa"
                      ? currentDay.jDate().toLocaleString("fa")
                      : currentDay.date(),
                  timestamp: day.timestamp,
                  isSpecial,
                  isColSelected,
                })
              : locale === "fa"
              ? currentDay.jDate().toLocaleString("fa")
              : currentDay.date()}
          </button>
        </div>
      );
    },
    [
      model,
      locale,
      startDate,
      endDate,
      state,
      specialDays,
      disabledDays,
      disablePreviousDays,
      handleDateClick,
      primaryColor,
      backgroundColor,
      tertiaryColor,
      highlightColor,
      secondaryColor,
      renderDayContent,
      renderDayStyle,
      renderColStyle,
      colSelected,
    ]
  );

  // -------------------------------
  // RENDER CALENDAR BODY
  // -------------------------------

  const jalaliMap: Record<0 | 1 | 2 | 3 | 4 | 5 | 6, number> = {
    1: 0, // شنبه
    2: 1, // یکشنبه
    3: 2, // دوشنبه
    4: 3, // سه شنبه
    5: 4, // چهارشنبه
    6: 5, // پنجشنبه
    0: 6, // جمعه
  };

  const renderCalendar = (year: number, month: number) => {
    const days = getCalendarDays(year, month);
    const weekNames =
      locale === "fa"
        ? ["ش", "ی", "د", "س", "چ", "پ", "ج"]
        : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const handleWeekDaySelect = (e: any, weekdayIndex: number) => {
      e.preventDefault();
      onChange(null, null);
      setState((s) => ({ ...s, hoveredDay: null }));
      const filtered = days.filter((d) => {
        if (!d.currentMonth) return false;

        const date = new Date(d.timestamp);
        if (locale === "en") {
          return date.getDay() === weekdayIndex;
        }

        const jDay = jmoment(date).day();
        const expected = jalaliMap[weekdayIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6];

        return jDay === expected;
      });

      const output = filtered.map((d) => {
        const date = new Date(d.timestamp);

        return {
          indexOfDay: weekdayIndex,
          month: month,
          year: year,
          timestamp: d.timestamp,
          gregorian: jmoment(date).utc().startOf("day").format("YYYY/MM/DD"),
          jalali: jmoment(date).format("jYYYY/jMM/jDD"),
          isoGregorian: jmoment(date).utc().startOf("day").toISOString(),
          isoJalali: jmoment(date)
            .locale("fa")
            .startOf("day")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        };
      });
      const col = output.map((day) => day.timestamp);
      const isEqual = (arr1: number[], arr2: number[]) =>
        arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
      setColSelected(isEqual(col, colSelected) ? [] : col);
      onWeekdaySelect?.(isEqual(col, colSelected) ? [] :output);
    };

    return (
      <>
        {/* Week header */}
        <div
          className={`${style.grid} ${style.grid_cols_7} ${style.justify_between} ${style.gap_x_2} ${style.py_2}`}
          dir={locale === "fa" ? "rtl" : "ltr"}
          style={{...WeekHeaderStyle}}
        >
          {weekNames.map((name, i) => {
            const isSelectedCol =
              colSelected.length > 0
                ? locale == "fa"
                  ? jmoment(colSelected[0]).day() ==
                    jalaliMap[i as 0 | 1 | 2 | 3 | 4 | 5 | 6]
                  : new Date(colSelected[0]).getDay() == i
                : false;
            return (
              <button
                key={i}
                disabled={!selectableCols}
                className={`${style.flex} ${style.justify_center} 
              ${style.items_center}  ${style.w_full} ${style.border_none} ${WeekHeaderClassName} ${style.bg_none}  `}
                // style={{
                //   fontSize: "14px",
                //   cursor: "pointer",
                //   // color: isSelectedCol ? backgroundColor : tertiaryColor,
                //   // background: isSelectedCol ? secondaryColor : undefined,
                //   ...(renderColStyle
                //     ? renderColStyle({ isSelectedCol, name, index: i })
                //     : {}),
                //   ...WeekHeaderStyle,
                // }}
                onClick={(e) => handleWeekDaySelect(e, i)}
              >
                {renderColContent ? (
                  renderColContent({
                    isSelectedCol,
                    name,
                  })
                ) : (
                  <span
                    className={`
              ${style.flex} 
              ${style.justify_center} 
              ${style.items_center} 
              ${style.rounded_md} 
              ${style.w_6} ${style.aspect_square} ${style.text_center} ${selectableCols && style.cursor_pointer}`}
                    style={{
                      position: "relative",
                      color: isSelectedCol ? backgroundColor : tertiaryColor,
                      border: "none",
                      background: isSelectedCol ? secondaryColor : "",
                      fontSize: "14px",
                    }}
                  >
                    {name}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Days */}
        <div
          className={`${style.w_full} ${style.grid} ${style.grid_cols_7} ${style.justify_between} ${style.gap_2}`}
          style={{ minWidth: "24px" }}
          dir={locale === "fa" ? "rtl" : "ltr"}
        >
          {days.map((d, i) =>
            renderDayFn ? renderDayFn(d, i) : renderDay(d, i)
          )}
        </div>
      </>
    );
  };

  // -------------------------------
  // MAIN RENDER
  // -------------------------------
  return (
    <div
      className={`${style.flex} ${style.flex_col} ${style.items_center} ${style.w_full} ${style.h_fit} ${containerClassName}`}
      style={{ width: calendarBaseWidth }}
    >
      {view === CalendarViews.DAY && (
        <>
          <DatePickerHeader
            datePickerHeaderClassName={datePickerHeaderClassName}
            year={state.year}
            month={state.month}
            setMonth={shiftMonth}
            locale={locale}
            onViewChange={changeView}
            highlightColor={highlightColor}
            tertiaryColor={tertiaryColor}
            secondaryColor={secondaryColor}
          />
          <hr className={`${style.mt_2} ${style.border} ${style.w_full}`} />
          <DataPickerBody
            year={state.year}
            month={state.month}
            renderMonthBody={renderCalendar}
            locale={locale}
            datePickerBodyClassName={datePickerBodyClassName}
          />
        </>
      )}

      {view === CalendarViews.MONTH && (
        <MonthPicker
          currentMonth={state.month}
          locale={locale}
          onSelectMonth={changeMonth}
          onChangeYear={shiftYear}
          currentYear={state.year}
          tertiaryColor={tertiaryColor}
          secondaryColor={secondaryColor}
          backgroundColor={backgroundColor}
        />
      )}

      {view === CalendarViews.YEAR && (
        <YearPicker
          currentYear={state.year}
          primaryColor={primaryColor}
          onSelectYear={changeYear}
          yearPickerClassName={yearPickerClassName}
          secondaryColor={secondaryColor}
          backgroundColor={backgroundColor}
        />
      )}
    </div>
  );
};

export default memo(Calendar);
