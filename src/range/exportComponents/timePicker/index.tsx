import React, { type ReactNode, useEffect, useRef, useState } from "react";

import moment from "moment-jalaali";

import { toPersianDigits } from "../../core/helper";
import { CalenderIcon } from "../../icons/CalenderIcon";
import { TimeColumns } from "./exportComponents";

type TUnit = "hour" | "minute" | "second";

interface Props {
  defaultValue?: Date;
  locale?: "fa" | "en";
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
  needConfirm?: boolean;
  showNow?: boolean;
  renderExtraFooter?: () => ReactNode;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  flatRender?: boolean;
  onGetValue?: (e: number) => void;
}

export const TimePicker: React.FC<Props> = ({
  defaultValue = new Date(),
  // onChange,
  locale = "fa",
  containerClassName,
  okButtonClassName,
  nowButtonClassName,
  timeButtonClassName,
  // width = 100,
  // height = 100,
  displayButtonCount = 10,
  icon = <CalenderIcon />,
  tertiaryColor = "#939393",
  highlightColor = "#f4f4f4",
  format = "HH:mm:ss",
  showSecond = true,
  needConfirm = true,
  showNow = true,
  renderExtraFooter,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  flatRender = false,
  onGetValue,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<number>(defaultValue.valueOf());
  // const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // const firstRender = useRef(true);

  const ref = useRef<HTMLDivElement>(null);
  // const hookPosition = useRenderPosition({
  //   buttonRef: ref,
  //   enabled: open,
  //   popupSize: { width, height },
  // });

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
    const updated = moment(time).locale(locale).set(unit, value);
    setTime(updated.valueOf());
  };

  const handleOk = () => {
    // onChange?.(time);
    setOpen(false);
  };

  const handleNow = () => {
    const now = moment().locale(locale).valueOf();
    setTime(now);
    setOpen(false);
    // onChange?.(now);
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
  const renderHeight = `${
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 17) +
    20 +
    (displayButtonCount - 1) * 16
  }px`;
  useEffect(() => {
    setTime(defaultValue.valueOf());
  }, [defaultValue]);
  useEffect(() => {
    onGetValue?.(time);
  }, [time]);

  return (
    <>
      {flatRender ? (
        <div
          // style={{
          //   position: "absolute",
          //   top: position.top,
          //   left: position.left,
          //   zIndex: 1000,
          // }}
          className={`flex flex-col gap-2 bg-white ${
            flatRender ? "" : "shadow-lg rounded-lg border border-gray-300  "
          }  w-fit p-3  ${containerClassName}`}
        >
          <TimeColumns
            // tertiaryColor={tertiaryColor}
            renderHeight={renderHeight}
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

          {!flatRender && (
            <div className="flex justify-between gap-4 mt-2">
              {showNow && (
                <button
                  onClick={handleNow}
                  className={`p-2 px-3 border rounded-md ${nowButtonClassName}`}
                >
                  Now
                </button>
              )}

              {needConfirm && (
                <button
                  onClick={handleOk}
                  className={`p-2 px-3 border rounded-md ${okButtonClassName}`}
                  style={{
                    background: "black",
                    borderColor: "black",
                    color: "white",
                  }}
                >
                  OK
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-fit" ref={ref}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`relative flex justify-center items-center gap-2 p-1 px-2 rounded-md w-40 h-10 ${timeButtonClassName} `}
            style={{ color: tertiaryColor, backgroundColor: highlightColor }}
          >
            {moment(time).locale(locale).format(format)}
            <span className="text-lg">{icon}</span>
          </button>

          {open && (
            <div
              // style={{
              //   position: "absolute",
              //   top: position.top,
              //   left: position.left,
              //   zIndex: 1000,
              // }}
              className={`flex flex-col gap-2 bg-white shadow-lg p-3 border border-gray-300 rounded-lg w-fit ${containerClassName}`}
            >
              <TimeColumns
                renderHeight={renderHeight}
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

                {needConfirm && (
                  <button
                    onClick={handleOk}
                    className={`p-2 px-3 border rounded-md ${okButtonClassName}`}
                    style={{
                      background: "black",
                      borderColor: "black",
                      color: "white",
                    }}
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          )}

          {renderExtraFooter && <div>{renderExtraFooter()}</div>}
        </div>
      )}
    </>
  );
};
