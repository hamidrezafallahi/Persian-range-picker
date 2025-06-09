import React, {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import moment from "moment-jalaali";

import { useRenderPosition } from "../../";
import { CalenderIcon } from "../../icons/CalenderIcon";
import { TimeColumns } from "./exportComponents";

type TUnit = "hour" | "minute" | "second";

interface Props {
  defaultValue?: Date;
  locale?: "fa" | "en";
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
  showSecond?: boolean;
  needConfirm?: boolean;
  showNow?: boolean;
  renderExtraFooter?: () => ReactNode;
  changeOnScroll?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
}

export const TimePicker: React.FC<Props> = ({
  defaultValue,
  onChange,
  locale = "fa",
  containerClassName,
  okButtonClassName,
  nowButtonClassName,
  timeButtonClassName,
  width = 100,
  height = 100,
  displayButtonCount = 10,
  icon = <CalenderIcon />,
  tertiaryColor = "#939393",
  highlightColor = "#f4f4f4",
  format = "HH:mm:ss",
  showSecond = true,
  needConfirm = true,
  showNow = true,
  renderExtraFooter,
  changeOnScroll = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
}: Props) => {
  const initValue = useMemo(() => {
    const base = defaultValue ? moment(defaultValue) : moment();
    return base.locale(locale).valueOf();
  }, [defaultValue]);

  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<number>(initValue);
  const [tempTime, setTempTime] = useState<number>(initValue);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRender = useRef(true);

  const ref = useRef<HTMLDivElement>(null);
  const hookPosition = useRenderPosition({
    buttonRef: ref,
    enabled: open,
    popupSize: { width, height },
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
    const updated = moment(tempTime).locale(locale).set(unit, value);
    setTempTime(updated.valueOf());
    if (!needConfirm) onChange?.(updated.valueOf());
  };

  const handleScrollChange = (unit: TUnit, delta: number) => {
    const limit = unit === "hour" ? 24 : 60;
    const active = moment(tempTime).locale(locale).get(unit);
    const next = (active + delta + limit) % limit;
    if (!isDisabled(unit, next)) {
      handleTimeChange(unit, next);
    }
  };

  const handleOk = () => {
    setTime(tempTime);
    setOpen(false);
  };

  const handleNow = () => {
    const now = moment().locale(locale).valueOf();
    setTempTime(now);
    setTime(now);
    setOpen(false);
    onChange?.(now);
  };

  const pad = (num: number) => num.toString().padStart(2, "0");

  const isDisabled = (unit: TUnit, val: number) => {
    if (unit === "hour") return disabledHours?.().includes(val);
    if (unit === "minute") return disabledMinutes?.().includes(val);
    if (unit === "second") return disabledSeconds?.().includes(val);
    return false;
  };

  const renderOptions = (count: number, unit: TUnit, step = 1) => {
    const active = moment(tempTime).locale(locale).get(unit);
    return Array.from({ length: Math.ceil(count / step) }, (_, i) => {
      const val = i * step;
      const disabled = isDisabled(unit, val);
      return (
        <button
          key={val}
          onClick={() => !disabled && handleTimeChange(unit, val)}
          className={`px-2 py-1 text-center cursor-pointer rounded ${
            active === val ? "bg-blue-100" : ""
          } ${
            disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-blue-50"
          }`}
          disabled={disabled}
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
        >
          {pad(val)}
        </button>
      );
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    onChange?.(time);
  }, [time]);

  useEffect(() => {
    setPosition(hookPosition);
  }, [hookPosition]);

  const renderHeight = `${
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 17) +
    20 +
    (displayButtonCount - 1) * 16
  }px`;

  return (
    <div className="relative w-fit" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex justify-center items-center gap-2 p-1 px-2 rounded-md w-40 h-10 ${timeButtonClassName}`}
        style={{ color: tertiaryColor, backgroundColor: highlightColor }}
      >
        {open
          ? moment(tempTime).locale(locale).format(format)
          : moment(time).locale(locale).format(format)}
        <span className="text-lg">{icon}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            zIndex: 1000,
          }}
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
            changeOnScroll={changeOnScroll}
            onScrollChange={handleScrollChange}
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
  );
};
