import React, { useEffect, useRef, useState } from "react";
import moment from "moment-jalaali";
import { toPersianDigits } from "../../core/helper";
import type { ITimePicker, TUnit } from "../../core/type";
import { CalenderIcon } from "../../icons/CalenderIcon";
import { useRenderPosition } from "../useRenderPosition";
// import { useRenderPosition } from "../useRenderPosition";
import { TimeColumns } from "./exportComponents";

export const TimePicker: React.FC<ITimePicker> = ({
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
  showSecond = false,
  showNow = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabled = false,
  exportType = "IsoString",
}: ITimePicker) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<number | null>(
    defaultValue ? defaultValue : null
  );
  const device: "mobile" | "desktop" =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);

  const locale = calendarType == "shamsi" ? "fa" : "en";
  const dynamicFormat = showSecond ? format : "HH:mm";
  const renderHeight =
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 24) +
    20 +
    (displayButtonCount - 1) * 16;

  useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLElement>,
    popupRef: popupRef,
    setIsOpen: setOpen,
    isOpen: open,
  });
  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = time
      ? moment(time).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setTime(updated.valueOf());
  };

  const handleSubmit = () => {
    if (time && time > 0) {
      const value =
        exportType === "timeStamp"
          ? time
          : calendarType === "shamsi"
          ? moment(time).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
          : moment.utc(time).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      onChange?.(value);
    }
    setOpen(false);
    popoverRef.current?.hidePopover();
  };

  const handleNow = () => {
    const now = locale === "fa" ? moment() : moment.utc();
    let updated;

    const isInvalid = !time || isNaN(time) || !moment(time).isValid();

    if (isInvalid) {
      updated = locale === "fa" ? moment() : moment.utc();
    } else {
      updated = locale === "fa" ? moment(time) : moment.utc(moment(time));
    }

    updated = updated
      .set("hour", now.hour())
      .set("minute", now.minute())
      .set("second", now.second());

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
          className={`flex justify-center items-center !rounded-md w-6 aspect-square ${
            active === val
              ? "pointer-events-auto opacity-100 !text-main-white bg-main-black "
              : ""
          }  `}
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
    <div className="range" style={{ position: "relative", width:device=="desktop"?"fit-content":"100%" }}>
      {device == "desktop" ? (
        <>
          <button
            disabled={disabled}
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={() => setOpen((prev) => !prev)}
            className={`relative flex justify-between items-center gap-2  px-2 rounded-md w-full xs:w-28 h-9 ${
              disabled && "cursor-not-allowed"
            }  ${timeButtonClassName} `}
            style={{
              color: tertiaryColor,
              backgroundColor: highlightColor,
              fontSize: "14px",
            }}
          >
            <span className="text-lg">{icon}</span>
            {time
              ? moment(time).locale(locale).format(dynamicFormat)
              : "انتخاب زمان"}
          </button>

          {open && (
            <div
              ref={popupRef}
              style={{
                position: "absolute",
                // width: 190,
                zIndex: 10,
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
                    {locale === "fa" ? "الان" : "Now"}
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
                  {locale === "fa" ? "تایید" : "OK"}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            disabled={disabled}
            popoverTarget="mobileTimeModal"
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={() => setOpen((prev) => !prev)}
            className={`relative flex justify-between items-center gap-2  px-2 rounded-md w-full  h-9 ${
              disabled && "cursor-not-allowed"
            }  ${timeButtonClassName} `}
            style={{
              color: tertiaryColor,
              backgroundColor: highlightColor,
              fontSize: "14px",
            }}
          >
            <span className="text-lg">{icon}</span>
            {time
              ? moment(time).locale(locale).format(dynamicFormat)
              : "انتخاب زمان"}
          </button>

          {open && (
            <div
              popover="auto"
              id="mobileTimeModal"
              ref={popoverRef}
              // style={{
              //   position: "absolute",
              //   // width: 190,
              //   zIndex: 10,
              // }}
              className={`relative border-none  w-full h-full flex flex-col gap-2 bg-white  p-3  ${containerClassName}`}
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
              <div className="fixed bottom-0 left-0 right-0 w-full p-2">
                <div className="flex justify-between gap-4 mt-2 ">
                  {showNow && (
                    <button
                      onClick={handleNow}
                      className={`p-2 px-3 border rounded-md ${nowButtonClassName}`}
                    >
                      {locale === "fa" ? "الان" : "Now"}
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
                    {locale === "fa" ? "تایید" : "OK"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
