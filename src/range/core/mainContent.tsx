import {
  type ReactNode,
  useState,
} from 'react';

import Manual from './manual';
import PeriodList from './periodList';
import type {
  IBaseProps,
  ITime,
} from './type';
import { ESteps } from './type';

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
    locale,
    device,
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
  console.log(device);
  return (
    <div
      dir={locale == "fa" ? "rtl" : "ltr"}
      className={device == "desktop" ? " flex h-full" : " flex flex-col"}
    >
      <div
        className={`
    ${
      device === "desktop"
        ? "flex flex-col justify-between !border-b-0  w-28 !h-[calc(100%-52px)] overflow-y-auto"
        : " flex justify-around gap-9 p-2 !border-b  max-w-[430px] h-10 overflow-x-auto"
    }
    ${locale === "fa" && device === "desktop" ? "!border-l !border-r" : ""}
    ${tabClassName}
  `.trim()}
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
                ? device === "desktop"
                  ? "border-none"
                  : "border-b-2 "
                : "  text-gray-500 hover:text-gray-700"
            }
            ${
              device === "desktop"
                ? "flex justify-center items-center"
                : "!justify-start gap-3  "
            }
            `}
          >
            <div
              style={{
                color: activeTab === tab.key ? accentColor : "text-gray-500",
                borderColor: activeTab === tab.key ? accentColor : "",
              }}
              className={` ${device === "desktop" ? " block" : " hidden h-8 "}
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
