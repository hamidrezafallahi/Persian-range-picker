import {
  DatePicker,
  Mask,
  RangePicker,
  TimePicker,
  useRenderPosition,
} from "../range";
import style from "../main.module.css";
import { useRef, useState } from "react";
export default function DemoComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  useRenderPosition({ popupRef, buttonRef, isOpen, setIsOpen });
  return (
    <div className={style.bg_red_100} dir="rtl">
      <RangePicker
        // isTodaySelectPreset
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
      />
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        test dropdown
      </button>
      {isOpen && <div ref={popupRef}>dropdown area</div>}
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
          // showMask
          // isTodaySelectPreset
          onChange={(e) => {
            console.log(e);
          }}
          calendarType="shamsi"
          // isOpenDropdown
        />
      </div>
      {/* </div> */}
      <TimePicker
        disabled
        onChange={(e) => {
          console.log(e);
        }}
        // showSecond
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
