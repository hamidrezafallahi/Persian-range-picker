import {
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from 'moment-jalaali';

import style from '../../main.module.css';
import { Footer } from '../core/footer';
import { toPersianDigits } from '../core/helper';
import type {
  IDate,
  IDateProps,
  TUnit,
} from '../core/type';
import { TimeColumns } from '../exportComponents/timePicker/exportComponents';
import { CalenderIcon } from '../icons/CalenderIcon';
import { MenuArrowBack } from '../icons/MenuArrowBack';
import { DatePicker } from '../persianDatePicker';

export function MobileDate({ ...props }: IDateProps) {
  const {
    exportType = "IsoString",
    onChange,
    defaultValue,
    locale = "fa",
    icon = <CalenderIcon />,
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
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
    placeHolder = props.locale === "en" ? "Choose date" : "انتخاب تاریخ",
    value,
  } = props;
  const isFa = locale === "fa";
  const initValue: IDate = (() => {
    if (defaultValue !== undefined) {
      return {
        from: isFa
          ? moment(defaultValue).locale("fa").startOf("day").valueOf()
          : moment(defaultValue).utc().startOf("day").valueOf(),
        to: isFa
          ? moment(defaultValue).locale("fa").endOf("day").valueOf()
          : moment(defaultValue).utc().endOf("day").valueOf(),
      };
    } else {
      return {
        from: NaN,
        to: NaN,
      };
    }
  })();
  const [showDate, setShowDate] = useState<IDate>(initValue);
  const [content, setContent] = useState<"Date" | "Time">("Date");
  const [open, setOpen] = useState(false);
  const dynamicFormat = showSecond ? showTimeFormat : "HH:mm";
  const persian =
    showDate.from && new Date(showDate.from).valueOf() > 0
      ? toPersianDigits(
          moment(showDate.from).format(
            showTime ? `jYYYY/jMM/jDD\u2003${dynamicFormat}` : `jYYYY/jMM/jDD`
          )
        )
      : placeHolder;

  const gregorian =
    showDate.from && new Date(showDate.from).valueOf() > 0
      ? moment(showDate.from).format(
          showTime ? `YYYY/MM/DD\u2003${dynamicFormat}` : `YYYY/MM/DD`
        )
      : placeHolder;

  const title = locale === "fa" ? persian : gregorian;

  const handleDateChange = (e: IDate) => {
    if (showTime) {
      setShowDate({ from: new Date(e.from as any).valueOf(), to: NaN });
      setContent("Time");
    } else {
      setShowDate({ from: new Date(e.from as any).valueOf(), to: NaN });
      if (exportType == "IsoString") {
        onChange?.(
          locale == "fa"
            ? moment(e.from).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            : moment.utc(e.from).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        );
      } else {
        locale == "fa"
          ? moment(e.from).valueOf()
          : moment.utc(e.from).valueOf();
      }

      setOpen(false);
    }
  };

  const handleSubmit = () => {
    if (showDate !== null) {
      if (exportType == "IsoString") {
        onChange?.(
          locale == "fa"
            ? moment(showDate.from).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            : moment.utc(showDate.from).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        );
      } else {
        locale == "fa"
          ? moment(showDate.from).valueOf()
          : moment.utc(showDate.from).valueOf();
      }
    }

    setContent("Date");
    setOpen(false);
  };

  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = showDate
      ? moment(showDate.from).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setShowDate({ from: updated.valueOf(), to: NaN });
    const targetDiv = document.getElementById(unit);
    if (targetDiv) {
      targetDiv.scrollTop = value * 40;
    }
  };

  const renderOptions = (count: number, unit: TUnit, step = 1) => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    const active = moment(showDate.from).locale(locale).get(unit);

    return Array.from({ length: Math.ceil(count / step) }, (_, i) => {
      const val = i * step;
      return (
        <button
          key={val}
          onClick={() => handleTimeChange(unit, val)}
          type="button"
          className={`
            ${style.flex}
            ${style.justify_center}
            ${style.items_center}
            ${style.rounded_md}
            ${style.w_6}
            ${style.aspect_square}
            ${style.border_none}

            ${
              active === val
                ? `${style.pointer_events_auto} ${style.opacity_100} ${style.text_gray123}`
                : ""
            } /api/inv/select/getbatchesbyvouchertypeIdInvouchers
          `}
          style={{ color: tertiaryColor, fontSize: "14px" }}
        >
          {locale == "fa" ? toPersianDigits(pad(val)) : pad(val)}
        </button>
      );
    });
  };
  useEffect(() => {
    if (value !== undefined) {
      if (typeof value === "string") {
        setShowDate({ from: new Date(value).valueOf(), to: NaN });
      } else if (typeof value === "number" || value === null) {
        setShowDate({ from: value, to: NaN });
      }
    }
  }, [value]);
  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className={`
              ${style.relative}
              ${style.flex}
              ${style.justify_between}
              ${style.items_center}
              ${style.gap_2}
              ${style.px_1}
              ${style.rounded_md}
              ${style.border_none}
              ${style.w_full}
              ${style.xs_w_40}
              ${style.h_9}
              ${disabled ? style.cursor_not_allowed : ""}
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
              className={` ${style.text_start} ${style.text_gray_gray7} `}
              style={{
                color: tertiaryColor,
              }}
            >
              {title}
            </div>
          )}
        </>
      </button>

      {open &&
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
                <DatePicker
                  {...props}
                  defaultValue={
                    defaultValue ? { from: defaultValue, to: 0 } : undefined
                  }
                  locale={locale}
                  model="date"
                  onDateChange={handleDateChange}
                  value={{
                    from: showDate.from ?? new Date().valueOf(),
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
                          moment(showDate.from)
                            .locale(locale)
                            .format(dynamicFormat)
                        )
                      : moment(showDate.from)
                          .locale(locale)
                          .format(dynamicFormat)}
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
                                  ${style.border_none}

                        ${style.aspect_square}
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
                ${style.w_full}
              `}
            >
              <Footer
                setShowDate={setShowDate}
                showDate={new Date(showDate.from as any).valueOf()}
                locale={locale}
                primaryColor={primaryColor}
                highlightColor={highlightColor}
                chooseTodayClassName={chooseTodayClassName}
                showTime={showTime}
                onTodayButton={() => setOpen(false)}
                onSubmit={handleSubmit}
                onChange={onChange}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
