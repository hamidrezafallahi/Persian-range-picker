import { type ReactNode, useState } from "react";

import dateP from "../assets/images/dateP.png";
import maskP from "../assets/images/maskP.png";
import rangePic from "../assets/images/rangeP.png";
import timeP from "../assets/images/timeP.png";
import useR from "../assets/images/useR.png";
import useR1 from "../assets/images/useR1.png";
import useR2 from "../assets/images/useR2.png";
import dateVid from "../assets/video/Date.mp4";
import MaskVid from "../assets/video/mask.mp4";
import rangeVid from "../assets/video/range1.mp4";
import Time from "../assets/video/time.mp4";
import { DatePicker, RangePicker, TimePicker } from "../range";
import { Mask } from "../range/exportComponents/mask";

const SECTION_KEYS = [
  "Range",
  "Date",
  "Mask",
  "timepicker",
  "rendersideHook",
] as const;
type SectionKey = (typeof SECTION_KEYS)[number];
type SectionContent = {
  title: string;
  desc: string;
  image?: string;
  image1?: string;
  image2?: string;
  video?: string;
  component?: ReactNode;
};

type LanguageText = {
  sections: Record<SectionKey, SectionContent> & {
    image: string;
    content: string;
  };
};

const TEXT: Record<"fa" | "en", LanguageText> = {
  fa: {
    sections: {
      content: "محتوا را از فهرست انتخاب کنید.",
      image: "تصویر",
      Range: {
        title: "محدوده زمانی",
        desc: "محدوده زمانی ابزاری است که به شما اجازه می‌دهد یک بازه از تاریخ‌ها یا زمان‌ها را برای عملیات فیلتر، گزارش‌گیری یا تنظیمات انتخاب کنید. این ابزار مخصوصاً برای فرم‌ها یا صفحه‌های گزارش بسیار کاربردی است.",
        video: rangeVid,
        image: rangePic,
        component: (
          <RangePicker
            calendarType="shamsi"
            onChange={(e) => console.log("RangePicker has changed", e)}
            exportType="timeStamp"
            showComparison
          />
        ),
      },
      Date: {
        title: "تاریخ ",
        desc: "این انتخابگر تاریخ طراحی شده تا به ساده‌ترین شکل ممکن تاریخ‌ها را در قالب شمسی یا میلادی انتخاب کنید. پشتیبانی از زمان و ثانیه نیز به شما دقت بیشتری در انتخاب می‌دهد.",
        image: dateP,
        video: dateVid,
        component: (
          <DatePicker
            showTime
            showSecond
            isTodaySelectPreset
            onChange={(e) => console.log(e)}
            calendarType="shamsi"
            exportType="timeStamp"
          />
        ),
      },
      Mask: {
        component: <Mask calendarType="shamsi" />,
        title: "ورودی تاریخ",
        desc: "ورودی تاریخ با ماسک باعث می‌شود کاربر تنها در قالب خاصی بتواند مقدار وارد کند. این قابلیت از بروز خطاهای متداول جلوگیری می‌کند و یکپارچگی داده‌ها را حفظ می‌کند.",
        video: MaskVid,
        image: maskP,
      },
      timepicker: {
        title: "انتخابگر زمان",
        desc: "این ابزار انتخاب زمان، به شما اجازه می‌دهد ساعت و دقیقه (و در صورت نیاز ثانیه) را به راحتی انتخاب کنید. مناسب برای فرم‌های رزرو، قرار ملاقات و تنظیم هشدارهاست.",
        video: Time,
        image: timeP,
        component: (
          <TimePicker
            calendarType="shamsi"
            onChange={(e) => console.log(e)}
            showSecond
          />
        ),
      },
      rendersideHook: {
        title: "هوک رندر جانبی",
        desc: ` یک هوک قدرتمند برای کنترل موقعیت عناصر مانند تولتیپ‌ها، منوها و پنجره‌های بازشو است.
ویژگی‌های کلیدی آن شامل این موارد است:
  ، مدیریت خودکار موقعیت و جابجایی هوشمندانه
  ، جلوگیری از بیرون‌زدگی محتوا از صفحه (prevent overflow)
  ، پشتیبانی از موقعیت‌های مختلف (بالا، پایین، چپ، راست و ...)
  ، امکان تعیین فاصله دلخواه (offset) و margin
 ، عملکرد سریع، سبک و بدون وابستگی به فریم‌ورک خاص`,
        image: useR,
        image1: useR1,
        image2: useR2,
      },
    },
  },
  en: {
    sections: {
      content: "choose content from the menu.",
      image: "Image",
      Range: {
        title: "Range",
        desc: "The time range tool allows you to select a range of dates or times for filtering operations, reporting, or settings. This tool is especially useful for forms or report pages.",
        video: rangeVid,
        image: rangePic,
        component: (
          <RangePicker
            calendarType="gregorian"
            onChange={(e) => console.log("RangePicker has changed", e)}
            exportType="timeStamp"
            showComparison
          />
        ),
      },
      Date: {
        title: "Date",
        desc: "This date picker is designed to let you select dates in either the Shamsi or Gregorian format in the simplest way possible. Support for time and seconds also gives you greater precision in selection.",
        image: dateP,
        video: dateVid,
        component: (
          <DatePicker
            showTime
            showSecond
            showMask
            isTodaySelectPreset
            onChange={(e) => console.log(e)}
            calendarType="gregorian"
            exportType="timeStamp"
          />
        ),
      },
      Mask: {
        component: <Mask calendarType="gregorian" />,
        title: "Mask",
        desc: "The masked date input ensures that users can only enter values in a specific format. This feature helps prevent common errors and maintains data consistency.",
        video: MaskVid,
        image: maskP,
      },
      timepicker: {
        title: "Time Picker",
        desc: "This time picker tool allows you to easily select hours and minutes (and seconds if needed). It's ideal for reservation forms, appointments, and setting reminders.",
        image: timeP,
        video: Time,
        component: (
          <TimePicker
            calendarType="gregorian"
            onChange={(e) => console.log(e)}
            showSecond
          />
        ),
      },
      rendersideHook: {
        title: "Render Side Hook",
        desc: `A powerful hook for controlling the position of elements such as tooltips, menus, and popups.

Key features include:
- Automatic position management with smart repositioning
- Prevention of content overflow from the screen
- Support for multiple positions (top, bottom, left, right, etc.)
- Customizable offset and margin
- Fast, lightweight, and framework-agnostic performance.`,
        image: useR,
        image1: useR1,
        image2: useR2,
      },
    },
  },
};

