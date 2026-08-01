import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TickIcon } from '../assets/icons/TickIcon';
import dateP from '../assets/images/dateP.png';
import maskP from '../assets/images/maskp.png';
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
import styles from './styles.module.css';

const SECTION_KEYS = [
  'QuickStart',
  'Range',
  'Date',
  'Mask',
  'timepicker',
  'rendersideHook',
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

const NPM_URL = 'https://www.npmjs.com/package/react-persian-range-picker';
const GITHUB_URL = 'https://github.com/hamidrezafallahi/Persian-range-picker';
const INSTALL_CMD = 'npm i react-persian-range-picker';

const SEO = {
  fa: {
    title: 'Persian Range Picker | انتخابگر تاریخ و بازه شمسی برای React',
    description:
      'کتابخانه React برای DatePicker، RangePicker مقایسه‌ای، Mask ورودی کیبوردی و TimePicker با پشتیبانی بومی تقویم جلالی و میلادی.',
    h1: 'انتخابگر تاریخ و بازه شمسی برای React',
    lead:
      'DatePicker، RangePicker با مقایسه بازه، Mask کیبوردی و TimePicker — سبک، TypeScript-ready و سازگار با React 18 و 19.',
    docs: 'مستندات زنده',
    playground: 'نمایش زنده کامپوننت',
    live: 'Live',
    features: ['جلالی + میلادی', 'مقایسه بازه', 'ماسک کیبورد', 'وابستگی کم'],
    ctaDocs: 'شروع از معرفی',
    ctaNpm: 'مشاهده در npm',
    ctaGithub: 'سورس در GitHub',
  },
  en: {
    title: 'Persian Range Picker | Jalali date & range picker for React',
    description:
      'React Jalali/Gregorian DatePicker, analytics-style RangePicker with compare, keyboard Mask, and TimePicker. Lightweight and TypeScript-ready.',
    h1: 'Jalali date & range picker for React',
    lead:
      'DatePicker, compare-ready RangePicker, keyboard Mask, and TimePicker — built for dashboards, forms, and enterprise apps on React 18/19.',
    docs: 'Live docs',
    playground: 'Interactive playground',
    live: 'Live',
    features: ['Jalali + Gregorian', 'Compare ranges', 'Keyboard mask', 'Tiny deps'],
    ctaDocs: 'Read introduction',
    ctaNpm: 'View on npm',
    ctaGithub: 'GitHub source',
  },
} as const;

const TEXT: Record<'fa' | 'en', LanguageText> = {
  fa: {
    sections: {
      content: 'محتوا را از فهرست انتخاب کنید.',
      image: 'تصویر',
      QuickStart: {
        title: 'معرفی کتابخانه',
        desc: (
          <>
            <p>
              این کتابخانه برای پاسخ به نیاز برنامه‌نویسان ایرانی جهت انتخاب تاریخ
              شمسی طراحی شده است. با پشتیبانی از هر دو نوع تاریخ
              <strong> میلادی (Gregorian) و شمسی (Shamsi)</strong>، می‌توانید نوع
              تقویم را با یک پارامتر ساده تغییر دهید.
            </p>
            <p>
              برخلاف بسیاری از کتابخانه‌ها که تاریخ میلادی را به‌صورت لحظه‌ای به
              شمسی تبدیل می‌کنند، این کتابخانه از ابتدا بر اساس تاریخ شمسی کار
              می‌کند.
            </p>
            <p>
              برای تبدیل تاریخ، تنها به یک کتابخانه سبک وابسته هستید:
              <code>jalaali-js</code>. محاسبات جلالی با الگوریتم دقیق Borkowski
              انجام می‌شود.
            </p>
            <h4>انتخاب بازه‌ی زمانی مقایسه‌ای</h4>
            <p>
              یکی از مهم‌ترین قابلیت‌ها، مقایسه‌ی یک بازه با بازه دیگر است —
              مشابه الگوی Google Analytics، با پشتیبانی بومی تقویم شمسی.
            </p>
            <ul>
              <li>مقایسه داده روزانه با روز یا هفته قبل</li>
              <li>بررسی روند فروش فصل جاری نسبت به سال گذشته</li>
            </ul>
            <h4>
              <TickIcon /> انتخاب تاریخ
            </h4>
            <p>
              DatePicker با Mask قابل ویرایش و پشتیبانی از
              <strong> TimePicker </strong> دقت تا ثانیه می‌دهد.
            </p>
            <h4>
              <TickIcon /> نگارنده تاریخ (ماسک)
            </h4>
            <p>
              تایپ مستقیم در قالب مشخص، ناوبری کیبورد، تشخیص روزهای ماه و جلوگیری
              از مقدار غیرمجاز.
            </p>
            <h4>
              <TickIcon /> هوک نمایش المان شناور
            </h4>
            <p>
              هوک سبک برای Dropdown/Tooltip با جلوگیری از بیرون‌زدگی — بدون وابستگی
              به popper.
            </p>
          </>
        ),
      },
      Range: {
        title: 'محدوده زمانی',
        desc: 'بازه تاریخ را برای فیلتر، گزارش‌گیری یا تنظیمات انتخاب کنید؛ مناسب داشبوردها و فرم‌های تحلیلی.',
        video: rangeVid,
        image: rangePic,
        component: (
          <RangePicker
            calendarType="jalali"
            onChange={(e) => console.log('RangePicker has changed', e)}
            exportType="timeStamp"
            showComparison
          />
        ),
      },
      Date: {
        title: 'تاریخ',
        desc: 'انتخاب تاریخ شمسی یا میلادی با پشتیبانی زمان و Mask ورودی.',
        image: dateP,
        video: dateVid,
        component: (
          <DatePicker
            showTime
            showSecond
            showMask
            isTodaySelectPreset
            onChange={(e) => console.log(e)}
            calendarType="jalali"
            exportType="timeStamp"
          />
        ),
      },
      Mask: {
        component: <Mask calendarType="jalali" allowClear />,
        title: 'ورودی تاریخ',
        desc: 'ماسک ورودی فقط قالب معتبر را می‌پذیرد و یکپارچگی داده را حفظ می‌کند.',
        video: MaskVid,
        image: maskP,
      },
      timepicker: {
        title: 'انتخابگر زمان',
        desc: 'ساعت، دقیقه و ثانیه — مناسب رزرو، قرار ملاقات و هشدار.',
        video: Time,
        image: timeP,
        component: (
          <TimePicker
            calendarType="jalali"
            onChange={(e) => console.log(e)}
            showSecond
          />
        ),
      },
      rendersideHook: {
        title: 'هوک رندر جانبی',
        desc: `هوک کنترل موقعیت برای tooltip، منو و popup:
مدیریت خودکار موقعیت، جلوگیری از overflow، پشتیبانی از بالا/پایین/چپ/راست، offset قابل تنظیم، سبک و بدون وابستگی سنگین.`,
        image: useR,
        image1: useR1,
        image2: useR2,
      },
    },
  },
  en: {
    sections: {
      content: 'Choose content from the menu.',
      image: 'Image',
      QuickStart: {
        title: 'Introduction',
        desc: (
          <>
            <p>
              Built for Persian (Jalali) date selection in React, with first-class
              support for both <strong>Gregorian and Shamsi</strong> calendars.
            </p>
            <p>
              Unlike converters bolted onto Gregorian engines, this library is
              Jalali-native from the ground up.
            </p>
            <p>
              Date math depends on one lightweight package: <code>jalaali-js</code>{' '}
              (Borkowski algorithm).
            </p>
            <h4>Comparative date ranges</h4>
            <p>
              Compare one period with another — analytics-style UX with native
              Jalali support.
            </p>
            <ul>
              <li>Daily metrics vs yesterday or last week</li>
              <li>Seasonal sales vs the same season last year</li>
            </ul>
            <h4>
              <TickIcon /> Date picker
            </h4>
            <p>
              Masked input plus optional <strong>TimePicker</strong> down to the
              second.
            </p>
            <h4>
              <TickIcon /> Masked date input
            </h4>
            <p>
              Keyboard-friendly segments, month-length awareness, and invalid-entry
              prevention.
            </p>
            <h4>
              <TickIcon /> Floating element hook
            </h4>
            <p>
              Dependency-light positioning for dropdowns and tooltips with overflow
              prevention.
            </p>
          </>
        ),
      },
      Range: {
        title: 'Range',
        desc: 'Select date ranges for filters, reports, and settings — ideal for analytics UIs.',
        video: rangeVidE,
        image: rangePic,
        component: (
          <RangePicker
            calendarType="gregorian"
            onChange={(e) => console.log('RangePicker has changed', e)}
            exportType="timeStamp"
            showComparison
          />
        ),
      },
      Date: {
        title: 'Date',
        desc: 'Pick Jalali or Gregorian dates with optional time and mask input.',
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
        component: <Mask calendarType="gregorian" allowClear />,
        title: 'Mask',
        desc: 'Constrained date typing that prevents common format errors.',
        video: MaskVid,
        image: maskP,
      },
      timepicker: {
        title: 'Time Picker',
        desc: 'Hours, minutes, and seconds for bookings, meetings, and alerts.',
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
      rendersideHook: {
        title: 'Render side hook',
        desc: `Position tooltips, menus, and popups with automatic placement, overflow prevention, multi-side support, customizable offset, and a lightweight footprint.`,
        image: useR,
        image1: useR1,
        image2: useR2,
      },
    },
  },
};

export function InitialComponent() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [activeSection, setActiveSection] = useState<SectionKey>('QuickStart');
  const seo = SEO[lang];
  const sections = TEXT[lang].sections;
  const active = sections[activeSection];

  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'react-persian-range-picker',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: seo.description,
        url: GITHUB_URL,
        author: {
          '@type': 'Person',
          name: 'Hamidreza Fallahi',
          url: 'https://github.com/hamidrezafallahi',
        },
        programmingLanguage: 'TypeScript',
        keywords:
          'React, Jalali, Persian date picker, range picker, Shamsi calendar, TimePicker, date mask',
      }),
    [seo.description]
  );

  useEffect(() => {
    document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.title = seo.title;

    const ensureMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    ensureMeta('description', seo.description);
    ensureMeta('og:title', seo.title, 'property');
    ensureMeta('og:description', seo.description, 'property');
    ensureMeta('og:type', 'website', 'property');
    ensureMeta('twitter:card', 'summary_large_image');
    ensureMeta('twitter:title', seo.title);
    ensureMeta('twitter:description', seo.description);
  }, [lang, seo.description, seo.title]);

  useEffect(() => {
    const id = 'prp-software-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = jsonLd;
  }, [jsonLd]);

  return (
    <div className={`${styles.page} ${lang === 'en' ? styles.pageEn : ''}`}>
      <a className={styles.srOnly} href="#main-docs">
        {lang === 'fa' ? 'پرش به محتوا' : 'Skip to content'}
      </a>

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a className={styles.brandMark} href={GITHUB_URL} aria-label="react-persian-range-picker">
            <span className={styles.logo} aria-hidden />
            <span className={styles.brandText}>
              <span className={styles.brandName}>Persian Range Picker</span>
              <span className={styles.brandSub}>react-persian-range-picker</span>
            </span>
          </a>

          <div className={styles.topActions}>
            <a className={styles.linkBtn} href={NPM_URL} target="_blank" rel="noreferrer">
              npm
            </a>
            <a className={styles.linkBtn} href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <button
              type="button"
              className={styles.langBtn}
              onClick={() => setLang((prev) => (prev === 'fa' ? 'en' : 'fa'))}
            >
              {lang === 'fa' ? 'English' : 'فارسی'}
            </button>
          </div>
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>Jalali · Gregorian · React</p>
              <h1 id="hero-title" className={styles.h1}>
                {seo.h1}
              </h1>
              <p className={styles.lead}>{seo.lead}</p>

              <div className={styles.ctaRow}>
                <button
                  type="button"
                  className={`${styles.cta} ${styles.ctaPrimary}`}
                  onClick={() => setActiveSection('QuickStart')}
                >
                  {seo.ctaDocs}
                </button>
                <a
                  className={`${styles.cta} ${styles.ctaGhost}`}
                  href={NPM_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {seo.ctaNpm}
                </a>
                <a
                  className={`${styles.cta} ${styles.ctaGhost}`}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {seo.ctaGithub}
                </a>
              </div>

              <code className={styles.install}>{INSTALL_CMD}</code>

              <div className={styles.chips} aria-label="features">
                {seo.features.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className={styles.layout}>
          <nav className={styles.side} aria-label={seo.docs}>
            <p className={styles.sideLabel}>{seo.docs}</p>
            {SECTION_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.navBtn} ${
                  activeSection === key ? styles.navBtnActive : ''
                }`}
                onClick={() => setActiveSection(key)}
                aria-current={activeSection === key ? 'page' : undefined}
              >
                {sections[key].title}
              </button>
            ))}
          </nav>

          <main id="main-docs" className={styles.main}>
            <article className={styles.panel} key={`${lang}-${activeSection}`}>
              <h2 className={styles.sectionTitle}>{active.title}</h2>
              <div className={styles.bodyCopy}>{active.desc}</div>

              {(active.video || active.image || active.image1 || active.image2) && (
                <div className={styles.mediaStack}>
                  {active.video && (
                    <div className={styles.mediaFrame}>
                      <video
                        autoPlay
                        loop
                        playsInline
                        muted
                        src={active.video}
                        title={`${active.title} demo video`}
                      />
                    </div>
                  )}
                  {active.image && (
                    <div className={styles.mediaFrame}>
                      <img src={active.image} alt={`${active.title} preview`} />
                    </div>
                  )}
                  {active.image1 && (
                    <div className={styles.mediaFrame}>
                      <img src={active.image1} alt={`${active.title} preview 2`} />
                    </div>
                  )}
                  {active.image2 && (
                    <div className={styles.mediaFrame}>
                      <img src={active.image2} alt={`${active.title} preview 3`} />
                    </div>
                  )}
                </div>
              )}

              {active.component && (
                <section className={styles.playground} aria-label={seo.playground}>
                  <div className={styles.playgroundLabel}>
                    <span>{seo.playground}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <span className={styles.liveDot} aria-hidden />
                      {seo.live}
                    </span>
                  </div>
                  <div className={styles.playgroundBody}>{active.component}</div>
                </section>
              )}
            </article>

            <footer className={styles.footer}>
              <span>
                MIT · {lang === 'fa' ? 'ساخته‌شده توسط' : 'Built by'}{' '}
                <a href="https://github.com/hamidrezafallahi" target="_blank" rel="noreferrer">
                  Hamidreza Fallahi
                </a>
              </span>
              <span>
                <a href={NPM_URL} target="_blank" rel="noreferrer">
                  npm
                </a>
                {' · '}
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                {' · '}
                <a href={`${GITHUB_URL}#readme`} target="_blank" rel="noreferrer">
                  README
                </a>
              </span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
