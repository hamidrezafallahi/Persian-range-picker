import { type ReactNode, useState } from "react";

import Capture from "../assets/images/Capture.png";
import desktop2 from "../assets/images/desktop2.png";
import desktopDate1 from "../assets/images/desktopDate1.png";
import DesktopDatePicker from "../assets/images/DesktopDatePicker.png";
import DesktopRange from "../assets/images/DesktopRange.png";
import DesktopRange2 from "../assets/images/DesktopRange2.png";
import DesktopRangePicker from "../assets/images/DesktopRangePicker.png";
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
  "mobileRange",
  "mobileDate",
  "dateMask",
  "timepicker",
  "rendersideHook",
  "dynamicRange",
  "desktopRange",
  "desktopDate",
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
      mobileRange: {
        title: "محدوده موبایل",
        desc: "در این بخش، می‌توان محدوده‌ای از تاریخ‌ها را برای نمایش در موبایل انتخاب کرد.",
        image: Capture,
        image1: MobileRange,
        image2: MobileRangeManual,
      },
      mobileDate: {
        title: "تاریخ موبایل",
        desc: "تاریخ موبایل برای انتخاب آسان تاریخ در دستگاه‌های همراه طراحی شده.",
        image: MobileDatePickerImage,
        image1: MobileDate,
        image2: mobileDate2,
      },
      dateMask: {
        component: <Mask />,
        title: "ماسک تاریخ",
        desc: "ماسک تاریخ به شما امکان می‌دهد فرمت ورودی تاریخ را محدود کنید.",
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
      dynamicRange: {
        title: "محدوده داینامیک",
        desc: "محدوده‌ای که با توجه به داده‌های زنده تغییر می‌کند.",
      },
      desktopRange: {
        title: "محدوده دسکتاپ",
        desc: "محدوده تاریخ برای کاربران دسکتاپ.",
        image: DesktopRangePicker,
        image1: DesktopRange2,
        image2: DesktopRange,
      },
      desktopDate: {
        title: "تاریخ دسکتاپ",
        desc: "تاریخ‌نگار ساده برای دسکتاپ.",
        image: DesktopDatePicker,
        image1: desktop2,
        image2: desktopDate1,
      },
    },
  },
  en: {
    sections: {
      content: "content",
      image: "image",
      mobileRange: {
        title: "Mobile Range",
        desc: "This section allows selecting a range of dates for mobile display.",
        image: Capture,
        image1: MobileRange,
        image2: MobileRangeManual,
        image3: MobileRangetaghvim,
      },
      mobileDate: {
        title: "Mobile Date",
        desc: "Mobile date picker designed for mobile devices.",
        image: MobileDatePickerImage,
        image1: MobileDate,
        image2: mobileDate2,
      },
      dateMask: {
        component: <Mask />,
        title: "Date Mask",
        desc: "Date mask restricts the input format of dates.",
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
      dynamicRange: {
        title: "Dynamic Range",
        desc: "Range that adapts based on live data.",
      },
      desktopRange: {
        title: "Desktop Range",
        desc: "Date range selection for desktop users.",
        image: DesktopRangePicker,
        image1: DesktopRange2,
        image2: DesktopRange,
      },
      desktopDate: {
        title: "Desktop Date",
        desc: "Simple date picker for desktop.",
        image: DesktopDatePicker,
        image1: desktop2,
        image2: desktopDate1,
      },
    },
  },
};

export function InitialComponent() {
  const [language, setLanguage] = useState<"fa" | "en">("fa");
  const [activeKey, setActiveKey] = useState<SectionKey | "">("");
  const t = TEXT[language];
  const handleSectionClick = (key: SectionKey) => {
    setActiveKey((prev) => (prev === key ? "" : key));
    setTimeout(() => {
      const section = document.getElementById(key);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const toggleLanguage = () => {
    setLanguage(language == "fa" ? "en" : "fa");
    const container = document.getElementById("container");
    container?.getAttribute("dir");
    if (container) {
      if (container?.classList.contains("rtl")) {
        container?.classList.remove("rtl");
        container?.classList.add("ltr");
      } else {
        container?.classList.remove("ltr");
        container?.classList.add("rtl");
      }
    }
    const langButton = document.getElementById("langButton");
    if (langButton) {
      if (langButton.innerText == "fa") {
        langButton.innerText = "en";
      } else {
        langButton.innerText = "fa";
      }
    }
  };

  return (
    <div
      id="container"
      style={{
        background: "#1d1f30",
        textAlign: "right",
        position: "relative",
      }}
    >
      <div className="persianRangeHeader">
        <div className="flex justify-around items-center">
          <button
            className="lanButton"
            id="langButton"
            onClick={toggleLanguage}
          >
            fa
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
          <div>{t.sections.image}</div>
          <div>{t.sections.content}</div>
        </div>
      </div>

      {SECTION_KEYS.map((key) => {
        const section = t.sections[key];
        return (
          <div className="scopeTitle" key={key} id={key}>
            <h2
              className="titleDescStyle"
              onClick={() => handleSectionClick(key)}
            >
              {section.title}
            </h2>

            {activeKey === key && (
              <div className="sectionContent">
                {section.image && (
                  <img
                    src={section.image}
                    alt={section.title}
                    style={{
                      width: "100%",
                      maxWidth: "600px",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                    }}
                  />
                )}
                <p className="titleDescStyle">{section.desc}</p>
                {section.component && (
                  <div
                    className="sectionComponent"
                    style={{ margin: "1rem 0" }}
                  >
                    {section.component}
                  </div>
                )}
                {section.image1 && (
                  <img
                    src={section.image1}
                    alt={`${section.title} run`}
                    style={{ marginTop: "1rem" }}
                  />
                )}
                {section.image2 && (
                  <img
                    src={section.image2}
                    alt={`${section.title} extra`}
                    style={{ marginTop: "1rem" }}
                  />
                )}
                {"image3" in section && section.image3 && (
                  <img
                    src={section.image3}
                    alt={`${section.title} more`}
                    style={{ marginTop: "1rem" }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
