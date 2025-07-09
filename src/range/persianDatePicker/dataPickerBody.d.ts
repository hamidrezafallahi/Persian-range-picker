import type { FC, ReactNode } from 'react';
import type { TLocale } from '../core/type';
interface Props {
    datePickerBodyClassName?: string;
    year: number;
    month: number;
    renderMonthBody: (year: number, month: number) => ReactNode;
    locale: TLocale;
    onDateClick: (timestamp: number) => void;
}
declare const DataPickerBody: FC<Props>;
export default DataPickerBody;
