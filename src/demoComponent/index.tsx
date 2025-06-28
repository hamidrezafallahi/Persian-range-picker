import { RangePicker } from '../range';

export default function DemoComponent() {
  return (
    <>
      <RangePicker calendarType="shamsi" />

      {/* <DatePicker
        showTime
        onChange={(e) => {
          console.log(e);
        }}
        calendarType="shamsi"
        isOpenDropdown
      />
      <TimePicker />
      <Mask /> */}
    </>
  );
}
