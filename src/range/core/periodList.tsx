import Comparison from "../comparison";
import { TickIcon } from "../icons/TickIcon";
import { getTimestampsForPeriod } from "./helper";
import type { IBaseProps, ITimeSections } from "./type";
import { ESteps } from "./type";

function PeriodList({ ...props }: IBaseProps) {
  const {
    setDate,
    setStep,
    setZone,
    componentStep,
    date,
    locale = "fa",
    setCounter,
    setActiveCompareStep,
    isShowComparison = true,
    periodClassName,
    highlightColor = "#f4f4f4", //رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
    accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    neutralColor = "#9cc5f1", //رنگ خنثی، اغلب برای پس‌زمینه یا متن - آبی کمرنگ
  } = props;
  const period: ITimeSections[] = [
    {
      title: locale == "fa" ? "امروز" : "Today",
      value: getTimestampsForPeriod("today", locale),
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
  const timeHandler = (item: ITimeSections) => {
    setStep(item.step);
    setDate(item.value);
    setZone(item.timeZone);
    setActiveCompareStep(null);
    setCounter(0);
  };
  const filteredPeriod = period.filter(
    (item) =>
      item.step == componentStep ||
      (item.step == ESteps.season && componentStep == ESteps.month)
  );
  const switchHandler = () => {
    setStep(filteredPeriod[0].step);
    setDate(filteredPeriod[0].value);
    setZone(filteredPeriod[0].timeZone);
    setActiveCompareStep(null);
    setCounter(0);
  };

  return (
    <>
      {filteredPeriod.map((item, index) => {
        const active = date.from == item.value.from && date.to == item.value.to;
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
            className={`relative flex flex-col items-start w-full h-fit ${periodClassName}`}
            dir={locale == "fa" ? "rtl" : "ltr"}
          >
            <div style={{ color: active ? accentColor : tertiaryColor }}>
              {item.title}
            </div>
            <div
              className="text-xs"
              style={{
                color: active ? neutralColor : tertiaryColor,
              }}
            >
              {stringDateFrom}
              {componentStep !== ESteps.day && <> - {stringDateTo}</>}
            </div>
            {active && (
              <span
                className={` absolute top-[50%] ${
                  locale == "en" ? "right-5" : "left-5"
                }`}
              >
                <TickIcon accentColor={accentColor} />
              </span>
            )}
            {index < filteredPeriod.length - 1 && (
              <div
                style={{ backgroundColor: highlightColor }}
                className="m-0 w-px h-full"
              />
            )}
          </button>
        );
      })}

      {isShowComparison && (
        <Comparison {...props} switchHandler={switchHandler} />
      )}
    </>
  );
}

export default PeriodList;
