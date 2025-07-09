import jmoment from "moment-jalaali";
const todayTimestamp = new Date().setHours(0, 0, 0, 0);
export const isCurrentDay = (timestamp) => {
    return timestamp === new Date(todayTimestamp).setHours(0, 0, 0, 0);
};
export const isEqualDays = (first, second) => {
    if (!first || !second)
        return false;
    return (new Date(first).setHours(0, 0, 0, 0) ===
        new Date(second).setHours(0, 0, 0, 0));
};
export const getFirstDayIndexInMonth = (year, month, locale) => {
    const dayName = locale === "en"
        ? // months are zero based so we plus one for month
            jmoment(`${year}, ${month + 1}, 1`).format("ddd")
        : jmoment(`${year}, ${month + 1}, 1`, "jYYYY=jMM-jDD").format("ddd");
    const dayOrder = locale === "fa"
        ? ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
        : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayOrder.indexOf(dayName);
};
export const getNumberOfDays = (year, month, locale) => {
    if (locale === "en") {
        return 40 - new Date(year, month, 40).getDate();
    }
    else {
        return jmoment.jDaysInMonth(year, month);
    }
};
export const convertToPersianNumbers = (value) => {
    const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return value.replace(/[0-9]/g, function (w) {
        return id[+w];
    });
};
