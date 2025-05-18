import { useEffect, useState } from "react";

interface Position {
  top: number;
  left: number;
}

interface UseRenderPositionOptions<T extends HTMLElement = HTMLElement> {
  buttonRef: React.RefObject<T>;
  popupSize: { width: number; height: number };
  enabled: boolean;
  offset?: number;
}

export function useRenderPosition<T extends HTMLElement = HTMLElement>({
  buttonRef,
  popupSize,
  enabled,
  offset = 4,
}: UseRenderPositionOptions<T>): Position {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  useEffect(() => {
    if (!enabled || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const dir = getComputedStyle(button).direction as "ltr" | "rtl";

    const isEnoughSpaceBelow =
      rect.bottom + popupSize.height <= window.innerHeight;
    const isEnoughSpaceAbove = rect.top - popupSize.height >= 0;

    const isTop = !isEnoughSpaceBelow && isEnoughSpaceAbove;
    const isLeftHalf = rect.left + rect.width / 2 <= window.innerWidth / 2;

    const top = isTop ? -popupSize.height - offset : rect.height + offset;
    let left = 0;

    if (dir === "ltr") {
      left = isLeftHalf ? 0 : rect.width - popupSize.width;
    } else {
      left = isLeftHalf ? 0 : rect.width - popupSize.width;
    }

    setPosition((prev) => {
      if (prev.top === top && prev.left === left) return prev;
      return { top, left };
    });
  }, [enabled, buttonRef, popupSize, offset]);

  return position;
}

// const dropdownHeight = popupSize.height;
// const dropdownWidth = popupSize.width;
// if (enabled && buttonRef.current) {
//   const button = buttonRef.current;
//   const rect = button.getBoundingClientRect();
//   const dir = getComputedStyle(button).direction as "ltr" | "rtl";
//   if (rect.bottom + dropdownHeight / 2 <= window.innerHeight / 2) {
//     //اگر ارتفاع دکمه با کامپوننت جمعش کمتر از نصف صفحه بود ؟
//     if (dir == "ltr") {
//       // اگر دایرکشن ltr بود
//       if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
//         //اگر سمت چپ دکمه به همراه عرض کامپوننت از وسط صفحه رد نشد ؟
//         pos.top = rect.height + 4;
//         pos.left = 0;
//       } else {
//         pos.top = rect.height + 4;
//         pos.left = rect.width - dropdownWidth;
//       }
//     } else {
//       if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
//         pos.top = rect.height + 4;
//         // left= rect.right - rect.width - 10;
//         pos.left = 0;
//       } else {
//         pos.top = rect.height + 4;
//         pos.left = rect.width - dropdownWidth;
//       }
//     }
//   } else {
//     if (dir == "ltr") {
//       if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
//         pos.top = -dropdownHeight - 4;
//         pos.left = 0;
//       } else {
//         pos.top = -dropdownHeight - 4;
//         pos.left = rect.width - dropdownWidth;
//       }
//     } else {
//       if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
//         pos.top = -dropdownHeight - 4;
//         pos.left = 0;
//       } else {
//         pos.top = -dropdownHeight - 4;
//         pos.left = rect.width - dropdownWidth;
//       }
//     }
//   }
// }

// import { useEffect, useMemo, useRef, useState } from "react";

// import moment from "moment-jalaali";

// import type { IDate, IDateProps } from "../core/type";
// import { CalenderIcon } from "../icons/CalenderIcon";
// import { DatePicker } from "../persianDatePicker";
// import { useRenderPosition } from "../exportComponents/useRenderPosition";

// export function DesktopDatePicker({ ...props }: IDateProps) {
//   const {
//     locale = "fa",
//     defaultValue,
//     onChange,
//     tertiaryColor = "#939393",
//     highlightColor = "#f4f4f4",
//     dropdownWidth = 285,
//     dropdownHeight = 322,
//   } = props;
//   const initialDate: IDate = useMemo(() => {
//     return {
//       from: defaultValue && defaultValue.from > 0 ? defaultValue.from : 0,
//       to: 0,
//     };
//   }, [defaultValue]);
//   const [showDate, setShowDate] = useState<IDate>(initialDate);
//   const [isOpen, setIsOpen] = useState(false);
//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   const buttonRef = useRef<HTMLElement | null>(null);
//   const popupRef = useRef<HTMLDivElement | null>(null);
//   const hookPosition = useRenderPosition({
//     buttonRef: buttonRef as React.RefObject<HTMLButtonElement>,
//     enabled: isOpen,
//     popupSize: { width: dropdownWidth, height: dropdownHeight },
//   });
//   const handleDropdown = () => {
//     setIsOpen((prev) => !prev);
//     if (isOpen) {
//       setPosition(hookPosition);
//     }
//   };
//   const handleDateChange = (date: IDate) => {
//     setShowDate(date);
//     onChange?.(date);
//     setShowDate(date);
//     setIsOpen(false);
//   };

//   const persian =
//     showDate.from > 0
//       ? moment(showDate.from).format("jYYYY/jMM/jDD")
//       : "انتخاب تاریخ";

//   const gregorian =
//     showDate.from > 0
//       ? moment(showDate.from).format("YYYY/MM/DD")
//       : "Choose date";

//   const title = locale === "fa" ? persian : gregorian;

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         popupRef.current &&
//         !popupRef.current.contains(event.target as Node) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   return (
//     <div className="relative bg-red-100 w-fit h-full">
//       <button
//         ref={buttonRef as React.RefObject<HTMLButtonElement>}
//         onClick={handleDropdown}
//         style={{ color: tertiaryColor, backgroundColor: highlightColor }}
//         className="flex justify-center items-center gap-2 rounded-md w-40 h-10"
//       >
//         <CalenderIcon />
//         <div>{title}</div>
//       </button>
//       {isOpen && (
//         <div
//           ref={popupRef}
//           style={{
//             position: "absolute",
//             top: position.top,
//             left: position.left,
//             zIndex: 1000,
//           }}
//           className="bg-white shadow p-3 border rounded-lg w-72 h-80"
//         >
//           <DatePicker
//             name="DesktopDate"
//             {...props}
//             model="date"
//             locale={locale}
//             onDateChange={handleDateChange}
//             dateFromOutside={{
//               from: showDate.from,
//               to: 0,
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
