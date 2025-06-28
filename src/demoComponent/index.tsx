import {
  DatePicker,
  Mask,
  RangePicker,
  TimePicker,
} from '../range';

export default function DemoComponent() {
  return (
    <>
      <RangePicker locale="en" calendarType="shamsi" />
      <DatePicker showTime />
      <TimePicker />
      <Mask />
    </>
  );
}
