import {
  FC,
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useReducer,
} from 'react';

import jmoment from 'moment-jalaali';

import style from '../../main.module.css';
import type {
  IDate,
  TLocale,
} from '../core/type';
import DataPickerBody from './dataPickerBody';
import DatePickerHeader from './datePickerHeader';
import { CalendarViews } from './enum';
import {
  getFirstDayIndexInMonth,
  getNumberOfDays,
  isEqualDays,
} from './helper';
import MonthPicker from './monthPicker';
import { CalendarAction } from './type';
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
  onChange: ( e:number|number[]|IDate) => void;
  // Display & behavior
  model?: "range" | "date";
  value?: number|number[]|IDate|null;
  defaultValue?:  number|number[]|IDate|null;
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
  selectableCols?: boolean;
  renderColContent?: (info: {
    isSelectedCol: boolean;
    name: string;
  }) => ReactNode;
  onWeekdaySelect?: (e: WeekDaySelectResponse[]) => void;
  WeekHeaderClassName?: string;
  WeekHeaderStyle?: React.CSSProperties;
  // State
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
  selectMultiple?: boolean;
}

interface CalendarState {
  year: number;
  month: number;
  view: CalendarViews;
  hoveredDay: number | null;
  date: number | null;
  range: {from:number|null,to:number|null};
  mode: "date" | "range";
  multiple: number[];
  weekDay:number|null;
}

