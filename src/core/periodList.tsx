import {
  Dispatch,
  SetStateAction,
} from 'react';

import { TickIcon } from '../assets/icons/TickIcon';
import Comparison from '../comparison';
import style from '../main.module.css';
import { ESteps } from '../persianDatePicker/enum';
import {
  HandleParams,
  ITimeZone,
  TimeSections,
} from '../persianDatePicker/type';
import { getTimestampsForPeriod } from './helper';
import {
  ExportType,
  IDate,
  TLocale,
} from './type';

interface IPeriodList {
  step: ESteps;
  zone: ITimeZone;
  value: IDate;
  locale: TLocale;
  // setDate: Dispatch<SetStateAction<IDate>>;
  setStep: Dispatch<SetStateAction<ESteps>>;
  setZone: Dispatch<SetStateAction<ITimeZone>>;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  onChange: (e: HandleParams) => void;
  componentStep: ESteps;
  setCounter: Dispatch<SetStateAction<number>>;
  activeCompareStep: ESteps | null;
  setActiveCompareStep: Dispatch<SetStateAction<ESteps | null>>;
  showComparison: boolean;
  periodClassName: string;
  primaryColor: string;
  highlightColor: string;
  accentColor: string;
  tertiaryColor: string;
  neutralColor: string;
  exportType?: ExportType;
}
function PeriodList({ ...props }: IPeriodList) {
  const {
    onChange,
    setStep,
    setZone,
    componentStep,
    value,
    locale = "fa",
    setCounter,
    activeCompareStep,
    setActiveCompareStep,
    setCompareDate,
    showComparison = true,
    periodClassName,
    step,
    zone,
    primaryColor,
    highlightColor = "#f4f4f4", //رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
    accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    neutralColor = "#9cc5f1", //رنگ خنثی، اغلب برای پس‌زمینه یا متن - آبی کمرنگ
    exportType
  } = props;


  const period: TimeSections[] = [
    {
      title: locale == "fa" ? "امروز" : "Today",
      value: getTimestampsForPeriod("today", locale) ,
      step: ESteps.day,
      timeZone: "today",
    },
    {
      title: locale == "fa" ? "دیروز" : "Yesterday",
      value: getTimestampsForPeriod("yesterday", locale),
      step: ESteps.day,
      timeZone: "yesterday",
    },
    {
      title: locale == "fa" ? "این هفته" : "This week",
      value: getTimestampsForPeriod("thisWeek", locale),
      step: ESteps.week,
      timeZone: "thisWeek",
    },
    {
      title: locale == "fa" ? "هفته قبل" : "Last week",
      value: getTimestampsForPeriod("lastWeek", locale),
      step: ESteps.week,
      timeZone: "lastWeek",
    },
    {
      title: locale == "fa" ? "هفت روز گذشته" : "Last 7 days",
      value: getTimestampsForPeriod("last7Days", locale),
      step: ESteps.week,
      timeZone: "last7Days",
    },
    {
      title: locale == "fa" ? "این ماه" : "This month",
      value: getTimestampsForPeriod("thisMonth", locale),
      step: ESteps.month,
      timeZone: "thisMonth",
    },
    {
      title: locale == "fa" ? "ماه پیش" : "Last month",
      value: getTimestampsForPeriod("lastMonth", locale),
      step: ESteps.month,
      timeZone: "lastMonth",
    },
    {
      title: locale == "fa" ? "سی روز گذشته" : "Last 30 days",
      value: getTimestampsForPeriod("last30Days", locale),
      step: ESteps.month,
      timeZone: "last30Days",
    },
    {
      title: locale == "fa" ? "سه ماه گذشته" : "Last three months",
      value: getTimestampsForPeriod("lastThreeMonth", locale),
      step: ESteps.season,
      timeZone: "lastThreeMonth",
    },
    {
      title: locale == "fa" ? "امسال" : "This year",
      value: getTimestampsForPeriod("thisYear", locale),
      step: ESteps.year,
      timeZone: "thisYear",
    },
    {
      title: locale == "fa" ? "سال گذشته" : "Last year",
      value: getTimestampsForPeriod("lastYear", locale),
      step: ESteps.year,
      timeZone: "lastYear",
    },
  ];
  const timeHandler = (item: TimeSections) => {
    setStep?.(item.step);
    setZone?.(item.timeZone);
    setActiveCompareStep?.(null);
    setCompareDate?.(null);
    setCounter?.(0);
    onChange?.({ type: "range", Data: item.value });
  };
  const filteredPeriod = period.filter(
    (item) =>
      item.step == componentStep ||
      (item.step == ESteps.season && componentStep == ESteps.month)
  );
  const switchHandler = () => {
    setStep?.(filteredPeriod[0].step);
    onChange?.({ type: "date", Data: filteredPeriod[0].value });
    setZone?.(filteredPeriod[0].timeZone);
    setActiveCompareStep?.(null);
    setCounter?.(0);
  };

  return (
    <>
      {filteredPeriod.map((item, index) => {
        const active =
          value!.from == item.value.from && value!.to == item.value.to;
        const stringDateFrom = new Date(item.value.from).toLocaleDateString(
          `${locale == "fa" ? "fa-IR" : "en-UK"}`,
          {
            weekday: "long",
            month: "long",
            day: "numeric",
          }
        );
        const stringDateTo = new Date(item.value.to).toLocaleDateString(
          `${locale == "fa" ? "fa-IR" : "en-UK"}`,
          {
            weekday: "long",
            month: "long",
            day: "numeric",
          }
        );
        return (
          <button
            key={index}
            onClick={() => timeHandler(item)}
            type="button"
            className={`
              ${style.border_none}
              ${style.py_2}
              ${style.relative}
              ${style.rounded_md}
              ${style.flex}
              ${style.flex_col}
              ${style.items_start}
              ${style.w_full}
              ${style.h_fit}
              ${periodClassName}
            `}
            dir={locale == "fa" ? "rtl" : "ltr"}
          >
            <div style={{ color: active ? accentColor : tertiaryColor }}>
              {item.title}
            </div>
            <div
              style={{
                color: active ? neutralColor : tertiaryColor,
                fontSize: "0.75rem",
              }}
            >
              {stringDateFrom}
              {componentStep !== ESteps.day && <> - {stringDateTo}</>}
            </div>
            {active && (
              <span
                style={{ top: "50%" }}
                className={`
                ${style.absolute}
                ${locale === "en" ? style.right_5 : style.left_5}
              `}
              >
                <TickIcon accentColor={accentColor} />
              </span>
            )}
            {index < filteredPeriod.length - 1 && (
              <div
                style={{ backgroundColor: highlightColor }}
                className={`${style.m_0} ${style.w_px} ${style.h_full}`}
              />
            )}
          </button>
        );
      })}

      {showComparison && (
        <Comparison
          switchHandler={switchHandler}
          date={value}
          activeCompareStep={activeCompareStep}
          componentStep={componentStep}
          locale={locale}
          setActiveCompareStep={setActiveCompareStep}
          setCompareDate={setCompareDate}
          step={step}
          zone={zone}
          accentColor={accentColor}
          neutralColor={neutralColor}
          primaryColor={primaryColor}
          tertiaryColor={tertiaryColor}
        />
      )}
    </>
  );
}

export default PeriodList;
