import type { IBaseProps, ITimeZone, TLocale } from "./type";
import { ESteps } from "./type";
interface INavigationProps {
    step: IBaseProps["step"];
    zone: IBaseProps["zone"];
    setDate: IBaseProps["setDate"];
    counter: IBaseProps["counter"];
    setCounter: IBaseProps["setCounter"];
    setCompareDate: IBaseProps["setCompareDate"];
    date: IBaseProps["date"];
    compareDate: IBaseProps["compareDate"];
    setActiveCompareStep: IBaseProps["setActiveCompareStep"];
    activeCompareStep: IBaseProps["activeCompareStep"];
    setTabKey: IBaseProps["setTabKey"];
    setStep: IBaseProps["setStep"];
    setZone: IBaseProps["setZone"];
    locale: IBaseProps["locale"];
}
declare function NavigateButton({ ...props }: INavigationProps): import("react/jsx-runtime").JSX.Element;
export default NavigateButton;
export declare const calculateDate: (step: ESteps, zone: ITimeZone, counter: number, locale: TLocale) => {
    from: number;
    to: number;
};
