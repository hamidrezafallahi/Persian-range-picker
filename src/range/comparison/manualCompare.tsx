import { useEffect, useState } from "react";
import style from "../../main.module.css";
import moment from "moment-jalaali";

import type { IBaseProps, ITime } from "../core/type";
import { ESteps } from "../core/type";
import { TickIcon } from "../icons/TickIcon";

function ManualCompare({ ...props }: IBaseProps) {
  const {
    date,
    step,
    setCompareDate,
    locale,
    accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    neutralColor = "#9cc5f1", //رنگ خنثی، اغلب برای پس‌زمینه یا متن - آبی کمرنگ
  } = props;
  const [compare, setCompare] = useState(date);
  const [oneYearCompareDate, setOneYearCompareDate] = useState(date);
  const [active, setActive] = useState<string>("");
  const [disableButton, setDisableButton] = useState("");
  const stringDateFrom = new Date(compare?.from).toLocaleDateString("fa-IR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  });
  const stringDateTo = new Date(compare?.to).toLocaleDateString("fa-IR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  });
  const stringDateOneYearFrom = new Date(
    oneYearCompareDate.from
  ).toLocaleDateString("fa-IR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  });
  const stringDateOneYearTo = new Date(
    oneYearCompareDate.to
  ).toLocaleDateString("fa-IR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  });
  const timeHandler = (key: ITime | "collapse") => {
    if (key == "manual") {
      setCompareDate({ from: Number(compare.from), to: Number(compare.to) });
      setActive(key);
      setDisableButton("manual");
    } else {
      setCompareDate({
        from: Number(oneYearCompareDate.from),
        to: Number(oneYearCompareDate.to),
      });
      setActive(key);
      setDisableButton("collapse");
    }
  };
  useEffect(() => {
    if (step == ESteps.manual) {
      const newStep = {
        from: Number(date.from) - (Number(date.to) - Number(date.from) - 1),
        to: Number(date.from) - 1,
      };
      const newStepOneYearAgo = {
        from: moment(date.from)
          .locale("fa")
          .clone()
          .startOf("day")
          .subtract(1, "jYear")
          .valueOf(),
        to: moment(date.to)
          .locale("fa")
          .clone()
          .endOf("day")
          .subtract(1, "jYear")
          .valueOf(),
      };
      setCompare({ from: newStep.from, to: newStep.to });
      setOneYearCompareDate({
        from: newStepOneYearAgo.from,
        to: newStepOneYearAgo.to,
      });
    }
  }, [date]);
  return (
    <div className={`${style.flex} ${style.flex_col} ${style.w_full}`}>
      <button
        disabled={disableButton == "manual"}
        key="manual"
        onClick={() => timeHandler("manual")}
        className={`${style.flex} ${style.flex_col} ${style.relative} ${style.items_start} ${style.gap_2} ${style.w_full} ${style.h_fit}`}
      >
        <div
          style={{ color: active == "manual" ? accentColor : tertiaryColor }}
        >
          {locale == "fa" ? "یک بازه عقبتر" : "One step before"}
        </div>
        <div
          style={{ color: active == "manual" ? neutralColor : tertiaryColor }}
          className={`${style.text_xs}`}
        >
          {stringDateFrom}
          {" - "} {stringDateTo}{" "}
        </div>
        {active == "manual" && (
          <span
            className={`${style.absolute} ${style.my_auto} ${
              locale == "en" ? style.right_5 : style.left_5
            }`}
          >
            <TickIcon accentColor={accentColor} />
          </span>
        )}
        {/* <Divider className="m-0" /> */}
        <div
          style={{ backgroundColor: tertiaryColor }}
          className={`${style.m_0} ${style.h_full}`}
        />
      </button>
      <button
        disabled={disableButton == "collapse"}
        key="collapse"
        onClick={() => timeHandler("collapse")}
        className={`${style.relative} ${style.flex} ${style.flex_col} ${style.items_start} ${style.w_full} ${style.h_fit} `}
      >
        <div
          style={{ color: active == "collapse" ? accentColor : tertiaryColor }}
        >
          {locale == "fa"
            ? "همین بازه یک سال پیش"
            : "Same duration noe year ago"}
        </div>
        <div
          style={{ color: active == "collapse" ? neutralColor : tertiaryColor }}
        >
          {stringDateOneYearFrom}
          {" - "}
          {stringDateOneYearTo}
        </div>
        {active == "collapse" && (
          <span
            className={`${style.absolute} ${style.my_auto}   ${
              locale == "en" ? style.right_5 : style.left_5
            }`}
          >
            <TickIcon accentColor={accentColor} />
          </span>
        )}
      </button>
    </div>
  );
}

export default ManualCompare;
