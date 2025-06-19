import React, { useMemo, useRef, useState } from "react";

import moment from "moment-jalaali";

import { Footer } from "../core/footer";
import { toPersianDigits } from "../core/helper";
import type { HandleParams, IDate, IDateProps } from "../core/type";
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
  const buttonRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const hookPosition = useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLElement>,
    popupRef: popupRef,
    setIsOpen: setIsOpen,
    isOpen:isOpen,
    offset: 4,
  });

  const changeHandler = (e: HandleParams["Data"] | undefined) => {
    if (!e) return;
    const date = e.date as IDate;
    setShowDate({ from: date.from, to: 0 });
    setShowDate({ from: date.from, to: 0 });
    onChange?.({ type: "date",Data:{date} });
  };





  const handleDropdown = () => setIsOpen((prev) => !prev);

  const handleSubmit = () => {
    const finalDate = showTime
      ? showDate.from
      : moment(showDate.from).startOf("day").valueOf();

    onChange?.({ type: "date", Data: { from: finalDate, to: 0 } });
  };

  const handleDateChange = (date: IDate) => {
    const finalDate = showTime
      ? date.from
      : moment(date.from).startOf("day").valueOf();
    setShowDate({ from: finalDate, to: 0 });
    if (!showTime) {
      onChange?.({ type: "date", Data: { from: finalDate, to: 0 } });
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

  const title = locale === "fa" ? persian : gregorian;

  const handleSetTime = (timestamp: number) => {
    setShowDate({ from: timestamp, to: 0 });
  };

  return (
    <div className="range">
      <div className="relative ">
 <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={handleDropdown}
           className={`flex justify-start items-center gap-2 px-2 h-9 rounded-md  w-full ${
            showTime ? "xs:w-40" : "xs:w-28"
          } ${className}`}
          style={{ color: tertiaryColor, backgroundColor: highlightColor }}
        >
           <CalenderIcon />
          <div className="text-sm">{title}</div>
        </button>
        {isOpen && (
          <div
            ref={popupRef}
            style={{
              position:"absolute",
              minWidth: showTime ? dropdownWidth + 238 : dropdownWidth,
            }}
            className="bg-white shadow-lg p-2 border rounded-lg overflow-hidden"
          >
            <div className="flex items-end gap-2 border-r w-full">
              <DatePicker
                name="DesktopDate"
                {...props}
                model="date"
                locale={locale}
                onDateChange={handleDateChange}
                dateFromOutside={{ from: showDate.from, to: 0 }}
                calendarBaseWidth={calendarBaseWidth}
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
                          moment(showDate.from)
                            .locale(locale)
                            .format(showTimeFormat)
                        )
                      : moment(showDate.from)
                          .locale(locale)
                          .format(showTimeFormat)}
                  </div>
                  <DesktopTimePicker
                    {...props}
                    displayButtonCount={5}
                    defaultValue={showDate.from}
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
