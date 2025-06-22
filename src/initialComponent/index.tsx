import { useState } from "react";
import {
  DateMask,
  DesktopDate,
  DesktopRange,
  MobileDate,
  MobileRange,
  Range,
  TimePicker,
} from "../range";
import type { IDate } from "../range/core/type";

export function InitialComponent() {
  //check export types and elements
  const [language, setLanguage] = useState<"fa" | "en">("fa");
  const handleDateChange = (w) => {
    console.log(w);
  };

  const handleCompareDateChange = (w) => {
    console.log(w);
  };

  const handleNavigateChange = (w) => {
    console.log(w);
  };

  const HandleSubmitDate = (w) => {
    console.log(w);
  };
  const resetDate = () => {
    console.log("Reject");
  };
  const device =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "desktop";

  const handleLanguage = () => {
    // setLanguage(language == "fa" ? "en" : "fa");
    const container = document.getElementById("container");
    const langText = document.getElementById("langText");
    const dir = container?.getAttribute("direction");
    console.log(container, dir);
    if (dir == "rtl") {
      container?.setAttribute("direction", "ltr");
      langText?.setAttribute("textContent","Language")
      // langText?.innerText = "Language";
    } else {
      container?.setAttribute("direction", "rtl");
            langText?.setAttribute("children","زبان")

      // langText?.setAttribute("textContent","tesr")   ;
    }
    console.log(langText?.innerText)
  };
  return (
    <div id="container" style={{ background: "#f9f9f9" }} dir="rtl">
      <div className="persianRangeHeader">
        <div>
          <span id="langText">temp</span>
          <button onClick={handleLanguage}>{language}</button>
        </div>
        <div>description</div>
        <div>
          <button>dynamic Range</button>
          <button>desktop range</button>
          <button>desktop date</button>
          <button>mobile range</button>
          <button>mobile date</button>
          <button>date mask</button>
          <button>timepicker</button>
          <button>renderside hook</button>
        </div>
      </div>
      <div className="displayCard">
        <div>image</div>
        <div>content</div>
      </div>
      {/* <Range
      isOpenDropdown
        device={device}
        locale={"fa"}
        model={"range"}
        onCompareDateChange={handleCompareDateChange}
        onChange={handleDateChange}
        onNavigateChange={handleNavigateChange}
        handleSubmit={HandleSubmitDate}
        handleReject={resetDate}
        showComparison
      /> */}
      {/* <div className="flex flex-col" dir="rtl">
        <DesktopRange onChange={handleDateChange} />
        <MobileDate 
        onChange={handleDateChange}                                           //fix type of properties of this 
        model="date"
        locale="fa"
        showTime
       />
        <MobileRange onChange={handleDateChange} />
        <DateMask onChange={handleDateChange} />
      </div> */}
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
      {/* <TimePicker
          defaultValue={1750242875918}
          onChange={(e) => {
            console.log(
              e,
              new Date(e).toLocaleDateString("fa-IR", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })
            );
          }}
        /> */}
      {/* <DesktopDate
          defaultValue={new Date(1750242875918) }
          showTime
          onChange={(e) => {
            console.log(
              new Date(e).toLocaleDateString("fa-IR", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })
            );
          }}
        /> */}
      {/* </div> */}
    </div>
  );
}
