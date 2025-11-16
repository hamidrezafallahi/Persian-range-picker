import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from 'moment-jalaali';

import style from '../../main.module.css';
import { toPersianDigits } from '../core/helper';
import MainContent from '../core/mainContent';
import NavigateButton from '../core/navigateButton';
import type { IRangeProps } from '../core/type';
import { CalenderIcon } from '../icons/CalenderIcon';
import { MenuArrowBack } from '../icons/MenuArrowBack';

export function MobileRangePicker(props: IRangeProps) {
  const {
    onCompareDateChange,
    onChange,
    step,
    counter,
    zone,
    date,
    compareDate,
    activeCompareStep,
    setCompareDate,
    setDate,
    setActiveCompareStep,
    setCounter,
    setTabKey,
    setStep,
    setZone,
    isShowNavigationButton = true,
    calendarType = "shamsi",
    className,
    disabled,
    value,
    onError,
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
  } = props;

  const locale = calendarType == "shamsi" ? "fa" : "en";

  const [type, setType] = useState<"range" | "compareRange">("range");
  const [customData, setCustomData] = useState<unknown>(null);
  const [open, setOpen] = useState(false);

  const isInitialRender = useRef(true);
  const prevDate = useRef(date);
  const prevCompareDate = useRef(compareDate);

  useEffect(() => {
    const hasCompareDateChanged =
      compareDate?.from !== prevCompareDate.current?.from ||
      compareDate?.to !== prevCompareDate.current?.to;
    if (onCompareDateChange && compareDate && hasCompareDateChanged) {
      onCompareDateChange({
        type: "compareRange",
        Data: { date, compareDate },
      });
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
  }, [date, compareDate]);

  useEffect(() => {
    if (customData) {
      onChange?.({ type, Data: { date, data: customData } });
    }
  }, [customData]);

  const DateFrom =
    date?.from && (date?.from as number) > 0
      ? locale === "fa"
        ? toPersianDigits(moment(date?.from).format("jYYYY/jMM/jDD"))
        : moment(date?.from).format("YYYY/MM/DD")
      : locale === "fa"
      ? "انتخاب تاریخ"
      : "Choose date";

  const DateTo =
    date?.to && (date?.to as number) > 0
      ? locale === "fa"
        ? toPersianDigits(moment(date?.to).format("jYYYY/jMM/jDD"))
        : moment(date?.to).format("YYYY/MM/DD")
      : locale === "fa"
      ? "انتخاب تاریخ"
      : "Choose date";

  return (
    <div className={`${style.flex} ${className}`}>
      {/* دکمه باز کردن مودال */}
      <button
        disabled={disabled}
        type="button"
        onClick={() => setOpen(true)}
        className={`
          ${style.flex}
          ${style.justify_between}
          ${style.items_center}
          ${style.gap_2}
          ${style.px_1}
          ${style.h_9}
           ${style.rounded_md}
           ${style.border_none}
          
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
        <div
          className={`
            ${style.w_fit}
            ${style.text_gray_gray8}
            ${style.text_center}
          `}
        >
          {DateFrom}
        </div>
        <div className={`${style.text_gray_gray8} ${style.text_center}`}>
          {"-"}
        </div>
        <div
          className={`
            ${style.w_fit}
            ${style.text_gray_gray8}
            ${style.text_center}
          `}
        >
          {DateTo}
        </div>
      </button>

      {zone !== "manual" && isShowNavigationButton && (
        <NavigateButton
          compareDate={compareDate}
          setDate={setDate}
          setCompareDate={setCompareDate}
          step={step}
          zone={zone}
          date={date}
          setActiveCompareStep={setActiveCompareStep}
          activeCompareStep={activeCompareStep}
          counter={counter}
          setCounter={setCounter}
          setTabKey={setTabKey}
          setStep={setStep}
          setZone={setZone}
          locale={locale}
        />
      )}

      {/* مودال */}
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
            <div
              className={`${style.flex} ${style.gap_1}`}
              dir={locale == "fa" ? "rtl" : "ltr"}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`
                  ${style.flex}
                  ${style.justify_center}
                  ${style.items_center}
                  ${style.gap_2}
                  ${style.border_none}
                  ${style.rounded_md}
                  ${style.font_IRANSans}
                  ${style.font_extrabold}
                  ${style.text_base}
                  ${style.whitespace_nowrap}
                `}
                style={{ color: "#6e6e6e" }}
              >
                <MenuArrowBack />
                <span>{locale == "fa" ? "تاریخ" : "Date"}</span>
              </button>
            </div>
            <MainContent
              {...props}
              model="range"
              locale={locale}
              setCustomData={setCustomData}
              setType={setType as Dispatch<SetStateAction<string>>}
              onError={onError}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
