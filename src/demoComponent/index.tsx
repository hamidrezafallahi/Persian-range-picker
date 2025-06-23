import {
  DateMask,
  DesktopDate,
  DesktopRange,
  MobileDate,
  MobileRange,
  Range,
  TimePicker,
} from "../range";

export default function DemoComponent() {
  return (
    <>
      <div dir="rtl">
        <Range />
        <DesktopDate />
        <DesktopRange />
        <MobileDate />
        <MobileRange />
        <TimePicker />
        <DateMask />
      </div>
    </>
  );
}
