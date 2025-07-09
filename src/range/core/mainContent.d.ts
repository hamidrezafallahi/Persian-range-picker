import { type Dispatch, type SetStateAction } from 'react';
import { type IBaseProps } from './type';
interface IProps extends IBaseProps {
    setCustomData: Dispatch<SetStateAction<unknown>>;
}
declare const MainContent: ({ ...props }: IProps) => import("react/jsx-runtime").JSX.Element;
export default MainContent;
