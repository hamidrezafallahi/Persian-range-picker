import { useEffect, useRef, useState } from "react";
import style from "../../main.module.css";
import moment from "moment-jalaali";

import { Footer } from "../core/footer";
import { toPersianDigits } from "../core/helper";
import type { IDate, IDateProps, TUnit } from "../core/type";
import { TimeColumns } from "../exportComponents/timePicker/exportComponents";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";
import { MenuArrowBack } from "../icons/MenuArrowBack";

export function MobileDate({ ...props }: IDateProps) {
  const {
    onChange,
    defaultValue,
    locale = "fa",
    tertiaryColor = "#939393", // رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر - رنگ متن
    highlightColor = "#f4f4f4", // رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
    primaryColor = "#000",
    chooseTodayClassName = "",
    showTime = false,
    showTimeFormat = "HH:mm:ss",
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    showSecond = true,
    className,
    disabled = false,
  } = props;
  const [showDate, setShowDate] = useState<number>(0);
  const [content, setContent] = useState<"Date" | "Time">("Date");
  const popoverRef = useRef<HTMLDivElement>(null);
  const device: "mobile" | "desktop" =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";
  const dynamicFormat = showSecond ? showTimeFormat : "HH:mm";
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

  const handleDateChange = (e: IDate) => {
    if (showTime) {
      setShowDate(e.from);
      setContent("Time");
    } else {
      setShowDate(e.from);
      onChange?.(e.from);
      popoverRef.current?.hidePopover();
    }
  };
  const handleSubmit = () => {
    onChange?.(showDate);
    setContent("Date");
    popoverRef.current?.hidePopover();
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
          className={`
            ${style.flex}
            ${style.justify_center}
            ${style.items_center}
            ${style.rounded_md}
            ${style.w_6}
            ${style.aspect_square}
            ${
              active === val
                ? `${style.pointer_events_auto} ${style.opacity_100} ${style.text_gray123}`
                : ""
            }
          `}
          style={{ color: tertiaryColor, fontSize: "14px" }}
        >
          {locale == "fa" ? toPersianDigits(pad(val)) : pad(val)}
        </button>
      );
    });
  };

  const handleClosePopup = () => {
    popoverRef.current?.hidePopover();
  };
  function isDate(value: Date | number | undefined): value is Date {
    return value instanceof Date;
  }

  useEffect(() => {
    let temp: number = 0;
    const temp2: Date | number | undefined = defaultValue;
    if (temp2 !== undefined) {
      if (isDate(temp2)) {
        temp = temp2.valueOf();
      } else if (typeof temp2 === "number") {
        temp = temp2;
      }
    }
    setShowDate(temp);
  }, [defaultValue]);
  return (
    <div
      style={{
        width: device == "desktop" ? "fit-content" : "100%",
      }}
    >
      <button
        disabled={disabled}
        popoverTarget="mobileDateModal"
        className={`
          ${style.flex}
          ${style.justify_between}
          ${style.items_center}
          ${style.gap_2}
          ${style.px_1}
          ${style.h_9}
          ${style.rounded_md}
          ${style.w_full}
          ${disabled ? style.cursor_not_allowed : ""}
          ${className}
        `}
        style={{
          color: tertiaryColor,
          backgroundColor: highlightColor,
          width: "100%",
        }}
      >
        <CalenderIcon />
        <div className={style.w_full}>{title}</div>
      </button>
      <div
        popover="auto"
        id="mobileDateModal"
        ref={popoverRef}
        className={`
          ${style.relative}
          ${style.p_0}
          ${style.border_none}
          ${style.w_full}
          ${style.h_full}
        `}
      >
        <div className={style.p_2}>
          {/* ////////////////TODO navigation buttons must change between date and time in situation  */}
          {content == "Date" ? (
            <DatePicker
              {...props}
              defaultValue={
                defaultValue ? { from: defaultValue, to: 0 } : undefined
              }
              locale={locale}
              model="date"
              onDateChange={handleDateChange}
              dateFromOutside={{
                from: showDate ?? new Date().valueOf(),
                to: 0,
              }}
            />
          ) : (
            <div style={{ zIndex: 10 }}>
              <div
                className={`
  ${style.relative}
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
                <button
                  className={`
  ${style.top_0}
  ${style.right_0}
  ${style.absolute}
  ${style.flex}
  ${style.justify_center}
  ${style.items_center}
  ${style.rounded}
  ${style.w_10}
  ${style.aspect_square}
`}
                  style={{ background: "#ecedf2" }}
                  onClick={() => {
                    setContent("Date");
                  }}
                >
                  <MenuArrowBack />
                </button>
              </div>
              <TimeColumns
                TimeColumnsClassName={`
  ${style.flex}
  ${style.justify_center}
  ${style.items_center}
  ${style.py_2}
  ${style.h_full}
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
  ${style.bottom_0}
  ${style.fixed}
  ${style.p_2}
  ${style.w_full}
`}
          style={{ width: "100" }}
        >
          <Footer
            setShowDate={setShowDate}
            showDate={showDate}
            locale={locale}
            primaryColor={primaryColor}
            highlightColor={highlightColor}
            chooseTodayClassName={chooseTodayClassName}
            showTime={showTime}
            // onNowButton={handleClosePopup}
            onTodayButton={handleClosePopup}
            onSubmit={handleSubmit}
            onChange={onChange} //////type error unknown type fix by net
          />
        </div>
      </div>
    </div>
  );
}
