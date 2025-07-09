import type { ReactNode, RefObject } from "react";
import type { TLocale } from "../core/type";
interface Props {
    manualContainerRef?: RefObject<HTMLDivElement | null>;
    primaryColor?: string;
    backgroundColor?: string;
    highlightColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    tertiaryColor?: string;
    onChange: (startDate: number | null, endDate: number | null) => void;
    model?: "range" | "date";
    startDate?: number;
    endDate?: number;
    locale?: TLocale;
    disablePreviousDays?: boolean;
    renderDayFn?: (day: {
        timestamp: number;
        currentMonth: boolean;
    }, index: number) => ReactNode;
    calendarBaseWidth?: number;
    containerClassName?: string;
    calenderClassName?: string;
    datePickerBodyClassName?: string;
    yearPickerClassName?: string;
    datePickerHeaderClassName?: string;
    chooseTodayClassName?: string;
}
declare const _default: import("react").NamedExoticComponent<Props>;
export default _default;
