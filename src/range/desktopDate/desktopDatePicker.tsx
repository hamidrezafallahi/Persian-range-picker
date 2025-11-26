import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import moment from 'moment-jalaali';

import style from '../../main.module.css';
import styles from '../../main.module.css';
import { Footer } from '../core/footer';
import {
  getTimestamp,
  toPersianDigits,
} from '../core/helper';
import { Mask } from '../exportComponents/mask';
import { useRenderPosition } from '../exportComponents/useRenderPosition';
import { CalenderIcon } from '../icons/CalenderIcon';
import { ClearIcon } from '../icons/ClearIcon';
import { Calendar } from '../persianDatePicker';
import { DesktopProps2 } from '../persianDatePicker/type';
import { DesktopTimePicker } from './desktopTimePicker';

export function DesktopDatePicker({ ...props }: DesktopProps2) {
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

    calendarType = "",
  } = props;
  const isFa = calendarType === "jalali";
  const dynamicFormat = showSecond ? showTimeFormat : "HH:mm";
  const initValue: number|null = (() => {
      if(defaultValue && defaultValue !== null && typeof defaultValue === "string" || typeof defaultValue === "number"){
        return isFa ? moment(defaultValue).locale("fa").startOf("day").valueOf() : moment(defaultValue).utc().startOf("day").valueOf()
      }else{
        return null
      }})()

  const [showDate, setShowDate] = useState<number|null>(initValue);
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

  const handleSubmit = () => {
    const finalDate = showTime
      ? showDate
      : moment(showDate).valueOf();
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
  };

  const handleDateChange = (date: number) => {
    const rawTimestamp = getTimestamp(date) ?? NaN;
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
  const changeHandler = (e: number) => {
    if (!e) return;
    setShowDate(e);
    if (exportType == "IsoString") {
      onChange?.(
        isFa
          ? moment(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : moment.utc(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      );
    } else {
      onChange?.(isFa ? moment(e).valueOf() : moment.utc(e).valueOf());
    }
  };
  const handleClear = (e: any) => {
    e.stopPropagation();
    setShowDate(null);
    onClear?.();
    setTitle(placeholder);
  };

  useEffect(() => {
    if (value !== undefined && typeof value === "string" || typeof value === "number") {
      if (value == null) {

        setShowDate(null);
      } else {
        setShowDate(isFa? moment(value).locale("fa").startOf("day").valueOf(): moment(value).utc().startOf("day").valueOf());
      }
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
      <button
        disabled={disabled}
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={handleDropdown}
        type="button"
        className={`${styles.flex} ${styles.justify_between} ${
          styles.items_center
        } ${styles.gap_1} ${styles.px_2}   ${styles.rounded_md} ${
          styles.h_9
        }   ${style.xs_w_40} ${showTime && style.xs_w_52} ${
          style.overflow_hidden
        } ${style.border_none} 
        ${style.w_full}  ${className}`}
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
  ${style.flex}
  ${style.justify_center}
  ${style.items_center}
  ${style.p_1}
  ${style.m_0}
  ${style.rounded_full}
  ${style.border_none}
  ${style.items_center}
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
              allowClear={false}
              exportType="timeStamp"
              defaultValue={
                showDate && !isNaN(showDate as number)
                  ? showDate
                  : undefined
              }
              value={showDate}
              onMaskChange={changeHandler as (e: any) => void}
              Style={{ width: "112px" }}
            />
          </div>
        ) : (
          <>
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
              ${style.shadow_lg}
              ${style.p_2}
              ${style.border}
              ${style.rounded_lg}
              ${style.overflow_hidden}
            `}
            dir="ltr"
          >
            <div
              className={`
  ${style.z_50}
  ${style.flex}
  ${style.items_end}
  ${style.gap_2}
  ${showTime ? style.border_r : ""}
  ${style.w_full}
`}
            >
              <Calendar
                {...props}
                locale={isFa ? "fa" : "en"}
                model="date"
                calendarBaseWidth={calendarBaseWidth}
                onChange={(e)=>{handleDateChange(e as number)}}
                value={showDate}
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
  );
}
