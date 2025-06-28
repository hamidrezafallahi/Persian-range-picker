import { DatePicker, RangePicker, TimePicker, Mask } from "../range";

export default function DemoComponent() {
  return (
    <div>
      {/* <div style={{ width: "40%" }}></div> */}
      <RangePicker />
      <DatePicker />
      <TimePicker />
      <Mask />
    </div>
  );
}
