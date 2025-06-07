import React, {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import moment from "moment-jalaali";

import { CalenderIcon } from "../range/icons/CalenderIcon";

type TUnit = "hour" | "minute" | "second";
interface Props {
  defaultValue?: Date;
  locale?: "fa" | "en";
  onChange?: (timestamp: number) => void;
  containerClassName?: string;
  okButtonClassName?: string;
  nowButtonClassName?: string;
  timeButtonClassName?: string;
  width?: string | number;
  height?: string | number;
  displayButtonCount?: number;
  icon?: ReactNode | null;
}

const TimePicker: React.FC<Props> = ({ ...props }: Props) => {
  const {
    defaultValue,
    onChange,
    locale = "fa",
    containerClassName,
    okButtonClassName,
    nowButtonClassName,
    timeButtonClassName,
    width,
    height = 100,
    displayButtonCount = 10,
    icon = <CalenderIcon />,
  } = props;
  const initValue = useMemo(() => {
    let temp = null;
    if (defaultValue) {
      temp = moment().locale(locale).valueOf();
    } else {
      temp = moment().locale(locale).valueOf();
    }
    return temp;
  }, [defaultValue]);

  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<number>(initValue);
  const [tempTime, setTempTime] = useState<number>(time);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimeChange = (
    unit: "hour" | "minute" | "second",
    value: number
  ) => {
    setTempTime((prev) =>
      moment(new Date(prev)).locale(locale).clone().set(unit, value).valueOf()
    );
  };

  const handleOk = () => {
    setTime(moment(new Date(tempTime)).locale(locale).clone().valueOf());
    setOpen(false);
  };

  const handleNow = () => {
    const now = moment().locale(locale).valueOf();
    setTempTime(now);
    setTime(now);
    setOpen(false);
  };

  const pad = (num: number) => num.toString().padStart(2, "0");

  const renderOptions = (count: number, unit: TUnit) =>
    Array.from({ length: count }, (_, i) => {
      return (
        <button
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
          key={i}
          onClick={() => handleTimeChange(unit, i)}
          className={`px-2 py-1 text-center cursor-pointer hover-bg-blue-100 rounded   ${
            moment(new Date(tempTime)).locale(locale).get(unit) === i
              ? "bg-blue-100"
              : ""
          }`}
        >
          {pad(i)}
        </button>
      );
    });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    onChange?.(time);
  }, [time]);
  const renderHeight = `${
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 17) + 17
  }px`;
  const minHeight = `${
    displayButtonCount * (buttonRefs.current[0]?.offsetHeight ?? 17) + 100
  }px`;
  return (
    <div className="w-fit" ref={ref}>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className={`relative flex items-center gap-2 py-2 border border-gray-300 rounded font-mono cursor-pointer select-none ${timeButtonClassName}`}
      >
        {open
          ? moment(new Date(tempTime)).locale(locale).format("HH:mm:ss")
          : moment(new Date(time)).locale(locale).format("HH:mm:ss")}
        <span role="img" aria-label="clock" className="text-lg">
          {icon}
        </span>
      </button>

      {open && (
        <div
          className={`z-10 absolute flex flex-col gap-2 bg-white shadow-lg mt-2 p-3 border border-gray-300 rounded-lg w-fit ${containerClassName}`}
          style={{ width: width, height: height, minHeight: minHeight }}
        >
          <div className="flex gap-4">
            <div
              className="flex flex-col px-0 overflow-y-auto"
              style={{ height: renderHeight }}
            >
              {renderOptions(24, "hour")}
            </div>
            <div
              className="flex flex-col overflow-y-auto"
              style={{ height: renderHeight }}
            >
              {renderOptions(60, "minute")}
            </div>
            <div
              className="flex flex-col overflow-y-auto"
              style={{ height: renderHeight }}
            >
              {renderOptions(60, "second")}
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-2">
            <button
              onClick={handleNow}
              className={`bg-gray-100 hover:bg-gray-200 px-4 py-1 border border-gray-300 rounded transition ${nowButtonClassName}`}
            >
              Now
            </button>
            <button
              onClick={handleOk}
              className={`bg-gray-100 hover:bg-gray-200 px-4 py-1 border border-gray-300 rounded transition ${okButtonClassName}`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
