import React, {
  cloneElement,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";

import Manual from "./manual";
import PeriodList from "./periodList";
import { type IBaseProps, ESteps, type ITime } from "./type";
interface IProps extends IBaseProps {
  setCustomData: Dispatch<SetStateAction<unknown>>;
}
interface ITab {
  key: ITime;
  label: string;
  content: ReactNode;
}

const MainContent = ({ ...props }: IProps) => {
  const {
    setTabKey,
    additionalElement = [],
    periodListClassName,
    tabClassName,
    accentColor = "#2563eb",
    locale,
    setStep,
    setZone,
    setActiveCompareStep,
    setCompareDate,
    setCounter,
    setCustomData,
    setType,
  } = props;
  const [activeTab, setActiveTab] = useState<string>("manual");
  const handleTabChange = (key: ITab["key"]) => {
    setActiveTab(key);
    setTabKey(key);
  };
  const handleChange = (key: ITab["key"], value: unknown) => {
    const defaultKeys = ["day", "week", "month", "season", "year", "manual"];
    if (!defaultKeys.includes(key)) {
      setActiveCompareStep(null);
      setCompareDate(null);
      setCounter(0);
      setStep(ESteps[key as keyof typeof ESteps]);
      setZone(key);
      setStep(ESteps.custom);
      setCustomData(value);
      setType?.(key);
    }
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
  const currentTab = tabs.find((tab) => tab.key === activeTab);
  return (
    <div
      dir={locale == "fa" ? "rtl" : "ltr"}
      className={`flex flex-col xs:!flex-row xs:h-full `}
    >
      <div
        className={`flex justify-around  xs:flex-col  xs:gap-9 p-2  border-gray-300 !border-b xs:!border-b-0 ${
          locale == "fa" ? "xs:!border-l" : "xs:!border-r"
        } xs:w-28  h-10 xs:!h-[calc(100%-52px)] xs:overflow-y-auto overflow-x-auto ${tabClassName} `}
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
        {currentTab &&
          (() => {
            return cloneElement(
              currentTab.content as React.ReactElement<{
                onChange: (value: unknown) => void;
              }>,
              {
                onChange: (value: unknown) =>
                  handleChange(currentTab.key, value),
              }
            );
          })()}
      </div>
    </div>
  );
};

export default MainContent;
