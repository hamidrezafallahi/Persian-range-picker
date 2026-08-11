import type {
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

import moment from '../dateEngine';

import style from '../main.module.css';
import { scrollTimeColumn } from '../timePicker/timeColumns';
import { TLocale } from './type';

interface IFooter {
  setShowDate: Dispatch<SetStateAction<number|null>>;
  showDate: number|null;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  locale: TLocale
  elements?: ReactNode[] | null;
  primaryColor?: string;
  highlightColor?: string;
  chooseTodayClassName?: string;
  showTime: boolean;
  onChange?: (e: number) => void;
  onSubmit?: () => void;
  onNowButton?: () => void;
  onTodayButton?: () => void;
  /** Must match TimeColumns idPrefix when scrolling time columns. */
  timeColumnsIdPrefix?: string;
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
    timeColumnsIdPrefix,
  } = props;

  const handleSelect = (key: "today" | "now" | "submit") => {
    const todayStart = moment().locale(locale).startOf("day").valueOf();

    if (key === "today") {
      setShowDate( todayStart );
      onChange?.(todayStart);
      onTodayButton?.();
      setIsOpen?.(false);
    } else if (key === "now") {
      const now = moment().locale(locale);
      let updated;

      const isInvalid =
        !showDate || isNaN(showDate) || !moment(showDate).isValid();

      if (isInvalid) {
        updated = moment().locale(locale);
      } else {
        updated = moment(showDate).locale(locale);
      }

      updated = updated
        .set("hour", now.hour())
        .set("minute", now.minute())
        .set("second", now.second());

      const next = updated.valueOf();
      setShowDate(next);
      // Defer scroll until after React commits DesktopTimePicker/TimeColumns DOM.
      requestAnimationFrame(() => {
        if (!timeColumnsIdPrefix) return;
        scrollTimeColumn(timeColumnsIdPrefix, "hour", now.hour());
        scrollTimeColumn(timeColumnsIdPrefix, "minute", now.minute());
        scrollTimeColumn(timeColumnsIdPrefix, "second", now.second());
      });
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
          <NowButton handleSelect={handleSelect} locale={locale} />
          <SubmitTimeButton
            handleSelect={handleSelect}
            primaryColor={primaryColor}
            locale={locale}
          />
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

const NowButton = ({
  handleSelect,
  locale = "fa",
  nowButtonClassName = "",
}: {
  handleSelect: (key: "today" | "now" | "submit") => void;
  locale?: TLocale;
  nowButtonClassName?: string;
}) => {
  return (
    <button
      className={`${style.p_2} ${style.px_3} ${style.border} ${style.rounded_md} ${nowButtonClassName}`}
      onClick={() => handleSelect("now")}
      type="button"
    >
      {locale === "fa" ? "الان" : "Now"}
    </button>
  );
};

const SubmitTimeButton = ({
  handleSelect,
  locale = "fa",
  okButtonClassName = "",
  primaryColor = "#000",
}: {
  handleSelect: (key: "today" | "now" | "submit") => void;
  locale?: TLocale;
  okButtonClassName?: string;
  primaryColor?: string;
}) => {
  return (
    <button
      onClick={() => handleSelect("submit")}
      type="button"
      className={`${style.p_2} ${style.px_3} ${style.border} ${style.rounded_md} ${okButtonClassName}`}
      style={{
        background: primaryColor,
        borderColor: primaryColor,
        color: "#fff",
      }}
    >
      {locale === "fa" ? "ثبت" : "OK"}
    </button>
  );
};
