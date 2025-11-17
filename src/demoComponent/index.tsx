import { useState } from 'react';

import { DatePicker } from '../range/exportComponents/datePicker';

export default function DemoComponent() {
  const [val, setVal] = useState<any>();
  const time = 1762893000000;
  return (
    <>
      <button
        onClick={() => {
          setVal(null);
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
      <div
      // style={{padding:"12px"}}
      >
        <DatePicker
          onChange={(e) => {
            setVal(e);
            console.log(e);
          }}
          onClear={() => {
            setVal(null);

          }}
          // calendarType='gregorian'
          defaultValue={time}
          value={val}
          showMask
          allowClear
          selectableCols
          specialDays={[1762288200000, 1763411400000]}
          disabledDays={[1763325000000, 1763497800000]}
          onWeekdaySelect={(e) => {

            console.log(e);
          }}
          // renderDayContent={({ day, isSpecial, isColSelected }) => (
          //   <>
          //     <span
          //       style={{
          //         color: isSpecial ? "red" : isColSelected ? "#fff" : undefined,
          //         fontWeight: isSpecial ? "bold" : "normal",
          //       }}
          //     >
          //       {day}
          //     </span>
          //   </>
          // )}
          renderColContent={({ name, isSelectedCol }) => (
            <span
              style={{
                color: isSelectedCol ? "#fff" : undefined,
                background: isSelectedCol ? "#767676ff" : undefined,
                minWidth: "24px",
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
          // icon ={false}
        />
      </div>
      {/* <DesktopDatePicker
        calendarType="gregorian"
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
        onWeekdaySelect={(e) => {
          console.log(e);
        }}
        renderDayContent={({ day, isSpecial, isColSelected }) => (
          <>
            <span
              style={{
                color: isSpecial ? "red" : isColSelected ? "#fff" : undefined,
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
              color: isSelectedCol ? "#fff" : undefined,
              background: isSelectedCol ? "#767676ff" : undefined,
              minWidth: "24px",
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
        onChange={(e) => {
          setVal(e);
          console.log(e, "e");
        }}
        placeholder={false}
        icon={false}
        defaultValue={time}
        value={val}
        showMask
      /> */}
      {/* <TimePicker
        exportType="timeStamp"
        onChange={(e) => {
          setVal(e);
          console.log(e, "TimePicker");
        }}
        showSecond
        defaultValue={time}
        value={val}
      /> */}
      {/* <Mask
        // defaultValue={time}
        // value={val}

        allowClear
        // calendarType='gregorian'
        onMaskChange={(e) => {
          setVal(e);
          console.log(e);
        }}
      /> */}
       {/* <div style={{ padding: "12px" }}>
        <Calendar
          model="range"
          disablePreviousDays
          // selectableCols
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
          // renderDayContent={({ day, isSpecial, isColSelected }) => (
          //   <>
          //     <span
          //       style={{
          //         color: isSpecial ? "red" : isColSelected ? "#fff" : undefined,
          //         fontWeight: isSpecial ? "bold" : "normal",
          //       }}
          //       >
          //       {day}
          //     </span>
          //   </>
          // )}
          // renderDayStyle={({ isSpecial, isSelected ,isInRange,isToday,isDisabled,}) => ({
          //   background: isSpecial ? "rgba(255,0,0,0.1)" : isSelected ? "#0af" :isInRange ? "rgba(33,150,243,0.2)": isToday ? "rgba(22, 187, 36, 0.98)":  isDisabled ? "rgba(255, 0, 0, 1)": "",
          //   borderRadius: "8px",
          //   width: "48px",
          //   height: "48px",
          // })}
          // renderColStyle={({ isSelectedCol }) => ({
          //   background: isSelectedCol ? "rgba(255,0,0,0.1)" : "",
          //   borderRadius: "8px",
          //   width: "48px",
          //   height: "48px",
          // })}
          // renderColContent={({ name, isSelectedCol }) => (
          //   <span
          //     style={{
          //       color: isSelectedCol ? "#fff" : undefined,
          //       background: isSelectedCol ? "#767676ff" : undefined,
          //       width: "24px",
          //       height: "24px",
          //       borderRadius: "8px",
          //       display: "flex",
          //       justifyContent: "center",
          //       alignItems: "center",
          //     }}
          //   >
          //     {name}
          //   </span>
          // )}
        />
      </div> */}
      {/*<Calendar
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

      {/* <RangePicker
        defaultValue={time}
        value={val as IDate}
        specialDays={[1762288200000, 1763411400000]}
        disabledDays={[1763325000000, 1763497800000]}
         calendarType='gregorian'
        onWeekdaySelect={(e) => {
          console.log(e);
        }}
        renderDayContent={({ day, isSpecial, isColSelected }) => (
          <>
            <span
              style={{
                color: isSpecial ? "red" : isColSelected ? "#fff" : undefined,
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
              color: isSelectedCol ? "#fff" : undefined,
              background: isSelectedCol ? "#767676ff" : undefined,
              minWidth: "24px",
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
