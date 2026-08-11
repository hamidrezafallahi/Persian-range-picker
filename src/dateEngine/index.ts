/**
 * Lightweight Jalali/Gregorian date engine (jalaali-js based).
 * Drop-in replacement for the moment-jalaali API surface used by this library.
 * Same Borkowski algorithm as moment-jalaali — without moment's bundle cost.
 */
import {
  isLeapJalaaliYear,
  isValidJalaaliDate,
  jalaaliMonthLength,
  jalaaliToDateObject,
  toGregorian,
  toJalaali,
} from 'jalaali-js';

type Locale = 'fa' | 'en' | string;
type Unit =
  | 'day'
  | 'month'
  | 'year'
  | 'jMonth'
  | 'jYear'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

function pad(n: number, len = 2): string {
  return String(n).padStart(len, '0');
}

/** Days in Gregorian month (month is 1–12). */
function gregorianMonthLength(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function parseParts(input: string, format: string): Record<string, number> | null {
  const tokens = format.match(/jYYYY|jMM|jDD|jM|jD|YYYY|MM|DD|M|D/g);
  if (!tokens) return null;

  let regexStr = '';
  let lastIndex = 0;
  const keys: string[] = [];

  for (const token of tokens) {
    const idx = format.indexOf(token, lastIndex);
    regexStr += format.slice(lastIndex, idx).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    lastIndex = idx + token.length;
    keys.push(token);
    switch (token) {
      case 'jYYYY':
      case 'YYYY':
        regexStr += '(\\d{4})';
        break;
      case 'jMM':
      case 'MM':
        regexStr += '(\\d{2})';
        break;
      case 'jDD':
      case 'DD':
        regexStr += '(\\d{2})';
        break;
      case 'jM':
      case 'M':
        regexStr += '(\\d{1,2})';
        break;
      case 'jD':
      case 'D':
        regexStr += '(\\d{1,2})';
        break;
      default:
        regexStr += '(\\d+)';
    }
  }
  regexStr += format.slice(lastIndex).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const match = new RegExp(`^${regexStr}$`).exec(input);
  if (!match) return null;

  const parts: Record<string, number> = {};
  keys.forEach((key, i) => {
    parts[key] = Number(match[i + 1]);
  });
  return parts;
}

function jalaliToTimestamp(
  jy: number,
  jm: number,
  jd: number,
  h = 0,
  mi = 0,
  s = 0,
  ms = 0,
  utc = false
): number {
  if (utc) {
    const g = toGregorian(jy, jm, jd);
    return Date.UTC(g.gy, g.gm - 1, g.gd, h, mi, s, ms);
  }
  return jalaaliToDateObject(jy, jm, jd, h, mi, s, ms).getTime();
}

function gregorianToTimestamp(
  y: number,
  m: number,
  d: number,
  h = 0,
  mi = 0,
  s = 0,
  ms = 0,
  utc = false
): number {
  if (utc) {
    return Date.UTC(y, m - 1, d, h, mi, s, ms);
  }
  return new Date(y, m - 1, d, h, mi, s, ms).getTime();
}

export class PDate {
  private _d: Date;
  private _locale: Locale = 'en';
  private _utc = false;
  private _valid = true;

  constructor(
    input?: number | string | Date | number[] | null,
    format?: string,
    utc = false
  ) {
    this._utc = utc;

    if (input === undefined || input === null) {
      this._d = new Date();
      return;
    }

    if (input instanceof Date) {
      this._d = new Date(input.getTime());
      if (Number.isNaN(this._d.getTime())) this._valid = false;
      return;
    }

    if (typeof input === 'number') {
      this._d = new Date(input);
      if (Number.isNaN(this._d.getTime())) this._valid = false;
      return;
    }

    if (Array.isArray(input)) {
      const [y, m = 0, d = 1, h = 0, mi = 0, s = 0, ms = 0] = input;
      this._d = utc
        ? new Date(Date.UTC(y, m, d, h, mi, s, ms))
        : new Date(y, m, d, h, mi, s, ms);
      if (Number.isNaN(this._d.getTime())) this._valid = false;
      return;
    }

    if (typeof input === 'string') {
      if (format) {
        const parts = parseParts(input, format);
        if (!parts) {
          this._d = new Date(NaN);
          this._valid = false;
          return;
        }

        const isJalali = Object.keys(parts).some((k) => k.startsWith('j'));
        const h = 0;
        const mi = 0;
        const s = 0;

        if (isJalali) {
          const jy = parts.jYYYY ?? 1300;
          const jm = parts.jMM ?? parts.jM ?? 1;
          const jd = parts.jDD ?? parts.jD ?? 1;
          if (jm < 1 || jm > 12 || jd < 1 || jd > jalaaliMonthLength(jy, jm)) {
            // Allow partial parses like year-only / year-month for mask
            if (!parts.jDD && !parts.jD) {
              const safeDay = 1;
              this._d = new Date(
                jalaliToTimestamp(jy, Math.min(Math.max(jm, 1), 12), safeDay, h, mi, s, 0, utc)
              );
              return;
            }
            this._d = new Date(NaN);
            this._valid = false;
            return;
          }
          this._d = new Date(jalaliToTimestamp(jy, jm, jd, h, mi, s, 0, utc));
        } else {
          const y = parts.YYYY ?? 1970;
          const m = parts.MM ?? parts.M ?? 1;
          const d = parts.DD ?? parts.D ?? 1;
          if (m < 1 || m > 12 || d < 1 || d > gregorianMonthLength(y, m)) {
            // Allow partial parses like year-only / year-month for mask
            if (!parts.DD && !parts.D) {
              const safeDay = 1;
              const safeMonth = Math.min(Math.max(m, 1), 12);
              this._d = new Date(
                gregorianToTimestamp(y, safeMonth, safeDay, h, mi, s, 0, utc)
              );
              return;
            }
            this._d = new Date(NaN);
            this._valid = false;
            return;
          }
          this._d = new Date(gregorianToTimestamp(y, m, d, h, mi, s, 0, utc));
          // Reject silent overflow (e.g. Feb 31 → March) if Date still mutated.
          const gy = utc ? this._d.getUTCFullYear() : this._d.getFullYear();
          const gm = (utc ? this._d.getUTCMonth() : this._d.getMonth()) + 1;
          const gd = utc ? this._d.getUTCDate() : this._d.getDate();
          if (gy !== y || gm !== m || gd !== d) {
            this._d = new Date(NaN);
            this._valid = false;
            return;
          }
        }
        if (Number.isNaN(this._d.getTime())) this._valid = false;
        return;
      }

      // ISO / native parse
      const parsed = new Date(input);
      this._d = parsed;
      if (Number.isNaN(parsed.getTime())) this._valid = false;
      return;
    }

    this._d = new Date(NaN);
    this._valid = false;
  }

  clone(): PDate {
    const c = new PDate(this._d.getTime(), undefined, this._utc);
    c._locale = this._locale;
    c._valid = this._valid;
    return c;
  }

  locale(): Locale;
  locale(loc: Locale): PDate;
  locale(loc?: Locale): PDate | Locale {
    if (loc === undefined) return this._locale;
    this._locale = loc;
    return this;
  }

  utc(): PDate {
    const c = this.clone();
    c._utc = true;
    return c;
  }

  isValid(): boolean {
    return this._valid && !Number.isNaN(this._d.getTime());
  }

  valueOf(): number {
    return this._d.getTime();
  }

  toDate(): Date {
    return new Date(this._d.getTime());
  }

  toISOString(): string {
    return this._d.toISOString();
  }

  private getY(): number {
    return this._utc ? this._d.getUTCFullYear() : this._d.getFullYear();
  }
  private getM(): number {
    return this._utc ? this._d.getUTCMonth() : this._d.getMonth();
  }
  private getD(): number {
    return this._utc ? this._d.getUTCDate() : this._d.getDate();
  }
  private getH(): number {
    return this._utc ? this._d.getUTCHours() : this._d.getHours();
  }
  private getMi(): number {
    return this._utc ? this._d.getUTCMinutes() : this._d.getMinutes();
  }
  private getS(): number {
    return this._utc ? this._d.getUTCSeconds() : this._d.getSeconds();
  }
  private getMs(): number {
    return this._utc ? this._d.getUTCMilliseconds() : this._d.getMilliseconds();
  }
  private getDow(): number {
    return this._utc ? this._d.getUTCDay() : this._d.getDay();
  }

  private setParts(
    y: number,
    m: number,
    d: number,
    h?: number,
    mi?: number,
    s?: number,
    ms?: number
  ): void {
    const hh = h ?? this.getH();
    const mm = mi ?? this.getMi();
    const ss = s ?? this.getS();
    const mss = ms ?? this.getMs();
    if (this._utc) {
      this._d = new Date(Date.UTC(y, m, d, hh, mm, ss, mss));
    } else {
      this._d = new Date(y, m, d, hh, mm, ss, mss);
    }
  }

  private getJalali() {
    if (!this.isValid()) {
      return { jy: NaN, jm: NaN, jd: NaN };
    }
    return toJalaali(this.getY(), this.getM() + 1, this.getD());
  }

  year(): number;
  year(v: number): PDate;
  year(v?: number): number | PDate {
    if (v === undefined) return this.getY();
    this.setParts(v, this.getM(), this.getD());
    return this;
  }

  month(): number;
  month(v: number): PDate;
  month(v?: number): number | PDate {
    if (v === undefined) return this.getM();
    this.setParts(this.getY(), v, this.getD());
    return this;
  }

  date(): number;
  date(v: number): PDate;
  date(v?: number): number | PDate {
    if (v === undefined) return this.getD();
    this.setParts(this.getY(), this.getM(), v);
    return this;
  }

  jYear(): number;
  jYear(v: number): PDate;
  jYear(v?: number): number | PDate {
    const j = this.getJalali();
    if (v === undefined) return j.jy;
    const maxDay = jalaaliMonthLength(v, j.jm);
    const jd = Math.min(j.jd, maxDay);
    const ts = jalaliToTimestamp(
      v,
      j.jm,
      jd,
      this.getH(),
      this.getMi(),
      this.getS(),
      this.getMs(),
      this._utc
    );
    this._d = new Date(ts);
    return this;
  }

  jMonth(): number;
  jMonth(v: number): PDate;
  jMonth(v?: number): number | PDate {
    const j = this.getJalali();
    if (v === undefined) return j.jm - 1; // 0-indexed like moment-jalaali
    const jm = v + 1;
    const maxDay = jalaaliMonthLength(j.jy, jm);
    const jd = Math.min(j.jd, maxDay);
    const ts = jalaliToTimestamp(
      j.jy,
      jm,
      jd,
      this.getH(),
      this.getMi(),
      this.getS(),
      this.getMs(),
      this._utc
    );
    this._d = new Date(ts);
    return this;
  }

  jDate(): number;
  jDate(v: number): PDate;
  jDate(v?: number): number | PDate {
    const j = this.getJalali();
    if (v === undefined) return j.jd;
    const maxDay = jalaaliMonthLength(j.jy, j.jm);
    const jd = Math.min(v, maxDay);
    const ts = jalaliToTimestamp(
      j.jy,
      j.jm,
      jd,
      this.getH(),
      this.getMi(),
      this.getS(),
      this.getMs(),
      this._utc
    );
    this._d = new Date(ts);
    return this;
  }

  hour(): number;
  hour(v: number): PDate;
  hour(v?: number): number | PDate {
    if (v === undefined) return this.getH();
    this.setParts(this.getY(), this.getM(), this.getD(), v);
    return this;
  }

  minute(): number;
  minute(v: number): PDate;
  minute(v?: number): number | PDate {
    if (v === undefined) return this.getMi();
    this.setParts(this.getY(), this.getM(), this.getD(), this.getH(), v);
    return this;
  }

  second(): number;
  second(v: number): PDate;
  second(v?: number): number | PDate {
    if (v === undefined) return this.getS();
    this.setParts(
      this.getY(),
      this.getM(),
      this.getD(),
      this.getH(),
      this.getMi(),
      v
    );
    return this;
  }

  /** Moment-compatible weekday get/set (0=Sun … 6=Sat). */
  day(): number;
  day(v: number): PDate;
  day(v?: number): number | PDate {
    if (v === undefined) return this.getDow();
    const current = this.getDow();
    const diff = v - current;
    this._d = new Date(this._d.getTime() + diff * 86400000);
    return this;
  }

  get(unit: Unit | string): number {
    switch (unit) {
      case 'year':
        return this.getY();
      case 'month':
        return this.getM();
      case 'day':
        return this.getD();
      case 'hour':
        return this.getH();
      case 'minute':
        return this.getMi();
      case 'second':
        return this.getS();
      case 'millisecond':
        return this.getMs();
      case 'jYear':
        return this.getJalali().jy;
      case 'jMonth':
        return this.getJalali().jm - 1;
      default:
        return NaN;
    }
  }

  set(unit: Unit | string, value: number): PDate {
    switch (unit) {
      case 'year':
        this.year(value);
        break;
      case 'month':
        this.month(value);
        break;
      case 'date':
      case 'day':
        // moment's set('date') sets day-of-month; set('day') is weekday.
        // This library uses set('hour'|'minute'|'second') and get(unit) for time.
        // For 'day' as time unit in get/set of TimePicker it's day-of-month via get('day')? 
        // Looking at TimePicker: unit is "hour"|"minute"|"second" only.
        this.date(value);
        break;
      case 'hour':
        this.hour(value);
        break;
      case 'minute':
        this.minute(value);
        break;
      case 'second':
        this.second(value);
        break;
      case 'jYear':
        this.jYear(value);
        break;
      case 'jMonth':
        this.jMonth(value);
        break;
      default:
        break;
    }
    return this;
  }

  startOf(unit: Unit | string): PDate {
    switch (unit) {
      case 'day':
        this.setParts(this.getY(), this.getM(), this.getD(), 0, 0, 0, 0);
        break;
      case 'month':
        this.setParts(this.getY(), this.getM(), 1, 0, 0, 0, 0);
        break;
      case 'year':
        this.setParts(this.getY(), 0, 1, 0, 0, 0, 0);
        break;
      case 'jMonth': {
        const j = this.getJalali();
        this._d = new Date(
          jalaliToTimestamp(j.jy, j.jm, 1, 0, 0, 0, 0, this._utc)
        );
        break;
      }
      case 'jYear': {
        const j = this.getJalali();
        this._d = new Date(
          jalaliToTimestamp(j.jy, 1, 1, 0, 0, 0, 0, this._utc)
        );
        break;
      }
      default:
        break;
    }
    return this;
  }

  endOf(unit: Unit | string): PDate {
    switch (unit) {
      case 'day':
        this.setParts(this.getY(), this.getM(), this.getD(), 23, 59, 59, 999);
        break;
      case 'month': {
        const last = new Date(this.getY(), this.getM() + 1, 0).getDate();
        this.setParts(this.getY(), this.getM(), last, 23, 59, 59, 999);
        break;
      }
      case 'year':
        this.setParts(this.getY(), 11, 31, 23, 59, 59, 999);
        break;
      case 'jMonth': {
        const j = this.getJalali();
        if (
          !Number.isFinite(j.jy) ||
          !Number.isFinite(j.jm) ||
          j.jy < -61 ||
          j.jy > 3177 ||
          j.jm < 1 ||
          j.jm > 12
        ) {
          break;
        }
        const last = jalaaliMonthLength(j.jy, j.jm);
        this._d = new Date(
          jalaliToTimestamp(j.jy, j.jm, last, 23, 59, 59, 999, this._utc)
        );
        break;
      }
      case 'jYear': {
        const j = this.getJalali();
        if (!Number.isFinite(j.jy) || j.jy < -61 || j.jy > 3177) {
          break;
        }
        const last = jalaaliMonthLength(j.jy, 12);
        this._d = new Date(
          jalaliToTimestamp(j.jy, 12, last, 23, 59, 59, 999, this._utc)
        );
        break;
      }
      default:
        break;
    }
    return this;
  }

  add(amount: number, unit: Unit | string): PDate {
    switch (unit) {
      case 'day':
        this._d = new Date(this._d.getTime() + amount * 86400000);
        break;
      case 'month': {
        const y = this.getY();
        const m = this.getM() + amount;
        const d = this.getD();
        const target = new Date(y, m, 1);
        const last = new Date(
          target.getFullYear(),
          target.getMonth() + 1,
          0
        ).getDate();
        this.setParts(
          target.getFullYear(),
          target.getMonth(),
          Math.min(d, last)
        );
        break;
      }
      case 'year':
        this.year(this.getY() + amount);
        break;
      case 'jMonth': {
        const j = this.getJalali();
        let total = (j.jy * 12 + (j.jm - 1)) + amount;
        const jy = Math.floor(total / 12);
        const jm = (total % 12) + 1;
        const last = jalaaliMonthLength(jy, jm);
        const jd = Math.min(j.jd, last);
        this._d = new Date(
          jalaliToTimestamp(
            jy,
            jm,
            jd,
            this.getH(),
            this.getMi(),
            this.getS(),
            this.getMs(),
            this._utc
          )
        );
        break;
      }
      case 'jYear': {
        this.jYear((this.jYear() as number) + amount);
        break;
      }
      case 'hour':
        this._d = new Date(this._d.getTime() + amount * 3600000);
        break;
      case 'minute':
        this._d = new Date(this._d.getTime() + amount * 60000);
        break;
      case 'second':
        this._d = new Date(this._d.getTime() + amount * 1000);
        break;
      default:
        break;
    }
    return this;
  }

  subtract(amount: number, unit: Unit | string): PDate {
    return this.add(-amount, unit);
  }

  format(fmt: string): string {
    if (!this.isValid()) {
      return 'Invalid date';
    }
    const j = this.getJalali();
    const map: Record<string, string> = {
      jYYYY: String(j.jy),
      jMM: pad(j.jm),
      jDD: pad(j.jd),
      jM: String(j.jm),
      jD: String(j.jd),
      YYYY: String(this.getY()),
      MM: pad(this.getM() + 1),
      DD: pad(this.getD()),
      M: String(this.getM() + 1),
      D: String(this.getD()),
      HH: pad(this.getH()),
      mm: pad(this.getMi()),
      ss: pad(this.getS()),
      SSS: pad(this.getMs(), 3),
      ddd: DAY_NAMES[this.getDow()],
      Z: (() => {
        if (this._utc) return '+00:00';
        const offset = -this._d.getTimezoneOffset();
        const sign = offset >= 0 ? '+' : '-';
        const abs = Math.abs(offset);
        return `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
      })(),
    };

    // Longer tokens first
    return fmt.replace(
      /jYYYY|jMM|jDD|jM|jD|YYYY|SSS|HH|mm|ss|MM|DD|ddd|M|D|Z/g,
      (token) => map[token] ?? token
    );
  }
}

function momentFactory(
  input?: number | string | Date | number[] | PDate | null,
  format?: string
): PDate {
  if (input instanceof PDate) return input.clone();
  return new PDate(input, format, false);
}

momentFactory.utc = function utc(
  input?: number | string | Date | number[] | PDate | null,
  format?: string
): PDate {
  if (input instanceof PDate) {
    return input.clone().utc();
  }
  return new PDate(input as number | string | Date | number[] | null, format, true);
};

momentFactory.jDaysInMonth = function jDaysInMonth(
  year: number,
  month: number
): number {
  // moment-jalaali: month is 0-indexed
  return jalaaliMonthLength(year, month + 1);
};

momentFactory.isLeapJalaaliYear = isLeapJalaaliYear;
momentFactory.isValidJalaaliDate = isValidJalaaliDate;

export default momentFactory;
export {
  isLeapJalaaliYear,
  isValidJalaaliDate,
  jalaaliMonthLength,
  jalaaliToDateObject,
  toGregorian,
  toJalaali,
};
export type { Locale, Unit };
