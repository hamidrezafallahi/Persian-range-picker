const daysMap = {
  Sunday: "یکشنبه",
  Monday: "دوشنبه",
  Tuesday: "سه شنبه",
  Wednesday: "چهارشنبه",
  Thursday: "پنجشنبه",
  Friday: "جمعه",
  Saturday: "شنبه",
};
const monthMap = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const persianMonthToGeorgian = [
  "Mar-Apr",
  "Apr-May",
  "May-Jun",
  "Jun-Jul",
  "Jul-Agu",
  "Agu-Sep",
  "Sep-Oct",
  "Oct-Nov",
  "Nov-Dec",
  "Dec-Jan",
  "Jan-Feb",
  "Feb-Mar",
];
const georgianMonthToPersian = [
  "دی-بهمن",
  "بهمن-اسفند",
  "اسفند-فروردین",
  "فروردین-اردیبهشت",
  "اردیبهشت-خرداد",
  "خرداد-تیر",
  "تیر-مرداد",
  "مرداد-شهریور",
  "شهریور-مهر",
  "مهر-آبان",
  "آبان-آذر",
  "آذر-دی",
];

const PmonthMap = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const months = {
  fa: PmonthMap,
  en: monthMap,
};

export {
  daysMap,
  georgianMonthToPersian,
  monthMap,
  months,
  persianMonthToGeorgian,
  PmonthMap,
};
