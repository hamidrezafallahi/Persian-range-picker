import React, {
  cloneElement,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";
import style from "../../main.module.css";
import Manual from "./manual";
import PeriodList from "./periodList";
import { ESteps, type IBaseProps, type ITime } from "./type";

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
    activeTable = "manual",
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
      className={`${style.flex} ${style.flex_col} ${style.xs_flex_row} ${style.p_1} ${style.xs_h_full}`}
    >
      <div
        className={`${style.flex} ${style.xs_flex_col} ${style.border_b} ${
          style.xs_w_28
        }
 ${style.w_full} ${style.xs_overflow_y_auto}
        ${style.xs_h_full} ${style.justify_around} ${style.gap_2} ${style.p_2}  
        ${style.overflow_x_auto} 
              ${locale !== "fa" ? style.xs_border_r : style.xs_border_l}
      ${tabClassName}
        `}
        style={{ maxWidth: "430px" }}
      >
        {tabs.map((tab) => (
          <button
            style={{
              color: activeTab === tab.key ? accentColor : "",
              // border: activeTab === tab.key ? accentColor : "",
            }}
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            type="button"
            className={`
              ${periodListClassName} 
              ${style.font_medium} ${style.text_right} ${style.text_nowrap} ${
              style.text_sm
            } 
              ${
                activeTab === tab.key
                  ? locale === "fa"
                    ? `${style.border_b_2} ${style.xs_border_r_2}`
                    : `${style.border_b_2} ${style.xs_border_l_2}`
                  : `${style.text_gray_500} ${style.hover_text_gray_700}`
              }
              ${style.flex} ${style.justify_center} ${style.xs_justify_start} ${
              style.xs_gap_3
            } ${style.items_center}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={`
  ${style.flex} 
  ${style.flex_col} 
  ${style.gap_4} 
  ${style.p_2} 
  ${style.w_full} 
  ${style.overflow_y_auto}
`}
        style={{ height: "calc(100% - 52px)" }}
      >
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
