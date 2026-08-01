import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from '../dateEngine';

import { CalenderIcon } from '../assets/icons/CalenderIcon';
import { ClearIcon } from '../assets/icons/ClearIcon';
import { MenuArrowBack } from '../assets/icons/MenuArrowBack';
import { Footer } from '../core/footer';
import { formatExport } from '../core/formatExport';
import {
  getTimestamp,
  toPersianDigits,
} from '../core/helper';
import { IDate, TLocale } from '../core/type';
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
    selectMultiple = false,
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
  const emitChange = (ts: number) => {
    onChange?.(formatExport(ts, locale as TLocale, exportType));
  };
  const changeHandler = (e: number | string | null) => {
    if (e === null || e === undefined) {
      setShowDate(null);
      onChange?.(null);
      return;
    }
    if (typeof e === "number" || typeof e === "string") {
      const ts =
        typeof e === "number" ? e : moment(e).valueOf();
      setShowDate(
        showTime ? ts : moment(ts).startOf("day").valueOf()
      );
      emitChange(ts);
    }
  };
  const handleSubmit = () => {
    if (showDate == null) {
      setContent("Date");
      setIsOpen(false);
      return;
    }
    const finalDate = showTime ? showDate : moment(showDate).valueOf();
    emitChange(finalDate);
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
        emitChange(finalDate);
        setIsOpen(false);
      } else {
        // Keep dropdown open so user can pick time; mobile switches to Time pane.
        setContent("Time");
      }
    } else {
      setShowDate(null);
      setIsOpen(false);
    }
  };

  const handleSetTime = (timestamp: number) => {
    setShowDate(timestamp);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDate(null);
    onChange?.(null);
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
      const parsed = isFa
        ? moment(value).locale("fa")
        : moment(value).utc();
      setShowDate(
        showTime ? parsed.valueOf() : parsed.startOf("day").valueOf()
      );
    } else if (Array.isArray(value)) {
      setTitle(isFa ? "چند روز" : "multy days");
      setShowDate(null);
    } else if (value === null) {
      setTitle(placeholder);
      setShowDate(null);
    }
    // uncontrolled: leave showDate alone when value is undefined
  }, [value, isFa, showTime, placeholder]);

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
    } else {
      setTitle(placeholder);
    }
  }, [showDate, dynamicFormat, showTime, placeholder, isFa]);

  return (
    <>
      {match ? (
        <>
          <div
            ref={buttonRef as React.RefObject<HTMLDivElement>}
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
              cursor: disabled ? "not-allowed" : "default",
              fontSize: "14px",
            }}
          >
            {showMask && !selectMultiple ? (
              <>
                {allowClear && (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={handleClear}
                    className={`
  ${styles.flex}
  ${styles.justify_center}
  ${styles.items_center}
  ${styles.p_1}
  ${styles.m_0}
  ${styles.rounded_full}
  ${styles.border_none}
  `}
                    aria-label="clear date"
                  >
                    <ClearIcon />
                  </button>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Mask
                    value={value !== undefined ? value : showDate ?? undefined}
                    defaultValue={defaultValue ?? undefined}
                    allowClear={false}
                    exportType="timeStamp"
                    calendarType={isFa ? "jalali" : "gregorian"}
                    onMaskChange={changeHandler}
                    Style={{ width: "112px" }}
                    tertiaryColor={tertiaryColor}
                    highlightColor={highlightColor}
                    disabled={disabled}
                  />
                </div>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={handleDropdown}
                  className={`${styles.flex} ${styles.justify_center} ${styles.items_center} ${styles.border_none} ${styles.p_1}`}
                  style={{
                    background: "transparent",
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  aria-label="open calendar"
                  aria-expanded={isOpen}
                >
                  {icon ?? <CalenderIcon />}
                </button>
              </>
            ) : (
              <button
                type="button"
                disabled={disabled}
                onClick={handleDropdown}
                className={`${styles.flex} ${styles.justify_between} ${styles.items_center} ${styles.gap_1} ${styles.w_full} ${styles.h_full} ${styles.border_none} ${styles.px_0}`}
                style={{
                  background: "transparent",
                  cursor: disabled ? "not-allowed" : "pointer",
                  color: tertiaryColor,
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
  `}
                  >
                    <ClearIcon />
                  </span>
                ) : (
                  <>{icon && <span>{icon}</span>}</>
                )}
                {title && (
                  <div
                    className={` ${styles.text_start} ${styles.text_gray_gray7} `}
                    style={{ color: tertiaryColor, flex: 1 }}
                  >
                    {title}
                  </div>
                )}
              </button>
            )}
          </div>
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
                    value={value !== undefined ? value : showDate ?? undefined}
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
                        defaultValue={
                          showDate != null
                            ? new Date(showDate).valueOf()
                            : undefined
                        }
                        onGetValue={handleSetTime}
                      />
                    </div>
                  )}
                </div>

                <Footer
                  setIsOpen={setIsOpen}
                  setShowDate={setShowDate}
                  showDate={showDate}
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
                      value={value !== undefined ? value : showDate ?? undefined}
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
                    showDate={showDate}
                    locale={locale}
                    primaryColor={primaryColor}
                    highlightColor={highlightColor}
                    chooseTodayClassName={chooseTodayClassName}
                    showTime={showTime}
                    onTodayButton={() => setIsOpen(false)}
                    onSubmit={handleSubmit}
                    onChange={changeHandler}
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
