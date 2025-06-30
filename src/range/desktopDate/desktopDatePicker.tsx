import React, { useEffect, useRef, useState } from "react";

import moment from "moment-jalaali";

import { Footer } from "../core/footer";
import { toPersianDigits } from "../core/helper";
import type { IDate, IDateProps } from "../core/type";
import { useRenderPosition } from "../exportComponents/useRenderPosition";
// import { useRenderPosition } from "../exportComponents/useRenderPosition";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";
import { DesktopTimePicker } from "./desktopTimePicker";

export function DesktopDatePicker({ ...props }: IDateProps) {
  const {
    locale = "fa",
    defaultValue,
    onChange,
    primaryColor = "#000",
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
    calendarBaseWidth = 256,
    showTime = false,
    className,
    chooseTodayClassName = "",
    showTimeFormat = "HH:mm:ss",
    isOpenDropdown = false,
    exportType = "timeStamp", //TODO here you should change type of export date or timestamp /preset is timestamp
    showSecond = false,
  } = props;
  //TODO add export type everywhere
  const dynamicFormat = showSecond ? showTimeFormat : "HH:mm";
  const [showDate, setShowDate] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(isOpenDropdown);
  const buttonRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLElement>,
    popupRef: popupRef,
    setIsOpen: setIsOpen,
    isOpen: isOpen,
  });
  const changeHandler = (e: number) => {
    if (!e) return;
    setShowDate(e);
    onChange?.(exportType == "timeStamp" ? e : new Date(e));
  };

  const handleDropdown = () => setIsOpen((prev) => !prev);

  const handleSubmit = () => {
    const finalDate = showTime ? showDate : moment(showDate).valueOf();
    // if (finalDate !== undefined) {
    onChange?.(exportType === "timeStamp" ? finalDate : new Date(finalDate));
    // }
  };

  const handleDateChange = (date: IDate) => {
    const finalDate = showTime
      ? date.from
      : moment(date.from).startOf("day").valueOf();
    setShowDate(finalDate);
    if (!showTime) {
      onChange?.(exportType == "timeStamp" ? finalDate : new Date(finalDate));
      setIsOpen(false);
    }
  };

  const persian =
    showDate > 0
      ? toPersianDigits(
          moment(showDate).format(
            showTime ? `jYYYY/jMM/jDD\u2003${dynamicFormat}` : `jYYYY/jMM/jDD`
          )
        )
      : "انتخاب تاریخ";

  const gregorian =
    showDate > 0
      ? moment(showDate).format(
          showTime ? `YYYY/MM/DD\u2003${dynamicFormat}` : `YYYY/MM/DD`
        )
      : "Choose date";

  const title = locale === "fa" ? persian : gregorian;

  const handleSetTime = (timestamp: number) => {
    setShowDate(timestamp);
  };
  function isDate(value: Date | number | undefined): value is Date {
    return value instanceof Date;
  }

  useEffect(() => {
    let temp: number = 0; // Initialize temp as a number
    const temp2: Date | number | undefined = defaultValue; // Specify a union type

    if (temp2 !== undefined) {
      // Check if temp2 is not undefined
      if (isDate(temp2)) {
        temp = temp2.valueOf();
      } else if (typeof temp2 === "number") {
        temp = temp2; // Use the number directly
      }
    }

    setShowDate(temp);
  }, [defaultValue]);
  // const dateType = locale == ""
  return (
    <div className="range" style={{ position: "relative" }}>
      <button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={handleDropdown}
        className={`flex justify-between items-center gap-1 px-2 rounded-md h-9 w-full  ${
          showTime ? "xs:w-40" : "xs:w-28"
        } ${className}`}
        style={{
          color: tertiaryColor,
          backgroundColor: highlightColor,
          fontSize: "14px",
        }}
      >
        <CalenderIcon />
        <div className="w-full text-start">{title}</div>
      </button>
      {isOpen && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            zIndex: 10,
          }}
          className="bg-white shadow-lg p-2 border rounded-lg overflow-hidden"
          dir="ltr"
        >
          <div
            className={`z-50 flex items-end gap-2 ${
              showTime && "border-r"
            } w-full`}
          >
            <DatePicker
              name="DesktopDate"
              {...props}
              model="date"
              locale={locale}
              onDateChange={handleDateChange}
              dateFromOutside={{ from: showDate, to: 0 }}
              calendarBaseWidth={calendarBaseWidth}
              defaultValue={
                defaultValue ? { from: defaultValue, to: 0 } : undefined
              }
            />
            {showTime && (
              <div
                style={{
                  width: showSecond ? "212px" : "130px",
                  minWidth: showSecond ? "212px" : "130px",
                }}
              >
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
                        moment(showDate).locale(locale).format(dynamicFormat)
                      )
                    : moment(showDate).locale(locale).format(dynamicFormat)}
                </div>
                <DesktopTimePicker
                  {...props}
                  displayButtonCount={5}
                  defaultValue={showDate}
                  setShowDate={setShowDate}
                  onGetValue={handleSetTime}
                />
              </div>
            )}
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
  );
}
