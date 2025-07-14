import React, { useEffect, useRef, useState } from "react";
import style from "../../main.module.css";
import moment from "moment-jalaali";

import MainContent from "../core/mainContent";
import NavigateButton from "../core/navigateButton";
import type { IDesktopRangeProps, ISubmittedData } from "../core/type";
import { useRenderPosition } from "../exportComponents/useRenderPosition";
import { DownTriangle } from "../icons/DownTriangle";
import { createPortal } from "react-dom";

export function DesktopRangePicker(props: IDesktopRangeProps) {
  const userAgent = navigator.userAgent;
  const deviceType =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      userAgent
    )
      ? "mobile"
      : "desktop";

  const {
    setDate,
    date,
    zone,
    compareDate = { from: 0, to: 0 },
    setOpen,
    open,
    handleSubmit,
    handleReject,
    onChange,
    onCompareDateChange,
    setCompareDate,
    counter,
    setStep,
    isShowNavigationButton = true,
    primaryColor = "#000", //رنگ اصلی (برای دکمه‌ها، لینک‌ها یا تأکید اصلی برند)
    backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    // tabClassName = "",
    dateClassName,
    locale = "fa",
    onError,
    // className,
    buttonClassName,
    dropdownWidth = 460,
    dropdownHeight = 460,
    device = deviceType,
    label = {
      isShowLabel: true,
      label: (
        <label
          className={style.text_xs}
          style={{
            color: tertiaryColor,
          }}
        >
          {props.label?.label ?? (locale == "en" ? "Date" : "تاریخ")}
        </label>
      ),
    },
  } = props;
  const isInitialRender = useRef(true);
  const prevDate = useRef(date);
  const prevCompareDate = useRef(compareDate);
  const [showDate, setShowDate] = useState<ISubmittedData>({
    date: {
      from:
        locale === "fa"
          ? moment().locale("fa").startOf("jYear").valueOf()
          : moment().locale("en").startOf("year").valueOf(),
      to: moment().locale(locale).startOf("day").valueOf(),
    },
    compareDate: null,
    Data: null, // or any default value you want for Data
  });

  const [type, setType] = useState<string>("date");
  const [customData, setCustomData] = useState<unknown>(null);
  const handleAccept = () => {
    if (date) {
      if (date.from && date.to && date.from < date.to) {
        if (handleSubmit) {
          if (type == "date") {
            handleSubmit({ type, Data: { date, compareDate } });
          } else {
            handleSubmit({ type, Data: { customData } });
          }
        }

        setShowDate({
          date,
          compareDate,
          Data: customData,
        });
        setOpen?.(false);
      } else {
        if (onError) {
          onError(
            `${
              locale == "fa"
                ? "تاریخ پایان نمی‌تواند زودتر از تاریخ آغاز باشد."
                : "The end date must not be earlier than the start date."
            }`
          );
        }
      }
    } else {
      if (handleSubmit) {
        if (type == "date") {
          handleSubmit({ type, Data: { date, compareDate } });
        } else {
          handleSubmit({ type, Data: { customData } });
        }
      }
      setShowDate({ date, compareDate, Data: customData });
      setOpen?.(false);
    }
  };
  const handleCancel = () => {
    setOpen?.(false);
    setDate(showDate?.date);
    setStep(366);
    setCompareDate(showDate.compareDate);
    if (handleReject) {
      handleReject();
    }
  };

  const buttonRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLElement>,
    popupRef: popupRef,
    setIsOpen: setOpen ?? (() => {}),
    isOpen: open ?? false,
  });

  const handleDropdown = () => {
    setOpen?.((prev) => !prev);
  };
  useEffect(() => {
    if (date) {
      setShowDate((prev) => ({
        ...prev,
        Data: null,
      }));
    }
  }, [counter]);
  useEffect(() => {
    const hasCompareDateChanged =
      compareDate?.from !== prevCompareDate.current?.from ||
      compareDate?.to !== prevCompareDate.current?.to;
    if (onCompareDateChange && compareDate && hasCompareDateChanged) {
      onCompareDateChange({ type: "date", Data: { date, compareDate } });
      setShowDate((prev) => ({
        ...prev,
        compareDate,
      }));
    }
    prevCompareDate.current = compareDate;

    const hasDateChanged =
      date?.from !== prevDate.current?.from ||
      date?.to !== prevDate.current?.to;

    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else if (hasDateChanged && onChange) {
      const isEmpty = !date && !compareDate;
      const isInvalidDateTo = date?.to == null || Number.isNaN(date?.to);
      const isInvalid = date?.from && isInvalidDateTo;

      if (!(isEmpty || isInvalid)) {
        onChange({ type, Data: { date, compareDate } });
      }
    }

    prevDate.current = date;
  }, [date, compareDate]);
  useEffect(() => {
    if (customData) {
      onChange?.({ type, Data: { customData } });
    }
  }, [customData]);
  useEffect(() => {
    setShowDate({
      date,
      compareDate,
      Data: null,
    });
  }, [date, compareDate]);
  return (
    <div
      className={`
      ${style.flex}
      ${style.flex_col}
      ${style.justify_center}
      ${style.w_fit}
      ${style.h_14}
      ${style.relative}
      ${buttonClassName}
    `}
      ref={buttonRef as React.RefObject<HTMLDivElement>}
    >
      <div dir={locale == "fa" ? "rtl" : "ltr"}>
        {label.isShowLabel && label.label}
      </div>
      <div className={`${style.flex} ${style.gap_2}`} dir="rtl">
        <button
          className={`
  ${style.flex}
  ${style.justify_center}
  ${style.items_center}
  ${style.gap_2}
  ${style.px_2}
  ${style.border}
  ${style.border_gray_300}
  ${style.rounded_lg}
  ${style.w_72}
  ${style.h_8}
  ${style.cursor_pointer}
  ${dateClassName}
`}
          onClick={handleDropdown}
          dir="ltr"
        >
          <DownTriangle />
          <div
            className={`${style.px_2} ${style.w_fit} ${style.text_center}`}
            style={{
              color: tertiaryColor,
            }}
          >
            {locale === "fa"
              ? moment(showDate.date?.to)
                  .locale("fa")
                  .format("jYYYY/ jMM /jDD  ")
              : moment(showDate.date?.to)
                  .locale("en")
                  .format("  YYYY / MM / DD")}
          </div>

          <div
            className={style.text_center}
            style={{
              color: tertiaryColor,
            }}
          >
            -
          </div>
          <div
            className={`${style.px_2} ${style.w_fit} ${style.text_center}`}
            style={{
              color: tertiaryColor,
            }}
          >
            {locale === "fa"
              ? moment(showDate.date?.from)
                  .locale("fa")
                  .format("jYYYY / jMM / jDD")
              : moment(showDate.date?.from)
                  .locale("en")
                  .format("YYYY / MM / DD")}
          </div>
        </button>

        {zone !== "manual" && isShowNavigationButton && (
          <NavigateButton {...props} locale={locale} />
        )}
      </div>
      {open &&
        createPortal(
          <div
            ref={popupRef}
            style={{
              backgroundColor: backgroundColor,
              position: "absolute",
              width: dropdownWidth,
              height: dropdownHeight,
            }}
            className={`
            ${style.absolute}
            ${style.z_50}
            ${style.p_2}
            ${style.border}
            ${style.border_gray_300}
            ${style.rounded_lg}
            ${style.shadow_md}
            ${style.overflow_hidden}
            ${locale === "fa" ? style.right_0 : style.left_0}
          `}
          >
            <div
              className={`${style.relative} ${style.w_full} ${style.h_full}`}
            >
              <MainContent
                {...props}
                model="range"
                locale={locale}
                device={device}
                setCustomData={setCustomData}
                setType={setType}
              />
              <div
                className={`
  ${style.w_full}
  ${style.flex}
  ${style.gap_2}
  ${style.absolute}
  ${style.bottom_0}
  ${style.flex_row_reverse}
  ${style.justify_end}
`}
                dir={locale == "fa" ? "ltr" : "rtl"}
              >
                <button
                  style={{ color: primaryColor }}
                  className={`${style.p_2} ${style.px_3} ${style.rounded_md}`}
                  onClick={handleCancel}
                >
                  {locale == "fa" ? "لغو" : "Cancel"}
                </button>
                <button
                  onClick={() => handleAccept()}
                  style={{
                    background: primaryColor,
                    borderColor: primaryColor,
                    color: backgroundColor,
                  }}
                  className={`${style.p_2} ${style.px_3} ${style.border} ${style.rounded_md}`}
                >
                  {locale == "fa" ? "اعمال" : "Accept"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
