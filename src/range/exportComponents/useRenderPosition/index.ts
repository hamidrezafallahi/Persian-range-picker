// import { useEffect, useState } from "react";

// interface Position {
//   top: number;
//   left: number;
// }

// interface UseRenderPositionOptions<T extends HTMLElement> {
//   buttonRef: React.RefObject<T | null>; // ⬅ تغییر دادیم
//   popupSize: { width: number; height: number };
//   enabled: boolean;
//   offset?: number;
// }

// export function useRenderPosition<T extends HTMLElement = HTMLElement>({
//   buttonRef,
//   popupSize,
//   enabled,
//   offset = 4,
// }: UseRenderPositionOptions<T>): Position {
//   const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

//   useEffect(() => {
//     if (!enabled || !buttonRef.current) return;

//     const button = buttonRef.current;
//     const rect = button.getBoundingClientRect();
//     const enoughSpaceBelow =
//       rect.bottom + popupSize.height <= window.innerHeight;
//     const enoughSpaceAbove = rect.top - popupSize.height >= 0;
//     const placeAbove = !enoughSpaceBelow && enoughSpaceAbove;
//     const top = placeAbove ? -popupSize.height - offset : rect.height + offset;

//     const centerX = rect.left + rect.width / 2;
//     const screenCenter = window.innerWidth / 2;
//     const alignLeft = centerX <= screenCenter;
//     const left = alignLeft ? 0 : rect.width - popupSize.width;

//     setPosition((prev) =>
//       prev.top !== top || prev.left !== left ? { top, left } : prev
//     );
//   }, [enabled, popupSize.height, popupSize.width, offset, buttonRef]);
//   return position;
// }
////////////////////////////////////////////////////////////////////////////////
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
        ? -popupArea.height - offset
        : buttonArea.height + offset;

      const centerX = buttonArea.left + buttonArea.width / 2;
      const screenCenter = window.innerWidth / 2;
      const alignLeft = centerX <= screenCenter;
      const left = alignLeft ? 0 : buttonArea.width - popupArea.width;
      popupRef.current.style.top = `${top}px`;
      popupRef.current.style.left = `${left}px`; //TODO use translate by Ai instead of left
      // popupRef.current.style.transform = `translateY(${top}px)`;
      // popupRef.current.style.transform = `translateX(${top}px)`;
      console.log(top, left);
    }
  }, [isOpen]);
}
// این میخواد لحظه ی رندر شدن تازه دیده بشه و بعدش من بیام حالا زد ایندکس یا اوپسیتی بدم که دیده بشه الان آندیفایند میزنه و تغییر نمیکنه باید بپرسم چرا ی.ر زف تغییر میکنه این هیچ تغییری نمیکنه ؟
// Custom usePopper hook implementation
// export const useRenderPosition = (
//   referenceElement,
//   popperElement,
//   options = {}
// ) => {
//   const defaultOptions = {
//     placement: "bottom",
//     modifiers: [],
//     strategy: "absolute",
//   };

//   const config = { ...defaultOptions, ...options };

//   // State object to hold popper data
//   const state = {
//     styles: {
//       popper: {},
//       arrow: {},
//     },
//     attributes: {},
//     update: null,
//   };

//   // Function to update popper position
//   const update = () => {
//     if (!referenceElement || !popperElement) return;

//     const referenceRect = referenceElement.current.getBoundingClientRect();
//     const popperRect = popperElement.current.getBoundingClientRect();

//     // Calculate position based on placement
//     let top, left;
//     const arrowSize = 10;

//     switch (config.placement) {
//       case "top":
//         top = referenceRect.top - popperRect.height;
//         left =
//           referenceRect.left + (referenceRect.width - popperRect.width) / 2;
//         state.styles.arrow = {
//           bottom: -arrowSize / 2,
//           left: "50%",
//           transform: "translateX(-50%)",
//         };
//         break;
//       case "bottom":
//         top = referenceRect.bottom;
//         left =
//           referenceRect.left + (referenceRect.width - popperRect.width) / 2;
//         state.styles.arrow = {
//           top: -arrowSize / 2,
//           left: "50%",
//           transform: "translateX(-50%)",
//         };
//         break;
//       case "left":
//         top =
//           referenceRect.top + (referenceRect.height - popperRect.height) / 2;
//         left = referenceRect.left - popperRect.width;
//         state.styles.arrow = {
//           right: -arrowSize / 2,
//           top: "50%",
//           transform: "translateY(-50%)",
//         };
//         break;
//       case "right":
//         top =
//           referenceRect.top + (referenceRect.height - popperRect.height) / 2;
//         left = referenceRect.right;
//         state.styles.arrow = {
//           left: -arrowSize / 2,
//           top: "50%",
//           transform: "translateY(-50%)",
//         };
//         break;
//       default:
//         top = referenceRect.bottom;
//         left = referenceRect.left;
//     }

//     // Apply styles
//     state.styles.popper = {
//       position: config.strategy,
//       top: `${top}px`,
//       left: `${left}px`,
//     };

//     // Apply styles to elements
//     Object.assign(popperElement.style, state.styles.popper);
//     if (popperElement.querySelector(".popper-arrow")) {
//       Object.assign(
//         popperElement.querySelector(".popper-arrow").style,
//         state.styles.arrow
//       );
//     }

//     return state;
//   };

// Initialize
// state.update = update;
// update();

// return state;
// };
