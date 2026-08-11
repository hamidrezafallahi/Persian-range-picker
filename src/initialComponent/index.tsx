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
const SITE_URL = 'https://hamidrezafallahi.github.io/Persian-range-picker/';
const OG_IMAGE =
  'https://raw.githubusercontent.com/hamidrezafallahi/Persian-range-picker/refs/heads/main/public/assets/calendar-range-picker.PNG';
const INSTALL_CMD = 'npm i react-persian-range-picker';

const THEME = {
  primaryColor: '#1c39bb',
  accentColor: '#1c39bb',
  highlightColor: '#e8ecfa',
  neutralColor: '#8fa0e8',
  backgroundColor: '#ffffff',
  tertiaryColor: '#5b6594',
} as const;

const SEO = {
  fa: {
    title: 'انتخابگر تاریخ شمسی React | DatePicker و RangePicker جلالی',
    description:
      'دیت پیکر شمسی و RangePicker جلالی برای React — انتخاب تاریخ، بازه زمانی، مقایسه بازه (مناسب ERP/داشبورد)، ماسک کیبوردی و TimePicker.',
    h1: 'انتخابگر تاریخ شمسی و RangePicker جلالی برای React',
    lead:
      'DatePicker شمسی، انتخاب بازه، و مقایسه دو بازه به سبک داشبوردهای تحلیلی — با ناوبری هم‌زمان، Mask و TimePicker؛ مناسب فرم‌ها و ERP.',
    docs: 'مستندات زنده',
    playground: 'نمایش زنده کامپوننت',
    live: 'Live',
    features: ['مقایسه بازه ERP', 'ناوبری هم‌زمان', 'جلالی + میلادی', 'وابستگی کم'],
    ctaDocs: 'شروع از معرفی',
    ctaNpm: 'مشاهده در npm',
    ctaGithub: 'سورس در GitHub',
    previewLabel: 'پیش‌نمایش زنده',
    liveGalleryTitle: 'نمایش زنده کامپوننت‌ها',
    liveGalleryLead: 'Range مقایسه‌ای، Date، Mask و Time — همه قابل‌تعامل.',
    liveLabels: {
      range: 'بازه + مقایسه',
      date: 'تاریخ',
      mask: 'ماسک',
      time: 'زمان',
    },
    copied: 'کپی شد',
    copy: 'کپی',
    highlightsTitle: 'چرا این کتابخانه؟',
    highlights: [
      {
        title: 'مقایسه بازه سازمانی',
        text: 'الگوی مشابه Google Dynamics برای داشبورد، گزارش و ERPهای بزرگ.',
      },
      {
        title: 'ناوبری هم‌زمان',
        text: 'یک گام عقب/جلو روی بازه اصلی و بازه مقایسه با هم — قابلیتی فراتر از Dynamics.',
      },
      {
        title: 'جلالی‌محور و سبک',
        text: 'تقویم شمسی از هسته + Mask کیبوردی؛ فقط وابسته به jalaali-js.',
      },
    ],
  },
  en: {
    title: 'React Jalali Date Picker & Range Picker | Persian (Shamsi) Calendar',
    description:
      'Jalali / Persian date picker for React — DatePicker, Shamsi range picker with compare, keyboard mask, and TimePicker for forms and ERP dashboards.',
    h1: 'Jalali Date Picker & Persian Range Picker for React',
    lead:
      'Shamsi calendar DatePicker plus analytics-style range comparison — synced period navigation for primary and compare ranges. Includes Mask and TimePicker.',
    docs: 'Live docs',
    playground: 'Interactive playground',
    live: 'Live',
    features: ['ERP range compare', 'Synced navigation', 'Jalali + Gregorian', 'Tiny deps'],
    ctaDocs: 'Read introduction',
    ctaNpm: 'View on npm',
    ctaGithub: 'GitHub source',
    previewLabel: 'Live preview',
    liveGalleryTitle: 'Live component gallery',
    liveGalleryLead: 'Comparative Range, Date, Mask, and Time — all interactive.',
    liveLabels: {
      range: 'Range + compare',
      date: 'Date',
      mask: 'Mask',
      time: 'Time',
    },
    copied: 'Copied',
    copy: 'Copy',
    highlightsTitle: 'Why this library?',
    highlights: [
      {
        title: 'Enterprise compare UX',
        text: 'Dynamics/Analytics-style period comparison for ERP, BI, and large dashboards.',
      },
      {
        title: 'Synced step navigation',
        text: 'Move primary and compare ranges together in one step — beyond typical Dynamics pickers.',
      },
      {
        title: 'Jalali-native & light',
        text: 'Shamsi-first engine with keyboard Mask; only jalaali-js as a runtime date dependency.',
      },
    ],
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
              شمسی و به‌ویژه <strong>مقایسه بازه زمانی در ERP و داشبوردهای سازمانی</strong>
              طراحی شده است. با پشتیبانی از هر دو نوع تاریخ
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
            <h3>مقایسه بازه به سبک Dynamics / Analytics</h3>
            <p>
              هستهٔ محصول، مقایسه‌ی یک بازه با بازه دیگر است — مشابه الگوی
              Google Dynamics و Google Analytics، با پشتیبانی بومی تقویم شمسی و
              مناسب فیلترهای ERP.
            </p>
            <ul>
              <li>مقایسه داده روزانه با روز یا هفته قبل</li>
              <li>بررسی روند فروش فصل جاری نسبت به سال گذشته</li>
              <li>
                ناوبری گامی که بازه اصلی و بازه مقایسه را <strong>هم‌زمان</strong> جابه‌جا
                می‌کند (قابلیتی فراتر از بسیاری از pickerهای enterprise)
              </li>
            </ul>
            <h3>
              <TickIcon /> انتخاب تاریخ
            </h3>
            <p>
              DatePicker با Mask قابل ویرایش و پشتیبانی از
              <strong> TimePicker </strong> دقت تا ثانیه می‌دهد.
            </p>
            <h3>
              <TickIcon /> نگارنده تاریخ (ماسک)
            </h3>
            <p>
              تایپ مستقیم در قالب مشخص، ناوبری کیبورد، تشخیص روزهای ماه و جلوگیری
              از مقدار غیرمجاز.
            </p>
            <h3>
              <TickIcon /> هوک نمایش المان شناور
            </h3>
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
            {...THEME}
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
            primaryColor={THEME.primaryColor}
            highlightColor={THEME.highlightColor}
            tertiaryColor={THEME.tertiaryColor}
          />
        ),
      },
      Mask: {
        component: (
          <Mask
            calendarType="jalali"
            allowClear
            primaryColor={THEME.primaryColor}
            highlightColor={THEME.highlightColor}
          />
        ),
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
            primaryColor={THEME.primaryColor}
            highlightColor={THEME.highlightColor}
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
              Built for Persian (Jalali) date selection in React — and especially
              for <strong>enterprise range comparison in ERP and dashboards</strong> —
              with first-class support for both <strong>Gregorian and Shamsi</strong>{' '}
              calendars.
            </p>
            <p>
              Unlike converters bolted onto Gregorian engines, this library is
              Jalali-native from the ground up.
            </p>
            <p>
              Date math depends on one lightweight package: <code>jalaali-js</code>{' '}
              (Borkowski algorithm).
            </p>
            <h3>Dynamics / Analytics-style compare</h3>
            <p>
              The product core is comparing one period with another — similar to
              Google Dynamics and Analytics UX — with native Jalali support for
              ERP filters and BI screens.
            </p>
            <ul>
              <li>Daily metrics vs yesterday or last week</li>
              <li>Seasonal sales vs the same season last year</li>
              <li>
                Step navigation that moves the <strong>primary and compare</strong>{' '}
                ranges together (beyond many enterprise pickers)
              </li>
            </ul>
            <h3>
              <TickIcon /> Date picker
            </h3>
            <p>
              Masked input plus optional <strong>TimePicker</strong> down to the
              second.
            </p>
            <h3>
              <TickIcon /> Masked date input
            </h3>
            <p>
              Keyboard-friendly segments, month-length awareness, and invalid-entry
              prevention.
            </p>
            <h3>
              <TickIcon /> Floating element hook
            </h3>
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
            {...THEME}
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
            primaryColor={THEME.primaryColor}
            highlightColor={THEME.highlightColor}
            tertiaryColor={THEME.tertiaryColor}
          />
        ),
      },
      Mask: {
        component: (
          <Mask
            calendarType="gregorian"
            allowClear
            primaryColor={THEME.primaryColor}
            highlightColor={THEME.highlightColor}
          />
        ),
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
            primaryColor={THEME.primaryColor}
            highlightColor={THEME.highlightColor}
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

function ensureMeta(
  name: string,
  content: string,
  attr: 'name' | 'property' = 'name'
) {
  let el = document.head.querySelector(
    `meta[${attr}="${name}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function ensureLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function InitialComponent() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [activeSection, setActiveSection] = useState<SectionKey>('QuickStart');
  const [copied, setCopied] = useState(false);
  const seo = SEO[lang];
  const sections = TEXT[lang].sections;
  const active = sections[activeSection];

  const jsonLd = useMemo(
    () =>
      JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Persian Jalali Date Picker for React',
          alternateName: 'react-persian-range-picker',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          softwareVersion: '1.1.0',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: seo.description,
          url: SITE_URL,
          downloadUrl: NPM_URL,
          codeRepository: GITHUB_URL,
          license: 'https://opensource.org/licenses/MIT',
          screenshot: OG_IMAGE,
          author: {
            '@type': 'Person',
            name: 'Hamidreza Fallahi',
            url: 'https://github.com/hamidrezafallahi',
          },
          sameAs: [
            NPM_URL,
            GITHUB_URL,
            'https://www.jsdelivr.com/package/npm/react-persian-range-picker',
          ],
          programmingLanguage: ['TypeScript', 'JavaScript'],
          keywords:
            'jalali date picker, persian date picker react, shamsi datepicker, range picker, انتخابگر تاریخ شمسی, تقویم جلالی',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Jalali Persian Date Picker for React',
          url: SITE_URL,
          inLanguage: [lang === 'fa' ? 'fa-IR' : 'en-US'],
          description: seo.description,
        },
      ]),
    [lang, seo.description]
  );

  useEffect(() => {
    document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.title = seo.title;

    ensureMeta('description', seo.description);
    ensureMeta(
      'keywords',
      lang === 'fa'
        ? 'انتخابگر تاریخ شمسی, دیت پیکر شمسی react, تقویم جلالی, range picker شمسی, jalali datepicker, persian date picker'
        : 'jalali date picker react, persian date picker, shamsi datepicker, react datepicker jalali, date range picker, persian calendar'
    );
    ensureMeta('robots', 'index,follow,max-image-preview:large');
    ensureMeta('theme-color', '#1c39bb');

    ensureMeta('og:title', seo.title, 'property');
    ensureMeta('og:description', seo.description, 'property');
    ensureMeta('og:type', 'website', 'property');
    ensureMeta('og:url', SITE_URL, 'property');
    ensureMeta('og:image', OG_IMAGE, 'property');
    ensureMeta('og:image:alt', 'Jalali Persian date range picker for React', 'property');
    ensureMeta('og:site_name', 'Jalali Date Picker for React', 'property');
    ensureMeta('og:locale', lang === 'fa' ? 'fa_IR' : 'en_US', 'property');

    ensureMeta('twitter:card', 'summary_large_image');
    ensureMeta('twitter:title', seo.title);
    ensureMeta('twitter:description', seo.description);
    ensureMeta('twitter:image', OG_IMAGE);

    ensureLink('canonical', SITE_URL);
    ensureLink('alternate', `${SITE_URL}blog/fa/`, 'fa');
    ensureLink('alternate', `${SITE_URL}blog/en/`, 'en');
    ensureLink('alternate', SITE_URL, 'x-default');
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

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`${styles.page} ${lang === 'en' ? styles.pageEn : ''}`}>
      <a className={styles.srOnly} href="#main-docs">
        {lang === 'fa' ? 'پرش به محتوا' : 'Skip to content'}
      </a>

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a
            className={styles.brandMark}
            href={SITE_URL}
            aria-label="react-persian-range-picker"
          >
            <span className={styles.logo} aria-hidden />
            <span className={styles.brandText}>
              <span className={styles.brandName}>
                {lang === 'fa' ? 'دیت پیکر شمسی' : 'Jalali Date Picker'}
              </span>
              <span className={styles.brandSub}>react-persian-range-picker</span>
            </span>
          </a>

          <div className={styles.topActions}>
            <a className={styles.linkBtn} href={`${SITE_URL}guide/`}>
              {lang === 'fa' ? 'راهنما' : 'Guide'}
            </a>
            <a
              className={styles.linkBtn}
              href={lang === 'fa' ? `${SITE_URL}blog/fa/` : `${SITE_URL}blog/en/`}
            >
              {lang === 'fa' ? 'مقاله' : 'Article'}
            </a>
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

              <div className={styles.installRow}>
                <code className={styles.install}>{INSTALL_CMD}</code>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={copyInstall}
                  aria-label={seo.copy}
                >
                  {copied ? seo.copied : seo.copy}
                </button>
              </div>

              <div className={styles.chips} aria-label="features">
                {seo.features.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className={styles.heroStage} aria-label={seo.previewLabel}>
              <div className={styles.stageChrome}>
                <span className={styles.stageDot} />
                <span className={styles.stageDot} />
                <span className={styles.stageDot} />
                <span className={styles.stageLabel}>{seo.previewLabel}</span>
              </div>
              <div className={styles.stageBody}>
                <div className={styles.stageStack}>
                  <div className={styles.stageItem}>
                    <span className={styles.stageItemLabel}>{seo.liveLabels.range}</span>
                    <RangePicker
                      calendarType={lang === 'fa' ? 'jalali' : 'gregorian'}
                      exportType="timeStamp"
                      showComparison
                      isShowNavigationButton
                      {...THEME}
                    />
                  </div>
                  <div className={styles.stageItem}>
                    <span className={styles.stageItemLabel}>{seo.liveLabels.date}</span>
                    <DatePicker
                      calendarType={lang === 'fa' ? 'jalali' : 'gregorian'}
                      exportType="timeStamp"
                      showMask
                      allowClear
                      primaryColor={THEME.primaryColor}
                      highlightColor={THEME.highlightColor}
                      tertiaryColor={THEME.tertiaryColor}
                    />
                  </div>
                  <div className={styles.stageRow}>
                    <div className={styles.stageItem}>
                      <span className={styles.stageItemLabel}>{seo.liveLabels.mask}</span>
                      <Mask
                        calendarType={lang === 'fa' ? 'jalali' : 'gregorian'}
                        allowClear
                        primaryColor={THEME.primaryColor}
                        highlightColor={THEME.highlightColor}
                      />
                    </div>
                    <div className={styles.stageItem}>
                      <span className={styles.stageItemLabel}>{seo.liveLabels.time}</span>
                      <TimePicker
                        calendarType={lang === 'fa' ? 'jalali' : 'gregorian'}
                        exportType="timeStamp"
                        showSecond
                        primaryColor={THEME.primaryColor}
                        highlightColor={THEME.highlightColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.liveGallery} aria-labelledby="live-gallery-title">
          <div className={styles.liveGalleryHead}>
            <div>
              <h2 id="live-gallery-title" className={styles.liveGalleryTitle}>
                {seo.liveGalleryTitle}
              </h2>
              <p className={styles.liveGalleryLead}>{seo.liveGalleryLead}</p>
            </div>
            <span className={styles.liveBadge}>
              <span className={styles.liveDot} aria-hidden />
              {seo.live}
            </span>
          </div>
          <div className={styles.liveGalleryGrid}>
            <article className={styles.liveCard}>
              <header className={styles.liveCardHead}>
                <h3>{seo.liveLabels.range}</h3>
                <button
                  type="button"
                  className={styles.liveCardLink}
                  onClick={() => setActiveSection('Range')}
                >
                  {sections.Range.title}
                </button>
              </header>
              <div className={styles.liveCardBody}>
                <RangePicker
                  calendarType={lang === 'fa' ? 'jalali' : 'gregorian'}
                  exportType="timeStamp"
                  showComparison
                  isShowNavigationButton
                  {...THEME}
                />
              </div>
            </article>
            <article className={styles.liveCard}>
              <header className={styles.liveCardHead}>
                <h3>{seo.liveLabels.date}</h3>
                <button
                  type="button"
                  className={styles.liveCardLink}
                  onClick={() => setActiveSection('Date')}
                >
                  {sections.Date.title}
                </button>
              </header>
              <div className={styles.liveCardBody}>
                <DatePicker
                  calendarType={lang === 'fa' ? 'jalali' : 'gregorian'}
                  exportType="timeStamp"
                  showTime
                  showSecond
                  showMask
                  allowClear
                  isTodaySelectPreset
                  primaryColor={THEME.primaryColor}
                  highlightColor={THEME.highlightColor}
                  tertiaryColor={THEME.tertiaryColor}
                />
              </div>
            </article>
            <article className={styles.liveCard}>
              <header className={styles.liveCardHead}>
                <h3>{seo.liveLabels.mask}</h3>
                <button
                  type="button"
                  className={styles.liveCardLink}
                  onClick={() => setActiveSection('Mask')}
                >
                  {sections.Mask.title}
                </button>
              </header>
              <div className={styles.liveCardBody}>
                <Mask
                  calendarType={lang === 'fa' ? 'jalali' : 'gregorian'}
                  allowClear
                  isTodaySelectPreset
                  primaryColor={THEME.primaryColor}
                  highlightColor={THEME.highlightColor}
                />
              </div>
            </article>
            <article className={styles.liveCard}>
              <header className={styles.liveCardHead}>
                <h3>{seo.liveLabels.time}</h3>
                <button
                  type="button"
                  className={styles.liveCardLink}
                  onClick={() => setActiveSection('timepicker')}
                >
                  {sections.timepicker.title}
                </button>
              </header>
              <div className={styles.liveCardBody}>
                <TimePicker
                  calendarType={lang === 'fa' ? 'jalali' : 'gregorian'}
                  exportType="timeStamp"
                  showSecond
                  primaryColor={THEME.primaryColor}
                  highlightColor={THEME.highlightColor}
                />
              </div>
            </article>
          </div>
        </section>

        <section className={styles.highlights} aria-labelledby="highlights-title">
          <h2 id="highlights-title" className={styles.highlightsTitle}>
            {seo.highlightsTitle}
          </h2>
          <div className={styles.highlightGrid}>
            {seo.highlights.map((item) => (
              <article key={item.title} className={styles.highlightCard}>
                <h3 className={styles.highlightName}>{item.title}</h3>
                <p className={styles.highlightText}>{item.text}</p>
              </article>
            ))}
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
                        aria-label={`${active.title} demo video`}
                      />
                    </div>
                  )}
                  {active.image && (
                    <div className={styles.mediaFrame}>
                      <img
                        src={active.image}
                        alt={`${active.title} — react-persian-range-picker preview`}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {active.image1 && (
                    <div className={styles.mediaFrame}>
                      <img
                        src={active.image1}
                        alt={`${active.title} alternate preview`}
                        loading="lazy"
                      />
                    </div>
                  )}
                  {active.image2 && (
                    <div className={styles.mediaFrame}>
                      <img
                        src={active.image2}
                        alt={`${active.title} placement preview`}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              )}

              {active.component && (
                <section className={styles.playground} aria-label={seo.playground}>
                  <div className={styles.playgroundLabel}>
                    <span>{seo.playground}</span>
                    <span className={styles.liveBadge}>
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
