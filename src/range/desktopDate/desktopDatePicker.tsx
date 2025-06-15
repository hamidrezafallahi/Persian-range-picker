import React, { useEffect, useMemo, useRef, useState } from "react";

import moment from "moment-jalaali";

import { Footer } from "../core/footer";
import { toPersianDigits } from "../core/helper";
import type { IDate, IDateProps } from "../core/type";
import { TimePicker } from "../exportComponents/timePicker";
import { useRenderPosition } from "../exportComponents/useRenderPosition";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";

export function DesktopDatePicker({ ...props }: IDateProps) {
  const {
    locale = "fa",
    defaultValue,
    onChange,
    primaryColor = "#000",
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
    dropdownWidth = 256,
    calendarBaseWidth = 256,
    dropdownHeight = 314,
    showTime = false,
    className,
    chooseTodayClassName = "",
    showTimeFormat = "HH:mm:ss",
  } = props;

  const initialDate: IDate = useMemo(
    () => ({
      from: defaultValue?.from && defaultValue.from > 0 ? defaultValue.from : 0,
      to: 0,
    }),
    [defaultValue]
  );

  const [showDate, setShowDate] = useState<IDate>(initialDate);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [popupSize, setPopupSize] = useState({
    width: dropdownWidth,
    height: dropdownHeight,
  });

  const buttonRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const hookPosition = useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLButtonElement>,
    enabled: isOpen,
    popupSize,
  });
  const changeHandler = (e) => {
    setShowDate({ from: e.date?.from, to: 0 });
    onChange(e);
  };

  useEffect(() => {
    if (isOpen && popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      setPopupSize({ width: rect.width, height: rect.height });
    }
  }, [isOpen]);

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

  const handleDropdown = () => setIsOpen((prev) => !prev);

  const handleSubmit = () => {
    const finalDate = showTime
      ? showDate.from
      : moment(showDate.from).startOf("day").valueOf();

    onChange?.({ type: "date", date: { from: finalDate, to: 0 } });
  };

  const handleDateChange = (date: IDate) => {
    const finalDate = showTime
      ? date.from
      : moment(date.from).startOf("day").valueOf();
    setShowDate({ from: finalDate, to: 0 });
    if (!showTime) {
      onChange?.({ type: "date", date: { from: finalDate, to: 0 } });
      setIsOpen(false);
    }
  };

  const persian =
    showDate.from > 0
      ? toPersianDigits(
          moment(showDate.from).format(
            showTime ? `${showTimeFormat}\u2003jYYYY/jMM/jDD` : "jYYYY/jMM/jDD"
          )
        )
      : "انتخاب تاریخ";

  const gregorian =
    showDate.from > 0
      ? moment(showDate.from).format(
          showTime ? `${showTimeFormat}\u2003YYYY/MM/DD` : "YYYY/MM/DD"
        )
      : "Choose date";
  console.log(persian);

  const title = locale === "fa" ? persian : gregorian;

  const handleSetTime = (timestamp: number) => {
    setShowDate({ from: timestamp, to: 0 });
    if (showTime) {
      onChange?.({ type: "date", date: { from: timestamp, to: 0 } });
    }
  };

  return (
    <div className="range">
      <div className="relative">
        <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={handleDropdown}
          style={{
            color: tertiaryColor,
            backgroundColor: highlightColor,
            height: 34,
          }}
          className={`flex justify-start items-center gap-2 px-3   rounded-md w-full ${className}`}
        >
          <CalenderIcon />
          <div className="text-sm">{title}</div>
        </button>

        {isOpen && (
          <div
            ref={popupRef}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              zIndex: 1000,
              minWidth: showTime ? dropdownWidth + 238 : dropdownWidth,
            }}
            className="bg-white shadow-lg p-2 border rounded-lg overflow-hidden"
          >
            <div className="flex items-end gap-2 border-r w-full">
              {showTime && (
                <div style={{ width: "212px", minWidth: "212px" }}>
                  <div
                    className="flex justify-center items-center border-b h-9"
                    style={{
                      height: "34px",
                      fontSize: "14px",
                      color: tertiaryColor,
                    }}
                  >
                    {locale === "fa"
                      ? toPersianDigits(
                          moment(showDate.from)
                            .locale(locale)
                            .format(showTimeFormat)
                        )
                      : moment(showDate.from)
                          .locale(locale)
                          .format(showTimeFormat)}
                  </div>
                  <TimePicker
                    {...props}
                    displayButtonCount={5}
                    defaultValue={new Date(showDate.from)}
                    flatRender={true}
                    onGetValue={handleSetTime}
                  />
                </div>
              )}

              <DatePicker
                name="DesktopDate"
                {...props}
                model="date"
                locale={locale}
                onDateChange={handleDateChange}
                dateFromOutside={{ from: showDate.from, to: 0 }}
                calendarBaseWidth={calendarBaseWidth}
              />
            </div>

            <Footer
              setIsOpen={setIsOpen}
              setShowDate={setShowDate}
              locale={locale}
              primaryColor={primaryColor}
              highlightColor={highlightColor}
              chooseTodayClassName={chooseTodayClassName}
              showTime={showTime}
              onSubmit={handleSubmit}
              onChange={changeHandler}
            />
          </div>
        )}
      </div>
    </div>
  );
}
