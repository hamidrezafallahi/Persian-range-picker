import moment from "moment-jalaali";

import type { IDate, ITimeSections, ITimeZone } from "./type";
import { ESteps } from "./type";
export const getTimestampsForPeriod = (period: ITimeZone, locale: string) => {
  let from, to;

  switch (period) {
    case "today":
      from = moment().locale(locale).clone().startOf("day").valueOf();
      to = moment().locale(locale).clone().endOf("day").valueOf();
      break;
    case "yesterday":
      from = moment()
        .locale(locale)
        .clone()
        .startOf("day")
        .subtract(1, "day")
        .valueOf();
      to = moment()
        .locale(locale)
        .clone()
        .endOf("day")
        .subtract(1, "day")
        .valueOf();
      break;
    case "thisWeek":
      if (locale == "fa" && moment().locale("fa").clone().day() == 6) {
        from = moment().locale("fa").clone().day(6).startOf("day").valueOf();
        to = moment().locale("fa").clone().day(6).endOf("day").valueOf();
      } else {
        from = moment().locale("fa").clone().day(-1).startOf("day").valueOf();
        to = moment().locale("fa").clone().endOf("day").valueOf();
      }
      break;
    case "lastWeek":
      if (locale == "fa" && moment().locale("fa").clone().day() == 6) {
        from = moment()
          .locale("fa")
          .clone()
          .day(6)
          .subtract(7, "day")
          .startOf("day")
          .valueOf();
        to = moment()
          .locale("fa")
          .clone()
          .day(6)
          .subtract(1, "day")
          .endOf("day")
          .valueOf();
      } else {
        from = moment()
          .locale("fa")
          .clone()
          .day(-1)
          .subtract(7, "day")
          .startOf("day")
          .valueOf();
        to = moment()
          .locale("fa")
          .clone()
          .day(-1)
          .subtract(1, "day")
          .endOf("day")
          .valueOf();
      }

      break;
    case "last7Days":
      from = moment()
        .locale(locale)
        .clone()
        .startOf("day")
        .subtract(6, "day")
        .valueOf();
      to = moment().locale(locale).clone().endOf("day").valueOf();
      break;
    case "thisMonth":
      from =
        locale == "fa"
          ? moment()
              .locale(locale)
              .clone()
              .startOf("jMonth")
              .startOf("day")
              .valueOf()
          : moment()
              .locale(locale)
              .clone()
              .startOf("month")
              .startOf("day")
              .valueOf();
      to = moment().locale(locale).clone().endOf("day").valueOf();
      break;
    case "lastMonth":
      from =
        locale == "fa"
          ? moment()
              .locale(locale)
              .clone()
              .startOf("jMonth")
              .subtract(1, "jMonth")
              .valueOf()
          : moment()
              .locale(locale)
              .clone()
              .startOf("month")
              .subtract(1, "month")
              .valueOf();
      to =
        locale == "fa"
          ? moment()
              .locale(locale)
              .clone()
              .endOf("jMonth")
              .subtract(1, "jMonth")
              .valueOf()
          : moment()
              .locale(locale)
              .clone()
              .endOf("month")
              .subtract(1, "month")
              .valueOf();
      break;
    case "last30Days":
      from = moment()
        .locale(locale)
        .clone()
        .startOf("day")
        .subtract(29, "day")
        .valueOf();
      to = moment().locale(locale).clone().endOf("day").valueOf();
      break;
    case "lastThreeMonth":
      from =
        locale == "fa"
          ? moment()
              .locale(locale)
              .clone()
              .startOf("day")
              .subtract(3, "jMonth")
              .valueOf()
          : moment()
              .locale(locale)
              .clone()
              .startOf("day")
              .subtract(3, "month")
              .valueOf();
      to = moment().locale(locale).clone().endOf("day").valueOf();
      break;
    case "thisYear":
      from =
        locale == "fa"
          ? moment().locale(locale).clone().startOf("jYear").valueOf()
          : moment().locale(locale).clone().startOf("year").valueOf();
      to = moment().locale(locale).clone().endOf("day").valueOf();
      break;
    case "lastYear":
      from =
        locale == "fa"
          ? moment()
              .locale(locale)
              .clone()
              .subtract(1, "jYear")
              .startOf("jYear")
              .valueOf()
          : moment()
              .locale(locale)
              .clone()
              .subtract(1, "year")
              .startOf("year")
              .valueOf();
      to =
        locale == "fa"
          ? moment()
              .locale(locale)
              .clone()
              .subtract(1, "jYear")
              .endOf("jYear")
              .valueOf()
          : moment()
              .locale(locale)
              .clone()
              .subtract(1, "year")
              .endOf("year")
              .valueOf();
      break;
    default:
      from = 0;
      to = 0;
  }
  return { from: from ? from : 0, to: to ? to : 0 };
};
export const backwardStep: { [key in ESteps]: number } = {
  [ESteps.day]: 86400000,
  [ESteps.week]: 86400000 * 7,
  [ESteps.month]: 86400000 * 30,
  [ESteps.season]: 6400000 * 30 * 3,
  [ESteps.year]: 86400000 * 365,
  [ESteps.manual]: 86400000, //Number(date.to) - Number(date.from),
};
export const time = ["Day", "Week", "Month", "ThreeMonth", "Year", "manual"];
export const stepToTimeIndex: { [key in ESteps]: number } = {
  [ESteps.day]: 0,
  [ESteps.week]: 1,
  [ESteps.month]: 2,
  [ESteps.season]: 2,
  [ESteps.year]: 4,
  [ESteps.manual]: 5,
};
export const period: (date: IDate, locale: string) => ITimeSections[] = (
  date,
  locale
) => {
  return [
    // سطر یک روز پیش تر در مقایسه
    {
      title: "same duration OneDayBefore",
      value: {
        from: moment(date.from)
          .locale(locale)
          .clone()
          .startOf("day")
          .subtract(1, "day")
          .valueOf(),
        to: moment(date.to)
          .locale(locale)
          .clone()
          .endOf("day")
          .subtract(1, "day")
          .valueOf(),
      },
      step: ESteps.day,
      timeZone: "yesterday",
    },
    // سطر یک هفته پیش تر در مقایسه
    {
      title: "same duration OneWeekBefore",
      value: {
        from: moment(date.from)
          .locale(locale)
          .clone()
          .startOf("day")
          .subtract(7, "day")
          .valueOf(),
        to: moment(date.to)
          .locale(locale)
          .clone()
          .endOf("day")
          .subtract(7, "day")
          .valueOf(),
      },
      step: ESteps.week,
      timeZone: "lastWeek",
    },
    // سطر یک ماه پیش تر در مقایسه
    {
      // در لیست مقایسه در بازه ی یک ماه پیش
      title: "same duration OneMonthBefore",
      value: {
        from:
          locale == "fa"
            ? moment(date.from)
                .locale(locale)
                .clone()
                .startOf("day")
                .subtract(1, "jMonth")
                .valueOf()
            : moment(date.from)
                .locale(locale)
                .clone()
                .startOf("day")
                .subtract(1, "month")
                .valueOf(),
        to:
          locale == "fa"
            ? moment(date.to)
                .locale(locale)
                .clone()
                .endOf("day")
                .subtract(1, "jMonth")
                .valueOf()
            : moment(date.to)
                .locale(locale)
                .clone()
                .endOf("day")
                .subtract(1, "month")
                .valueOf(),
      },
      step: ESteps.month,
      timeZone: "lastMonth",
    },
    // سطر یک سه ماه پیش تر در مقایسه
    {
      // در لیست مقایسه در بازه ی سه ماه پیش
      title: "same duration ThreeMonthBefore",
      value: {
        from:
          locale == "fa"
            ? moment(date.from)
                .locale(locale)
                .clone()
                .startOf("day")
                .subtract(3, "jMonth")
                .valueOf()
            : moment(date.from)
                .locale(locale)
                .clone()
                .startOf("day")
                .subtract(3, "month")
                .valueOf(),
        to:
          locale == "fa"
            ? moment(date.to)
                .locale(locale)
                .clone()
                .endOf("day")
                .subtract(3, "jMonth")
                .valueOf()
            : moment(date.to)
                .locale(locale)
                .clone()
                .endOf("day")
                .subtract(3, "month")
                .valueOf(),
      },
      step: ESteps.season,
      timeZone: "lastThreeMonth",
    },
    // سطر یک یک سال  پیش تر در مقایسه
    {
      // در لیست مقایسه در بازه ی یک سال پیش
      title: "same duration OneYearBefore",
      value: {
        from:
          locale == "fa"
            ? moment(date.from)
                .locale(locale)
                .clone()
                .startOf("day")
                .subtract(1, "jYear")
                .valueOf()
            : moment(date.from)
                .locale(locale)
                .clone()
                .startOf("day")
                .subtract(1, "year")
                .valueOf(),
        to:
          locale == "fa"
            ? moment(date.to)
                .locale(locale)
                .clone()
                .endOf("day")
                .subtract(1, "jYear")
                .valueOf()
            : moment(date.to)
                .locale(locale)
                .clone()
                .endOf("day")
                .subtract(1, "year")
                .valueOf(),
      },
      step: ESteps.year,
      timeZone: "lastYear",
    },
  ];
};
