import { DatePicker, Mask, RangePicker, TimePicker } from "../range";

export default function DemoComponent() {
  return (
    <>
      <RangePicker
        model="date"
        disabled
        showMask
        isTodaySelectPreset
        calendarType="shamsi"
        onChange={(e) => {
          console.log("RangePicker has changed", e);
        }}
        exportType="timeStamp"
      />
      <DatePicker
        disabled
        showTime
        showSecond
        showMask
        isTodaySelectPreset
        onChange={(e) => {
          console.log(e);
        }}
        calendarType="shamsi"
        // isOpenDropdown
        exportType="timeStamp"
      />
      <TimePicker
        disabled
        onChange={(e) => {
          console.log(e);
        }}
        exportType="timeStamp"
      />
      <Mask
        disabled
        // isTodaySelectPreset
        onMaskChange={(e) => {
          console.log("mask has changed", e);
        }}
        exportType="timeStamp"
      />
    </>
  );
}
