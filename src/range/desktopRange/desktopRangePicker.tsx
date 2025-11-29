import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from 'moment-jalaali';

import style from '../../main.module.css';
import {
  getTimestamp,
  toPersianDigits,
} from '../core/helper';
import MainContent from '../core/mainContent';
import NavigateButton from '../core/navigateButton';
import { useRenderPosition } from '../exportComponents/useRenderPosition';
import { DownTriangle } from '../icons/DownTriangle';
import {
  IRangeProps,
  ISubmittedData,
} from '../persianDatePicker/type';

export function DesktopRangePicker(props: IRangeProps) {
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
    primaryColor = "#000", 
    backgroundColor = "#fff", 
    tertiaryColor = "#939393", 
    // tabClassName = "",
    dateClassName,
    locale = "fa",
    onError,
    // className,
    buttonClassName,
    dropdownWidth = 460,
    dropdownHeight = 460,
    label = props.locale == "en" ? "Date" : "تاریخ",
    value,
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

  const [type, setType] = useState<"range" | "compareRange">("range");
  const [customData, setCustomData] = useState<unknown>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const fromTimestamp = getTimestamp(date!.from) ?? 0;
  const toTimestamp = getTimestamp(date!.to) ?? 0;

  const DateFrom =
    fromTimestamp > 0
      ? locale === "fa"
        ? toPersianDigits(moment(fromTimestamp).format("jYYYY/jMM/jDD"))
        : moment(fromTimestamp).format("YYYY/MM/DD")
      : locale === "fa"
      ? "انتخاب تاریخ"
      : "Choose date";

  const DateTo =
    toTimestamp > 0
      ? locale === "fa"
        ? toPersianDigits(moment(toTimestamp).format("jYYYY/jMM/jDD"))
        : moment(toTimestamp).format("YYYY/MM/DD")
      : locale === "fa"
      ? "انتخاب تاریخ"
      : "Choose date";

  const handleAccept = () => {
    if (date) {
      if (date.from && date.to && date.from < date.to) {
        if (handleSubmit) {
          if (type == "range") {
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
        if (type == "range") {
          handleSubmit({ type, Data: { date, compareDate } });
        } else {
          handleSubmit({ type, Data: { customData } });
        }
      }
      setShowDate({ date: date!, compareDate, Data: customData });
      setOpen?.(false);
    }
  };
  const handleCancel = () => {
    setOpen?.(false);
    setDate?.(showDate?.date);
    setStep?.(366);
    setCompareDate?.(showDate.compareDate);
    if (handleReject) {
      handleReject();
    }
  };

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
    //  setShowDate({
    //   date: date!,
    //   compareDate,
    //   Data: null,
    // });

    const hasCompareDateChanged =
      compareDate?.from !== prevCompareDate.current?.from ||
      compareDate?.to !== prevCompareDate.current?.to;
    if (onCompareDateChange && compareDate && hasCompareDateChanged) {
      onCompareDateChange({
        type: "compareRange",
        Data: { date, compareDate },
      });
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
        console.log(date, value);
        if (!Number.isNaN(date?.from)) {
          const dateFromValue = !(
            new Date(date?.from!).valueOf() ==
              new Date(value?.from!).valueOf() ||
            new Date(date?.to!).valueOf() == new Date(value?.to!).valueOf()
          );

          if (dateFromValue && new Date(date?.to as number).valueOf() > 0) {
            onChange({ type, Data: { date, compareDate } });
          }
        }
      }
    }
    prevDate.current = date;
  }, [date]);
  useEffect(() => {
    if (customData) {
      onChange?.({ type, Data: { customData } });
    }
  }, [customData]);
  return (
    <div
      className={`
      ${style.flex}
      ${style.flex_col}
      ${style.justify_center}
      ${style.w_fit}
      ${label ? style.h_14 : style.h_8}
      ${style.relative}
      ${buttonClassName}
      
    `}
      ref={buttonRef as React.RefObject<HTMLDivElement>}
    >
      {label && <div>{label}</div>}
      <div className={`${style.flex} ${style.gap_2}  `}>
        <button
          type="button"
          className={`
            ${style.flex}
            ${style.justify_between}
            ${style.items_center}
            ${style.gap_2}
            ${style.px_2}
            ${style.border}
            ${style.border_gray_300}
            ${style.rounded_md}
            ${style.h_8}
            ${style.cursor_pointer}
            ${dateClassName}
            ${style.bg_white}
                    `}
          onClick={handleDropdown}
        >
          <div
            className={`${style.px_2} ${style.w_fit} ${style.text_center}`}
            style={{
              color: tertiaryColor,
              direction: "ltr",
            }}
          >
            {DateFrom}
            {" _ "}
            {DateTo}
          </div>
          <DownTriangle />
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
              zIndex: 1050,
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
                setCustomData={setCustomData}
                setType={setType as Dispatch<SetStateAction<string>>}
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
                  className={`${style.p_2} ${style.px_3} ${style.rounded_md} ${style.border_none}`}
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
