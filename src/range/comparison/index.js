import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
// import { CustomSwitch } from "@components/atoms/defaultElements";
import { stepToTimeIndex, time } from "../core/helper";
import { ESteps } from "../core/type";
import CompareList from "./CompareList";
import CustomSwitch from "./customSwitch/customSwitch";
import ManualCompare from "./manualCompare";
function Comparison({ ...props }) {
    const { locale, step, componentStep = 366, setActiveCompareStep, primaryColor = "#000", switchHandler, } = props;
    const [showCompare, setShowCompare] = useState(false);
    const handleShowCompare = () => {
        setShowCompare(!showCompare);
        if (showCompare) {
            setActiveCompareStep(366);
        }
        else {
            switchHandler();
        }
    };
    useEffect(() => {
        const flag = time[stepToTimeIndex[componentStep]].toLowerCase() ==
            time[stepToTimeIndex[step]].toLowerCase();
        setShowCompare(flag);
    }, [step, componentStep]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between w-full", children: [_jsx("div", { style: { color: primaryColor }, dir: locale == "fa" ? "rtl" : "ltr", children: locale == "fa" ? "مقایسه" : "Compare" }), _jsx(CustomSwitch, { checked: showCompare, onChange: handleShowCompare })] }), showCompare && (_jsx(_Fragment, { children: step == ESteps.manual ? (_jsx(ManualCompare, { ...props })) : (_jsx(CompareList, { ...props })) }))] }));
}
export default Comparison;
