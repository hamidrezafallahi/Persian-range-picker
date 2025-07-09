import type { IDate, ITimeSections, ITimeZone, TLocale } from "./type";
import { ESteps } from "./type";
export declare const toPersianDigits: (str: string) => string;
export declare const getTimestampsForPeriod: (period: ITimeZone, locale: string) => {
    from: number;
    to: number;
};
export declare const backwardStep: {
    [key in ESteps]: number;
};
export declare const time: string[];
export declare const stepToTimeIndex: {
    [key in ESteps]: number;
};
export declare const period: (date: IDate, locale: TLocale, zone: ITimeZone) => ITimeSections[];
export declare function getLabel(zone: ITimeZone, timeZone: ITimeZone, locale?: TLocale): string;
