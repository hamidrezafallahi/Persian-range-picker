import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from '../dateEngine';

import { CalenderIcon } from '../assets/icons/CalenderIcon';
import { formatExport } from '../core/formatExport';
import { toPersianDigits } from '../core/helper';
import type { TLocale } from '../core/type';
import style from '../main.module.css';
import {
  TimePickerProps,
  TUnit,
} from '../persianDatePicker/type';
import { useMediaQuery } from '../useMediaQuery';
import { useRenderPosition } from '../useRenderPosition';
import { TimeColumns } from './timeColumns';

export const TimePicker = ({ ...props }: TimePickerProps) => {
  const {
    className,
    defaultValue,
    value,
    onChange,
    calendarType = "jalali",
    containerClassName,
    okButtonClassName,
    nowButtonClassName,
    displayButtonCount = 5,
    icon = <CalenderIcon />,
    placeholder = "انتخاب زمان",
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
    primaryColor = "#000",
    backgroundColor = "#fff",
    format = "HH:mm:ss",
    showSecond = false,
    showNow = true,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    disabled = false,
    exportType = "IsoString",
  } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const locale = calendarType == "jalali" ? "fa" : "en";
  const isFa = locale === "fa";

  const initValue: number | null = (() => {
    if (defaultValue !== undefined) {
      return isFa
        ? moment(defaultValue as number|string).locale("fa").valueOf()
        : moment(defaultValue as number|string).utc().valueOf();
    } else {
      return null; // isFa ? moment().locale("fa").valueOf() : moment().utc().valueOf();
    }
  })();
  const [time, setTime] = useState<number | null>(initValue);
  const { match } = useMediaQuery("XSUP");

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dynamicFormat = showSecond ? format : "HH:mm";

  const renderHeight = match
    ? displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 24) +
      20 +
      (displayButtonCount - 1) * 16
    : 10 * (buttonRefs.current[0]?.offsetHeight ?? 24) + 20 + (10 - 1) * 16;

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
      onChange?.(formatExport(time, locale as TLocale, exportType));
    }
    setOpen(false);
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
      const isActive = active === val;
      return (
        <button
          key={val}
          onClick={() => handleTimeChange(unit, val)}
          type="button"
          className={`
            ${style.flex}
            ${style.flex_col}
            ${style.justify_evenly}
            ${style.items_center}
            ${style.rounded_md}
            ${style.w_6}
            ${style.aspect_square}
            ${style.text_center}
            ${style.cursor_pointer}
              ${style.border_none}
          `}
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
          style={{
            color: isActive ? backgroundColor : tertiaryColor,
            backgroundColor: isActive ? primaryColor : "transparent",
            fontSize: "14px",
            fontWeight: isActive ? 500 : 400,
          }}
        >
          {locale == "fa" ? toPersianDigits(pad(val)) : pad(val)}
        </button>
      );
    });
  };

  useEffect(() => {
    if (value === null) {
      setTime(null);
      return;
    }
    if (
      value !== undefined &&
      moment(value as number|string).valueOf() !== moment(time).valueOf()
    ) {
      setTime(
        isFa
          ? moment(value as number|string).locale("fa").valueOf()
          : moment(value as number|string).utc().valueOf()
      );
    }
  }, [value]);
  return (
    <>
      <button
        disabled={disabled}
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className={`
              ${style.relative}
              ${style.flex}
              ${style.justify_between}
              ${style.items_center}
              ${style.gap_2}
              ${style.px_2}
              ${style.rounded_md}
              ${style.border_none}
              ${style.w_full}
              ${style.xs_w_40}
              ${style.h_9}
              ${className}
            `}
        style={{
          color: tertiaryColor,
          backgroundColor: highlightColor,
          fontSize: "14px",
          cursor: disabled ? "not-allowed" : "pointer",
          ...props.Style,
        }}
      >
        {icon && <span>{icon}</span>}
        {time
          ? locale === "fa"
            ? toPersianDigits(moment(time).format(dynamicFormat))
            : moment(time).format(dynamicFormat)
          : placeholder}
      </button>

      {open &&
        createPortal(
          <>
            {match ? (
              <div
                ref={popupRef}
                style={{
                  position: "absolute",
                  zIndex: 1050,
                  background: "#fff",
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
                      type="button"
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
                    type="button"
                    className={`
                    ${style.p_2}
                    ${style.px_3}
                    ${style.border}
                    ${style.rounded_md}
                    ${okButtonClassName}
                  `}
                    style={{
                      background: primaryColor,
                      borderColor: primaryColor,
                      color: backgroundColor,
                    }}
                  >
                    {locale === "fa" ? "تایید" : "OK"}
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  position: "absolute",
                  background: "#fff",
                  inset: 0,
                  zIndex: 1050,
                }}
                className={`
                ${style.relative}
                ${style.flex}
                ${style.flex_col}
                ${style.justify_between}
                ${style.items_center}
                ${style.gap_2}
                ${style.px_2}
                ${style.rounded_md}
                ${disabled ? style.cursor_not_allowed : ""}
                ${className}

              `}
              >
                <TimeColumns
                  TimeColumnsClassName={`${style.h_full}`}
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
                        type="button"
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
                      type="button"
                      className={`
                      ${style.p_2}
                      ${style.px_3}
                      ${style.border}
                      ${style.rounded_md}
                      ${okButtonClassName}
                    `}
                      style={{
                        background: primaryColor,
                        borderColor: primaryColor,
                        color: backgroundColor,
                      }}
                    >
                      {locale === "fa" ? "تایید" : "OK"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>,
          document.body
        )}
    </>
  );
};
