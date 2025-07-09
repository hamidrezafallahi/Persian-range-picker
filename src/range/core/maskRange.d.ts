import React, { type Dispatch } from 'react';
import type { IDate, TLocale } from './type';
interface IProps {
    date: IDate;
    setDate: Dispatch<React.SetStateAction<IDate>>;
    locale: TLocale;
}
declare function MaskRange({ ...props }: IProps): import("react/jsx-runtime").JSX.Element;
export default MaskRange;
