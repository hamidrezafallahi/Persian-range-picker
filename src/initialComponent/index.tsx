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
  const persianlangTitle = "زبان";
  const englishlangTitle = "Language";

  const handleLanguage = () => {
    const container = document.getElementById("container");
    const langText = document.getElementById("langText");
    const dir = container?.getAttribute("direction");
    console.log(container, dir);

    if (dir === "rtl") {
      container?.setAttribute("direction", "ltr");
      langText.textContent = persianlangTitle; // Corrected here
    } else {
      container?.setAttribute("direction", "rtl");
      langText.textContent = englishlangTitle; // Corrected here
    }

    console.log(langText?.innerText);
  };
  return (
    <div id="container" style={{ background: "#f9f9f9" }}>
      <div className="persianRangeHeader">
        <div>
          <span id="langText">temp</span>
          <button onClick={handleLanguage}>{language}</button>
        </div>
        <div>description</div>
        <button>dynamic Range</button>
        <button>desktop range</button>
        <button>desktop date</button>
        <button>mobile range</button>
        <button>mobile date</button>
        <button>date mask</button>
        <button>timepicker</button>
        <button>renderside hook</button>
      </div>
      <div className="displayCard">
        <div>image</div>
        <div>content</div>
      </div>
    </div>
  );
}
