import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
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
];
const TEXT = {
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
                component: _jsx(Mask, {}),
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
                component: _jsx(Mask, {}),
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
    const [lang, setLang] = useState("fa");
    const [activeSection, setActiveSection] = useState(null);
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
    return (_jsxs("div", { id: "container", style: {
            width: "100dvw",
            height: "100dvh",
            display: "flex",
            direction: lang === "fa" ? "rtl" : "ltr",
        }, children: [_jsxs("div", { style: {
                    width: "220px",
                    backgroundColor: "#2f2f2f",
                    color: "#fff",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                }, children: [_jsx("button", { id: "langButton", onClick: handleLangToggle, style: {
                            marginBottom: "1rem",
                            backgroundColor: "#4a90e2",
                            border: "none",
                            padding: "0.5rem",
                            color: "#fff",
                            cursor: "pointer",
                            borderRadius: "4px",
                        }, children: lang }), SECTION_KEYS.map((key) => (_jsx("button", { onClick: () => setActiveSection(key), style: {
                            marginBottom: "0.5rem",
                            padding: "0.5rem",
                            backgroundColor: activeSection === key ? "#666" : "#444",
                            border: "none",
                            color: "#fff",
                            textAlign: "center",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }, children: sections[key].title }, key)))] }), _jsx("div", { style: {
                    flex: 1,
                    backgroundColor: "#f1f1f1",
                    padding: "2rem",
                    overflowY: "auto",
                }, children: activeSection ? (_jsxs("div", { children: [_jsx("h2", { style: { fontSize: "1.5rem", marginBottom: "1rem" }, children: sections[activeSection].title }), _jsx("p", { style: { marginBottom: "1rem" }, children: sections[activeSection].desc }), sections[activeSection].component && (_jsx("div", { style: { marginBottom: "1rem" }, children: sections[activeSection].component })), sections[activeSection].image && (_jsx("img", { src: sections[activeSection].image, alt: "", style: {
                                maxWidth: "100%",
                                marginBottom: "1rem",
                                borderRadius: "8px",
                            } })), sections[activeSection].image1 && (_jsx("img", { src: sections[activeSection].image1, alt: "", style: { maxWidth: "100%", marginBottom: "1rem" } })), sections[activeSection].image2 && (_jsx("img", { src: sections[activeSection].image2, alt: "", style: { maxWidth: "100%", marginBottom: "1rem" } })), sections[activeSection].image3 && (_jsx("img", { src: sections[activeSection].image3, alt: "", style: { maxWidth: "100%", marginBottom: "1rem" } }))] })) : (_jsxs("div", { style: { color: "#999" }, children: [sections.content, " \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F"] })) })] }));
}
