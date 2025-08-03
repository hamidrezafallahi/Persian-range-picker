import {
  type ReactNode,
  useState,
} from 'react';

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
import {
  DatePicker,
  RangePicker,
  TimePicker,
} from '../range';
import { Mask } from '../range/exportComponents/mask';

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
        desc: <>
          <div>در این کتابخانه ما سعی کردیم یکی از نیاز های برنامه نویسان ایرانی  که انتخاب تاریخ میباشد را حل کنیم. البته این کتابخانه تمامی تاریخ هایی را که نمایش میدهد با گرفتن ورودی نوع تاریخ یعنی gregorian یا shamsi تغییر دهد.  </div>
          <div>انتخاب تاریخ شمسی عموما با تبدیل لحظه ای تاریخ میلادی به شمسی انجام میشود اما ما در این کتابخانه از ابتدا زمان را به تاریخ شمسی انتخاب مبکنیم </div>
          <div>همچنین ما سعی کردیم ساده ترین و با کارآمد ترین نوع نمایش محتوا را برای شما به اجرا بگذاریم و حتی دسترسی برای تغییر ظاهری بسیاری در این المانها دیده شده .</div>
          <div>دیگر اینکه این کتابخانه میزان وابستگی شما به کتابخانه های دیگر برای تبدیل تاریخ را از بین میبرد و تنها یک کتابخانه برای محاسبات تاریخ مورد نیاز است آن هم moment-jalaali.</div>
          <div>از همکاران عزیزی که این کتابخانه رو توسعه دادند بسیار سپاسگذاریم </div>
          <br />
          <strong>انتخاب بازه زمانی مقایسه ای با بازه زمانی ای دیگر </strong>
          <div>نقطه قوت و عطف این کتابخانه انتخاب بازه زمانی مقایسه ای هست که در آن شما میتوانید یک بازه زمانی رو با زمانهای متفاوتی مقایسه کنید .یعنی علاوه بر انتخاب بازه زمانی شما میتوانید
            در یک زمان به عنوان خروجی زمان مورد نظر برای مقایسه رو هم بدست بیاورید .

            برای مثال در بازه زمانی روزانه میتوان پروژه ای رو تصور کرد برای یک آزمایشگاه و یا بیمارستانی که نیاز دارد روزانه میزان کلسترول یا قند یک بیمار خاص را از دیتابیس چک بکند با روز قبل و یا هفت روز گذشته . همچنین میخواهد ببیند روند این عناصر در بدن بیمار بصورت کاهشی بوده و یا افزایشی ،که
            ما برای این منظور دو دکمه برای به عقب پریدن بازه زمانی و به عقب پریدن بازه زمانی مقایسه ای در نظر گرفتیم .
            همچنین اگر شرکتی بدنبال دریافت اطلاعات میزان فروش یا سود دهی خود در سه ماه گذشته و مقایسه ی آن با همین بازه در سال پیش باشد نیز میتواند با این انتخابگر بازه مقایسه ای به راحتی بین بازه های متفاوت
            حرکت کرده و داده ها را ببیند.
          </div>
          <br />
          <strong>انتخاب تاریخ</strong>
          <div>دراین المان شما میتوانید مثل اکثر المانهای انتخاب تاریخ، تاریخ را انتخاب کنید .اما ما دو مزیت هم به این المان اضافه کردیم .یکی نمایش تاریخ در قالب Mask  که قابل ویرایش باشد و دیگری اضافه کردن المان TimePicker 
            در آن که کاربر بتواند تاریخ را حتی تا دقت ثانیه انتخاب کند . 
          </div>
          <strong>انتخاب زمان </strong>
          <div>این المان هم برای انتخاب زمان بوده و اگر تاریخی به عنوان ورودی دریافت کند  زمان آن را تغییر میدهد در غیر اینصورت به تاریخ روز زمان را تغییر میدهد</div>
          <strong>نگارنده تاریخ  </strong>
          <div>المان دیگری که بسیار کاربردی هست و وابستگی شما را به کتابخانه های دیگر از بین میبرد نگارنده ی تاریخ یا Mask میباشد که در آن شما میتوانید تاریخ را تایپ کرده و حتی با جهتیاب های روی کیبورد کم یا زیاد کنید. 
            این نگارنده بر اساس سال و ماهی که شما تایپ کردید تعداد روز های آن ماه را در نظر میگیرد و به کاربر اجازه انتخاب زمانی فرای اون رو نمیدهد و یک تابعی برای نمایش خطای پیش آمده نیز دارد و حتی شما میتوانید ظاهر المان را در زمان ایجاد خطا تغییر دهید و 
            این المان با پاس دادن صفتی در المان انتخاب تاریخ هم فعال خواهد شد و کاربر میتواند بدون باز کردن انتخاب تاریخ ، تاریخ مورد نظر خود را تایپ کند.
          </div>
          <strong>هوک نمایش المان شناور در کنار المان مرتبط </strong>
          <div>کتابخانه های متعددی با امکانات متفاوت در این زمینه وجود دارند که بتوانند برای شما فضای شناوری در کنار یک فضای دیگر نمایش دهند. ما هم در این کتابخانه برای کاهش میزان وابستگی این هوک رو از پایه نوشتیم تا هم 
            وابستگی را کاهش دهیم و هم این المان رو بصورت خروجی بگذاریم تا شما علاوه بر استفاده از المانهای این کتابخانه اگر نیاز داشتید بتوانید از این هوک هم استفاده کنید . این هوک دقیقا مشابه react-popperکار میکند و بسیار مناسب برای ساخت dropdown های سفارشی میباشد.</div>

        </>,
        video: undefined,
        image: undefined,
        component: undefined
        //         (
        //           <div
        //             style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        //           >
        //             <pre
        //               style={{
        //                 backgroundColor: "#eee",
        //                 padding: "1rem",
        //                 borderRadius: "8px",
        //                 overflowX: "auto",
        //               }}
        //             >
        //               {`import { DatePicker } from "your-library";

        // function App() {
        //   return (
        //     <DatePicker calendarType="shamsi" showTime />
        //   );
        // }`}
        //             </pre>
        //             <DatePicker calendarType="shamsi" showTime />
        //           </div>
        //         ),
      },
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
        video: timeVidE,
        component: (
          <TimePicker
            calendarType="gregorian"
            onChange={(e) => console.log(e)}
            showSecond
          />
        ),
      },
      QuickStart: {
        title: "Quick Start",
        desc: `This section helps you get started quickly with the components. With just a few lines of code, you can add a Date, Time, or Range Picker to your project.`,
        video: undefined,
        image: undefined,
        component: (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <pre
              style={{
                backgroundColor: "#eee",
                padding: "1rem",
                borderRadius: "8px",
                overflowX: "auto",
              }}
            >
              {`import { DatePicker } from "your-library";

function App() {
  return (
    <DatePicker calendarType="gregorian" showTime />
  );
}`}
            </pre>
            <DatePicker calendarType="gregorian" showTime />
          </div>
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
