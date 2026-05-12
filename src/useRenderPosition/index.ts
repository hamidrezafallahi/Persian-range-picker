import { useEffect } from 'react';

import { UseRenderPositionOptionsProps } from '../persianDatePicker/type';

export function useRenderPosition<T extends HTMLElement = HTMLElement>({
  buttonRef,
  popupRef,
  setIsOpen,
  onClickOutSide,
  offset = 4,
  isOpen = false,
  position = 'auto',
  align = 'start', 
}: UseRenderPositionOptionsProps<T>): void {
   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef?.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef?.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClickOutSide?.();
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [buttonRef, popupRef, setIsOpen, onClickOutSide]);


  useEffect(() => {
    const updatePosition = () => {
      if (!isOpen || !buttonRef.current || !popupRef.current) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      const buttonArea = buttonRef.current.getBoundingClientRect();
      const popupArea = popupRef.current.getBoundingClientRect();

      // ==================== بخش ۱: محاسبه موقعیت عمودی (Top) ====================
      let placeAbove: boolean;
      switch (position) {
        case 'top':
          placeAbove = true;
          break;
        case 'bottom':
          placeAbove = false;
          break;
        case 'auto':
        default:
          const enoughSpaceBelow = buttonArea.bottom + popupArea.height <= window.innerHeight;
          const enoughSpaceAbove = buttonArea.top - popupArea.height >= 0;
          placeAbove = !enoughSpaceBelow && enoughSpaceAbove;
          break;
      }
      const finalTop = placeAbove
        ? buttonArea.top - popupArea.height - offset
        : buttonArea.top + buttonArea.height + offset;

      // ==================== بخش ۲: محاسبه موقعیت افقی (Left) ====================
      const direction = buttonRef.current?.dir || getComputedStyle(buttonRef.current).direction;
      const isRtl = direction === 'rtl';
      let finalLeft: number;

      switch (align) {
        case 'center':
           finalLeft = buttonArea.left + (buttonArea.width / 2) - (popupArea.width / 2);
          break;
        case 'end':
           finalLeft = isRtl ? buttonArea.left : buttonArea.right - popupArea.width;
          break;
        case 'start':
        default:
           finalLeft = isRtl ? buttonArea.right - popupArea.width : buttonArea.left;
          break;
      }
      
      // ==================== بخش ۳: اعمال استایل‌ها ====================
      if (popupRef.current) {
        popupRef.current.style.top = `${finalTop + scrollTop}px`;
        popupRef.current.style.left = `${finalLeft + scrollLeft}px`;
        popupRef.current.style.right = 'auto';  
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
  }, [isOpen, buttonRef, popupRef, offset, position, align]);  
}
