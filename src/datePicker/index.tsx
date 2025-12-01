import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from 'moment-jalaali';

import { CalenderIcon } from '../assets/icons/CalenderIcon';
import { ClearIcon } from '../assets/icons/ClearIcon';
import { MenuArrowBack } from '../assets/icons/MenuArrowBack';
import { Footer } from '../core/footer';
import {
  getTimestamp,
  toPersianDigits,
} from '../core/helper';
import { IDate } from '../core/type';
import styles from '../main.module.css';
import { Mask } from '../mask';
import { Calendar } from '../persianDatePicker';
import {
  DatePickerProps,
  TUnit,
} from '../persianDatePicker/type';
import { TimeColumns } from '../timePicker/timeColumns';
import { useMediaQuery } from '../useMediaQuery';
import { useRenderPosition } from '../useRenderPosition';
import { DesktopTimePicker } from './desktopTimePicker';

export function DatePicker({ ...props }: DatePickerProps) {
  const {
    defaultValue,
    onChange,
    icon = <CalenderIcon />,
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
    placeholder = props.calendarType === "gregorian"
      ? "Choose date"
      : "انتخاب تاریخ",
    Style,
    exportType = "IsoString",
    allowClear,
    onClear,
    value,
    calendarType = "jalali",
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
  } = props;
  const { match } = useMediaQuery("XSUP");
  const locale = calendarType == "jalali" ? "fa" : "en";
  const isFa = calendarType === "jalali";
  const dynamicFormat = showSecond ? showTimeFormat : "HH:mm";
  const initValue: number | null = (() => {
    if (
      (defaultValue &&
        defaultValue !== null &&
        typeof defaultValue === "string") ||
      typeof defaultValue === "number"
    ) {
      return isFa
        ? moment(defaultValue).locale("fa").startOf("day").valueOf()
        : moment(defaultValue).utc().startOf("day").valueOf();
    } else {
      return null;
    }
  })();
  const [content, setContent] = useState<"Date" | "Time">("Date");
  const [showDate, setShowDate] = useState<number | null>(initValue);
  const [isOpen, setIsOpen] = useState(isOpenDropdown);
  const [title, setTitle] = useState(placeholder);
  const buttonRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLElement>,
    popupRef: popupRef,
    setIsOpen: setIsOpen,
    isOpen: isOpen,
  });

  const handleDropdown = () => setIsOpen((prev) => !prev);
  const changeHandler = (e: string | number | IDate | number[] | string[]) => {
    if (typeof e === "number" || typeof e === "string") {
      if (exportType == "IsoString") {
        onChange?.(
          locale == "fa"
            ? moment(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            : moment.utc(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        );
      } else {
        locale == "fa" ? moment(e).valueOf() : moment.utc(e).valueOf();
      }
    }
  };
  const handleSubmit = () => {
    const finalDate = showTime ? showDate : moment(showDate).valueOf();
    if (exportType == "IsoString") {
      onChange?.(
        isFa
          ? moment(finalDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : moment.utc(finalDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      );
    } else {
      onChange?.(
        isFa ? moment(finalDate).valueOf() : moment.utc(finalDate).valueOf()
      );
    }
    setContent("Date");
    setIsOpen(false);
  };

  const handleDateChange = (
    date: number | string | number[] | string[] | IDate
  ) => {
    const rawTimestamp = getTimestamp(date as number) ?? NaN;
    if (!isNaN(rawTimestamp)) {
      const finalDate = showTime
        ? rawTimestamp
        : moment(rawTimestamp).startOf("day").valueOf();
      setShowDate(finalDate);
      if (!showTime) {
        if (exportType === "IsoString") {
          onChange?.(
            isFa
              ? moment(finalDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
              : moment.utc(finalDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          );
        } else {
          onChange?.(
            isFa ? moment(finalDate).valueOf() : moment.utc(finalDate).valueOf()
          );
        }
      }
    } else {
      setShowDate(null);
    }
    setIsOpen(false);
  };

  const handleSetTime = (timestamp: number) => {
    setShowDate(timestamp);
  };

  const handleClear = (e: any) => {
    e.stopPropagation();
    setShowDate(null);
    onClear?.();
    setTitle(placeholder);
  };

  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = showDate
      ? moment(showDate).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setShowDate(updated.valueOf());
    const targetDiv = document.getElementById(unit);
    if (targetDiv) {
      targetDiv.scrollTop = value * 40;
    }
  };

  const renderOptions = (count: number, unit: TUnit, step = 1) => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    const active = moment(showDate).locale(locale).get(unit);
    return Array.from({ length: Math.ceil(count / step) }, (_, i) => {
      const val = i * step;
      return (
        <button
          key={val}
          onClick={() => handleTimeChange(unit, val)}
          type="button"
          className={`
            ${styles.flex}
            ${styles.justify_center}
            ${styles.items_center}
            ${styles.rounded_md}
            ${styles.w_6}
            ${styles.aspect_square}
            ${styles.border_none}

            ${
              active === val
                ? `${styles.pointer_events_auto} ${styles.opacity_100} ${styles.text_gray123}`
                : ""
            }
          `}
          style={{ color: tertiaryColor, fontSize: "14px" }}
        >
          {isFa ? toPersianDigits(pad(val)) : pad(val)}
        </button>
      );
    });
  };
  useEffect(() => {
    if (
      (value !== undefined && typeof value === "string") ||
      typeof value === "number"
    ) {
      setShowDate(
        isFa
          ? moment(value).locale("fa").startOf("day").valueOf()
          : moment(value).utc().startOf("day").valueOf()
      );
    } else {
      setTitle(placeholder);
      setShowDate(null);
    }
  }, [value]);

  useEffect(() => {
    if (showDate && showDate !== null) {
      const persian =
        showDate && new Date(showDate).valueOf() > 0
          ? toPersianDigits(
              moment(new Date(showDate).valueOf()).format(
                showTime
                  ? `jYYYY/jMM/jDD\u2003${dynamicFormat}`
                  : `jYYYY/jMM/jDD`
              )
            )
          : placeholder;

      const gregorian =
        showDate && new Date(showDate).valueOf() > 0
          ? moment(new Date(showDate).valueOf()).format(
              showTime ? `YYYY/MM/DD\u2003${dynamicFormat}` : `YYYY/MM/DD`
            )
          : placeholder;

      setTitle(isFa ? persian : gregorian);
    }
  }, [showDate, dynamicFormat, showTime, placeholder]);

  return (
    <>
      {match ? (
        <>
          <button
            disabled={disabled}
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={handleDropdown}
            type="button"
            className={`${styles.flex} ${styles.justify_between} ${
              styles.items_center
            } ${styles.gap_1} ${styles.px_2}   ${styles.rounded_md} ${
              styles.h_9
            }   ${styles.xs_w_40} ${showTime && styles.xs_w_52} ${
              styles.overflow_hidden
            } ${styles.border_none} 
        ${styles.w_full}  ${className}`}
            style={{
              ...Style,
              backgroundColor: highlightColor,
              cursor: disabled ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            {allowClear ? (
              <span
                onClick={handleClear}
                className={`
  ${styles.flex}
  ${styles.justify_center}
  ${styles.items_center}
  ${styles.p_1}
  ${styles.m_0}
  ${styles.rounded_full}
  ${styles.border_none}
  ${styles.items_center}
  `}
              >
                <ClearIcon />
              </span>
            ) : (
              <>{icon && <span>{icon}</span>}</>
            )}
            {showMask ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Mask
                  {...props}
                  value={value}
                  defaultValue={defaultValue}
                  allowClear={false}
                  exportType="timeStamp"
                  onMaskChange={changeHandler as (e: any) => void}
                  Style={{ width: "112px" }}
                />
              </div>
            ) : (
              <>
                {title && (
                  <div
                    className={` ${styles.text_start} ${styles.text_gray_gray7} `}
                    style={{
                      color: tertiaryColor,
                    }}
                  >
                    {title}
                  </div>
                )}
              </>
            )}
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
              ${styles.shadow_lg}
              ${styles.p_2}
              ${styles.border}
              ${styles.rounded_lg}
              ${styles.overflow_hidden}
            `}
                dir="ltr"
              >
                <div
                  className={`
  ${styles.z_50}
  ${styles.flex}
  ${styles.items_end}
  ${styles.gap_2}
  ${showTime ? styles.border_r : ""}
  ${styles.w_full}
`}
                >
                  <Calendar
                    {...props}
                    locale={isFa ? "fa" : "en"}
                    model="date"
                    calendarBaseWidth={calendarBaseWidth}
                    onChange={(e) => {
                      handleDateChange(e as number);
                    }}
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
  ${styles.flex}
  ${styles.justify_center}
  ${styles.items_center}
  ${styles.border_b}
  ${styles.h_9}
`}
                        style={{
                          height: "34px",
                          fontSize: "14px",
                          color: tertiaryColor,
                        }}
                      >
                        {isFa
                          ? toPersianDigits(
                              moment(showDate)
                                .locale(isFa ? "fa" : "en")
                                .format(dynamicFormat)
                            )
                          : moment(showDate)
                              .locale(isFa ? "fa" : "en")
                              .format(dynamicFormat)}
                      </div>
                      <DesktopTimePicker
                        {...props}
                        displayButtonCount={5}
                        defaultValue={new Date(showDate as any).valueOf()}
                        onGetValue={handleSetTime}
                      />
                    </div>
                  )}
                </div>

                <Footer
                  setIsOpen={setIsOpen}
                  setShowDate={setShowDate}
                  showDate={new Date(showDate as any).valueOf()}
                  locale={isFa ? "fa" : "en"}
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
      ) : (
        <>
          <button
            disabled={disabled}
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className={`
              ${styles.relative}
              ${styles.flex}
              ${styles.justify_between}
              ${styles.items_center}
              ${styles.gap_2}
              ${styles.px_1}
              ${styles.rounded_md}
              ${styles.border_none}
              ${styles.w_full}
              ${styles.xs_w_40}
              ${styles.h_9}
              ${disabled ? styles.cursor_not_allowed : ""}
              ${className}
            `}
            style={{
              color: tertiaryColor,
              backgroundColor: highlightColor,

              ...props.Style,
            }}
          >
            <>
              {icon && <span>{icon}</span>}

              {title && (
                <div
                  className={` ${styles.text_start} ${styles.text_gray_gray7} `}
                  style={{
                    color: tertiaryColor,
                  }}
                >
                  {title}
                </div>
              )}
            </>
          </button>

          {isOpen &&
            createPortal(
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 9999,
                  background: "#fff",
                  overflow: "auto",
                }}
              >
                <div style={{ padding: "8px" }}>
                  {content == "Date" ? (
                    <Calendar
                      {...props}
                      locale={isFa ? "fa" : "en"}
                      model="date"
                      onChange={(e) => {
                        handleDateChange(e as number);
                      }}
                    />
                  ) : (
                    <div style={{ zIndex: 10 }}>
                      <div
                        className={`
                      ${styles.relative}
                      ${styles.flex}
                      ${styles.justify_center}
                      ${styles.items_center}
                      ${styles.border_b}
                      ${styles.h_9}
                    `}
                        style={{
                          height: "34px",
                          fontSize: "14px",
                          color: tertiaryColor,
                        }}
                      >
                        {locale === "fa"
                          ? toPersianDigits(
                              moment(showDate)
                                .locale(locale)
                                .format(dynamicFormat)
                            )
                          : moment(showDate)
                              .locale(locale)
                              .format(dynamicFormat)}
                        <button
                          className={`
                        ${styles.top_0}
                        ${styles.right_0}
                        ${styles.absolute}
                        ${styles.flex}
                        ${styles.justify_center}
                        ${styles.items_center}
                        ${styles.rounded}
                        ${styles.w_10}
                                  ${styles.border_none}

                        ${styles.aspect_square}
                      `}
                          style={{ background: "#ecedf2" }}
                          type="button"
                          onClick={() => setContent("Date")}
                        >
                          <MenuArrowBack />
                        </button>
                      </div>
                      <TimeColumns
                        TimeColumnsClassName={`
                      ${styles.flex}
                      ${styles.justify_center}
                      ${styles.items_center}
                      ${styles.py_2}
                      ${styles.h_full}
                    `}
                        renderHeight={`${280}px`}
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
                    </div>
                  )}
                </div>
                <div
                  className={`
                ${styles.bottom_0}
                ${styles.fixed}
                ${styles.w_full}
              `}
                >
                  <Footer
                    setShowDate={setShowDate}
                    showDate={new Date(showDate as any).valueOf()}
                    locale={locale}
                    primaryColor={primaryColor}
                    highlightColor={highlightColor}
                    chooseTodayClassName={chooseTodayClassName}
                    showTime={showTime}
                    onTodayButton={() => setIsOpen(false)}
                    onSubmit={handleSubmit}
                    onChange={onChange}
                  />
                </div>
              </div>,
              document.body
            )}
        </>
      )}
    </>
  );
}
