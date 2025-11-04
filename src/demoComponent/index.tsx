import {
  DatePicker,
  Mask,
  Range,
  TimePicker,
} from '../range';
import { Calendar } from '../range/exportComponents/Calendar';
import { RangePicker } from '../range/exportComponents/range/rangePicker';

export default function DemoComponent() {
  return (
    <>
      <div className=""></div>
      <Calendar
        onDateChange={(e) => {
          console.log(e);
        }}
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
        renderDayContent={({ day, isSpecial, locale }) => (
          <>
            <span
              style={{
                color: isSpecial ? "red" : "black",
                fontWeight: isSpecial ? "bold" : "normal",
              }}
            >
              {locale === "fa" ? day.jDate().toLocaleString("fa") : day.date()}
            </span>
          </>
        )}
      />

      <Range />
      <DatePicker
        onChange={(e) => {
          console.log(e);
        }}
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
        renderDayContent={({ day, isSpecial, locale }) => (
          <>
            <span
              style={{
                color: isSpecial ? "red" : "black",
                fontWeight: isSpecial ? "bold" : "normal",
              }}
            >
              {locale === "fa" ? day.jDate().toLocaleString("fa") : day.date()}
            </span>
          </>
        )}
      />
      <TimePicker />
      <RangePicker />
      <Mask />
    </>
  );
}
