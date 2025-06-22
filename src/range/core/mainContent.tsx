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
    locale = "fa",
    setStep,
    setZone,
    setActiveCompareStep,
    setCompareDate,
    setCounter,
    setCustomData,
    setType,
    activeTable = "manual"
  } = props;
  const [activeTab, setActiveTab] = useState<string>(activeTable);
  const handleTabChange = (key: ITab["key"]) => {
    setActiveTab(key);
    setTabKey(key);
  };
  const handleChange = (key: ITab["key"], value: unknown) => {
    const defaultKeys = ["day", "week", "month", "season", "year", "manual"];
    if (!defaultKeys.includes(key.toLowerCase())) {
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
      className={"flex flex-col xs:flex-row p-1 xs:h-full"}
    >
      <div
        className={` flex xs:flex-col border-b   p-1 w-full xs:overflow-y-auto xs:w-28  justify-around gap-9 p-2  max-w-[430px] xs:h-10 overflow-x-auto"
    }
    ${locale !== "fa" ? "xs:border-r" : "xs:border-l"}
    ${tabClassName}
  `.trim()}
      >
        {tabs.map((tab) => (
          <button
            style={{
              color: activeTab === tab.key ? accentColor : "",
              // border: activeTab === tab.key ? accentColor : "",
            }}
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`${periodListClassName} font-medium text-right text-nowrap text-sm 
            ${
              activeTab === tab.key
                ? locale == "fa"
                  ? "border-b-2  xs:border-r-2 "
                  : "border-b-2  xs:border-l-2 "
                : "  text-gray-500 hover:text-gray-700"
            }
            flex justify-center xs:justify-start xs:gap-3 items-center
            
            `}
          >
            {tab.label}
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
