import React, { type ReactNode, useEffect, useRef, useState } from "react";

import moment from "moment-jalaali";

import { toPersianDigits } from "../../core/helper";
import { CalenderIcon } from "../../icons/CalenderIcon";
import { useRenderPosition } from "../useRenderPosition";
import { TimeColumns } from "./exportComponents";
import type { HandleParams, IDate } from "../../core/type";

type TUnit = "hour" | "minute" | "second";

interface Props {
  defaultValue?: number;
  calendarType?: "shamsi" | "gregorian";
  // onChange?: (timestamp: number) => void;
  containerClassName?: string;
  okButtonClassName?: string;
  nowButtonClassName?: string;
  timeButtonClassName?: string;
  width?: number;
  height?: number;
  displayButtonCount?: number;
  icon?: ReactNode | null;
  tertiaryColor?: string;
  highlightColor?: string;
  format?: string;
  showSecond?: boolean;
  showNow?: boolean;
  renderExtraFooter?: () => ReactNode;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  onChange?: (e: { type: "date"; date: IDate }) => void;
}

export const TimePicker: React.FC<Props> = ({
  defaultValue,
  onChange,
  calendarType = "shamsi",
  containerClassName,
  okButtonClassName,
  nowButtonClassName,
  timeButtonClassName,
  width = 136,
  // height = 100,
  displayButtonCount = 6,
  icon = <CalenderIcon />,
  tertiaryColor = "#939393",
  highlightColor = "#f4f4f4",
  format = "HH:mm:ss",
  showSecond = true,
  showNow = true,
  renderExtraFooter,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<number | null>(
    defaultValue ? defaultValue : null
  );
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const locale = calendarType == "shamsi" ? "fa" : "en";

  const renderHeight =
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 17) +
    20 +
    (displayButtonCount - 1) * 16;

  // const firstRender = useRef(true);

  const ref = useRef<HTMLDivElement>(null);
  const hookPosition = useRenderPosition({
    buttonRef: ref,
    enabled: open,
    popupSize: { width: width, height: renderHeight },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = time
      ? moment(time).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setTime(updated.valueOf());
  };

  const handleSubmit = () => {
    if (time && time > 0) {
      onChange?.({ type: "date", date: { from: time, to: 0 } });
    }
    setOpen(false);
  };


  const handleNow = () => {
    const now = moment().locale(locale).valueOf();
    setTime(now);
    setOpen(false);
    onChange?.({ type: "date", date: { from: now, to: 0 } });
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

  return (
    <div className="range">
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`relative flex justify-between items-center gap-2  px-2 rounded-md w-full xs:w-28 h-9 ${timeButtonClassName} `}
            style={{ color: tertiaryColor, backgroundColor: highlightColor }}
          >
            <span className="text-lg">{icon}</span>
            {time ? moment(time).locale(locale).format(format) : "انتخاب زمان"}
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                top: hookPosition.top,
                left: hookPosition.left,
                zIndex: 1000,
              }}
              className={`flex flex-col gap-2 bg-white shadow-lg p-3 border border-gray-300 rounded-lg w-fit ${containerClassName}`}
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

              <div className="flex justify-between gap-4 mt-2">
                {showNow && (
                  <button
                    onClick={handleNow}
                    className={`p-2 px-3 border rounded-md ${nowButtonClassName}`}
                  >
                    Now
                  </button>
                )}
                  <button
                    onClick={handleSubmit}
                    className={`p-2 px-3 border rounded-md ${okButtonClassName}`}
                    style={{
                      background: "black",
                      borderColor: "black",
                      color: "white",
                    }}
                  >
                    OK
                  </button>
              </div>
            </div>
          )}

          {renderExtraFooter && <div>{renderExtraFooter()}</div>}
        </div>

    </div>
  );
};
