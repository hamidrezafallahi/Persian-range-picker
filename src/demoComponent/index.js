import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DatePicker, Mask, RangePicker, TimePicker } from "../range";
export default function DemoComponent() {
    return (_jsxs("div", { children: [_jsx(RangePicker
            // isTodaySelectPreset
            , { 
                // isTodaySelectPreset
                calendarType: "shamsi", onChange: (e) => {
                    console.log("RangePicker has changed", e);
                }, exportType: "timeStamp" }), _jsx(DatePicker
            // disabled
            , { 
                // disabled
                showTime: true, showSecond: true, showMask: true, isTodaySelectPreset: true, onChange: (e) => {
                    console.log(e);
                }, calendarType: "shamsi", 
                // isOpenDropdown
                exportType: "timeStamp" }), _jsx(TimePicker
            // disabled
            , { 
                // disabled
                onChange: (e) => {
                    console.log(e);
                }, showSecond: true }), _jsx(Mask, { disabled: true, 
                // isTodaySelectPreset
                onMaskChange: (e) => {
                    console.log("mask has changed", e);
                }, exportType: "timeStamp" })] }));
}
