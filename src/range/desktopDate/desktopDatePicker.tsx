import React, { useEffect, useRef, useState } from "react";
import style from "../../main.module.css";
import moment from "moment-jalaali";

import { Footer } from "../core/footer";
import { getTimestamp, toPersianDigits } from "../core/helper";
import type { IDate, IDateProps } from "../core/type";
import { useRenderPosition } from "../exportComponents/useRenderPosition";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";
import { DesktopTimePicker } from "./desktopTimePicker";
import { Mask } from "../exportComponents/mask";
import { createPortal } from "react-dom";
import styles from "../../main.module.css";
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
    showSecond = false,
    showMask = false,
    disabled = false,
    Style,
    exportType = "IsoString",
  } = props;
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

  const handleDropdown = () => setIsOpen((prev) => !prev);

  const handleSubmit = () => {
    const finalDate = showTime ? showDate : moment(showDate).valueOf();
    if (exportType == "IsoString") {
      onChange?.(new Date(finalDate).toISOString());
    } else {
      onChange?.(finalDate);
    }
  };

  const handleDateChange = (date: IDate) => {
    const rawTimestamp = getTimestamp(date.from) ?? 0;

    const finalDate = showTime
      ? rawTimestamp
      : moment(rawTimestamp).startOf("day").valueOf();

    setShowDate(finalDate);

    if (!showTime) {
      if (exportType === "IsoString") {
        onChange?.(new Date(finalDate).toISOString());
      } else {
        onChange?.(finalDate);
      }
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
  const changeHandler = (e: number) => {
    if (!e) return;
    setShowDate(e);
    onChange?.(e);
  };

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

  return (
    <>
      <button
        disabled={disabled}
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={handleDropdown}
        type="button"
        className={`${styles.flex} ${styles.justify_between} ${styles.items_center} ${styles.gap_1} ${styles.px_2}   ${styles.rounded_md} ${styles.h_9}   ${style.xs_w_40}
  ${style.w_full}  ${className}`}
        style={{
          ...Style,
          backgroundColor: highlightColor,
          cursor: disabled ? "not-allowed" : "pointer",
          fontSize: "14px",
        }}
      >
        {showMask ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Mask
              {...props}
              exportType="timeStamp"
              defaultValue={showDate}
              onMaskChange={(e) => {
                setShowDate(e as number);
                onChange?.(e as number);
              }}
              Style={{ width: "112px" }}
            />
          </div>
        ) : (
          <div
            className={` ${style.text_start} ${style.text_gray_gray7} `}
            style={{
              color: tertiaryColor,
            }}
          >
            {title}
          </div>
        )}
        <CalenderIcon />
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            style={{
              position: "absolute",
              zIndex: 1050,
              background: "#fff",
            }}
            className={`
              ${style.shadow_lg}
              ${style.p_2}
              ${style.border}
              ${style.rounded_lg}
              ${style.overflow_hidden}
            `}
            dir="ltr"
          >
            <div
              className={`
  ${style.z_50}
  ${style.flex}
  ${style.items_end}
  ${style.gap_2}
  ${showTime ? style.border_r : ""}
  ${style.w_full}
`}
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
                    className={`
  ${style.flex}
  ${style.justify_center}
  ${style.items_center}
  ${style.border_b}
  ${style.h_9}
`}
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
              showDate={showDate}
              locale={locale}
              primaryColor={primaryColor}
              highlightColor={highlightColor}
              chooseTodayClassName={chooseTodayClassName}
              showTime={showTime}
              onSubmit={handleSubmit}
              onChange={changeHandler}
            />
          </div>,
          document.body
        )}
    </>
  );
}
