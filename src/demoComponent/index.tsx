import { DatePicker, Mask, RangePicker, TimePicker } from "../range";

export default function DemoComponent() {
  return (
    <>
      <RangePicker calendarType="shamsi" model="date" showMask />

      <DatePicker
        showTime
        onChange={(e) => {
          console.log(e);
        }}
        calendarType="shamsi"
        isOpenDropdown
      />
      <TimePicker />
      <Mask
        onMaskChange={(e) => {
          console.log("mask has changed", e);
        }}
      />
    </>
  );
}
