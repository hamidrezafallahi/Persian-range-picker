import React, {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import moment from "moment-jalaali";

import type { IDesktopProps } from "../../range2/core/type";
import type { IDate, IDateProps } from "../core/type";
import { TimePicker } from "../exportComponents/timePicker";
import { useRenderPosition } from "../exportComponents/useRenderPosition";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";

export function DesktopDatePicker({ ...props }: IDateProps) {
  const {
    locale = "fa",
    defaultValue,
    onChange,
    primaryColor = "#000",
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
    dropdownWidth = 256,
    dropdownHeight = 314,
    showTime = true,
    chooseTodayClassName = "",
    showTimeFormat = "HH:mm:ss",
  } = props;
  const initialDate: IDate = useMemo(
    () => ({
      from: defaultValue?.from && defaultValue.from > 0 ? defaultValue.from : 0,
      to: 0,
    }),
    [defaultValue]
  );

  const [showDate, setShowDate] = useState<IDate>(initialDate);

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [popupSize, setPopupSize] = useState({
    width: dropdownWidth,
    height: dropdownHeight,
  });
  const [selectedTimestamp, setSelectedTimestamp] = useState<number>(
    showDate.from > 0 ? showDate.from : Date.now()
  );
  const buttonRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const hookPosition = useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLButtonElement>,
    enabled: isOpen,
    popupSize,
  });

  useEffect(() => {
    if (isOpen && popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      setPopupSize({ width: rect.width, height: rect.height });
    }
  }, [isOpen]);

  useEffect(() => {
    setPosition(hookPosition);
  }, [hookPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdown = () => setIsOpen((prev) => !prev);
  const handleSubmit = () => {
    onChange?.({ type: "date", date: { from: showDate.from, to: 0 } });
  };

  const handleDateChange = (date: IDate) => {
    const temp = {
      year:
        locale == "fa"
          ? moment(date.from).locale(locale).jYear()
          : moment(date.from).locale(locale).year(),
      month:
        locale == "fa"
          ? moment(date.from).locale(locale).jMonth()
          : moment(date.from).locale(locale).month(),
      day: moment(date.from).locale(locale).day(),
    };
    const newDate = moment(selectedTimestamp).set(temp).valueOf();
    setShowDate({ from: newDate, to: 0 });
    setSelectedTimestamp(newDate);
    if (!showTime) {
      setIsOpen(false);
    }
  };

  const persian =
    showDate.from > 0
      ? moment(showDate.from).format("jYYYY/jMM/jDD")
      : "انتخاب تاریخ";

  const gregorian =
    showDate.from > 0
      ? moment(showDate.from).format("YYYY/MM/DD")
      : "Choose date";

  const title = locale === "fa" ? persian : gregorian;
  const handleSetTime = (timestamp: number) => {
    console.log(
      new Date(timestamp).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    );

    const newDate = moment(selectedTimestamp)
      .set({
        year: moment(timestamp).year(),
        month: moment(timestamp).month(),
        date: moment(timestamp).date(),
      })
      .valueOf();

    setShowDate({ from: newDate, to: 0 });
    setSelectedTimestamp(newDate);
  };
  return (
    <div className="relative w-fit h-full">
      <button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={handleDropdown}
        style={{
          color: tertiaryColor,
          backgroundColor: highlightColor,
          marginRight: 200,
        }}
        className="flex justify-center items-center gap-2 px-3 border rounded-md w-40 h-10"
      >
        <CalenderIcon />
        <div className="text-sm">{title}</div>
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            zIndex: 1000,
            minWidth: showTime ? dropdownWidth + 238 : dropdownWidth,
          }}
          className="bg-white shadow-lg p-2 border rounded-lg overflow-hidden"
        >
          <div className="flex items-end gap-2 border-r w-full">
            {showTime && (
              <div style={{ width: "212px", minWidth: "212px" }}>
                <div
                  className="flex justify-center items-center border-b h-9"
                  style={{ height: "34px" }}
                >
                  {moment(showDate.from).locale(locale).format(showTimeFormat)}
                </div>
                <TimePicker
                  // defaultValue={new Date(new Date().setHours(14, 26, 37, 42))}
                  flatRender={true}
                  onChange={handleSetTime}
                />
              </div>
            )}

            <DatePicker
              name="DesktopDate"
              {...props}
              model="date"
              locale={locale}
              onDateChange={handleDateChange}
              dateFromOutside={{ from: showDate.from, to: 0 }}
            />
          </div>
          <Footer
            setIsOpen={setIsOpen}
            setShowDate={setShowDate}
            locale={locale}
            primaryColor={primaryColor}
            highlightColor={highlightColor}
            chooseTodayClassName={chooseTodayClassName}
            showTime={showTime}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}

interface IFooter {
  setShowDate: Dispatch<SetStateAction<IDate>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  locale: IDesktopProps["locale"];
  elements?: ReactNode[] | null;
  primaryColor?: string;
  highlightColor?: string;
  chooseTodayClassName?: string;
  showTime: boolean;
  onSubmit?: () => void;
}

const Footer = ({ ...props }: IFooter) => {
  const {
    setShowDate,
    setIsOpen,
    locale = "fa",
    highlightColor,
    primaryColor,
    chooseTodayClassName,
    showTime,
    onSubmit,
  } = props;
  const today: IDate = {
    from: moment().locale(locale).startOf("day").valueOf(),
    to: moment().locale(locale).valueOf(),
  };
  const now: IDate = {
    from: moment().locale(locale).valueOf(),
    to: moment().locale(locale).valueOf(),
  };

  const handleSelect = (key: "today" | "now" | "submit") => {
    switch (key) {
      case "today":
        setShowDate(today);
        break;
      case "now":
        setShowDate(now);
        break;
      default:
        break;
    }
    setIsOpen(false);
    onSubmit?.();
  };

  return (
    <div className="flex gap-2 mt-2 px-2">
      {showTime ? (
        <div className="flex justify-between w-full">
          <NowButton handleSelect={handleSelect} />
          <SubmitTimeButton handleSelect={handleSelect} />
        </div>
      ) : (
        <button
          onClick={() => {
            handleSelect("today");
          }}
          style={{ backgroundColor: highlightColor, color: primaryColor }}
          className={` w-full h-10  text-center  ${chooseTodayClassName}`}
        >
          {locale == "fa" ? "انتخاب امروز" : "Choose today"}
        </button>
      )}
    </div>
  );
};

const NowButton = ({ ...props }) => {
  const { handleSelect, nowButtonClassName = "" } = props;
  return (
    <button
      className={`p-2 px-3 border rounded-md ${nowButtonClassName}`}
      onClick={() => {
        handleSelect("now");
      }}
    >
      now
    </button>
  );
};
const SubmitTimeButton = ({ ...props }) => {
  const { handleSelect, okButtonClassName = "" } = props;
  return (
    <button
      onClick={() => {
        handleSelect("submit");
      }}
      className={`p-2 px-3 border rounded-md ${okButtonClassName}`}
      style={{
        background: "black",
        borderColor: "black",
        color: "white",
      }}
    >
      Ok
    </button>
  );
};
