import type { Dispatch, ReactNode, SetStateAction } from "react";

import moment from "moment-jalaali";

import type { IDate, IDateProps, IDesktopRangeProps } from "./type";

interface IFooter {
  setShowDate: Dispatch<SetStateAction<IDate>>;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  locale: IDesktopRangeProps["locale"];
  elements?: ReactNode[] | null;
  primaryColor?: string;
  highlightColor?: string;
  chooseTodayClassName?: string;
  showTime: boolean;
  onChange?: IDateProps["onChange"];
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
  } = props;

  const handleSelect = (key: "today" | "now" | "submit") => {
    const now = moment().locale(locale).valueOf();
    const todayStart = moment().locale(locale).startOf("day").valueOf();
    const date =
      key === "now" ? { from: now, to: now } : { from: todayStart, to: now };
    if (key === "today") {
      onTodayButton?.();

      onChange?.({ type: "date", date });
    } else if (key === "now") {
      setShowDate(date);
      onChange?.({ type: "date", date });
      onNowButton?.();
    }

    setIsOpen?.(false);
    if (key === "submit") {
      onSubmit?.();
    }
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
