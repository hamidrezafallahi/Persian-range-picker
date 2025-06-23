import React, { useEffect, useMemo, useRef, useState } from "react";

import moment from "moment-jalaali";

import { Footer } from "../core/footer";
import { toPersianDigits } from "../core/helper";
import type { IDate, IDateProps } from "../core/type";
import { useRenderPosition } from "../exportComponents/useRenderPosition";
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
    dropdownWidth = 256,
    calendarBaseWidth = 256,
    showTime = false,
    className,
    chooseTodayClassName = "",
    showTimeFormat = "HH:mm:ss",
    exportType = "timeStamp", //TODO here you should change type of export date or timestamp /preset is timestamp
  } = props;
  // const initialDate: number = useMemo(() => {
  //   let temp: number = 0; // Initialize temp as a number
  //   const temp2: any = defaultValue;
  //   if (defaultValue) {
  //     if (temp2 instanceof Date) {
  //       temp = temp2.valueOf();
  //     } else if (typeof defaultValue === "number") {
  //       temp = temp2; // Use the number directly
  //     }
  //   }
  //   return temp;
  // }, [defaultValue]);
  //TODO add export type everywhere

  const [showDate, setShowDate] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // const hookPosition = useRenderPosition({ //TODO findout without using const making hook
  //   buttonRef: buttonRef as React.RefObject<HTMLElement>,
  //   popupRef: popupRef,
  //   setIsOpen: setIsOpen,
  //   isOpen: isOpen,
  //   offset: 4,
  // });
  const changeHandler = (e: number) => {
    if (!e) return;
    setShowDate(e);
    onChange?.(exportType == "timeStamp" ? e : new Date(e));
  };

  const handleDropdown = () => setIsOpen((prev) => !prev);

  const handleSubmit = () => {
    const finalDate = showTime ? showDate : moment(showDate).valueOf();
    onChange?.(exportType == "timeStamp" ? finalDate : new Date(finalDate));
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
            showTime ? `jYYYY/jMM/jDD\u2003${showTimeFormat}` : `jYYYY/jMM/jDD`
          )
        )
      : "انتخاب تاریخ";

  const gregorian =
    showDate > 0
      ? moment(showDate).format(
          showTime ? `YYYY/MM/DD\u2003${showTimeFormat}` : `YYYY/MM/DD`
        )
      : "Choose date";

  const title = locale === "fa" ? persian : gregorian;

  const handleSetTime = (timestamp: number) => {
    setShowDate(timestamp);
  };
  useEffect(() => {
    let temp: number = 0; // Initialize temp as a number
    const temp2: any = defaultValue;
    if (defaultValue) {
      if (temp2 instanceof Date) {
        temp = temp2.valueOf();
      } else if (typeof defaultValue === "number") {
        temp = temp2; // Use the number directly
      }
    }
    setShowDate(temp);
  }, [defaultValue]);

  return (
    <div className="range">
      <div className="relative">
        <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={handleDropdown}
          className={`flex justify-between items-center gap-2 px-2 rounded-md h-9 w-full  ${
            showTime ? "xs:w-40 " : "xs:w-28"
          } ${className}`}
          style={{ color: tertiaryColor, backgroundColor: highlightColor }}
        >
          <div className="w-full text-start">{title}</div>
          <CalenderIcon />
        </button>
        {isOpen && (
          <div
            ref={popupRef}
            style={{
              position: "absolute",
              zIndex: 10,
              minWidth: showTime ? dropdownWidth + 238 : dropdownWidth,
            }}
            className="bg-white shadow-lg p-2 border rounded-lg overflow-hidden"
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
                defaultValue={{ from: defaultValue, to: 0 }}
              />
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
                          moment(showDate).locale(locale).format(showTimeFormat)
                        )
                      : moment(showDate).locale(locale).format(showTimeFormat)}
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
    </div>
  );
}
