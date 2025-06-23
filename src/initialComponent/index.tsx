import { useState } from "react";

import Capture from "../../public/images/Capture.png";
import DateMask from "../../public/images/DateMask.png";
import DesctopDatePicker from "../../public/images/DesctopDatePicker.png";
import DesctopRangePicker from "../../public/images/DesctopRangePicker.png";
import MobileDatePickerImage from "../../public/images/MobileDatePickerImage.png";
import TimePicker from "../../public/images/TimePicker.png";

const TEXT = {
  fa: {
    sections: {
      content: "محتوا",
      image: "تصویر",
      mobileRange: {
        title: "محدوده موبایل",
        desc: "در این بخش، می‌توان محدوده‌ای از تاریخ‌ها را برای نمایش در موبایل انتخاب کرد.",
        image: Capture,
      },
      mobileDate: {
        title: "تاریخ موبایل",
        desc: "تاریخ موبایل برای انتخاب آسان تاریخ در دستگاه‌های همراه طراحی شده.",
        image: MobileDatePickerImage,
      },
      dateMask: {
        title: "ماسک تاریخ",
        desc: "ماسک تاریخ به شما امکان می‌دهد فرمت ورودی تاریخ را محدود کنید.",
        image: DateMask,
      },
      timepicker: {
        title: "انتخابگر زمان",
        desc: "ابزاری برای انتخاب زمان با دقت بالا.",
        image: TimePicker,
      },
      rendersideHook: {
        title: "هوک رندر جانبی",
        desc: "این بخش هوک‌هایی برای رندر کردن مقادیر جانبی را نشان می‌دهد.",
        image: "/images/rendersideHook-fa.png",
      },
      dynamicRange: {
        title: "محدوده داینامیک",
        desc: "محدوده‌ای که با توجه به داده‌های زنده تغییر می‌کند.",
        image: "/images/dynamicRange-fa.png",
      },
      desktopRange: {
        title: "محدوده دسکتاپ",
        desc: "محدوده تاریخ برای کاربران دسکتاپ.",
        image: DesctopRangePicker,
      },
      desktopDate: {
        title: "تاریخ دسکتاپ",
        desc: "تاریخ‌نگار ساده برای دسکتاپ.",
        image: DesctopDatePicker,
      },
    },
  },
  en: {
    sections: {
      image: "image",
      content: "content",
      mobileRange: {
        title: "Mobile Range",
        desc: "This section allows selecting a range of dates for mobile display.",
        image: Capture,
      },
      mobileDate: {
        title: "Mobile Date",
        desc: "Mobile date picker designed for mobile devices.",
        image: MobileDatePickerImage,
      },
      dateMask: {
        title: "Date Mask",
        desc: "Date mask restricts the input format of dates.",
        image: DateMask,
      },
      timepicker: {
        title: "Time Picker",
        desc: "A tool to accurately pick time values.",
        image: TimePicker,
      },
      rendersideHook: {
        title: "Render Side Hook",
        desc: "Demonstrates hooks for rendering side data.",
        image: "/images/rendersideHook-en.png",
      },
      dynamicRange: {
        title: "Dynamic Range",
        desc: "Range that adapts based on live data.",
        image: "/images/dynamicRange-en.png",
      },
      desktopRange: {
        title: "Desktop Range",
        desc: "Date range selection for desktop users.",
        image: DesctopRangePicker,
      },
      desktopDate: {
        title: "Desktop Date",
        desc: "Simple date picker for desktop.",
        image: DesctopDatePicker,
      },
    },
  },
};
const SECTION_KEYS = [
  "mobileRange",
  "mobileDate",
  "dateMask",
  "timepicker",
  "rendersideHook",
  "dynamicRange",
  "desktopRange",
  "desktopDate",
] as const;

export function InitialComponent() {
  const [language, setLanguage] = useState<"fa" | "en">("fa");
  const [activeKey, setActiveKey] = useState<string>("");

  const handleSectionClick = (key: string) => {
    setActiveKey((prev) => (prev === key ? "" : key));
    setTimeout(() => {
      const section = document.getElementById(key);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fa" ? "en" : "fa"));
  };

  const t = TEXT[language];

  return (
    <div
      id="container"
      style={{
        background: "#1d1f30",
        direction: language === "fa" ? "rtl" : "ltr",
        textAlign: language === "fa" ? "right" : "left",
        position: "relative",
      }}
    >
      <div className="persianRangeHeader">
        <div className="flex justify-around items-center">
          <button className="lanButton" onClick={toggleLanguage}>
            {language}
          </button>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              margin: "16px 0",
            }}
          >
            {SECTION_KEYS.map((key) => (
              <button
                key={key}
                className={`buttonStyle ${activeKey === key ? "active" : ""}`}
                onClick={() => handleSectionClick(key)}
              >
                {t.sections[key].title}
              </button>
            ))}
          </div>
        </div>

        <div className="displayCard">
          <div> {t.sections.image}</div>
          <div>{t.sections.content} </div>
        </div>
      </div>
      {SECTION_KEYS.map((key) => (
        <div className="scopeTitle" key={key} id={key}>
          <h2
            className="titleDescStyle"
            onClick={() => handleSectionClick(key)}
          >
            {t.sections[key].title}
          </h2>

          {activeKey === key && (
            <div className="sectionContent">
              <img
                src={t.sections[key].image}
                alt={t.sections[key].title}
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
              <p className="titleDescStyle">{t.sections[key].desc}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
