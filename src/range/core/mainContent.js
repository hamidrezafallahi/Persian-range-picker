import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { cloneElement, useState, } from 'react';
import Manual from './manual';
import PeriodList from './periodList';
import { ESteps, } from './type';
const MainContent = ({ ...props }) => {
    const { setTabKey, additionalElement = [], periodListClassName, tabClassName, accentColor = "#2563eb", locale = "fa", setStep, setZone, setActiveCompareStep, setCompareDate, setCounter, setCustomData, setType, activeTable = "manual", } = props;
    const [activeTab, setActiveTab] = useState(activeTable);
    const handleTabChange = (key) => {
        setActiveTab(key);
        setTabKey(key);
    };
    const handleChange = (key, value) => {
        const defaultKeys = ["day", "week", "month", "season", "year", "manual"];
        if (!defaultKeys.includes(key.toLowerCase())) {
            setActiveCompareStep(null);
            setCompareDate(null);
            setCounter(0);
            setStep(ESteps[key]);
            setZone(key);
            setStep(ESteps.custom);
            setCustomData(value);
            setType?.(key);
        }
    };
    const tabs = [
        {
            key: "Day",
            label: locale == "fa" ? "روز" : "day",
            content: _jsx(PeriodList, { ...props, componentStep: ESteps.day }),
        },
        {
            key: "Week",
            label: locale == "fa" ? "هفته" : "week",
            content: _jsx(PeriodList, { ...props, componentStep: ESteps.week }),
        },
        {
            key: "Month",
            label: locale == "fa" ? "ماه" : "month",
            content: _jsx(PeriodList, { ...props, componentStep: ESteps.month }),
        },
        {
            key: "Year",
            label: locale == "fa" ? "سال" : "year",
            content: _jsx(PeriodList, { ...props, componentStep: ESteps.year }),
        },
        {
            key: "manual",
            label: locale == "fa" ? "دستی" : "manual",
            content: _jsx(Manual, { ...props, componentStep: ESteps.manual }),
        },
        ...additionalElement,
    ];
    const currentTab = tabs.find((tab) => tab.key === activeTab);
    return (_jsxs("div", { dir: locale == "fa" ? "rtl" : "ltr", className: "flex flex-col xs:flex-row p-1 xs:h-full", children: [_jsx("div", { className: `
      flex xs:flex-col border-b w-full 
      xs:overflow-y-auto xs:w-28 xs:h-full
      justify-around gap-2 p-2 max-w-[430px] 
      overflow-x-auto
      ${locale !== "fa" ? "xs:border-r" : "xs:border-l"}
      ${tabClassName}
    `.trim(), children: tabs.map((tab) => (_jsx("button", { style: {
                        color: activeTab === tab.key ? accentColor : "",
                        // border: activeTab === tab.key ? accentColor : "",
                    }, onClick: () => handleTabChange(tab.key), className: `${periodListClassName} font-medium text-right text-nowrap text-sm 
            ${activeTab === tab.key
                        ? locale == "fa"
                            ? "border-b-2  xs:border-r-2 "
                            : "border-b-2  xs:border-l-2 "
                        : "  text-gray-500 hover:text-gray-700"}
            flex justify-center xs:justify-start xs:gap-3 items-center
            
            `, children: tab.label }, tab.key))) }), _jsx("div", { className: "flex flex-col gap-4 p-2 w-full !h-[calc(100%-52px)] overflow-y-auto", children: currentTab &&
                    (() => {
                        return cloneElement(currentTab.content, {
                            onChange: (value) => handleChange(currentTab.key, value),
                        });
                    })() })] }));
};
export default MainContent;
