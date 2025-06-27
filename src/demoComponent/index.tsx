import {
  DatePicker,
  RangePicker,
  TimePicker,
  Mask,
} from "../range";

export default function DemoComponent() {
  return (
    <>
        <RangePicker  />
        <DatePicker showTime />
        <TimePicker  />
        <Mask />
    </>
  );
}
