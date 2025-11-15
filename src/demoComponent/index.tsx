import { useState } from 'react';

import { Calendar } from '../range';

export default function DemoComponent() {
  const [val, setVal] = useState<any>();
  const time = 1762893000000;
  return (
    <>
      <button
        onClick={() => {
          setVal(1762893000000);
        }}
      >
        set null
      </button>
      <button
        onClick={() => {
          setVal(1762633800000);
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
        // placeHolder={false}
        // icon ={false}
      /> */}
      {/* <DesktopDatePicker

// locale='en'
        onChange={(e) => {
          setVal(e);
          console.log(e,"e");
        }}
              // placeHolder={false}
        // icon ={false}
        defaultValue={time}
        value={val}
        showMask
                // placeholder={false}

      /> */}
      {/* <TimePicker 
      //  exportType='timeStamp'
      placeholder="عباس"
           onChange={(e) => {
          setVal(e);
          console.log(e,"TimePicker");
        }}
        defaultValue={time}

        value={val}
        
        /> */}
      {/* <Mask
        defaultValue={time}
        value={val}
      
      allowClear
      // calendarType='gregorian'
              onMaskChange={(e) => {
                setVal(e);
          console.log(e);
        }} 
      /> */}
      <Calendar
        model="range"
        // disablePreviousDays

        defaultValue={time}
        locale="fa"
        value={val}
        onChange={(e: any) => {
          console.log(e);
          setVal(e);
        }}
        exportType="timeStamp"
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
        onWeekdaySelect={(e) => {
          console.log(e);
        }}
        renderDayContent={({ day, isSpecial, isColSelected }) => (
          <>
            <span
              style={{
                color: isSpecial ? "red" : isColSelected ? "green" : undefined,
                fontWeight: isSpecial ? "bold" : "normal",
              }}
            >
              {day}
            </span>
          </>
        )}
        renderColContent={({ name, isSelectedCol }) => (
          <span
            style={{
              color: isSelectedCol ? "green" : undefined,
              background: isSelectedCol ? "#767676" : undefined,
              width: "24px",
              height: "24px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {name}
          </span>
        )}
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
