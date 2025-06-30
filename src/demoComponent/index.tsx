import { DatePicker, Mask, RangePicker, TimePicker } from "../range";

export default function DemoComponent() {
  return (
    <>
      <RangePicker calendarType="shamsi" model="date" />

      <DatePicker
        showTime
        onChange={(e) => {
          console.log(e);
        }}
        calendarType="shamsi"
        isOpenDropdown
      />
      <TimePicker />
      <Mask />
    </>
  );
}