export function InitialComponent() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [activeSection, setActiveSection] = useState<SectionKey | null>(
    "Range"
  );
  const sections = TEXT[lang].sections;

  const handleLangToggle = () => {
    const newLang = lang === "fa" ? "en" : "fa";
    setLang(newLang);
    document
      .getElementById("container")
      ?.classList.toggle("rtl", newLang === "fa");
    document
      .getElementById("container")
      ?.classList.toggle("ltr", newLang === "en");
  };

  return (
    <div
      id="container"
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        direction: lang === "fa" ? "rtl" : "ltr",
        fontFamily: "sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          backgroundColor: "#1f1f1f",
          color: "#fff",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={handleLangToggle}
          style={{
            padding: "0.5rem",
            backgroundColor: "#4a90e2",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {lang === "fa" ? "English" : "فارسی"}
        </button>

        {SECTION_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            style={{
              padding: "0.6rem 0.5rem",
              backgroundColor: activeSection === key ? "#4a90e2" : "#2c2c2c",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "start",
            }}
          >
            {sections[key].title}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        {activeSection ? (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              lineHeight: 1.8,
            }}
          >
            <h2
              style={{
                fontSize: "1.75rem",
                color: "#222",
                marginBottom: "1rem",
              }}
            >
              {sections[activeSection].title}
            </h2>
            <p
              style={{
                color: "#444",
                fontSize: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              {sections[activeSection].desc}
            </p>

            {sections[activeSection].video && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <video
                  autoPlay
                  loop
                  playsInline
                  muted
                  src={sections[activeSection].video}
                  style={{
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                  }}
                />
              </div>
            )}

            {sections[activeSection].image && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <img
                  alt="preview"
                  src={sections[activeSection].image}
                  style={{
                    width: "60%",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                  }}
                />
              </div>
            )}
            {sections[activeSection].image1 && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <img
                  alt="preview"
                  src={sections[activeSection].image1}
                  style={{
                    width: "60%",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                  }}
                />
              </div>
            )}
            {sections[activeSection].image2 && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <img
                  alt="preview"
                  src={sections[activeSection].image2}
                  style={{
                    width: "60%",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                  }}
                />
              </div>
            )}

            {sections[activeSection].component && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                {sections[activeSection].component}
              </div>
            )}
          </div>
        ) : (
          <div style={{ color: "#777", fontSize: "1.2rem" }}>
            {sections.content}
          </div>
        )}
      </div>
    </div>
  );
}
