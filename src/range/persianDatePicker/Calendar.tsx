import type { FC, ReactNode, RefObject } from "react";
import { memo, useCallback, useState } from "react";
import style from "../../main.module.css";
import jmoment from "moment-jalaali";

import type { TLocale } from "../core/type";
import DataPickerBody from "./dataPickerBody";
import DatePickerHeader from "./datePickerHeader";
import { CalendarViews } from "./enum";
import {
  getFirstDayIndexInMonth,
  getNumberOfDays,
  isEqualDays,
} from "./helper";
import MonthPicker from "./monthPicker";
import YearPicker from "./yearPicker";

const todayTimestamp = new Date().setHours(0, 0, 0, 0);
const today = jmoment();
interface Props {
  manualContainerRef?: RefObject<HTMLDivElement | null>;
  primaryColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  tertiaryColor?: string;
  onChange: (startDate: number | null, endDate: number | null) => void;
  model?: "range" | "date";
  startDate?: number;
  endDate?: number;
  locale?: TLocale;
  disablePreviousDays?: boolean;
  renderDayFn?: (
    day: { timestamp: number; currentMonth: boolean },
    index: number
  ) => ReactNode;
  calendarBaseWidth?: number;
  containerClassName?: string;
  calenderClassName?: string;
  datePickerBodyClassName?: string;
  yearPickerClassName?: string;
  datePickerHeaderClassName?: string;
  chooseTodayClassName?: string;
}

interface State {
  year: number;
  month: number;
  hoveredDay: null | number;
}

