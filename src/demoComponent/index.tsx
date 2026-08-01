import { useMemo, useState, type CSSProperties, type ReactNode } from 'react';

import type { ExportType, IDate, TLocale } from '../core/type';
import { Calendar } from '../persianDatePicker';
import type { CalendarType, DatePickerValue, DateValue } from '../persianDatePicker/type';
import { DatePicker } from '../datePicker';
import { Mask } from '../mask';
import { RangePicker } from '../rangePicker';
import { TimePicker } from '../timePicker';
import moment from '../dateEngine';

type LogItem = { at: string; source: string; payload: unknown };

const SEED_TS = moment('1403/01/15', 'jYYYY/jMM/jDD').startOf('day').valueOf();
const SEED_RANGE: IDate = {
  from: moment('1403/01/01', 'jYYYY/jMM/jDD').startOf('day').valueOf(),
  to: moment('1403/01/20', 'jYYYY/jMM/jDD').endOf('day').valueOf(),
};

const page: CSSProperties = {
  fontFamily: 'Tahoma, "Segoe UI", sans-serif',
  direction: 'rtl',
  background: 'linear-gradient(180deg, #f7f4ef 0%, #eef2f6 100%)',
  minHeight: '100vh',
  padding: '24px 16px 80px',
  color: '#1f2937',
};

const shell: CSSProperties = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
};

const section: CSSProperties = {
  background: 'rgba(255,255,255,0.92)',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
};

const row: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  alignItems: 'center',
  marginBottom: 12,
};

const btn: CSSProperties = {
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#d1d5db',
  background: '#fff',
  borderRadius: 8,
  padding: '6px 10px',
  cursor: 'pointer',
  fontSize: 13,
};

const btnActive: CSSProperties = {
  ...btn,
  background: '#111827',
  color: '#fff',
  borderColor: '#111827',
};

const label: CSSProperties = { fontSize: 13, color: '#4b5563' };
const title: CSSProperties = { margin: '0 0 8px', fontSize: 18, fontWeight: 700 };
const subtitle: CSSProperties = { margin: '0 0 14px', fontSize: 13, color: '#6b7280', lineHeight: 1.7 };
const logBox: CSSProperties = {
  background: '#0b1220',
  color: '#e5e7eb',
  borderRadius: 10,
  padding: 12,
  fontFamily: 'ui-monospace, Consolas, monospace',
  fontSize: 12,
  maxHeight: 220,
  overflow: 'auto',
  direction: 'ltr',
  textAlign: 'left',
};

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" style={active ? btnActive : btn} onClick={onClick}>
      {children}
    </button>
  );
}

function EventLog({ items, onClear }: { items: LogItem[]; onClear: () => void }) {
  return (
    <div style={section}>
      <div style={{ ...row, justifyContent: 'space-between' }}>
        <h2 style={{ ...title, margin: 0 }}>Event Log</h2>
        <button type="button" style={btn} onClick={onClear}>
          پاک کردن لاگ
        </button>
      </div>
      <p style={subtitle}>
        خروجی واقعی `onChange` / `onSubmit` / `onMaskChange` / `onCompareDateChange` اینجا دیده می‌شود.
      </p>
      <pre style={logBox}>
        {items.length === 0
          ? '// هنوز رویدادی ثبت نشده'
          : items
              .map(
                (item) =>
                  `[${item.at}] ${item.source}\n${JSON.stringify(item.payload, null, 2)}`
              )
              .join('\n\n')}
      </pre>
    </div>
  );
}

