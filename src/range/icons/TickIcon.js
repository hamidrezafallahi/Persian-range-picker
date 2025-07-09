import { jsx as _jsx } from "react/jsx-runtime";
export const TickIcon = ({ accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
 }) => {
    return (_jsx("svg", { width: "13", height: "10", viewBox: "0 0 13 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M1 5.00041L4.53553 8.53594L11.6058 1.46484", stroke: `${accentColor}`, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};
