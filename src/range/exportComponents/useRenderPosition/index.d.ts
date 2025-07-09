import { type Dispatch, type SetStateAction } from "react";
interface UseRenderPositionOptions<T extends HTMLElement> {
    buttonRef: React.RefObject<T | null>;
    popupRef: React.RefObject<T | null>;
    offset?: number;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}
export declare function useRenderPosition<T extends HTMLElement = HTMLElement>({ buttonRef, popupRef, setIsOpen, offset, isOpen, }: UseRenderPositionOptions<T>): void;
export {};
