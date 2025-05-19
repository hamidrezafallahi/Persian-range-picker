import { useEffect } from "react";

import { period } from "../core/helper";
import type { IBaseProps, ITimeSections } from "../core/type";
import { TickIcon } from "../icons/TickIcon";

const CompareList = ({ ...props }: IBaseProps) => {
  const {
    date,
    zone,
    setActiveCompareStep,
    activeCompareStep,
    setCompareDate,
    componentStep,
    counter,
    locale = "fa",
    accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    neutralColor = "#9cc5f1", //رنگ خنثی، اغلب برای پس‌زمینه یا متن - آبی کمرنگ
  } = props;

  const timeHandler = (item: ITimeSections) => {
    setCompareDate(item.value);
    setActiveCompareStep(item.step);
  };
  const templatePeriods = period(date, locale, zone);

  const filteredPeriod = templatePeriods.filter(
    (item) =>
      componentStep &&
      item.step >= componentStep &&
      !(item.timeZone === "lastMonth" && zone === "lastThreeMonth")
  );

  useEffect(() => {
    const temp = templatePeriods.find(
      (item) => item.step == activeCompareStep
    )?.value;
    if (temp) {
      setCompareDate({ from: temp.from, to: temp.to });
    }
  }, [counter]);

  return (
    <>
      {filteredPeriod.map((item, index) => {
        const active = item.step == activeCompareStep;
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
            className={`relative  flex flex-col items-start gap-y-2 pb-2 w-full h-fit
                ${index < filteredPeriod.length - 1 && "border-b"}
                `}
            dir={locale == "fa" ? "rtl" : "ltr"}
          >
            <div style={{ color: active ? accentColor : tertiaryColor }}>
              {item.title}
            </div>
            <div
              style={{
                color: active ? neutralColor : tertiaryColor,
              }}
              className={`text-xs whitespace-nowrap overflow-hidden`}
            >
              {locale == "fa" ? " از " : "From "}
              {stringDateFrom}
              {locale == "fa" ? " تا " : "To "}
              {stringDateTo}
            </div>
            {active && (
              <span
                className={` absolute my-auto ${
                  locale == "en" ? "right-5" : "left-5"
                }`}
              >
                <TickIcon {...props} />
              </span>
            )}
          </button>
        );
      })}
    </>
  );
};
export default CompareList;
