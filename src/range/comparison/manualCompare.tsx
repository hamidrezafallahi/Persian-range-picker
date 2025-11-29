import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import style from '../../main.module.css';
import {
  IDate,
  TLocale,
} from '../core/type';
import { TickIcon } from '../icons/TickIcon';
import { ESteps } from '../persianDatePicker/enum';
import { ITime } from '../persianDatePicker/type';

interface IManualCompare {
  step: ESteps;
  date: IDate;
  locale: TLocale;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  accentColor: string; 
  tertiaryColor: string;
}
function ManualCompare({ ...props }: IManualCompare) {
  const {
    date,
    step,
    setCompareDate,
    locale,
    accentColor, 
    tertiaryColor
  } = props;
  const [compare, setCompare] = useState(date);
  const [oneYearCompareDate, setOneYearCompareDate] = useState(date);
  const [active, setActive] = useState<string>("");
  const [disableButton, setDisableButton] = useState("");
  const stringDateFrom = new Date(compare!.from as any).toLocaleDateString(
    "fa-IR",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
    }
  );
  const stringDateTo = new Date(compare!.to as any).toLocaleDateString(
    "fa-IR",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
    }
  );
  const stringDateOneYearFrom = new Date(
    oneYearCompareDate!.from as any
  ).toLocaleDateString("fa-IR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  });
  const stringDateOneYearTo = new Date(
    oneYearCompareDate!.to as any
  ).toLocaleDateString("fa-IR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  });
  const timeHandler = (key: ITime | "collapse") => {
    if (key == "manual") {
      setCompareDate?.({
        from: Number(compare!.from),
        to: Number(compare!.to),
      });
      setActive(key);
      setDisableButton("manual");
    } else {
      setCompareDate?.({
        from: Number(oneYearCompareDate!.from),
        to: Number(oneYearCompareDate!.to),
      });
      setActive(key);
      setDisableButton("collapse");
    }
  };
  useEffect(() => {
    if (step == ESteps.manual) {
      const newStep = {
        from: Number(date!.from) - (Number(date!.to) - Number(date!.from) - 1),
        to: Number(date!.from) - 1,
      };
      const newStepOneYearAgo = {
        from: moment(date!.from)
          .locale("fa")
          .clone()
          .startOf("day")
          .subtract(1, "jYear")
          .valueOf(),
        to: moment(date!.to)
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
    <div
      className={`${style.flex} ${style.flex_col} ${style.w_full} ${style.gap_2}`}
    >
      <button
        disabled={disableButton == "manual"}
        key="manual"
        onClick={() => timeHandler("manual")}
        type="button"
        style={{ backgroundColor: "#f0f0f0" }}
        className={`${style.flex} ${style.flex_col} ${style.relative} ${style.items_start} ${style.gap_2} ${style.w_full} ${style.h_fit} ${style.rounded_md} ${style.border_none} `}
      >
        <div
          style={{ color: active == "manual" ? accentColor : tertiaryColor }}
        >
          {locale == "fa" ? "یک بازه عقبتر" : "One step before"}
        </div>
        <div
          style={{ color: active == "manual" ? accentColor : tertiaryColor }}
          className={`${style.text_xs}`}
        >
          {stringDateFrom}
          {" - "} {stringDateTo}{" "}
        </div>
        {active == "manual" && (
          <span
            className={`${style.absolute} ${style.top_3} ${
              locale == "en" ? style.right_5 : style.left_5
            }`}
          >
            <TickIcon accentColor={accentColor} />
          </span>
        )}
        <div className={`${style.m_0} ${style.h_full}`} />
      </button>
      <button
        disabled={disableButton == "collapse"}
        key="collapse"
        onClick={() => timeHandler("collapse")}
        type="button"
        className={`${style.flex} ${style.flex_col} ${style.relative} ${style.items_start} ${style.gap_2} ${style.w_full} ${style.h_fit} ${style.rounded_md} ${style.border_none} `}
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div
          style={{ color: active == "collapse" ? accentColor : tertiaryColor }}
        >
          {locale == "fa"
            ? "همین بازه یک سال پیش"
            : "Same duration noe year ago"}
        </div>
        <div
          style={{ color: active == "collapse" ? accentColor : tertiaryColor }}
        >
          {stringDateOneYearFrom}
          {" - "}
          {stringDateOneYearTo}
        </div>
        {active == "collapse" && (
          <span
            className={`${style.absolute} ${style.top_3}   ${
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
