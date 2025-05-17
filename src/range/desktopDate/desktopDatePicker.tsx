import { useEffect, useMemo, useRef, useState } from "react";

import moment from "moment-jalaali";

import type { IDate, IDateProps } from "../core/type";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";

export function DesktopDate({ ...props }: IDateProps) {
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
      const newState = !prev;
      if (newState && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        if (rect.bottom + height / 2 <= window.innerHeight / 2) {
          if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
            setPosition({
              top: rect.bottom + 4,
              left: rect.left,
            });
          } else {
            setPosition({
              top: rect.bottom + 4,
              left: rect.right - width,
            });
          }
        } else {
          if (rect.left + rect.width / 2 <= window.innerWidth / 2) {
            setPosition({
              top: rect.top - height - 4,
              left: rect.left,
            });
          } else {
            setPosition({
              top: rect.top - height - 4,
              left: rect.right - width,
            });
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
    <div className="relative w-full h-full">
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
          className="shadow p-3 border rounded-lg w-72 h-80"
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
