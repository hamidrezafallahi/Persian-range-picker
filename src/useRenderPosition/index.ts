import { useEffect } from 'react';

import { UseRenderPositionOptionsProps } from '../persianDatePicker/type';

export function useRenderPosition<T extends HTMLElement = HTMLElement>({
  buttonRef,
  popupRef,
  setIsOpen,
  onClickOutSide,
  offset = 4,
  isOpen = false,
}: UseRenderPositionOptionsProps<T>): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClickOutSide?.()
        setIsOpen(false);

      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const updatePosition = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      // ... existing position logic
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
        const alignLeft =
          popupArea.width + buttonArea.left <= window.innerWidth;
        const left = alignLeft
          ? buttonArea.left
          : buttonArea.right - popupArea.width;
        const direction =
          buttonRef.current?.dir ||
          getComputedStyle(buttonRef.current!).direction;
        popupRef.current.style.top = `${top + scrollTop}px`;
        if (direction === "rtl") {
          const right = window.innerWidth - buttonArea.right;
          popupRef.current.style.left = "auto";
          popupRef.current.style.right = `${right + scrollLeft}px`;
        } else {
          const left = buttonArea.left;
          popupRef.current.style.right = "auto";
          popupRef.current.style.left = `${left + scrollLeft}px`;
        }
      }
    };
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);
}
