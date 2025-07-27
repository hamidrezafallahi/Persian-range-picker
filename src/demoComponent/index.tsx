import { DatePicker, Mask, RangePicker } from "../range";
import style from "../main.module.css";
export default function DemoComponent() {
  return (
    <div className={style.bg_red_100} dir="rtl">
      <RangePicker
        isTodaySelectPreset
        className={`${style.bg_red_400} `}
        calendarType="shamsi"
        onChange={(e) => {
          console.log("RangePicker has changed", e);
        }}
        Style={{ width: "60%" }}
        // primaryColor="#000"
        // tertiaryColor="#00f"
        // showComparison
        showMask
        model="date"
        // defaultValue={{ from: new Date(), to: new Date() }}
      />

      {/* <div className={`${style.bg_red_400}`} style={{ height: "1000px" }}>
        height
      </div> */}
      {/* 
      <div className={`${style.flex}`}>
        <div className={`${style.bg_red_400}`} style={{ width: "500px" }}>
          test
        </div> */}

      <div>
        <DatePicker
          // disabled
          // showTime
          // showSecond
          showMask
          // isTodaySelectPreset
          // defaultValue={1758893693699}
          onChange={(e) => {
            console.log(e);
          }}
          calendarType="shamsi"
          // isOpenDropdown
        />
      </div>
      {/* </div> */}
      {/* <TimePicker
        disabled
        onChange={(e) => {
          console.log(e);
        }}
        // showSecond
        // exportType="timeStamp"
      /> */}

      <Mask
        // MaskFontStyle={{
        //   fontFamily: "sans-serif",
        //   fontSize: 10,
        //   color: "red",
        // }}
        // disabled
        // isTodaySelectPreset
        onMaskChange={(e) => {
          console.log("mask has changed", e);
        }}
        // exportType="timeStamp"
        // maskFontSize={}
        // maskFontFamily=""
      />
    </div>
  );
}
