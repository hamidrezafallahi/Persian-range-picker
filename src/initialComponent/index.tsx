import {
  type ReactNode,
  useState,
} from 'react';

import { TickIcon } from '../assets/icons/TickIcon';
import dateP from '../assets/images/dateP.png';
import maskP from '../assets/images/maskP.png';
import rangePic from '../assets/images/rangeP.png';
import timeP from '../assets/images/timeP.png';
import useR from '../assets/images/useR.png';
import useR1 from '../assets/images/useR1.png';
import useR2 from '../assets/images/useR2.png';
import dateVid from '../assets/video/Date.mp4';
import dateVidE from '../assets/video/dateE.mp4';
import MaskVid from '../assets/video/mask.mp4';
import rangeVid from '../assets/video/range1.mp4';
import rangeVidE from '../assets/video/rangeE.mp4';
import Time from '../assets/video/time.mp4';
import timeVidE from '../assets/video/timeE.mp4';
import { DatePicker } from '../datePicker';
import { Mask } from '../mask';
import { RangePicker } from '../rangePicker';
import { TimePicker } from '../timePicker';

const SECTION_KEYS = [
  "QuickStart",
  "Range",
  "Date",
  "Mask",
  "timepicker",
  "rendersideHook",
] as const;
type SectionKey = (typeof SECTION_KEYS)[number];
type SectionContent = {
  title: string;
  desc: string | ReactNode;
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
      QuickStart: {
        title: "معرفی کتابخانه",
        desc: (
          <>
            <p>
              این کتابخانه برای پاسخ به نیاز برنامه‌نویسان ایرانی جهت انتخاب
              تاریخ شمسی طراحی شده است. با پشتیبانی از هر دو نوع تاریخ
              <strong> میلادی (Gregorian) و شمسی (Shamsi)</strong>، شما
              می‌توانید نوع تقویم را با یک پارامتر ساده تغییر دهید.
            </p>
            <p>
              برخلاف بسیاری از کتابخانه‌ها که تاریخ میلادی را به‌صورت لحظه‌ای به
              شمسی تبدیل می‌کنند، این کتابخانه از ابتدا بر اساس تاریخ شمسی کار
              می‌کند.
            </p>
            <p>
              هدف ما ساده‌سازی تجربه کاربری و فراهم‌کردن امکان شخصی‌سازی بالاست،
              بنابراین ظاهر اکثر المان‌ها قابل تغییر است.
            </p>
            <p>
              برای تبدیل تاریخ، تنها به یک کتابخانه سبک وابسته هستید:
              <code>jalaali-js</code>. محاسبات جلالی با همان الگوریتم دقیق Borkowski انجام می‌شود.
            </p>
            <p>
              از همه همکارانی که در توسعه‌ی این ابزار مشارکت داشتند، سپاسگزاریم.
            </p>

            <br />
            <h4> انتخاب بازه‌ی زمانی مقایسه‌ای</h4>
            <p>
              یکی از مهم‌ترین قابلیت‌های این ابزار، مقایسه‌ی یک بازه‌ی زمانی با
              بازه‌ی دیگر است. به‌عنوان مثال:
            </p>
            <ul>
              <li>
                مقایسه‌ی داده‌های روزانه آزمایشگاهی با روز گذشته یا هفته‌ی قبل
              </li>
              <li>بررسی روند فروش شرکت در فصل جاری نسبت به سال گذشته</li>
            </ul>
            <p>
              دو دکمه‌ی مجزا برای جابه‌جایی بازه اصلی و بازه‌ی مقایسه‌ای در نظر
              گرفته شده است.
            </p>

            <p>
              این کتابخانه مشابه انتخاب بازه زمانی در ابزار معروف{" "}
              <strong>Google Analytics</strong> طراحی شده است، که به شما امکان
              انتخاب و مقایسه بازه‌های زمانی را به صورت مجزا و ساده می‌دهد.
              تفاوت اصلی در پشتیبانی بومی از تقویم شمسی و امکانات پیشرفته‌تر در
              انتخاب تاریخ و زمان است.
            </p>

            <h4>
              {" "}
              <TickIcon /> انتخاب تاریخ
            </h4>
            <p>
              المان انتخاب تاریخ دارای قابلیت نمایش تاریخ به‌صورت قابل ویرایش
              (Mask) و پشتیبانی از
              <strong> TimePicker </strong> است. کاربر می‌تواند تاریخ را دقیق تا
              ثانیه انتخاب کند.
            </p>

            <h4>
              {" "}
              <TickIcon /> انتخاب زمان
            </h4>
            <p>
              این المان فقط برای انتخاب زمان طراحی شده و در صورت دریافت تاریخ،
              زمان همان را تغییر می‌دهد. در غیر این‌صورت، زمان تاریخ فعلی را
              تغییر می‌دهد.
            </p>

            <h4>
              {" "}
              <TickIcon /> نگارنده تاریخ (ماسک)
            </h4>
            <p>
              با تایپ مستقیم تاریخ در فرمت مشخص‌شده، کاربر می‌تواند از کیبورد
              نیز برای کم/زیاد کردن مقادیر استفاده کند. این ورودی به صورت هوشمند
              تعداد روزهای هر ماه را تشخیص می‌دهد و از ورود مقدار غیرمجاز
              جلوگیری می‌کند.
            </p>

            <h4>
              {" "}
              <TickIcon /> هوک نمایش المان شناور
            </h4>
            <p>
              یک هوک قدرتمند و بدون وابستگی برای نمایش محتوای شناور (مثل
              Dropdown یا Tooltip) در کنار یک المان خاص. مشابه رفتار
              <code>react-popper</code> عمل می‌کند و قابلیت سفارشی‌سازی کامل
              دارد.
            </p>
          </>
        ),

        video: undefined,
        image: undefined,
        component: undefined,
      },
      Range: {
        title: "محدوده زمانی",
        desc: "محدوده زمانی ابزاری است که به شما اجازه می‌دهد یک بازه از تاریخ‌ها یا زمان‌ها را برای عملیات فیلتر، گزارش‌گیری یا تنظیمات انتخاب کنید. این ابزار مخصوصاً برای فرم‌ها یا صفحه‌های گزارش بسیار کاربردی است.",
        video: rangeVid,
        image: rangePic,
        component: (
          <RangePicker
            calendarType="jalali"
            onChange={(e:any) => console.log("RangePicker has changed", e)}
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
            onChange={(e:any) => console.log(e)}
            calendarType="jalali"
            exportType="timeStamp"
          />
        ),
      },
      Mask: {
        component: <Mask calendarType="jalali" />,
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
            calendarType="jalali"
            onChange={(e:any) => console.log(e)}
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
        video: rangeVidE,
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
        video: dateVidE,
        component: (
          <DatePicker
            showTime
            showSecond
            showMask
            isTodaySelectPreset
            onChange={(e:any) => console.log(e)}
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
        video: timeVidE,
        component: (
          <TimePicker
            calendarType="gregorian"
            onChange={(e:any) => console.log(e)}
            showSecond
          />
        ),
      },
      QuickStart: {
        title: "Introduction",
        desc: (
          <>
            <p>
              This library is designed to meet the needs of Iranian developers
              for selecting Persian (Jalali) dates. Supporting both
              <strong> Gregorian and Shamsi calendars</strong>, you can easily
              switch calendar types with a simple parameter.
            </p>
            <p>
              Unlike many libraries that convert Gregorian dates to Jalali on
              the fly, this library is built natively around the Jalali calendar
              from the ground up.
            </p>
            <p>
              Our goal is to simplify user experience and provide extensive
              customization options, so the appearance of most components is
              easily changeable.
            </p>
            <p>
              For date conversion, you only depend on one lightweight library:
              <code>jalaali-js</code>. Jalali math uses the same accurate Borkowski algorithm.
            </p>
            <p>
              We are grateful to all contributors who helped develop this tool.
            </p>

            <br />
            <h4>Comparative Date Range Selection</h4>
            <p>
              One of the key features of this tool is comparing one date range
              with another. For example:
            </p>
            <ul>
              <li>
                Comparing daily lab data with the previous day or last week
              </li>
              <li>
                Reviewing company sales trends in the current season versus last
                year
              </li>
            </ul>
            <p>
              Separate buttons are provided to navigate the main date range and
              the comparison range.
            </p>

            <p>
              This library is designed similarly to the Date Range Picker in the
              well-known <strong>Google Analytics</strong> tool, allowing users
              to select and compare date ranges separately and easily. The main
              difference lies in native support for the Jalali calendar and
              advanced date and time selection features.
            </p>

            <h4>
              {" "}
              <TickIcon /> Date Picker
            </h4>
            <p>
              The date picker component supports editable masked input and
              <strong> TimePicker </strong>, allowing users to select date and
              time down to the second.
            </p>

            <h4>
              {" "}
              <TickIcon /> Time Picker
            </h4>
            <p>
              This component is designed solely for time selection. If provided
              with a date, it modifies the time part; otherwise, it changes the
              current date's time.
            </p>

            <h4>
              {" "}
              <TickIcon /> Masked Date Input
            </h4>
            <p>
              By typing the date directly in the specified format, users can
              also use the keyboard to increase/decrease values. The input
              smartly detects the number of days in each month and prevents
              invalid entries.
            </p>

            <h4>
              {" "}
              <TickIcon /> Floating Element Hook
            </h4>
            <p>
              A powerful, dependency-free hook to display floating content (like
              Dropdown or Tooltip) next to a target element. It behaves
              similarly to
              <code>react-popper</code> and is fully customizable.
            </p>
          </>
        ),

        video: undefined,
        image: undefined,
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
    "QuickStart"
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
        width: "99dvw",
        height: "95vh",
        padding:0,
        margin:0,
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
          className=""
          type="button"
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
            type="button"
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
