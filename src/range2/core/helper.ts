import moment from "moment-jalaali";

import type { IDate, ITimeSections, ITimeZone, TLocale } from "./type";
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

  return { from: from || 0, to: to || 0 };
};

export const backwardStep: { [key in ESteps]: number } = {
  [ESteps.day]: 86400000,
  [ESteps.week]: 86400000 * 7,
  [ESteps.month]: 86400000 * 30,
  [ESteps.season]: 6400000 * 30 * 3,
  [ESteps.year]: 86400000 * 365,
  [ESteps.manual]: 86400000,
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

export const period = (
  date: IDate,
  locale: TLocale,
  zone: ITimeZone
): ITimeSections[] => {
  return [
    {
      title: getLabel(zone, "yesterday", locale),
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
    {
      title: getLabel(zone, "lastWeek", locale),
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
    {
      title: getLabel(zone, "lastMonth", locale),
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
    {
      title: getLabel(zone, "lastThreeMonth", locale),
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
    {
      title: getLabel(zone, "lastYear", locale),
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

export function getLabel(
  zone: ITimeZone,
  timeZone: ITimeZone,
  locale: TLocale = "en"
): string {
  switch (timeZone) {
    case "yesterday":
      if (zone == "today") {
        return locale == "fa"
          ? "مقایسه امروز با روز گذشته"
          : "compare today with yesterday";
      } else {
        return locale == "fa"
          ? "مقایسه دیروز با پریروز"
          : "compare today with one day before yesterday";
      }
    case "lastWeek":
      switch (zone) {
        case "today":
          return locale == "fa"
            ? "مقایسه امروز با یک هفته قبل تر"
            : "compare today with one week before";
        case "yesterday":
          return locale == "fa"
            ? "مقایسه دیروز با یک هفته قبل تر"
            : "compare yesterday with one week before";
        case "thisWeek":
          return locale == "fa"
            ? "مقایسه این هفته با یک هفته قبل تر"
            : "compare this week with one week before";
        case "lastWeek":
          return locale == "fa"
            ? "مقایسه هفته گذشته با یک هفته قبل تر"
            : "compare last week with one week before";
        case "last7Days":
          return locale == "fa"
            ? "مقایسه هفت روز پیش با یک هفته قبل تر"
            : "compare last 7 days with one week before";
        default:
          return locale == "fa" ? "بازه نامعتبر" : "invalid date";
      }

    case "lastMonth":
      switch (zone) {
        case "today":
          return locale == "fa"
            ? "مقایسه امروز با یک ماه پیش تر"
            : "compare today with one month before";
        case "yesterday":
          return locale == "fa"
            ? "مقایسه دیروز با یک ماه پیش تر"
            : "compare yesterday with one month before";
        case "thisWeek":
          return locale == "fa"
            ? "مقایسه این هفته با یک ماه پیش تر"
            : "compare this week with one month before";
        case "lastWeek":
          return locale == "fa"
            ? "مقایسه هفته پیش با یک ماه پیش تر"
            : "compare last week with one month before";
        case "last7Days":
          return locale == "fa"
            ? "مقایسه هفت روز گذشته با یک ماه پیش تر"
            : "compare last 7 days with one month before";
        case "thisMonth":
          return locale == "fa"
            ? "مقایسه این ماه با یک ماه پیش تر"
            : "compare this month with last one month before";
        case "lastMonth":
          return locale == "fa"
            ? "مقایسه ماه قبل با یک ماه پیش تر"
            : "compare last  with one month before";
        case "last30Days":
          return locale == "fa"
            ? "مقایسه سی روز گذشته با یک ماه پیش تر"
            : "compare last 30 days with one month before";
        default:
          return locale == "fa" ? "بازه نامعتبر" : "invalid date";
      }

    case "lastThreeMonth":
      switch (zone) {
        case "today":
          return locale == "fa"
            ? "مقایسه امروز با سه ماه گذشته"
            : "compare today with last three month";
        case "yesterday":
          return locale == "fa"
            ? "مقایسه دیروز با سه ماه گذشته"
            : "compare yesterday with last three month";
        case "thisWeek":
          return locale == "fa"
            ? "مقایسه این هفته با سه ماه گذشته"
            : "compare this week with last three month";
        case "lastWeek":
          return locale == "fa"
            ? "مقایسه هفته پیش با سه ماه گذشته"
            : "compare last week with last three month";
        case "last7Days":
          return locale == "fa"
            ? "مقایسه هفت روز گذشته با سه ماه گذشته"
            : "compare last 7 days with last three month";
        case "thisMonth":
          return locale == "fa"
            ? "مقایسه این ماه با سه ماه گذشته"
            : "compare this month with last three month";
        case "lastMonth":
          return locale == "fa"
            ? "مقایسه ماه پیش با سه ماه گذشته"
            : "compare last month with last three month";
        case "last30Days":
          return locale == "fa"
            ? "مقایسه سی روز گذشته با سه ماه گذشته"
            : "compare last 30 days with last three month";
        case "lastThreeMonth":
          return locale == "fa"
            ? "مقایسه سه ماه گذشته با سه ماه قبل تر"
            : "compare last three month with three month before";
        default:
          return locale == "fa" ? "بازه نامعتبر" : "invalid date";
      }
    case "lastYear":
      switch (zone) {
        case "today":
          return locale == "fa"
            ? "مقایسه امروز با همین روز در سال گذشته"
            : "compare today with same day in last year";
        case "yesterday":
          return locale == "fa"
            ? "مقایسه دیروز با همین روز در سال گذشته"
            : "compare yesterday with same day in last year";
        case "thisWeek":
          return locale == "fa"
            ? "مقایسه این هفته با این هفته در  سال گذشته"
            : "compare this week with same same time frame in last year";
        case "lastWeek":
          return locale == "fa"
            ? "مقایسه هفته پیش  با هفته پیش در سال گذشته"
            : "compare last week with same time frame in last year";
        case "last7Days":
          return locale == "fa"
            ? "مقایسه هفت روز گذشته با روز گذشته در  سال گذشته"
            : "compare last 7 days with  same time frame in  last year";
        case "thisMonth":
          return locale == "fa"
            ? "مقایسه این ماه با این ماه در سال گذشته"
            : "compare this month with  same time frame in last year";
        case "lastMonth":
          return locale == "fa"
            ? "مقایسه ماه پیش با ماه پیش در سال گذشته"
            : "compare last month with same time frame in last year";
        case "last30Days":
          return locale == "fa"
            ? "مقایسه سی روز گذشته با سی روز گذشته در سال گذشته"
            : "compare last 30 Days with same time frame in last year";
        case "lastThreeMonth":
          return locale == "fa"
            ? "مقایسه سه ماه گذشته با سه ماه گذشته در سال گذشته"
            : "compare last three month with same time frame in last year";
        case "thisYear":
          return locale == "fa"
            ? "مقایسه امسال با سال گذشته"
            : "compare this year with last year";
        case "lastYear":
          return locale == "fa"
            ? "مقایسه سال گذشته با یک سال پیش تر"
            : "compare last year with one year before";
        default:
          return locale == "fa" ? "بازه نامعتبر" : "invalid date";
      }

    default:
      return locale == "fa" ? "بازه نامعتبر" : "invalid date";
  }
  // switch (zone) {
  //   case "today":
  //   case "yesterday":
  //     return locale === "fa" ? "امروز" : "today";
  //   case "thisWeek":
  //   case "lastWeek":
  //   case "last7Days":
  //     return locale === "fa" ? "هفت روز اخیر" : "last 7 days";
  //   case "thisMonth":
  //   case "lastMonth":
  //   case "last30Days":
  //     return locale === "fa" ? "۳۰ روز اخیر" : "last 30 days";
  //   case "lastThreeMonth":
  //     return locale === "fa" ? "سه ماه اخیر" : "last 3 months";
  //   case "thisYear":
  //   case "lastYear":
  //     return locale === "fa" ? "سال گذشته" : "last year";
  //   case "manual":
  //     return locale === "fa" ? "بازه دستی" : "manual range";
  //   default:
  //     return locale === "fa" ? "انتخاب نشده" : "invalid date";
  // }
}
