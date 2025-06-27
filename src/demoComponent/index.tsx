import {
  DatePicker,
  RangePicker,
  TimePicker,
  Mask,
} from "../range";

export default function DemoComponent() {
  return (
    <>
      <div dir="rtl">
        <RangePicker />
        <DatePicker />
        <TimePicker />
        <Mask />
      </div>
    </>
  );
}