export default function DemoComponent() {
  const [calendarType, setCalendarType] = useState<CalendarType>('jalali');
  const [exportType, setExportType] = useState<ExportType>('IsoString');
  const [controlled, setControlled] = useState(true);
  const [logs, setLogs] = useState<LogItem[]>([]);

  const [dateValue, setDateValue] = useState<DatePickerValue>(SEED_TS);
  const [dateTimeValue, setDateTimeValue] = useState<DatePickerValue>(SEED_TS);
  const [timeValue, setTimeValue] = useState<number | string | null>(SEED_TS);
  const [maskValue, setMaskValue] = useState<number | string | null>(SEED_TS);
  const [calendarValue, setCalendarValue] = useState<DateValue>(SEED_TS);
  const [rangeValue, setRangeValue] = useState<IDate | null>(SEED_RANGE);

  const locale: TLocale = calendarType === 'jalali' ? 'fa' : 'en';

  const pushLog = (source: string, payload: unknown) => {
    const at = new Date().toLocaleTimeString('fa-IR', { hour12: false });
    setLogs((prev) => [{ at, source, payload }, ...prev].slice(0, 40));
  };

  const seedLabel = useMemo(
    () =>
      locale === 'fa'
        ? moment(SEED_TS).format('jYYYY/jMM/jDD')
        : moment.utc(SEED_TS).format('YYYY/MM/DD'),
    [locale]
  );

  return (
    <div style={page}>
      <div style={shell}>
        <header style={section}>
          <h1 style={{ ...title, fontSize: 24 }}>Manual QA Playground</h1>
          <p style={subtitle}>
            همهٔ کامپوننت‌های عمومی برای تست دستی اینجاست. عرض صفحه را به زیر/بالای ۴۳۱px تغییر بده تا
            حالت mobile/desktop در DatePicker و RangePicker عوض شود. مقدار seed فعلی: <b>{seedLabel}</b>
          </p>

          <div style={row}>
            <span style={label}>تقویم:</span>
            <Toggle
              active={calendarType === 'jalali'}
              onClick={() => setCalendarType('jalali')}
            >
              jalali
            </Toggle>
            <Toggle
              active={calendarType === 'gregorian'}
              onClick={() => setCalendarType('gregorian')}
            >
              gregorian
            </Toggle>
          </div>

          <div style={row}>
            <span style={label}>exportType:</span>
            <Toggle
              active={exportType === 'IsoString'}
              onClick={() => setExportType('IsoString')}
            >
              IsoString
            </Toggle>
            <Toggle
              active={exportType === 'timeStamp'}
              onClick={() => setExportType('timeStamp')}
            >
              timeStamp
            </Toggle>
          </div>

          <div style={row}>
            <span style={label}>حالت مقدار:</span>
            <Toggle active={controlled} onClick={() => setControlled(true)}>
              controlled (value)
            </Toggle>
            <Toggle active={!controlled} onClick={() => setControlled(false)}>
              uncontrolled (defaultValue)
            </Toggle>
          </div>

          <div style={row}>
            <button
              type="button"
              style={btn}
              onClick={() => {
                setDateValue(SEED_TS);
                setDateTimeValue(SEED_TS);
                setTimeValue(SEED_TS);
                setMaskValue(SEED_TS);
                setCalendarValue(SEED_TS);
                setRangeValue(SEED_RANGE);
              }}
            >
              Reset همه به seed
            </button>
            <button
              type="button"
              style={btn}
              onClick={() => {
                setDateValue(null);
                setDateTimeValue(null);
                setTimeValue(null);
                setMaskValue(null);
                setCalendarValue(null);
                setRangeValue(null);
              }}
            >
              Clear همه (null)
            </button>
          </div>

          <ol style={{ ...subtitle, paddingRight: 18, marginBottom: 0 }}>
            <li>DatePicker بدون زمان: انتخاب روز → onChange فوری</li>
            <li>DatePicker + showTime: انتخاب روز نباید ببندد؛ بعد از Ok emit شود</li>
            <li>Mask مستقل و داخل DatePicker با هم sync باشند</li>
            <li>TimePicker / Calendar / Range: clear و set از بیرون</li>
            <li>RangePicker: Accept / Cancel / Compare / Navigation / exportType</li>
            <li>سوییچ jalali ↔ gregorian و IsoString ↔ timeStamp</li>
          </ol>
        </header>

        <EventLog items={logs} onClear={() => setLogs([])} />

        <section style={section}>
          <h2 style={title}>1) DatePicker — روز</h2>
          <p style={subtitle}>
            سناریو: showMask + allowClear + controlled/uncontrolled. Clear باید `onChange(null)` بدهد.
          </p>
          <div style={row}>
            <button
              type="button"
              style={btn}
              onClick={() => setDateValue(SEED_TS)}
            >
              set seed
            </button>
            <button type="button" style={btn} onClick={() => setDateValue(null)}>
              set null
            </button>
            <span style={label}>
              value فعلی:{' '}
              <code style={{ direction: 'ltr' }}>{JSON.stringify(dateValue)}</code>
            </span>
          </div>
          <DatePicker
            key={`dp-day-${calendarType}-${exportType}-${controlled}`}
            calendarType={calendarType}
            exportType={exportType}
            showMask
            allowClear
            {...(controlled
              ? { value: dateValue }
              : { defaultValue: SEED_TS })}
            onClear={() => pushLog('DatePicker.onClear', null)}
            onChange={(e) => {
              setDateValue(e);
              pushLog('DatePicker.onChange', e);
            }}
          />
        </section>

        <section style={section}>
          <h2 style={title}>2) DatePicker — روز + زمان</h2>
          <p style={subtitle}>
            با `showTime`: بعد از انتخاب روز dropdown باز بماند (دسکتاپ) یا به پنل Time برود (موبایل)، و
            فقط با Ok مقدار نهایی emit شود.
          </p>
          <div style={row}>
            <button
              type="button"
              style={btn}
              onClick={() => setDateTimeValue(SEED_TS)}
            >
              set seed
            </button>
            <button
              type="button"
              style={btn}
              onClick={() => setDateTimeValue(null)}
            >
              set null
            </button>
          </div>
          <DatePicker
            key={`dp-time-${calendarType}-${exportType}-${controlled}`}
            calendarType={calendarType}
            exportType={exportType}
            showTime
            showSecond
            showMask
            allowClear
            {...(controlled
              ? { value: dateTimeValue }
              : { defaultValue: SEED_TS })}
            onChange={(e) => {
              setDateTimeValue(e);
              pushLog('DatePicker+Time.onChange', e);
            }}
          />
        </section>

        <section style={section}>
          <h2 style={title}>3) TimePicker</h2>
          <p style={subtitle}>انتخاب زمان مستقل؛ Ok باید طبق exportType خروجی بدهد.</p>
          <div style={row}>
            <button type="button" style={btn} onClick={() => setTimeValue(SEED_TS)}>
              set seed
            </button>
            <button type="button" style={btn} onClick={() => setTimeValue(null)}>
              set null
            </button>
          </div>
          <TimePicker
            key={`tp-${calendarType}-${exportType}-${controlled}`}
            calendarType={calendarType}
            exportType={exportType}
            showSecond
            showNow
            {...(controlled
              ? { value: timeValue }
              : { defaultValue: SEED_TS })}
            onChange={(e) => {
              setTimeValue(e);
              pushLog('TimePicker.onChange', e);
            }}
          />
        </section>

        <section style={section}>
          <h2 style={title}>4) Mask (standalone)</h2>
          <p style={subtitle}>
            حافظه مستقل؛ clear باید `onMaskChange(null)` بدهد. وقتی value از بیرون null شود نباید
            `onClear` فایر شود.
          </p>
          <div style={row}>
            <button type="button" style={btn} onClick={() => setMaskValue(SEED_TS)}>
              set seed
            </button>
            <button type="button" style={btn} onClick={() => setMaskValue(null)}>
              set null (controlled)
            </button>
          </div>
          <Mask
            key={`mask-${calendarType}-${exportType}-${controlled}`}
            calendarType={calendarType}
            exportType={exportType}
            allowClear
            {...(controlled
              ? { value: maskValue }
              : { defaultValue: SEED_TS })}
            onClear={() => pushLog('Mask.onClear', 'user clear')}
            onError={(msg) => pushLog('Mask.onError', msg)}
            onMaskChange={(e) => {
              setMaskValue(e);
              pushLog('Mask.onMaskChange', e);
            }}
          />
        </section>

        <section style={section}>
          <h2 style={title}>5) Calendar</h2>
          <p style={subtitle}>
            مدل date؛ با تغییر value از بیرون، ماه/سال نما باید جابه‌جا شود. null باید انتخاب را پاک کند.
          </p>
          <div style={row}>
            <button
              type="button"
              style={btn}
              onClick={() => setCalendarValue(SEED_TS)}
            >
              set seed
            </button>
            <button
              type="button"
              style={btn}
              onClick={() => setCalendarValue(null)}
            >
              set null
            </button>
          </div>
          <Calendar
            key={`cal-${calendarType}-${controlled}`}
            locale={locale}
            model="date"
            {...(controlled
              ? { value: calendarValue as number | null }
              : { defaultValue: SEED_TS })}
            onChange={(e) => {
              setCalendarValue(e as DateValue);
              pushLog('Calendar.onChange', e);
            }}
          />
        </section>

        <section style={section}>
          <h2 style={title}>6) RangePicker</h2>
          <p style={subtitle}>
            Accept / Cancel / Compare / تب‌های period / ناوبری. خروجی `onChange` و `onSubmit` باید مطابق
            exportType باشد. عرض &lt;۴۳۱px = موبایل fullscreen.
          </p>
          <div style={row}>
            <button
              type="button"
              style={btn}
              onClick={() => setRangeValue(SEED_RANGE)}
            >
              set seed range
            </button>
            <button type="button" style={btn} onClick={() => setRangeValue(null)}>
              set null
            </button>
            <span style={label}>
              value:{' '}
              <code style={{ direction: 'ltr' }}>{JSON.stringify(rangeValue)}</code>
            </span>
          </div>
          <RangePicker
            key={`rp-${calendarType}-${exportType}-${controlled}`}
            calendarType={calendarType}
            exportType={exportType}
            showComparison
            isShowNavigationButton
            {...(controlled
              ? { value: rangeValue }
              : { defaultValue: SEED_RANGE })}
            onError={(e) => pushLog('RangePicker.onError', e)}
            onReject={() => pushLog('RangePicker.onReject', 'cancel')}
            onChange={(e) => {
              const date = (e as { Data?: { date?: IDate } })?.Data?.date;
              if (date) setRangeValue(date);
              pushLog('RangePicker.onChange', e);
            }}
            onCompareDateChange={(e) => pushLog('RangePicker.onCompareDateChange', e)}
            onSubmit={(e) => pushLog('RangePicker.onSubmit', e)}
          />
        </section>

        <section style={section}>
          <h2 style={title}>Checklist سریع</h2>
          <ul style={{ ...subtitle, margin: 0, paddingRight: 18, lineHeight: 1.9 }}>
            <li>Desktop DatePicker: portal کنار دکمه + Footer Today/Ok</li>
            <li>Mobile DatePicker: fullscreen + برگشت از Time به Date</li>
            <li>Mask داخل DatePicker با Calendar همگام است</li>
            <li>exportType=IsoString → string بدون ارقام فارسی</li>
            <li>exportType=timeStamp → number</li>
            <li>Range: تاریخ پایان قبل از شروع → onError</li>
            <li>Range Cancel: draft به مقدار Accept‌شده برمی‌گردد</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
