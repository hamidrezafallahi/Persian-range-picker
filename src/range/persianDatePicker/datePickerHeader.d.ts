import type { FC } from 'react';
import type { TLocale } from '../core/type';
import { CalendarViews } from './enum';
interface Props {
    setMonth: (offset: 1 | -1) => void;
    year: number;
    month: number;
    locale: TLocale;
    onViewChange: (viewName: CalendarViews) => void;
    datePickerHeaderClassName?: string;
    highlightColor?: string;
    tertiaryColor?: string;
    secondaryColor?: string;
}
declare const DatePickerHeader: FC<Props>;
export default DatePickerHeader;
