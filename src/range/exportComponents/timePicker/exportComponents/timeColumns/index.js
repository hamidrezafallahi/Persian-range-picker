import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const TimeColumn = ({ count, unit, renderHeight, renderOptions }) => {
    const title = unit == "hour" ? "HH" : unit == "minute" ? "MM" : "SS";
    return (_jsxs("div", { className: "flex flex-col gap-4 px-2 overflow-x-hidden overflow-y-auto relative", style: { maxHeight: renderHeight }, children: [_jsx("div", { style: { position: "sticky", top: 0, background: "#fff", color: "#939393" }, children: title }), renderOptions(count, unit)] }));
};
export const TimeColumns = ({ renderHeight, renderOptions, showSecond, TimeColumnsClassName, }) => {
    return (_jsxs("div", { className: `flex justify-center gap-4 ${TimeColumnsClassName}`, dir: "ltr", children: [_jsx(TimeColumn, { count: 24, unit: "hour", renderHeight: renderHeight, renderOptions: renderOptions }), _jsx(TimeColumn, { count: 60, unit: "minute", renderHeight: renderHeight, renderOptions: renderOptions }), showSecond && (_jsx(TimeColumn, { count: 60, unit: "second", renderHeight: renderHeight, renderOptions: renderOptions }))] }));
};
