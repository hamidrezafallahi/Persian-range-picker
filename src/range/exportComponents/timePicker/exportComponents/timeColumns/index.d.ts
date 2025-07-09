import React from "react";
type Props = {
    renderHeight?: string;
    renderOptions: (count: number, unit: "hour" | "minute" | "second") => React.ReactNode[];
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    showSecond?: boolean;
    TimeColumnsClassName?: string;
};
export declare const TimeColumns: React.FC<Props>;
export {};
