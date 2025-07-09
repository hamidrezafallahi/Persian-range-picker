import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { IDesktopRangeProps } from "./type";
interface IFooter {
    setShowDate: Dispatch<SetStateAction<number>>;
    showDate: number;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
    locale: IDesktopRangeProps["locale"];
    elements?: ReactNode[] | null;
    primaryColor?: string;
    highlightColor?: string;
    chooseTodayClassName?: string;
    showTime: boolean;
    onChange?: (e: number) => void;
    onSubmit?: () => void;
    onNowButton?: () => void;
    onTodayButton?: () => void;
}
export declare const Footer: ({ ...props }: IFooter) => import("react/jsx-runtime").JSX.Element;
export {};