const Calendar: FC<Props> = ({
  onChange,
  model = "date",
  startDate,
  endDate,
  locale = "en",
  disablePreviousDays = false,
  renderDayFn,
  calendarBaseWidth,
  containerClassName,
  primaryColor = "#000",
  backgroundColor = "#fff ",
  tertiaryColor = "#939393",
  highlightColor = "#f4f4f4",
  secondaryColor = "#585858",
  datePickerBodyClassName = "",
  yearPickerClassName = "",
  datePickerHeaderClassName = "",
}) => {
  const [state, setState] = useState<State>({
    year: locale === "fa" ? today.jYear() : today.year(),
    month: locale === "fa" ? today.jMonth() : today.month(),
    hoveredDay: null,
  });
  const [view, setView] = useState<CalendarViews>(CalendarViews.DAY);
  const changeYearHandler = (year: number) => {
    setState((prev) => ({ ...prev, year: year }));
    setView(CalendarViews.MONTH);
  };

  const changeMonthHandler = (month: number) => {
    setState((prev) => ({ ...prev, month }));
    setView(CalendarViews.DAY);
  };

  const setMonth = (offset: 1 | -1): void => {
    let year = state.year;
    let month = state.month + offset;
    if (month === -1) {
      month = 11;
      year = year - 1;
    } else if (month === 12) {
      month = 0;
      year = year + 1;
    }
    setState((prev) => {
      return {
        ...prev,
        year,
        month,
      };
    });
  };

  const setYear = (offset: 1 | -1) => {
    setState((prev) => ({ ...prev, year: prev.year + offset }));
  };
  const setRange = (selectedDay: number): void => {
    if (
      startDate &&
      endDate &&
      startDate === endDate &&
      startDate === selectedDay
    ) {
      setState((prev) => {
        return {
          ...prev,
          hoveredDay: null,
        };
      });
      onChange(null, null);
      return;
    }
    if (startDate && endDate) {
      setState((prev) => {
        return {
          ...prev,
          selectedDay,
          hoveredDay: selectedDay,
        };
      });
      onChange(selectedDay, null);
      return;
    }

    if (!startDate) {
      setState((prev) => {
        return {
          ...prev,
          hoveredDay: selectedDay,
        };
      });
      onChange(selectedDay, null);
    } else {
      if (selectedDay > startDate) {
        if (
          endDate &&
          Math.abs(selectedDay - startDate) < Math.abs(endDate - selectedDay)
        ) {
          setState((prev) => {
            return {
              ...prev,
              selectedDay,
              hoveredDay: selectedDay,
            };
          });
          onChange(selectedDay, endDate);
        } else if (startDate === selectedDay) {
          setState((prev) => {
            return {
              ...prev,
              selectedDay,
              hoveredDay: selectedDay,
            };
          });
          onChange(selectedDay, selectedDay);
        } else {
          setState((prev) => {
            return {
              ...prev,
              hoveredDay: selectedDay,
            };
          });
          onChange(startDate, selectedDay);
        }
      } else if (startDate > selectedDay) {
        setState((prev) => {
          return {
            ...prev,
            selectedDay,
            hoveredDay: selectedDay,
          };
        });
        onChange(selectedDay, 0);
      } else if (startDate === selectedDay) {
        setState((prev) => {
          return {
            ...prev,
            selectedDay,
            from: selectedDay,
            to: selectedDay,
            hoveredDay: selectedDay,
          };
        });
        onChange(selectedDay, selectedDay);
      }
    }
  };
  const onDateClick = useCallback(
    (timestamp: number) => {
      if (model === "range") {
        setRange(timestamp);
      } else {
        setState((prev) => {
          return {
            ...prev,
            selectedDay: timestamp,
            from: timestamp,
            to: timestamp,
            hoveredDay: timestamp,
          };
        });
        onChange(timestamp, null);
      }
    },
    [model, onChange, endDate, startDate]
  );
  const changeViewHandler = (viewName: CalendarViews) => {
    setView(viewName);
  };

  const getCalendarBlockDetails = (year: number, month: number) => {
    const currentMonthDaysCount = getNumberOfDays(year, month, locale);

    const monthBlockArray: { timestamp: number; currentMonth: boolean }[] = [];
    const offsetFromPrevMonth = getFirstDayIndexInMonth(year, month, locale);
    const offsetFromNextMonth =
      42 - currentMonthDaysCount - offsetFromPrevMonth;
    if (offsetFromPrevMonth > 0) {
      const prevMonthDaysCount =
        month === 1
          ? getNumberOfDays(year - 1, 12, locale)
          : getNumberOfDays(year, month - 1, locale);

      for (let offset = 0; offset < offsetFromPrevMonth; offset++) {
        const dateString = `${month === 0 ? year - 1 : year}/${
          (month === 0 ? 11 : month - 1) + 1
        }/${prevMonthDaysCount - offset}`;

        const date = new Date(
          locale === "fa"
            ? jmoment(dateString, "jYYYY-jMM-jDD").format()
            : dateString
        );
        monthBlockArray.push({
          timestamp: date.setHours(0, 0, 0, 0),
          currentMonth: false,
        });
      }
    }

    for (let day = 1; day <= currentMonthDaysCount; day++) {
      const dateString = `${year}/${month + 1}/${day}`;
      const date = new Date(
        locale === "fa"
          ? jmoment(dateString, "jYYYY-jMM-jDD").format()
          : dateString
      );
      monthBlockArray.push({
        timestamp: date.setHours(0, 0, 0, 0),
        currentMonth: true,
      });
    }

    //adding offset from next month to the current block
    if (offsetFromNextMonth > 0) {
      for (let offset = 1; offset <= offsetFromNextMonth; offset++) {
        const dateString = `${month === 11 ? year + 1 : year}/${
          month === 11 ? 12 : month + 1
        }/${offset}`;
        const date = new Date(
          locale === "fa"
            ? jmoment(dateString, "jYYYY-jMM-jDD").format()
            : dateString
        );
        monthBlockArray.push({
          timestamp: date.setHours(0, 0, 0, 0),
          currentMonth: false,
        });
      }
    }

    return monthBlockArray;
  };

  const renderDay = useCallback(
    (
      day: { currentMonth: boolean; timestamp: number },
      index: number
    ): ReactNode => {
      const currentDay = jmoment(day.timestamp);
      const isDisabled =
        day.timestamp < todayTimestamp &&
        disablePreviousDays &&
        model == "date";
      const isToday = isEqualDays(day.timestamp, todayTimestamp);
      const isSelectedSingleDate =
        isEqualDays(day.timestamp, startDate) && model === "date";
      const isHoveredDay =
        model === "range" &&
        startDate &&
        !endDate &&
        (state.hoveredDay as number) >= day.timestamp &&
        day.timestamp > startDate;
      const isFromDate =
        isEqualDays(day.timestamp, startDate) && model === "range";
      const isToDate = isEqualDays(day.timestamp, endDate);
      const isInrange =
        endDate &&
        startDate &&
        day.timestamp > startDate &&
        day.timestamp < endDate;
      return (
        <div
          className={`
          ${style.flex}
          ${style.justify_center}
          ${style.items_center}
          ${style.w_full}
          ${style.h_full}
        `}
          key={index}
        >
          <button
            disabled={isDisabled}
            key={index}
            type="button"
            onMouseOver={() => {
              if (!endDate && state.hoveredDay) {
                setState((prev) => {
                  return {
                    ...prev,
                    hoveredDay: day.timestamp,
                  };
                });
              } else if (endDate && state.hoveredDay) {
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
              ${style.w_6}
              ${style.aspect_square}
              ${style.text_center}
              ${style.cursor_pointer}
            `}
            style={{
              pointerEvents: isDisabled ? "none" : "auto",
              opacity: isDisabled ? 0.5 : day.currentMonth ? 1 : 0,
              color:
                isToDate || isFromDate || isSelectedSingleDate
                  ? backgroundColor
                  : tertiaryColor,
              borderColor: isToday ? secondaryColor : "",
              borderWidth: isToday ? "2px" : "",

              background:
                isToDate || isFromDate
                  ? primaryColor
                  : isSelectedSingleDate
                  ? tertiaryColor
                  : isInrange || isHoveredDay
                  ? highlightColor
                  : "",
              fontSize: "14px",
            }}
            onClick={() => {
              if (!day.currentMonth) return;
              onDateClick(day.timestamp);
            }}
          >
            <span>
              {locale === "fa"
                ? currentDay.jDate().toLocaleString("fa")
                : currentDay.date()}
            </span>
          </button>
        </div>
      );
    },
    [
      startDate,
      endDate,
      state.hoveredDay,
      model,
      disablePreviousDays,
      locale,
      onDateClick,
    ]
  );
  const renderCalendar = (year: number, month: number) => {
    const monthD = getCalendarBlockDetails(year, month);

    const days = monthD.map((day, index) =>
      renderDayFn ? renderDayFn(day, index) : renderDay(day, index)
    );
    const weekNameList =
      locale === "en"
        ? ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        : ["ش", "ی", "د", "س", "چ", "پ", "ج"];
    return (
      <>
        <div
          className={`
          ${style.grid}
          ${style.grid_cols_7}
          ${style.justify_between}
          ${style.gap_x_2}
          ${style.w_full}
          ${style.p_2}
        `}
          dir={locale === "fa" ? "rtl" : "ltr"}
        >
          {weekNameList.map((dName, i) => (
            <span
              key={i}
              className={`
                ${style.font_normal}
                ${style.text_center}
              `}
              style={{ fontSize: "14px", color: secondaryColor }}
            >
              {dName}
            </span>
          ))}
        </div>
        <div
          className={`
  ${style.w_full}
  ${style.grid}
  ${style.grid_cols_7}
  ${style.justify_between}
  ${style.gap_y_2}
`}
          style={{ minWidth: "24px" }}
          dir={locale === "fa" ? "rtl" : "ltr"}
        >
          {days}
        </div>
      </>
    );
  };

  return (
    <div
      style={{ width: calendarBaseWidth }}
      className={`
        ${style.flex}
        ${style.flex_col}
        ${style.items_center}
        ${style.w_full}
        ${style.h_fit}
        ${containerClassName}
      `}
    >
      {view === CalendarViews.DAY ? (
        <div
          className={`
          ${style.flex}
          ${style.flex_col}
          ${style.items_center}
          ${style.w_full}
        `}
        >
          <DatePickerHeader
            datePickerHeaderClassName={datePickerHeaderClassName}
            year={state.year}
            month={state.month}
            setMonth={setMonth}
            locale={locale}
            onViewChange={changeViewHandler}
            highlightColor={highlightColor}
            tertiaryColor={tertiaryColor}
            secondaryColor={secondaryColor}
          />
          <hr
            className={`
  ${style.mt_2}
  ${style.border}
  ${style.w_full}
`}
          />
          <DataPickerBody
            year={state.year}
            month={state.month}
            renderMonthBody={renderCalendar}
            locale={locale}
            datePickerBodyClassName={datePickerBodyClassName}
            onDateClick={onDateClick}
          />
        </div>
      ) : view === CalendarViews.MONTH ? (
        <MonthPicker
          currentMonth={state.month}
          locale={locale}
          onSelectMonth={changeMonthHandler}
          onChangeYear={setYear}
          currentYear={state.year}
          tertiaryColor={tertiaryColor}
          secondaryColor={secondaryColor}
          backgroundColor={backgroundColor}
        />
      ) : (
        <YearPicker
          currentYear={state.year}
          primaryColor={primaryColor}
          onSelectYear={changeYearHandler}
          yearPickerClassName={yearPickerClassName}
          secondaryColor={secondaryColor}
          backgroundColor={backgroundColor}
        />
      )}
    </div>
  );
};
export default memo(Calendar);
