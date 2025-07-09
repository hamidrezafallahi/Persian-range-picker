import { jsx as _jsx } from "react/jsx-runtime";
export const LeftChevron = ({ secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه   - متن #585858
 }) => {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: _jsx("path", { d: "M14 16L10 12L14 8", stroke: `${secondaryColor}`, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};
