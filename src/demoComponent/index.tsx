import { useState } from 'react';

import {
  Calendar,
  Mask,
  RangePicker,
  TimePicker,
} from '../range';
import { DesktopDatePicker } from '../range/desktopDate/desktopDatePicker';
import { MobileDate } from '../range/mobileDate/mobileDatePicker';

export default function DemoComponent() {
  const [val, setVal] = useState<any>(undefined);
  const time = new Date(1764444444444).valueOf();
  return (
    <>
      <button
        onClick={() => {
          setVal(null);
        }}
      >
        set null
      </button>
      <MobileDate
      showTime
        onChange={(e) => {
          setVal(e);
          console.log(e);
        }}
        defaultValue={time}
        value={val}
      />
      <DesktopDatePicker
        onChange={(e) => {
          setVal(e);
          console.log(e,"e");
        }}
        defaultValue={time}
        value={val}
        showMask
      />
      <Calendar
        //  model='range'
        defaultValue={{ from: time, to: 0 }}
        value={{ from: val, to: 0 }}
        onChange={(e) => {
          console.log(e);
          setVal(e);
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

      {/*<Range
              onChange={(e) => {
          console.log(e);
        }}
                onCompareDateChange={(e) => {
          console.log(e);
        }}
        value={val}
        defaultValue={{from:time,to:NaN}}
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
      />*/}
      <TimePicker 
           onChange={(e) => {
          setVal(e);
          console.log(e,"TimePicker");
        }}
        defaultValue={time}
        value={val}
        
        />
      <RangePicker
              onChange={(e) => {
          console.log(e);
        }}
      />
      <Mask
        defaultValue={time}
        value={val}
      
      allowClear
      // calendarType='gregorian'
              onMaskChange={(e) => {
                setVal(e);
          console.log(e);
        }}
      /> 
    </>
  );
}
