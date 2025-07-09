import React, { type Dispatch, type SetStateAction } from "react";
interface Props {
    defaultValue?: number;
    calendarType?: "shamsi" | "gregorian";
    containerClassName?: string;
    displayButtonCount?: number;
    tertiaryColor?: string;
    highlightColor?: string;
    format?: string;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    onGetValue?: (e: number) => void;
    onChange?: (e: number) => void;
    setShowDate: Dispatch<SetStateAction<number>>;
    showSecond?: boolean;
}
export declare const DesktopTimePicker: React.FC<Props>;
export {};