const Calendar: FC<Props> = ({
  onChange,
  model = "date",
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
  selectableCols = false,
  WeekHeaderClassName,
  WeekHeaderStyle,
  renderColContent,
  value,
  defaultValue,
  selectMultiple = false,
}) => {
  // -------------------------------
  // STATE & VIEW MANAGEMENT
  // -------------------------------
  const initialState: CalendarState = {
    year: locale === "fa" ? today.jYear() : today.year(),
    month: locale === "fa" ? today.jMonth() : today.month(),
    hoveredDay: null,
    view: CalendarViews.DAY,
    date:
      model == "date" && defaultValue
        ? new Date(defaultValue as number).valueOf()
        : null,
    range:
      model == "range" && (defaultValue as IDate)
        ? {
            from: new Date(defaultValue?.from).valueOf(),
            to: new Date(defaultValue?.to).valueOf(),
          }
        : { from: null, to: null },
    mode: "date",
    multiple:
      model == "date" && selectMultiple && defaultValue
        ? (defaultValue as (number | string)[]).map((i) => new Date(i as number).valueOf())
        : [],
        weekDay:null
  };

  function reducer(
    state: CalendarState,
    action: CalendarAction
  ): CalendarState {
    switch (action.type) {
      case "SET_FROM":
        return {
          ...state,
          multiple: [],
          weekDay:null,
          range: { ...state.range, from: action.payload },
        };
      case "SET_TO":
        return { ...state, range: { ...state.range, to: action.payload } };
      case "SET_DATE":
        return { ...state, multiple: [],weekDay:null, date: action.payload };
      case "SET_MULTIPLE":
        return {
          ...state,
          range: { from: null, to: null },
          date: null,
          weekDay:null,
          multiple: state.multiple.includes(action.payload)
            ? state.multiple.filter((m) => m !== action.payload)
            : [...state.multiple, action.payload],
        };
      case "HOVER":
        return { ...state, hoveredDay: action.payload };
      case "CHANGE_YEAR":
        return { ...state, year: action.payload, view: CalendarViews.MONTH };
      case "SHIFT_YEAR":
        return {
          ...state,
          year: state.year + action.payload,
          view: CalendarViews.MONTH,
        };
      case "SHIFT_MONTH":
        return {
          ...state,
          year: action.payload.year,
          month: action.payload.month,
        };
      case "CHANGE_MONTH":
        return { ...state, year: action.payload, view: CalendarViews.DAY };
      case "CHANGE_VIEW":
        return { ...state, view: action.payload };
      case "CHANGE_HOVERED_DAY":
        return { ...state, hoveredDay: action.payload };
      case "SET_WEEK_DAYS":
        return {
          ...state,
          range: { from: null, to: null },
          date: null,
          multiple: action.payload.multiple,
          weekDay:action.payload.index
        };
      case "SET_RANGE":
        return {
          ...state,
          range: {from:action.payload.from,to:action.payload.to},
          hoveredDay:action.payload.from
 
        };
      case "RESET_RANGE":
        return {
          ...state,
          range: { from: null, to: null },
          date: null,
          multiple:[],
          weekDay:null,
          hoveredDay:null,
        };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }
  const [state, dispatchState] = useReducer(reducer, initialState);

  // -------------------------------
  // NAVIGATION HANDLERS
  // -------------------------------
  const changeView = useCallback((v: CalendarViews) => {
    dispatchState({ type: "CHANGE_VIEW", payload: v });
  }, []);
  const changeYear = useCallback((y: number) => {
    dispatchState({ type: "CHANGE_YEAR", payload: y });
  }, []);

  const changeMonth = useCallback((m: number) => {
    dispatchState({ type: "CHANGE_MONTH", payload: m });
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
    dispatchState({ type: "SHIFT_MONTH", payload: { year, month } });
  };

  const shiftYear = (offset: 1 | -1) =>
    dispatchState({ type: "SHIFT_YEAR", payload: offset });

  // -------------------------------
  // RANGE HANDLING
  // -------------------------------
  const handleRangeSelection = useCallback(
    (day: number) => {
      if (state.range.from && state.range.to && state.range.from === state.range.to && state.range.from === day) {
        dispatchState({ type: "RESET_RANGE"});
        return;
      }
      if (!state.range.from) {
        dispatchState({ type: "SET_FROM", payload: day });
        return;
      }
      if (state.range.from && !state.range.to) {
        if (day > state.range.from) {
        onChange({from:state.range.from, to:day});
        dispatchState({ type: "SET_TO", payload: day });

        } else{
          onChange({from:day, to:state.range.from});
          dispatchState({ type: "SET_RANGE", payload: {from:day,to:state.range.from} });
        } 
        return;
      }
      dispatchState({ type: "CHANGE_HOVERED_DAY", payload: day });
    },
    [ state, onChange]
  );

  // -------------------------------
  // DATE CLICK HANDLER
  // -------------------------------
  const handleDateClick = useCallback(
    (timestamp: number) => {
      if (model === "range") handleRangeSelection(timestamp);
      else if (selectMultiple) {
        dispatchState({ type: "SET_MULTIPLE", payload: timestamp });
      } else {
        dispatchState({ type: "SET_DATE", payload: timestamp });
      }
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
        model === "date" && selectMultiple ?  state.multiple.includes(day.timestamp):isEqualDays(day.timestamp, state.date)
      const isHoveredDay =
        model === "range" &&
        state.range.from &&
        !state.range.to &&
        (state.hoveredDay as number) >= day.timestamp &&
        day.timestamp > state.range.from;
      const isColSelected = false//state.multiple?.includes(day.timestamp);
      const isFrom = model === "range" && isEqualDays(day.timestamp, state.range.from);
      const isTo = model === "range" && isEqualDays(day.timestamp, state.range.to);
      const isInRange =
        model === "range" &&
        state.range.from &&
        state.range.to &&
        day.timestamp > state.range.from &&
        day.timestamp < state.range.to;
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
              if (!state.range.to && state.hoveredDay) {
                dispatchState({
                  type: "CHANGE_HOVERED_DAY",
                  payload: day.timestamp,
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
      state.range.from,
      state.range.to,
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
      dispatchState({ type: "CHANGE_HOVERED_DAY", payload: null });

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
      const col = filtered.map((d) =>(d.timestamp))
      const isEqual = (arr1: number[], arr2: number[]) =>
        arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);
      dispatchState({
        type: "SET_WEEK_DAYS",
        payload: {multiple:isEqual(col, state.multiple) ? [] : col,index:jmoment(col[0]).day()},
      });
    };

    return (
      <>
        {/* Week header */}
        <div
          className={`${style.grid} ${style.grid_cols_7} ${style.justify_between} ${style.gap_x_2} ${style.py_2}`}
          dir={locale === "fa" ? "rtl" : "ltr"}
          style={{ ...WeekHeaderStyle }}
        >
          {weekNames.map((name, i) => {
            console.log(i,state.weekDay)
            const isSelectedCol =
              state.weekDay !==null
                ? locale == "fa"
                  ? state.weekDay ==
                    jalaliMap[i as 0 | 1 | 2 | 3 | 4 | 5 | 6]
                  : new Date(state.weekDay).getDay() == i
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
              ${style.w_6} ${style.aspect_square} ${style.text_center} ${
                      selectableCols && style.cursor_pointer
                    }`}
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
      {state.view === CalendarViews.DAY && (
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

      {state.view === CalendarViews.MONTH && (
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

      {state.view === CalendarViews.YEAR && (
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
