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
import { useEffect, type Dispatch, type SetStateAction } from "react";



interface UseRenderPositionOptions<T extends HTMLElement> {
  buttonRef: React.RefObject<T | null>; // ⬅ تغییر دادیم
  popupRef: React.RefObject<T | null>; // ⬅ تغییر دادیم
  offset?: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen:boolean
}

export function useRenderPosition<T extends HTMLElement = HTMLElement>({
  buttonRef,
  popupRef,
  setIsOpen,
  offset = 4,
  isOpen=false
}: UseRenderPositionOptions<T>): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
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
useEffect(()=>{
  if (isOpen && buttonRef.current && popupRef.current) {
    const buttonArea = buttonRef.current.getBoundingClientRect();
    const popupArea = popupRef.current.getBoundingClientRect();
    const enoughSpaceBelow =
      buttonArea.bottom + popupArea.height <= window.innerHeight;
    const enoughSpaceAbove = buttonArea.top - popupArea.height >= 0;
    const placeAbove = !enoughSpaceBelow && enoughSpaceAbove;
    const top = placeAbove ? -popupArea.height - offset : buttonArea.height + offset;
    const centerX = buttonArea.left + buttonArea.width / 2;
    const screenCenter = window.innerWidth / 2;
    const alignLeft = centerX <= screenCenter;
    const left = alignLeft ? 0 : buttonArea.width - popupArea.width;
    popupRef.current.style.top = `${top}px`
    popupRef.current.style.left = `${left}px`
  }
},[isOpen])

}
//این میخواد لحظه ی رندر شدن تازه دیده بشه و بعدش من بیام حالا زد ایندکس یا اوپسیتی بدم که دیده بشه الان آندیفایند میزنه و تغییر نمیکنه باید بپرسم چرا ی.ر زف تغییر میکنه این هیچ تغییری نمیکنه ؟