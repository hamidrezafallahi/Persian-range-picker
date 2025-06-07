import React, { useEffect, useRef, useState } from "react";

import type { Moment } from "moment-jalaali";
import moment from "moment-jalaali";

interface Props {
  defaultValue?: Moment;
  onChange?: (timestamp: number) => void;
}

const TimePicker: React.FC<Props> = ({ defaultValue, onChange }) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<Moment>(defaultValue || moment());
  const [tempTime, setTempTime] = useState<Moment>(time);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) {
      setTime(defaultValue);
      setTempTime(defaultValue);
    }
  }, [defaultValue]);

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
    setTempTime((prev) => prev.clone().set(unit, value));
  };

  const handleOk = () => {
    setTime(tempTime.clone());
    setOpen(false);
    onChange?.(tempTime.unix());
  };

  const handleNow = () => {
    const now = moment();
    setTempTime(now);
    setTime(now);
    setOpen(false);
    onChange?.(now.unix());
  };

  const pad = (num: number) => num.toString().padStart(2, "0");

  const renderOptions = (count: number, unit: "hour" | "minute" | "second") =>
    Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        onClick={() => handleTimeChange(unit, i)}
        className={`px-2 py-1 text-center cursor-pointer hover-bg-blue-100 rounded ${
          tempTime.get(unit) === i ? "bg-blue-100" : ""
        }`}
      >
        {pad(i)}
      </div>
    ));

  return (
    <div ref={ref} className="inline-block relative">
      <div
        onClick={() => {
          setOpen((prev) => !prev);
          setTempTime(time);
        }}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded font-mono cursor-pointer select-none"
      >
        {open ? tempTime.format("HH:mm:ss") : time.format("HH:mm:ss")}
        <span role="img" aria-label="clock" className="text-lg">
          🕒
        </span>
      </div>

      {open && (
        <div className="top-full left-0 z-10 absolute flex flex-col gap-2 bg-white shadow-lg mt-2 p-3 border border-gray-300 rounded-lg w-fit">
          <div className="flex gap-4">
            <div className="max-h-36 overflow-y-auto">
              {renderOptions(24, "hour")}
            </div>
            <div className="max-h-36 overflow-y-auto">
              {renderOptions(60, "minute")}
            </div>
            <div className="max-h-36 overflow-y-auto">
              {renderOptions(60, "second")}
            </div>
          </div>

          <div className="flex justify-between gap-4 mt-2">
            <button
              onClick={handleNow}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-1 border border-gray-300 rounded transition"
            >
              Now
            </button>
            <button
              onClick={handleOk}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-1 border border-gray-300 rounded transition"
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
