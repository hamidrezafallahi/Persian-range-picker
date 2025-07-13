import type { Dispatch, ReactNode, SetStateAction } from "react";

import moment from "moment-jalaali";

import type { IDesktopRangeProps } from "./type";

interface IFooter {
  setShowDate: Dispatch<SetStateAction<number>>;
  showDate: number;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  locale: IDesktopRangeProps["locale"];
  elements?: ReactNode[] | null;
  primaryColor?: string;
  highlightColor?: string;
  chooseTodayClassName?: string;
  showTime: boolean;
  onChange?: (e: number) => void;
  onSubmit?: () => void;
  onNowButton?: () => void;
  onTodayButton?: () => void;
}

export const Footer = ({ ...props }: IFooter) => {
  const {
    setShowDate,
    setIsOpen,
    locale = "fa",
    highlightColor,
    primaryColor,
    chooseTodayClassName,
    showTime,
    onChange,
    onSubmit,
    onNowButton,
    onTodayButton,
    showDate,
  } = props;

  const handleSelect = (key: "today" | "now" | "submit") => {
    const todayStart = moment().locale(locale).startOf("day").valueOf();

    if (key === "today") {
      setShowDate(todayStart);
      onChange?.(todayStart);
      onTodayButton?.();
      setIsOpen?.(false);
    } else if (key === "now") {
      const now = locale === "fa" ? moment() : moment.utc();
      let updated;

      const isInvalid =
        !showDate || isNaN(showDate) || !moment(showDate).isValid();

      if (isInvalid) {
        updated = locale === "fa" ? moment() : moment.utc();
      } else {
        updated =
          locale === "fa" ? moment(showDate) : moment.utc(moment(showDate));
      }

      updated = updated
        .set("hour", now.hour())
        .set("minute", now.minute())
        .set("second", now.second());

      setShowDate(updated.valueOf());
      const hourDiv = document.getElementById("hour");
      if (hourDiv) {
        hourDiv.scrollTop = now.hour() * 40;
      }
      const minuteDiv = document.getElementById("minute");
      if (minuteDiv) {
        minuteDiv.scrollTop = now.minute() * 40;
      }
      const secondDiv = document.getElementById("second");
      if (secondDiv) {
        secondDiv.scrollTop = now.second() * 40;
      }
      onNowButton?.();
    } else if (key === "submit") {
      onSubmit?.();
      setIsOpen?.(false);
    }
  };

  return (
    <div className="flex gap-2 mb-2 px-2">
      {showTime ? (
        <div className="flex justify-between w-full">
          <NowButton handleSelect={handleSelect} />
          <SubmitTimeButton handleSelect={handleSelect} />
        </div>
      ) : (
        <button
          onClick={() => handleSelect("today")}
          style={{ backgroundColor: highlightColor, color: primaryColor }}
          className={`w-full h-10 text-center ${chooseTodayClassName}`}
        >
          {locale === "fa" ? "انتخاب امروز" : "Choose today"}
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
      onClick={() => handleSelect("now")}
    >
      now
    </button>
  );
};

const SubmitTimeButton = ({ ...props }) => {
  const { handleSelect, okButtonClassName = "" } = props;
  return (
    <button
      onClick={() => handleSelect("submit")}
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
