import { type Dispatch, type SetStateAction, useEffect } from "react";

interface UseRenderPositionOptions<T extends HTMLElement> {
  buttonRef: React.RefObject<T | null>; // ⬅ تغییر دادیم
  popupRef: React.RefObject<T | null>; // ⬅ تغییر دادیم
  offset?: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export function useRenderPosition<T extends HTMLElement = HTMLElement>({
  buttonRef,
  popupRef,
  setIsOpen,
  offset = 4,
  isOpen = false,
}: UseRenderPositionOptions<T>): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (isOpen && buttonRef.current && popupRef.current) {
      const buttonArea = buttonRef.current.getBoundingClientRect();
      const popupArea = popupRef.current.getBoundingClientRect();
      const enoughSpaceBelow =
        buttonArea.bottom + popupArea.height <= window.innerHeight;
      const enoughSpaceAbove = buttonArea.top - popupArea.height >= 0;
      const placeAbove = !enoughSpaceBelow && enoughSpaceAbove;
      const top = placeAbove
        ? buttonArea.top - popupArea.height - offset
        : buttonArea.top + buttonArea.height + offset;

      const centerX = buttonArea.left + buttonArea.width / 2;
      const screenCenter = window.innerWidth / 2;
      const alignLeft = centerX <= screenCenter;
      const left = alignLeft
        ? buttonArea.left
        : buttonArea.left + popupArea.width - buttonArea.width;
      popupRef.current.style.top = `${top}px`;
      popupRef.current.style.left = `${left}px`;
      console.log(top, popupArea, buttonArea);
    }
  }, [isOpen]);
}
