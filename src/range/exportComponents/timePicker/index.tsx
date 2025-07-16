import React, { useEffect, useRef, useState } from "react";
import moment from "moment-jalaali";
import { toPersianDigits } from "../../core/helper";
import type { ITimePickerProps, TUnit } from "../../core/type";
import { CalenderIcon } from "../../icons/CalenderIcon";
import { useRenderPosition } from "../useRenderPosition";
import { TimeColumns } from "./exportComponents";
import style from "../../../main.module.css";
import { createPortal } from "react-dom";

export const TimePicker: React.FC<ITimePickerProps> = ({
  defaultValue,
  onChange,
  calendarType = "shamsi",
  containerClassName,
  okButtonClassName,
  nowButtonClassName,
  timeButtonClassName,
  displayButtonCount = 5,
  icon = <CalenderIcon />,
  tertiaryColor = "#939393",
  highlightColor = "#f4f4f4",
  format = "HH:mm:ss",
  showSecond = false,
  showNow = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabled = false,
  exportType = "IsoString",
}: ITimePickerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<number | null>(
    defaultValue ? defaultValue : null
  );
  const device: "mobile" | "desktop" =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);

  const locale = calendarType == "shamsi" ? "fa" : "en";
  const dynamicFormat = showSecond ? format : "HH:mm";
  const renderHeight =
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 24) +
    20 +
    (displayButtonCount - 1) * 16;

  useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLElement>,
    popupRef: popupRef,
    setIsOpen: setOpen,
    isOpen: open,
  });
  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = time
      ? moment(time).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setTime(updated.valueOf());
    const targetDiv = document.getElementById(unit);
    if (targetDiv) {
      targetDiv.scrollTop = value * 40;
    }
  };

  const handleSubmit = () => {
    if (time && time > 0) {
      const value =
        exportType === "timeStamp"
          ? time
          : calendarType === "shamsi"
          ? moment(time).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : moment.utc(time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      onChange?.(value);
    }
    setOpen(false);
    popoverRef.current?.hidePopover();
  };

  const handleNow = () => {
    const now = locale === "fa" ? moment() : moment.utc();
    let updated;

    const isInvalid = !time || isNaN(time) || !moment(time).isValid();

    if (isInvalid) {
      updated = locale === "fa" ? moment() : moment.utc();
    } else {
      updated = locale === "fa" ? moment(time) : moment.utc(moment(time));
    }

    updated = updated
      .set("hour", now.hour())
      .set("minute", now.minute())
      .set("second", now.second());

    setTime(updated.valueOf());
    const hourDiv = document.getElementById("hour");
    if (hourDiv) {
      hourDiv.scrollTop = now.hour() * 40;
    }
    const minuteDiv = document.getElementById("minute");
    if (minuteDiv) {
      minuteDiv.scrollTop = now.minute() * 40;
    }
    const secondDiv = document.getElementById("second");
    if (secondDiv) {
      secondDiv.scrollTop = now.second() * 40;
    }
  };
  const renderOptions = (count: number, unit: TUnit, step = 1) => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    const active = moment(time).locale(locale).get(unit);

    return Array.from({ length: Math.ceil(count / step) }, (_, i) => {
      const val = i * step;
      return (
        <button
          key={val}
          onClick={() => handleTimeChange(unit, val)}
          className={`
            ${style.flex}
            ${style.justify_center}
            ${style.items_center}
            ${style.rounded_md}
            ${style.w_6}
            ${style.aspect_square}
            ${
              active === val
                ? `
              ${style.pointer_events_auto}
              ${style.opacity_100}
              ${style.text_main_white}
              ${style.bg_main_black}
            `
                : ""
            }
          `}
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
          style={{ color: tertiaryColor, fontSize: "14px" }}
        >
          {locale == "fa" ? toPersianDigits(pad(val)) : pad(val)}
        </button>
      );
    });
  };

  useEffect(() => {
    if (defaultValue) {
      setTime(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div
      style={{
        width: device == "desktop" ? "fit-content" : "100%",
      }}
    >
      {device == "desktop" ? (
        <>
          <button
            disabled={disabled}
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={() => setOpen((prev) => !prev)}
            className={`
              ${style.relative}
              ${style.flex}
              ${style.justify_between}
              ${style.items_center}
              ${style.gap_2}
              ${style.px_2}
              ${style.rounded_md}
              ${style.w_full}
              ${style.xs_w_28}
              ${style.h_9}
            
              ${timeButtonClassName}
            `}
            style={{
              color: tertiaryColor,
              backgroundColor: highlightColor,
              fontSize: "14px",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            <span className={style.text_lg}>{icon}</span>
            {time
              ? moment(time).locale(locale).format(dynamicFormat)
              : "انتخاب زمان"}
          </button>

          {open &&
            createPortal(
              <div
                ref={popupRef}
                style={{
                  position: "absolute",
                  background: "#fff",
                  zIndex: 1050,
                }}
                className={`
                ${style.flex}
                ${style.flex_col}
                ${style.gap_2}
                ${style.bg_white}
                ${style.shadow_lg}
                ${style.p_3}
                ${style.border}
                ${style.border_gray_300}
                ${style.rounded_lg}
                ${containerClassName}
              `}
              >
                <TimeColumns
                  renderHeight={`${renderHeight}px`}
                  renderOptions={(count, unit) =>
                    renderOptions(
                      count,
                      unit,
                      unit === "hour"
                        ? hourStep
                        : unit === "minute"
                        ? minuteStep
                        : secondStep
                    )
                  }
                  hourStep={hourStep}
                  minuteStep={minuteStep}
                  secondStep={secondStep}
                  showSecond={showSecond}
                />
                <div
                  className={`${style.flex} ${style.justify_between} ${style.gap_4} ${style.mt_2}`}
                >
                  {showNow && (
                    <button
                      onClick={handleNow}
                      className={`
                      ${style.p_2}
                      ${style.px_3}
                      ${style.border}
                      ${style.rounded_md}
                      ${nowButtonClassName}
                    `}
                    >
                      {locale === "fa" ? "الان" : "Now"}
                    </button>
                  )}
                  <button
                    onClick={handleSubmit}
                    className={`
                    ${style.p_2}
                    ${style.px_3}
                    ${style.border}
                    ${style.rounded_md}
                    ${okButtonClassName}
                  `}
                    style={{
                      background: "black",
                      borderColor: "black",
                      color: "white",
                    }}
                  >
                    {locale === "fa" ? "تایید" : "OK"}
                  </button>
                </div>
              </div>,
              document.body
            )}
        </>
      ) : (
        <>
          <button
            disabled={disabled}
            popoverTarget="mobileTimeModal"
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={() => setOpen((prev) => !prev)}
            className={`
              ${style.relative}
              ${style.flex}
              ${style.justify_between}
              ${style.items_center}
              ${style.gap_2}
              ${style.px_2}
              ${style.rounded_md}
              ${style.w_full}
              ${style.h_9}
              ${disabled ? style.cursor_not_allowed : ""}
              ${timeButtonClassName}
            `}
            style={{
              color: tertiaryColor,
              backgroundColor: highlightColor,
              fontSize: "14px",
            }}
          >
            <span className={style.text_lg}>{icon}</span>
            {time
              ? moment(time).locale(locale).format(dynamicFormat)
              : "انتخاب زمان"}
          </button>

          {open && (
            <div
              popover="auto"
              id="mobileTimeModal"
              ref={popoverRef}
              // style={{
              //   position: "absolute",
              //   // width: 190,
              //   zIndex: 10,
              // }}
              className={`
                ${style.relative}
                ${style.flex}
                ${style.justify_between}
                ${style.items_center}
                ${style.gap_2}
                ${style.px_2}
                ${style.rounded_md}
                ${style.w_full}
                ${style.h_9}
                ${disabled ? style.cursor_not_allowed : ""}
                ${timeButtonClassName}
              `}
            >
              <div
                className={`${style.flex} ${style.justify_center} ${style.items_center} ${style.border_b} ${style.h_9}`}
                style={{
                  height: "34px",
                  fontSize: "14px",
                  color: tertiaryColor,
                }}
              >
                {time
                  ? locale === "fa"
                    ? toPersianDigits(
                        moment(time).locale(locale).format(dynamicFormat)
                      )
                    : moment(time).locale(locale).format(dynamicFormat)
                  : locale == "fa"
                  ? "زمان را انتخاب کنید"
                  : "Choose time"}
              </div>
              <TimeColumns
                renderHeight={`${renderHeight}px`}
                renderOptions={(count, unit) =>
                  renderOptions(
                    count,
                    unit,
                    unit === "hour"
                      ? hourStep
                      : unit === "minute"
                      ? minuteStep
                      : secondStep
                  )
                }
                hourStep={hourStep}
                minuteStep={minuteStep}
                secondStep={secondStep}
                showSecond={showSecond}
              />
              <div
                className={`
  ${style.right_0} 
  ${style.bottom_0} 
  ${style.left_0} 
  ${style.fixed} 
  ${style.p_2} 
  ${style.w_full}
`}
              >
                <div
                  className={`${style.flex} ${style.justify_between} ${style.gap_4} ${style.mt_2}`}
                >
                  {showNow && (
                    <button
                      onClick={handleNow}
                      className={`
                        ${style.p_2}
                        ${style.px_3}
                        ${style.border}
                        ${style.rounded_md}
                        ${nowButtonClassName}
                      `}
                    >
                      {locale === "fa" ? "الان" : "Now"}
                    </button>
                  )}
                  <button
                    onClick={handleSubmit}
                    className={`
                      ${style.p_2}
                      ${style.px_3}
                      ${style.border}
                      ${style.rounded_md}
                      ${okButtonClassName}
                    `}
                    style={{
                      background: "black",
                      borderColor: "black",
                      color: "white",
                    }}
                  >
                    {locale === "fa" ? "تایید" : "OK"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
