import { useState } from "react";
import { DatePicker, Mask, RangePicker, TimePicker } from "../range";

export default function DemoComponent() {
  return (
    <div>
      <RangePicker
        // isTodaySelectPreset
        calendarType="shamsi"
        onChange={(e) => {
          console.log("RangePicker has changed", e);
        }}
        showComparison
      />
      <DatePicker
        // disabled
        showTime
        showSecond
        // showMask
        className="!w-full"
        isTodaySelectPreset
        onChange={(e) => {
          console.log(e);
        }}
        calendarType="shamsi"
        // isOpenDropdown
      />
      <TimePicker
        // disabled
        onChange={(e) => {
          console.log(e);
        }}
        showSecond
        // exportType="timeStamp"
      />

      <Mask
        // disabled
        // isTodaySelectPreset
        onMaskChange={(e) => {
          console.log("mask has changed", e);
        }}
        // exportType="timeStamp"
      />
    </div>
  );
}
