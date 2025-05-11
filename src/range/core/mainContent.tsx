import React, { useState, type ReactNode } from "react";

import Manual from "./manual";
import PeriodList from "./periodList";
import type { IBaseProps, ITime } from "./type";
import { ESteps } from "./type";
interface ITab {
  key: ITime | string;
  label: string;
  content: ReactNode;
}
const MainContent = ({ ...props }: Omit<IBaseProps, "componentStep">) => {
  const {
    setTabKey,
    additionalElement = [],
    periodListClassName,
    tabClassName,
    accentColor = "#2563eb",
    locale, // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
  } = props;
  const [activeTab, setActiveTab] = useState<ITime | string>("manual");
  const handleTabChange = (key: ITime | string) => {
    setActiveTab(key);
    setTabKey(key);
  };

  const tabs: ITab[] = [
    {
      key: "Day",
      label: locale == "fa" ? "روز" : "day",
      content: <PeriodList {...props} componentStep={ESteps.day} />,
    },
    {
      key: "Week",
      label: locale == "fa" ? "هفته" : "week",
      content: <PeriodList {...props} componentStep={ESteps.week} />,
    },
    {
      key: "Month",
      label: locale == "fa" ? "ماه" : "month",
      content: <PeriodList {...props} componentStep={ESteps.month} />,
    },
    {
      key: "Year",
      label: locale == "fa" ? "سال" : "year",
      content: <PeriodList {...props} componentStep={ESteps.year} />,
    },
    {
      key: "manual",
      label: locale == "fa" ? "دستی" : "manual",
      content: <Manual {...props} componentStep={ESteps.manual} />,
    },
    ...additionalElement,
  ];

  return (
    <div
      dir={locale == "fa" ? "rtl" : "ltr"}
      className={`flex flex-col xs:!flex-row xs:h-full `}
    >
      <div
        className={`flex justify-around  xs:flex-col gap-9 p-2  border-gray-300 !border-b xs:!border-b-0 ${
          locale == "fa" ? "xs:!border-l" : "xs:!border-r"
        } max-w-[430px] xs:w-28  h-10 xs:!h-[calc(100%-52px)] xs:overflow-y-auto overflow-x-auto ${tabClassName} `}
      >
        {tabs.map((tab) => (
          <button
            style={{
              color: activeTab === tab.key ? accentColor : "",
              border: activeTab === tab.key ? accentColor : "",
            }}
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`${periodListClassName} font-medium text-right text-nowrap text-sm  *:
            ${
              activeTab === tab.key
                ? "border-b-2 xs:border-none"
                : "  text-gray-500 hover:text-gray-700"
            }
            flex justify-center xs:!justify-start xs:gap-3 items-center
            
            `}
          >
            <div
              style={{
                color: activeTab === tab.key ? accentColor : "text-gray-500",
                borderColor: activeTab === tab.key ? accentColor : "",
              }}
              className={`h-8  hidden xs:block
                ${
                  activeTab === tab.key
                    ? "border-r-4"
                    : "   hover:text-gray-700"
                }`}
            >
              {" "}
            </div>
            <div> {tab.label}</div>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 p-2 w-full !h-[calc(100%-52px)] overflow-y-auto">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
};

export default MainContent;
