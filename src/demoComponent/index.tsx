import { DatePicker, Mask, RangePicker, TimePicker } from "../range";
import style from "../main.module.css";
export default function DemoComponent() {
  return (
    <div className={style.bg_red_100} dir="ltr">
      <RangePicker
        // isTodaySelectPreset
        className={`${style.bg_red_400} `}
        calendarType="shamsi"
        model="date"
        onChange={(e) => {
          console.log("RangePicker has changed", e);
        }}
        // primaryColor="#000"
        // tertiaryColor="#00f"
        // showComparison
        showMask
      />
      <div className={`${style.bg_red_400}`} style={{ height: "1000px" }}>
        height
      </div>

      <div className={`${style.flex}`}>
        <div className={`${style.bg_red_400}`} style={{ width: "500px" }}>
          test
        </div>
        <DatePicker
          // disabled
          showTime
          showSecond
          // showMask
          // className="!w-full"
          // isTodaySelectPreset
          onChange={(e) => {
            console.log(e);
          }}
          calendarType="shamsi"
          // isOpenDropdown
        />
      </div>
      <TimePicker
        // disabled
        onChange={(e) => {
          console.log(e);
        }}
        showSecond
        // exportType="timeStamp"
      />

      <Mask
        // disabled
        // isTodaySelectPreset
        onMaskChange={(e) => {
          console.log("mask has changed", e);
        }}
        // exportType="timeStamp"
      />
    </div>
  );
}
