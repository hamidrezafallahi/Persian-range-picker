import type { FC } from 'react';
interface Props {
    currentYear: number;
    onSelectYear: (year: number) => void;
    yearPickerClassName?: string;
    backgroundColor?: string;
    secondaryColor?: string;
    primaryColor?: string;
}
declare const YearPicker: FC<Props>;
export default YearPicker;
