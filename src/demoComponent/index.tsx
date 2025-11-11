import { useState } from 'react';

import {
  Mask,
  TimePicker,
} from '../range';
import { DesktopDatePicker } from '../range/desktopDate/desktopDatePicker';
import { MobileDate } from '../range/mobileDate/mobileDatePicker';

export default function DemoComponent() {
  const [val, setVal] = useState<any>();
  const time =  1762893000000
  return (
    <>
      <button
        onClick={() => {
          setVal({from: null, to: null});
        }}
      >
        set null
      </button>
      <button
        onClick={() => {
          setVal( 1762633800000);
        }}
      >
        set rand
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
        // showMask
      />
       <TimePicker 
      //  exportType='timeStamp'
      placeHolder="عباس"
           onChange={(e) => {
          setVal(e);
          console.log(e,"TimePicker");
        }}
        defaultValue={time}
        value={val}
        
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
      {/* <Calendar
        model="range"
        // disablePreviousDays
        defaultValue={time}
        value={val}
        onChange={(e: any) => {
          console.log(e);
          setVal(e);
        }}
        exportType="timeStamp"
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
        renderDayContent={({ day, isSpecial }) => (
          <>
            <span
              style={{
                color: isSpecial ? "red" : undefined,
                fontWeight: isSpecial ? "bold" : "normal",
              }}
            >
              {day}
            </span>
          </>
        )}
      /> */}
      {/* <Calendar
        model="range"
        // disablePreviousDays
        defaultValue={time}
        value={val}
        onChange={(e: any) => {
          console.log(e);
          setVal(e);
        }}
        exportType="timeStamp"
 
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
               renderDayStyle={({ isSpecial, isSelected ,isInRange,isToday,isDisabled,}) => ({
          background: isSpecial ? "rgba(255,0,0,0.1)" : isSelected ? "#0af" :isInRange ? "rgba(33,150,243,0.2)": isToday ? "rgba(22, 187, 36, 0.98)":  isDisabled ? "rgba(255, 0, 0, 1)": "",
          borderRadius: "8px",
          width: "48px",
          height: "48px",
        })}
              renderDayContent={({ day, isSpecial }) => (
                <>
                  <span
                    style={{
                      color: isSpecial? "red":undefined,
                      fontWeight: isSpecial ? "bold" : "normal",
                      background: isSpecial ? "rgba(32, 170, 73, 1)":""

                    }}
                  >
                    {day}
                  </span>
                </>
              )}
      /> */}

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

      {/* <RangePicker
        defaultValue={time}
        value={val as IDate}
        onError={(e) => {
          console.log(e);
        }}
        onChange={(e) => {
          console.log(e);
          setVal(e.Data?.date as IDate);
        }}
        onCompareDateChange={(e) => {
          console.log(e);
        }}
      /> */}
    </>
  );
}
