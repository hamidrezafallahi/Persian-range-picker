import type { FC } from "react";
import type { TLocale } from "../core/type";
interface Props {
    currentMonth: number;
    onSelectMonth: (month: number) => void;
    locale: TLocale;
    currentYear: number;
    onChangeYear: (offset: -1 | 1) => void;
    monthPickerClassName?: string;
    backgroundColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
}
declare const MonthPicker: FC<Props>;
export default MonthPicker;
