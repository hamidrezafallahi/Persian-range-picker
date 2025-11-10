import { useState } from 'react';

import {
  Calendar,
  RangePicker,
} from '../range';
import { IDate } from '../range/core/type';

export default function DemoComponent() {
  const [val, setVal] = useState<IDate>();
  const time = { from: 1761337800000, to: 1763584199999 };
  return (
    <>
      <button
        onClick={() => {
          setVal({ from: NaN, to: NaN });
        }}
      >
        set null
      </button>
      <button
        onClick={() => {
          setVal({ from: 1762201800000, to: 1762892999999 });
        }}
      >
        set rand
      </button>
      {/* <MobileDate
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
      />*/}
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
      {/* <TimePicker 
           onChange={(e) => {
          setVal(e);
          console.log(e,"TimePicker");
        }}
        defaultValue={time}
        value={val}
        
        /> */}
      <RangePicker
        defaultValue={time}
        value={val}
        onChange={(e) => {
          console.log(e);
        }}
        onCompareDateChange={(e) => {
          console.log(e);
        }}
      />
      {/* <Mask
        defaultValue={time}
        value={val}
      
      allowClear
      // calendarType='gregorian'
              onMaskChange={(e) => {
                setVal(e);
          console.log(e);
        }}
      />  */}
    </>
  );
}
