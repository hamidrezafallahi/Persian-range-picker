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
declare const MonthPicker: ({ dateFromOutside, onDateChange, monthPickerClassName, locale, backgroundColor, tertiaryColor, highlightColor, primaryColor, }: IMonthPickerType) => import("react/jsx-runtime").JSX.Element;
export default MonthPicker;
