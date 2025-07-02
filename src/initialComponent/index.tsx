import { type ReactNode, useState } from "react";

import Capture from "../assets/images/Capture.png";
import DateMask from "../assets/images/Mask.png";
import MobileDate from "../assets/images/MobileDate.png";
import mobileDate2 from "../assets/images/mobileDate2.png";
import MobileDatePickerImage from "../assets/images/MobileDatePickerImage.png";
import MobileRange from "../assets/images/MobileRange.png";
import MobileRangeManual from "../assets/images/MobileRangeManual.png";
import MobileRangetaghvim from "../assets/images/MobileRangetaghvim.png";
import TimePicker from "../assets/images/TimePicker.png";
import TimePicker2 from "../assets/images/TimePicker2.png";
import TimePickerRun from "../assets/images/TimePickerRun.png";
import { Mask } from "../range/exportComponents/mask";

const SECTION_KEYS = [
  "Date",
  "Mask",
  "timepicker",
  "rendersideHook",
  "Range",
] as const;

type SectionKey = (typeof SECTION_KEYS)[number];

type SectionContent = {
  title: string;
  desc: string;
  image?: string;
  image1?: string;
  image2?: string;
  image3?: string;
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
      content: "محتوا",
      image: "تصویر",
      Range: {
        title: "محدوده زمانی",
        desc: "در این بخش، می‌توان محدوده‌ای از تاریخ‌ها را برای نمایش  انتخاب کرد.",
        image: Capture,
        image1: MobileRange,
        image2: MobileRangeManual,
      },
      Date: {
        title: "تاریخ ",
        desc: "تاریخ  برای انتخاب آسان تاریخ در دستگاه‌های مختلف طراحی شده.",
        image: MobileDatePickerImage,
        image1: MobileDate,
        image2: mobileDate2,
      },
      Mask: {
        component: <Mask />,
        title: "ورودی تاریخ",
        desc: "ورودی تاریخ به شما امکان می‌دهد فرمت ورودی تاریخ را محدود کنید.",
        image: DateMask,
      },
      timepicker: {
        title: "انتخابگر زمان",
        desc: "ابزاری برای انتخاب زمان با دقت بالا.",
        image: TimePicker,
        image1: TimePickerRun,
        image2: TimePicker2,
      },
      rendersideHook: {
        title: "هوک رندر جانبی",
        desc: "این بخش هوک‌هایی برای رندر کردن مقادیر جانبی را نشان می‌دهد.",
      },
    },
  },
  en: {
    sections: {
      content: "Content",
      image: "Image",
      Range: {
        title: "Range",
        desc: "This section allows selecting a range of dates for mobile display.",
        image: Capture,
        image1: MobileRange,
        image2: MobileRangeManual,
        image3: MobileRangetaghvim,
      },
      Date: {
        title: "Date",
        desc: "Mobile date picker designed for mobile devices.",
        image: MobileDatePickerImage,
        image1: MobileDate,
        image2: mobileDate2,
      },
      Mask: {
        component: <Mask />,
        title: "Mask",
        desc: "mask restricts the input format of dates.",
        image: DateMask,
      },
      timepicker: {
        title: "Time Picker",
        desc: "A tool to accurately pick time values.",
        image: TimePicker,
        image1: TimePickerRun,
        image2: TimePicker2,
      },
      rendersideHook: {
        title: "Render Side Hook",
        desc: "Demonstrates hooks for rendering side data.",
      },
    },
  },
};

export function InitialComponent() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
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
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#2f2f2f",
          color: "#fff",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          id="langButton"
          onClick={handleLangToggle}
          style={{
            marginBottom: "1rem",
            backgroundColor: "#4a90e2",
            border: "none",
            padding: "0.5rem",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {lang}
        </button>
        {SECTION_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            style={{
              marginBottom: "0.5rem",
              padding: "0.5rem",
              backgroundColor: activeSection === key ? "#666" : "#444",
              border: "none",
              color: "#fff",
              textAlign: "center",
              borderRadius: "4px",
              cursor: "pointer",
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
          backgroundColor: "#f1f1f1",
          padding: "2rem",
          overflowY: "auto",
        }}
      >
        {activeSection ? (
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              {sections[activeSection].title}
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              {sections[activeSection].desc}
            </p>

            {sections[activeSection].component && (
              <div style={{ marginBottom: "1rem" }}>
                {sections[activeSection].component}
              </div>
            )}
            {sections[activeSection].image && (
              <img
                src={sections[activeSection].image}
                alt=""
                style={{
                  maxWidth: "100%",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                }}
              />
            )}
            {sections[activeSection].image1 && (
              <img
                src={sections[activeSection].image1}
                alt=""
                style={{ maxWidth: "100%", marginBottom: "1rem" }}
              />
            )}
            {sections[activeSection].image2 && (
              <img
                src={sections[activeSection].image2}
                alt=""
                style={{ maxWidth: "100%", marginBottom: "1rem" }}
              />
            )}
            {sections[activeSection].image3 && (
              <img
                src={sections[activeSection].image3}
                alt=""
                style={{ maxWidth: "100%", marginBottom: "1rem" }}
              />
            )}
          </div>
        ) : (
          <div style={{ color: "#999" }}>{sections.content} را انتخاب کنید</div>
        )}
      </div>
    </div>
  );
}
