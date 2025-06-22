import React, { type ReactNode, useEffect, useRef, useState } from "react";

import moment from "moment-jalaali";

import { toPersianDigits } from "../../core/helper";
import type { TUnit } from "../../core/type";
import { CalenderIcon } from "../../icons/CalenderIcon";
// import { useRenderPosition } from "../useRenderPosition";
import { TimeColumns } from "./exportComponents";

interface Props {
  defaultValue?: number;
  calendarType?: "shamsi" | "gregorian";
  onChange?: (timestamp: number) => void;
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
  showNow?: boolean;
  renderExtraFooter?: () => ReactNode;
  showSecond?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
}

export const TimePicker: React.FC<Props> = ({
  defaultValue,
  onChange,
  calendarType = "shamsi",
  containerClassName,
  okButtonClassName,
  nowButtonClassName,
  timeButtonClassName,
  displayButtonCount = 5,
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<number | null>(
    defaultValue ? defaultValue : null
  );
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const locale = calendarType == "shamsi" ? "fa" : "en";

  const renderHeight =
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 24) +
    20 +
    (displayButtonCount - 1) * 16;

  // const firstRender = useRef(true);

  // const hookPosition = useRenderPosition({
  //   buttonRef: buttonRef as React.RefObject<HTMLElement>,
  //   popupRef: popupRef,
  //   setIsOpen: setOpen,
  //   isOpen:open,
  //   offset: 4,
  // });
  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = time
      ? moment(time).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setTime(updated.valueOf());
  };

  const handleSubmit = () => {
    if (time && time > 0) {
      onChange?.(time);
    }
    setOpen(false);
  };

  const handleNow = () => {
    const now = moment().locale(locale).valueOf();
    setTime(now);
    setOpen(false);
    onChange?.(now);
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
          className={`flex justify-center items-center !rounded-md w-6 aspect-square ${
            active === val
              ? "pointer-events-auto opacity-100 text-gray123 "
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
      <div className="relative">
        <button
          ref={buttonRef as React.RefObject<HTMLButtonElement>}
          onClick={() => setOpen((prev) => !prev)}
          className={`relative flex justify-between items-center gap-2  px-2 rounded-md w-full xs:w-28 h-9 ${timeButtonClassName} `}
          style={{ color: tertiaryColor, backgroundColor: highlightColor }}
        >
          <span className="text-lg">{icon}</span>
          {time ? moment(time).locale(locale).format(format) : "انتخاب زمان"}
        </button>

        {open && (
          <div
            ref={popupRef}
            style={{
              position: "absolute",
              width: 193,
            }}
            className={`flex flex-col gap-2 bg-white shadow-lg p-3 border border-gray-300 rounded-lg  ${containerClassName}`}
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
