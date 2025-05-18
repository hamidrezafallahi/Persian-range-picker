import { useState } from "react";

import moment from "moment-jalaali";

import type { IDate, TLocale } from "./type";

interface IMonthPickerType {
  dateFromOutside: IDate;
  onDateChange: (e: IDate) => void;
  monthPickerClassName?: string;
  locale: TLocale;
  primaryColor?: string;
  backgroundColor?: string;
  highlightColor?: string;
  tertiaryColor?: string;
}

const MonthPicker = ({
  dateFromOutside = {
    from: moment().locale("fa").clone().startOf("jYear").valueOf(),
    to: moment().locale("fa").clone().endOf("day").valueOf(),
  },
  onDateChange,
  monthPickerClassName,
  locale,
  backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
  tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
  highlightColor = "#f4f4f4", //رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
  primaryColor = "#000",
}: IMonthPickerType) => {
  const [state, setState] = useState<{
    selectedMonth: number;
    hoveredMonth: number;
  }>({
    selectedMonth: 0,
    hoveredMonth: 0,
  });
  const currentJDate = moment().locale("fa");
  const currentDate = moment().locale("en");
  const { from, to } = dateFromOutside;
  const thisYear = locale === "fa" ? currentJDate.jYear() : currentDate.year();
  const thisYearFrom =
    locale === "fa"
      ? moment(from).locale("fa").jYear()
      : moment(from).locale("en").year();
  const thisYearTo =
    locale === "fa"
      ? moment(to).locale("fa").jYear()
      : moment(to).locale("en").year();
  const startDate =
    locale === "fa"
      ? moment(from).locale("fa").jMonth()
      : moment(from).locale("en").month();
  const endDate =
    locale === "fa"
      ? moment(to).locale("fa").jMonth()
      : moment(to).locale("en").month();
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
        locale === "fa"
          ? moment(chosenMonth).startOf("jMonth").valueOf()
          : new Date(date.getFullYear(), date.getMonth(), 1).valueOf();
    } else if (dateFromOutside.from && dateFromOutside.to == 0) {
      if (chosenMonth < dateFromOutside.from) {
        newFrom =
          locale === "fa"
            ? moment(chosenMonth).startOf("jMonth").valueOf()
            : new Date(date.getFullYear(), date.getMonth(), 1).valueOf();
        newTo = 0;
      } else {
        newTo =
          locale === "fa"
            ? moment(chosenMonth).endOf("jMonth").valueOf()
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
      dateFromOutside.to > 0
    ) {
      newFrom =
        locale === "fa"
          ? moment(chosenMonth).startOf("jMonth").valueOf()
          : new Date(date.getFullYear(), date.getMonth(), 1).valueOf();
      newTo = 0;
    }
    if (onDateChange) {
      onDateChange({ from: newFrom, to: newTo });
    }
  };
  const handleHoveredMonth = (index: number) => {
    const hoveredMonth =
      locale === "fa"
        ? currentDate
            .clone()
            .jMonth(index)
            .startOf("jMonth")
            .startOf("day")
            .valueOf()
        : currentDate
            .clone()
            .month(index)
            .startOf("month")
            .startOf("day")
            .valueOf();
    if (dateFromOutside.from && dateFromOutside.to == 0) {
      setState((prev) => {
        return {
          ...prev,
          hoveredMonth: hoveredMonth,
        };
      });
    }
  };

  return (
    <div
      dir={locale == "fa" ? "rtl" : "ltr"}
      className={`justify-between gap-2 grid grid-cols-6  w-full  ${monthPickerClassName}`}
      // onMouseLeave={() => {
      //   setState((prev) => {
      //     return {
      //       ...prev,
      //       hoveredMonth: null,
      //     };
      //   });
      // }}
    >
      {Array.from({ length: 12 }, (_, index) => {
        const chosenMonth =
          locale === "fa"
            ? currentDate
                .clone()
                .jMonth(index)
                .startOf("jMonth")
                .startOf("day")
                .valueOf()
            : currentDate
                .clone()
                .month(index)
                .startOf("month")
                .startOf("day")
                .valueOf();
        const isBetween =
          thisYearFrom == thisYear &&
          thisYearTo == thisYear &&
          startDate <= index &&
          index <= endDate;
        const isStartMonth = startDate == index;
        const isEndMonth = endDate == index && isBetween;
        const isToMonth =
          locale === "fa"
            ? moment().locale("fa").startOf("jMonth").jMonth() === index
            : moment().locale("en").startOf("month").month() === index;

        const isHovered =
          state.hoveredMonth &&
          state.selectedMonth &&
          chosenMonth <= state.hoveredMonth &&
          chosenMonth > state.selectedMonth;

        return (
          <div
            key={index}
            className="flex justify-center items-center w-full h-full"
          >
            <button
              className={`w-[clamp(24px,24px,30px)] dateButton aspect-square flex text-sm justify-center items-center !rounded-md overflow-hidden  p-1 col-span-1
                `}
              onClick={() => {
                handleMonthPicker(chosenMonth);
              }}
              onMouseOver={() => {
                handleHoveredMonth(index);
              }}
              style={{
                color:
                  isStartMonth || isEndMonth ? backgroundColor : tertiaryColor,

                background:
                  isStartMonth || isEndMonth
                    ? primaryColor
                    : isHovered || isBetween
                    ? highlightColor
                    : "",
                borderWidth: isToMonth ? "2px" : "",
                borderColor: isToMonth ? tertiaryColor : "",
              }}
            >
              {index + 1}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MonthPicker;

// const handleMonthPicker = (chosenMonth, index) => {
//   setHoveredMonth([]);

//   // Initialize new state values
//   let newFrom = dateFromOutside.from;
//   let newTo = dateFromOutside.to;

//   if (dateFromOutside.from == null) {
//     newFrom = moment(chosenMonth).startOf("jMonth").valueOf();
//   } else if (dateFromOutside.from && dateFromOutside.to == null) {
//     if (chosenMonth <= dateFromOutside.from) {
//       newFrom = moment(chosenMonth).startOf("jMonth").valueOf();
//     } else {
//       newTo = moment(chosenMonth).endOf("jMonth").valueOf();
//     }
//   } else if (dateFromOutside.from && dateFromOutside.to) {
//     if (chosenMonth < dateFromOutside.from) {
//       newFrom = moment(chosenMonth).startOf("jMonth").valueOf();
//     } else if (dateFromOutside.to < chosenMonth) {
//       newTo = moment(chosenMonth).endOf("jMonth").valueOf();
//     } else {
//       if (
//         Math.abs(dateFromOutside.from - chosenMonth) <
//         Math.abs(dateFromOutside.to - chosenMonth)
//       ) {
//         newFrom = moment(chosenMonth).startOf("jMonth").valueOf();
//       } else {
//         newTo = moment(chosenMonth).endOf("jMonth").valueOf();
//       }
//     }
//   }
//   if (onDateChange) {
//     onDateChange({ from: newFrom, to: newTo });
//   }
//   setDateFromOutside({ from: newFrom, to: newTo });
//   setHoveredMonth([index]);
// };
