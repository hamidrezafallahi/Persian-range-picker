import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from 'moment-jalaali';

import style from '../../main.module.css';
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
    device,
    disabled,
  } = props;

  const locale = calendarType == "shamsi" ? "fa" : "en";

  const [type, setType] = useState<string>("date");
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
      onCompareDateChange({ type: "date", Data: { date, compareDate } });
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
      onChange?.({ type, Data: { date, data: customData } });
    }
  }, [customData]);

  return (
    <div className={`${style.flex} ${className}`}>
      {/* دکمه باز کردن مودال */}
      <button
        disabled={disabled}
        type="button"
        onClick={() => setOpen(true)}
        className={`
          ${style.flex}
          ${style.justify_center}
          ${style.items_center}
          ${style.gap_2}
          ${style.w_full}
          ${style.sm_w_fit}
          ${disabled ? style.cursor_not_allowed : ""}
        `}
      >
        <CalenderIcon />
        <div
          className={`
            ${style.w_fit}
            ${style.text_gray_gray8}
            ${style.text_center}
          `}
        >
          {date && moment(date.from as number).format("jYYYY/jMM/jDD")}
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
          {date && moment(date.to as number).format("jYYYY/jMM/jDD")}
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
              device={device}
              setCustomData={setCustomData}
              setType={setType}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
