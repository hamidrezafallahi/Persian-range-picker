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
        onChange={(e) => {
          console.log(e);
        }}
        exportType="timeStamp"
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
        renderDayContent={({ day, isSpecial }) => (
          <>
            <span
              style={{
                color: isSpecial ? "red" : "black",
                fontWeight: isSpecial ? "bold" : "normal",
              }}
            >
              {day}
            </span>
          </>
        )}
      />

      <Range
              onChange={(e) => {
          console.log(e);
        }}
                onCompareDateChange={(e) => {
          console.log(e);
        }}
      />
      <DatePicker

        onChange={(e) => {
          console.log(e);
        }}
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
        renderDayContent={({ day, isSpecial }) => (
          <>
            <span
              style={{
                color: isSpecial ? "red" : "black",
                fontWeight: isSpecial ? "bold" : "normal",
              }}
            >
              {day}
            </span>
          </>
        )}
      />
      <TimePicker 
              onChange={(e) => {
          console.log(e);
        }} />
      <RangePicker
              onChange={(e) => {
          console.log(e);
        }}
      />
      <Mask
      allowClear
      // calendarType='gregorian'
              onMaskChange={(e) => {
          console.log(e);
        }}
      />
    </>
  );
}
