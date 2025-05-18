import { useEffect, useMemo, useRef, useState } from "react";

import moment from "moment-jalaali";

import type { IDate, IDateProps } from "../core/type";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";

export function DesktopDatePicker({ ...props }: IDateProps) {
  const {
    locale = "fa",
    defaultValue,
    onChange,
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
  } = props;
  const initialDate: IDate = useMemo(() => {
    return {
      from: defaultValue && defaultValue.from > 0 ? defaultValue.from : 0,
      to: 0,
    };
  }, [defaultValue]);
  const [showDate, setShowDate] = useState<IDate>(initialDate);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const handleDropdown = () => {
    const width = 285;
    const height = 322;
    setIsOpen((prev) => {
      let dir = "ltr";
      if (buttonRef.current) {
        dir = getComputedStyle(buttonRef.current).direction;
      }
      const newState = !prev;
      if (newState && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        if (rect.bottom + height / 2 <= window.innerHeight / 2) {
          //اگر ارتفاع دکمه با کامپوننت جمعش کمتر از نصف صفحه بود ؟
          if (dir == "ltr") {
            // اگر دایرکشن ltr بود
            if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
              //اگر سمت چپ دکمه به همراه عرض کامپوننت از وسط صفحه رد نشد ؟
              setPosition({
                top: rect.height + 4,
                left: 0,
              });
            } else {
              setPosition({
                top: rect.height + 4,
                left: rect.width - width,
              });
            }
          } else {
            if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
              setPosition({
                top: rect.height + 4,
                // left: rect.right - rect.width - 10,
                left: 0,
              });
            } else {
              setPosition({
                top: rect.height + 4,
                left: rect.width - width,
              });
            }
          }
        } else {
          if (dir == "ltr") {
            if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
              setPosition({
                top: -height - 4,
                left: 0,
              });
            } else {
              setPosition({
                top: -height - 4,
                left: rect.width - width,
              });
            }
          } else {
            if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
              setPosition({
                top: -height - 4,
                left: 0,
              });
            } else {
              setPosition({
                top: -height - 4,
                left: rect.width - width,
              });
            }
          }
        }
      }
      return newState;
    });
  };
  const handleDateChange = (date: IDate) => {
    setShowDate(date);
    onChange?.(date);
    setShowDate(date);
    setIsOpen(false);
  };

  const persian =
    showDate.from > 0
      ? moment(showDate.from).format("jYYYY/jMM/jDD")
      : "انتخاب تاریخ";

  const gregorian =
    showDate.from > 0
      ? moment(showDate.from).format("YYYY/MM/DD")
      : "Choose date";

  const title = locale === "fa" ? persian : gregorian;

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
  return (
    <div className="relative bg-red-100 w-fit h-full">
      <button
        ref={buttonRef}
        onClick={handleDropdown}
        style={{ color: tertiaryColor, backgroundColor: highlightColor }}
        className="flex justify-center items-center gap-2 rounded-md w-40 h-10"
      >
        <CalenderIcon />
        <div>{title}</div>
      </button>
      {isOpen && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            zIndex: 1000,
          }}
          className="bg-white shadow p-3 border rounded-lg w-72 h-80"
        >
          <DatePicker
            name="DesktopDate"
            {...props}
            model="date"
            locale={locale}
            onDateChange={handleDateChange}
            dateFromOutside={{
              from: showDate.from,
              to: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
