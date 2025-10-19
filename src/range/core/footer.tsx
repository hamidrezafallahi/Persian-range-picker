import type {
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

import moment from 'moment-jalaali';

import style from '../../main.module.css';
import type { IRangeProps } from './type';

interface IFooter {
  setShowDate: Dispatch<SetStateAction<number>>;
  showDate: number;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  locale: IRangeProps["locale"];
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
    <div className={`${style.flex} ${style.gap_2} ${style.mb_2} `}>
      {showTime ? (
        <div
          className={`${style.flex} ${style.justify_between} ${style.w_full} ${style.px_2} `}
        >
          <NowButton handleSelect={handleSelect} />
          <SubmitTimeButton handleSelect={handleSelect} />
        </div>
      ) : (
        <button
          onClick={() => handleSelect("today")}
          type="button"
          style={{ backgroundColor: highlightColor, color: primaryColor }}
          className={`${style.w_full} ${style.h_10} ${style.text_center} ${chooseTodayClassName} ${style.border_none}  ${style.px_2} `}
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
      className={`${style.p_2} ${style.px_3} ${style.border} ${style.rounded_md} ${nowButtonClassName}`}
      onClick={() => handleSelect("now")}
      type="button"
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
      type="button"
      className={`${style.p_2} ${style.px_3} ${style.border} ${style.rounded_md} ${okButtonClassName}`}
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
