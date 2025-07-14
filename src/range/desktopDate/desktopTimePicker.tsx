import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "../../main.module.css";
import moment from "moment-jalaali";

import { toPersianDigits } from "../core/helper";
import { TimeColumns } from "../exportComponents/timePicker/exportComponents";

type TUnit = "hour" | "minute" | "second";

interface Props {
  defaultValue?: number;
  calendarType?: "shamsi" | "gregorian";
  containerClassName?: string;
  displayButtonCount?: number;
  tertiaryColor?: string;
  highlightColor?: string;
  format?: string;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  onGetValue?: (e: number) => void;
  onChange?: (e: number) => void;
  setShowDate: Dispatch<SetStateAction<number>>;
  showSecond?: boolean;
}

export const DesktopTimePicker: React.FC<Props> = ({
  defaultValue,
  calendarType = "shamsi",
  containerClassName,
  displayButtonCount = 6,
  tertiaryColor = "#939393",
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  onGetValue,
  showSecond = false,
}: Props) => {
  const [time, setTime] = useState<number | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const locale = calendarType == "shamsi" ? "fa" : "en";

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
          className={`
            ${style.flex}
            ${style.flex_col}
            ${style.justify_evenly}
            ${style.items_center}
            ${style.rounded_md_force}
            ${style.w_6}
            ${style.aspect_square}
            ${style.text_center}
            ${style.cursor_pointer}
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
        style={{ paddingTop: "12px" }}
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
