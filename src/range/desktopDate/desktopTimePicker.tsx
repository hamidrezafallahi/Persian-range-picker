import React, {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import moment from "moment-jalaali";
import { toPersianDigits } from "../core/helper";
import type { HandleParams, IDate } from "../core/type";
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
  onChange?: (e: HandleParams) => void;
  setShowDate: Dispatch<SetStateAction<IDate>>;
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
          className={`flex flex-col justify-evenly items-center !rounded-md w-[clamp(24px,24px,30px)] aspect-square text-center cursor-pointer ${
            active === val
              ? "pointer-events-auto opacity-100 text-gray123 text-sm"
              : ""
          } `}
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
  },[time]);
  return (
    <div className="range">
      <div
        style={{ paddingTop: "12px" }}
        className={`flex justify-center ${containerClassName}`}
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
          showSecond={true}
        />
      </div>
    </div>
  );
};
