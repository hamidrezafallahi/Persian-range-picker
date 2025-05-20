import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import type {
  IDate,
  IDateProps,
} from '../core/type';
import { useRenderPosition } from '../exportComponents/useRenderPosition';
import { CalenderIcon } from '../icons/CalenderIcon';
import { DatePicker } from '../persianDatePicker';

export function DesktopDatePicker({ ...props }: IDateProps) {
  const {
    locale = "fa",
    defaultValue,
    onChange,
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
    dropdownWidth = 285,
    dropdownHeight = 322,
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

  const buttonRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const hookPosition = useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLButtonElement>,
    enabled: isOpen,
    popupSize: { width: dropdownWidth, height: dropdownHeight },
  });

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
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
    setPosition(hookPosition);
  }, [hookPosition]);

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
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
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
