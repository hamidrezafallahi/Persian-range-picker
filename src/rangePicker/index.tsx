import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from '../dateEngine';

import { CalenderIcon } from '../assets/icons/CalenderIcon';
import { DownTriangle } from '../assets/icons/DownTriangle';
import { MenuArrowBack } from '../assets/icons/MenuArrowBack';
import {
  getTimestamp,
  toPersianDigits,
} from '../core/helper';
import MainContent, { IMainContentProps } from '../core/mainContent';
import NavigateButton from '../core/navigateButton';
import type { IDate } from '../core/type';
import style from '../main.module.css';
import { ESteps } from '../persianDatePicker/enum';
import {
  HandleParams,
  ISubmittedData,
  ITimeZone,
  RangePickerProps,
} from '../persianDatePicker/type';
import { useMediaQuery } from '../useMediaQuery';
import { useRenderPosition } from '../useRenderPosition';

export function RangePicker(props: RangePickerProps) {
  const {
    isOpenDropdown = false,
    additionalElement,
    calendarType = "jalali",
    defaultValue,
    value,
    onError,
    onSubmit,
    onReject,
    onChange,
    onCompareDateChange,
    isShowNavigationButton = true,
    primaryColor = "#000",
    backgroundColor = "#fff",
    tertiaryColor = "#939393",
    dateClassName,
    buttonClassName,
    dropdownWidth = 460,
    dropdownHeight = 460,
    label = props.calendarType == "gregorian" ? "Date" : "تاریخ",
    className,
    disabled,
    highlightColor = "#cacaca",
    periodClassName = "",
    periodListClassName = "",
    showComparison = true,
    accentColor = "#2563eb",
    neutralColor = "#9cc5f1",
    exportType = "IsoString",
    tabClassName = "",
    activeTable,
    monthPickerClassName,
    buttonStyle,
    renderPosition,
  } = props;
  const locale = calendarType == "jalali" ? "fa" : "en";
  const isFa = locale === "fa";
  const initValue: IDate = (() => {
    if (defaultValue !== undefined) {
      return {
        from: isFa
          ? moment(defaultValue.from).locale("fa").startOf("day").valueOf()
          : moment(defaultValue.from).utc().startOf("day").valueOf(),
        to: isFa
          ? moment(defaultValue.to).locale("fa").endOf("day").valueOf()
          : moment(defaultValue.to).utc().endOf("day").valueOf(),
      };
    } else {
      return {
        from: isFa
          ? moment().locale("fa").startOf("jYear").valueOf()
          : moment().utc().startOf("year").valueOf(),
        to: isFa
          ? moment().locale("fa").endOf("day").valueOf()
          : moment().utc().endOf("day").valueOf(),
      };
    }
  })();
  const { match } = useMediaQuery("XSUP");
  const [date, setDate] = useState<IDate>(initValue);
  const [compareDate, setCompareDate] = useState<IDate | null>(null);
  const [counter, setCounter] = useState(0);
  const [activeCompareStep, setActiveCompareStep] = useState<ESteps | null>(
    null,
  );
  const [step, setStep] = useState<ESteps>(366);
  const [zone, setZone] = useState<ITimeZone>("manual");
  const [open, setOpen] = useState<boolean>(isOpenDropdown);
  const [type, setType] = useState<string>("range");
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

  const [showDate, setShowDate] = useState<ISubmittedData>({
    date: {
      from:
        locale === "fa"
          ? moment().locale("fa").startOf("jYear").valueOf()
          : moment().locale("en").startOf("year").valueOf(),
      to: moment().locale(locale).startOf("day").valueOf(),
    },
    compareDate: null,
    Data: null,
  });

  const handleAccept = () => {
    if (date) {
      if (date.from && date.to && date.from < date.to) {
        if (onSubmit) {
          if (type == "range") {
            onSubmit({ type, Data: { date, compareDate } });
          } else {
            onSubmit({ type, Data: { customData } });
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
            }`,
          );
        }
      }
    } else {
      if (onSubmit) {
        if (type == "range") {
          onSubmit({ type, Data: { date, compareDate } });
        } else {
          onSubmit({ type, Data: { customData } });
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
    if (onReject) {
      onReject();
    }
  };

  useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLElement>,
    popupRef: popupRef,
    setIsOpen: setOpen ?? (() => {}),
    isOpen: open ?? false,
    position: renderPosition?.position,
    align: renderPosition?.align,
    offset: renderPosition?.offset,
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
    if (compareDate) {
      onCompareDateChange?.({
        type: "compare",
        Data: { date: date, compareDate: compareDate },
      });
      setShowDate((prev) => ({
        ...prev,
        compareDate: compareDate,
      }));
    }
  }, [compareDate]);

  const handleChange = (e: HandleParams) => {

    if (
      ["day", "week", "month", "season", "year","range"].includes(e.type)
    ) {
      setDate(e.Data?.date as IDate);
      // if (e.Data?.date?.to == 0) return;
      onChange?.(e);
    }
  };
  const mainContentProps: IMainContentProps = {
    activeCompareStep,
    defaultValue: date,
    value: date,
    highlightColor,
    exportType,
    onChange: handleChange,
    primaryColor,
    setActiveCompareStep,
    setCompareDate,
    setCounter,
    setStep,
    setZone,
    neutralColor,
    periodClassName,
    periodListClassName,
    showComparison,
    accentColor,
    tabClassName,
    activeTable,
    monthPickerClassName,
    tertiaryColor,
    zone,
    additionalElement,
    onError,
    step,
    locale: calendarType === "gregorian" ? "en" : "fa",
    setCustomData,
    setType,
  };

  useEffect(() => {
    if (!value) {
      return;
    } else if (value == null) {
      setDate({ from: null, to: null });
      setShowDate((prev) => ({
        ...prev,
        date: { from: null, to: null },
      }));
    } else {
      setDate({ from: value.from, to: value.to });
      setShowDate((prev) => ({
        ...prev,
        date: { from: value.from, to: value.to },
      }));
    }
  }, [value]);
  return (
    <>
      {match ? (
        <div
          className={`
      ${style.flex}
      ${style.flex_col}
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
              style={buttonStyle}
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
              <NavigateButton
                buttonStyle={buttonStyle}
                compareDate={compareDate}
                setDate={setDate}
                onChange={onChange}
                setCompareDate={setCompareDate}
                step={step}
                zone={zone}
                activeCompareStep={activeCompareStep}
                counter={counter}
                setCounter={setCounter}
                locale={locale}
              />
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
                  <MainContent {...mainContentProps} />
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
              document.body,
            )}
        </div>
      ) : (
        <div className={`${style.flex} ${className}`}>
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
              buttonStyle={buttonStyle}
              compareDate={compareDate}
              setDate={setDate}
              onChange={onChange}
              setCompareDate={setCompareDate}
              step={step}
              zone={zone}
              activeCompareStep={activeCompareStep}
              counter={counter}
              setCounter={setCounter}
              locale={locale}
            />
          )}

          {/* مدال */}
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
                <MainContent {...mainContentProps} />
              </div>,
              document.body,
            )}
        </div>
      )}
    </>
  );
}
