import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import { toPersianDigits } from '../core/helper';
import style from '../main.module.css';
import { DesktopTimePickerProps } from '../persianDatePicker/type';
import { TimeColumns } from '../timePicker/timeColumns';

type TUnit = "hour" | "minute" | "second";



export const DesktopTimePicker: React.FC<DesktopTimePickerProps> = ({
  defaultValue,
  calendarType = "jalali",
  containerClassName,
  displayButtonCount = 6,
  tertiaryColor = "#939393",
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  onGetValue,
  showSecond = false,
}) => {
  const [time, setTime] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const locale = calendarType == "jalali" ? "fa" : "en";

  const renderHeight =
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 24) +
    20 +
    (displayButtonCount - 1) * 16;
  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = time
      ? moment(time).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setTime(updated.valueOf());
  };
  const renderOptions = (count: number, unit: TUnit, step = 1) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const active = moment(time).locale(locale).get(unit);
    return Array.from({ length: Math.ceil(count / step) }, (_, i) => {
      const val = i * step;

      return (
        <button
          key={val}
          onClick={() => handleTimeChange(unit, val)}
          type="button"
          className={`
            ${style.flex}
            ${style.flex_col}
            ${style.justify_evenly}
            ${style.items_center}
            ${style.rounded_md}
            ${style.w_6}
            ${style.aspect_square}
            ${style.text_center}
            ${style.cursor_pointer}
              ${style.border_none}
            ${
              active === val
                ? `${style.pointer_events_auto} ${style.opacity_100} ${style.text_gray123} ${style.text_sm}`
                : ""
            }
          `}
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
          style={{ color: tertiaryColor, fontSize: "14px" }}
        >
          {locale == "fa" ? toPersianDigits(pad(val)) : pad(val)}
        </button>
      );
    });
  };

  useEffect(() => {
    if (defaultValue) {
      setTime(defaultValue);
    }
  }, [defaultValue]);
  useEffect(() => {
    if (onGetValue && time) {
      onGetValue(time);
    }
  }, [time]);
  return (
    <>
      <div
        style={{ paddingTop: "12px", paddingBottom: "12px"  }}
        className={`
          ${style.flex} 
          ${style.justify_center} 
          ${containerClassName}
        `}
      >
        <TimeColumns
          renderHeight={`${renderHeight}px`}
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
    </>
  );
};
