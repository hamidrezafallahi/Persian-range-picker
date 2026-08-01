import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';

import type { ExportType, TLocale } from '../core/type';
import {
  MaskMode,
  type MaskErrorTarget,
  type MaskInputValue,
  type MaskParts,
  type MaskProps,
} from './types';
import {
  changeToTimestamp,
  checkDateByRegex,
  compactToParts,
  formatFullValueToTimestamp,
  formatMaskExport,
  getEndOfMonth,
  partsToCompact,
  resolveMaskTimestamp,
  segmentIndex,
  timestampToDateNumbers,
  todayTimestamp,
  toLatinDigits,
} from './utils';

type UseMaskControllerArgs = Pick<
  MaskProps,
  | 'value'
  | 'defaultValue'
  | 'onMaskChange'
  | 'onError'
  | 'onClear'
  | 'exportType'
  | 'isTodaySelectPreset'
  | 'MaskFontStyle'
> & {
  locale: TLocale;
};

export function useMaskController({
  value,
  defaultValue,
  onMaskChange,
  onError,
  onClear,
  exportType = 'IsoString',
  isTodaySelectPreset = false,
  MaskFontStyle,
  locale,
}: UseMaskControllerArgs) {
  const initialParts = useMemo(
    () => timestampToDateNumbers(locale, resolveMaskTimestamp(defaultValue)),
    // seed once from defaultValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const today = todayTimestamp(locale);
  const invalidMessage =
    locale === 'fa' ? 'تاریخ نا معتبر است ' : 'Date is invalid';

  const [parts, setParts] = useState<MaskParts>(initialParts);
  const [baseValue, setBaseValue] = useState<number | null>(() => {
    const fromDefault = resolveMaskTimestamp(defaultValue);
    if (fromDefault !== undefined) return fromDefault;
    return isTodaySelectPreset ? today : null;
  });
  const [compactValue, setCompactValue] = useState(partsToCompact(initialParts));
  const [mode, setMode] = useState<MaskMode>(MaskMode.Display);
  const [errorTargets, setErrorTargets] = useState<MaskErrorTarget[]>([]);

  const compactRef = useRef(compactValue);
  const partsRef = useRef(parts);
  const modeRef = useRef(mode);
  const baseValueRef = useRef(baseValue);

  const rootRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const fullContainerRef = useRef<HTMLDivElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const dayInputRef = useRef<HTMLInputElement>(null);
  const fullInputRef = useRef<HTMLInputElement>(null);
  const span0 = useRef<HTMLSpanElement>(null);
  const span1 = useRef<HTMLSpanElement>(null);
  const span2 = useRef<HTMLSpanElement>(null);
  const spanRefs = [span0, span1, span2];

  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  partsRef.current = parts;
  compactRef.current = compactValue;
  modeRef.current = mode;
  baseValueRef.current = baseValue;

  const emitChange = useCallback(
    (timestamp: number | null) => {
      if (timestamp === null) {
        onMaskChange?.(null);
        return;
      }
      onMaskChange?.(
        formatMaskExport(timestamp, locale, exportType as ExportType)
      );
    },
    [exportType, locale, onMaskChange]
  );

  const commitCompact = useCallback(
    (compact: string): boolean => {
      const latin = toLatinDigits(compact);
      if (latin.length !== 8 || Number.isNaN(Number(latin))) {
        onError?.('Invalid input format');
        return false;
      }
      const year = Number(latin.slice(0, 4));
      const month = Number(latin.slice(4, 6));
      const day = Number(latin.slice(6, 8));
      const dayMax = getEndOfMonth(year, month, locale, onError, 3);
      const fields: Array<{
        value: number;
        min: number;
        max: number;
        target: MaskErrorTarget;
      }> = [
        { value: year, min: 0, max: 9999, target: 0 },
        { value: month, min: 1, max: 12, target: 1 },
        { value: day, min: 1, max: dayMax, target: 2 },
      ];

      for (const field of fields) {
        if (field.value < field.min || field.value > field.max) {
          onError?.(invalidMessage);
          fullInputRef.current?.select?.();
          setErrorTargets((prev) => [
            ...prev.filter((item) => item !== 3 && item !== field.target),
            3,
            field.target,
          ]);
          return false;
        }
      }

      const ts = changeToTimestamp(latin, locale);
      if (!checkDateByRegex(ts, locale)) {
        onError?.(invalidMessage);
        setErrorTargets((prev) => [...prev.filter((item) => item !== 3), 3]);
        return false;
      }

      setErrorTargets([]);
      setBaseValue(ts);
      setParts(compactToParts(latin) as MaskParts);
      emitChange(ts);
      return true;
    },
    [emitChange, invalidMessage, locale, onError]
  );

  const validateSegment = useCallback(
    (raw: string, ref: RefObject<HTMLInputElement>): boolean => {
      if (!ref.current) return false;
      const name = ref.current.name;
      const target = segmentIndex(name);
      const num = Number(raw);
      const dayMax = getEndOfMonth(
        Number(partsRef.current[0]),
        Number(partsRef.current[1]),
        locale,
        onError,
        target
      );
      const ranges = {
        year: { min: 0, max: 9999 },
        month: { min: 1, max: 12 },
        day: { min: 1, max: dayMax },
      } as const;
      const key = name as keyof typeof ranges;
      const { min, max } = ranges[key] ?? ranges.year;

      if (num < min || num > max) {
        ref.current.select();
        setErrorTargets((prev) => [
          ...prev.filter((item) => item !== target),
          target,
        ]);
        if (target !== 2) onError?.(invalidMessage);
        return false;
      }

      setErrorTargets((prev) => prev.filter((item) => item !== target));

      const focusAndSelect = (ref: RefObject<HTMLInputElement>) => {
        const el = ref.current;
        if (!el) return;
        el.focus();
        // Controlled inputs re-render after setParts; select after paint.
        setTimeout(() => {
          el.focus();
          el.select();
        }, 0);
      };

      if (name === 'year') focusAndSelect(monthInputRef);
      else if (name === 'month') focusAndSelect(dayInputRef);

      return true;
    },
    [invalidMessage, locale, onError]
  );

  const commitSeparated = useCallback((): boolean => {
    if (
      !yearInputRef.current ||
      !monthInputRef.current ||
      !dayInputRef.current
    ) {
      return false;
    }
    const ok =
      validateSegment(yearInputRef.current.value, yearInputRef) &&
      validateSegment(monthInputRef.current.value, monthInputRef) &&
      validateSegment(dayInputRef.current.value, dayInputRef);

    if (!ok) {
      emitChange(null);
      onError?.(invalidMessage);
      return false;
    }

    const compact =
      yearInputRef.current.value +
      monthInputRef.current.value +
      dayInputRef.current.value;
    const ts = changeToTimestamp(compact, locale);
    setBaseValue(ts);
    emitChange(ts);
    return true;
  }, [emitChange, invalidMessage, locale, onError, validateSegment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = toLatinDigits(e.target.value).replace(/\D/g, '');
    setErrorTargets((prev) => prev.filter((item) => item !== 3));

    if (e.target.name === 'year') {
      const nextParts: MaskParts = [newValue, partsRef.current[1], partsRef.current[2]];
      partsRef.current = nextParts;
      setParts(nextParts);
      setErrorTargets((prev) => prev.filter((item) => item !== 0));
      if (newValue.length === 4) validateSegment(newValue, yearInputRef);
      return;
    }
    if (e.target.name === 'month') {
      const nextParts: MaskParts = [partsRef.current[0], newValue, partsRef.current[2]];
      partsRef.current = nextParts;
      setParts(nextParts);
      setErrorTargets((prev) => prev.filter((item) => item !== 1));
      if (newValue.length === 2) validateSegment(newValue, monthInputRef);
      return;
    }
    if (e.target.name === 'day') {
      const nextParts: MaskParts = [partsRef.current[0], partsRef.current[1], newValue];
      partsRef.current = nextParts;
      setParts(nextParts);
      setErrorTargets((prev) => prev.filter((item) => item !== 2));
      if (newValue.length === 2) validateSegment(newValue, dayInputRef);
      return;
    }
    if (e.target.name === 'full') {
      setCompactValue(newValue);
      compactRef.current = newValue;
      if (
        newValue.length === 8 &&
        !checkDateByRegex(formatFullValueToTimestamp(newValue, locale), locale)
      ) {
        onError?.(invalidMessage);
        setErrorTargets((prev) => [...prev.filter((item) => item !== 3), 3]);
      }
    }
  };

  const bumpSegment = (value: string, key: string, index: 0 | 1 | 2): string => {
    const numValue = Number(toLatinDigits(value.trim()));
    const delta = key === 'ArrowUp' ? 1 : -1;
    const next = numValue + delta;
    const clamp = (val: number, min: number, max: number) =>
      Math.min(Math.max(val, min), max);
    const pad = (val: number) => val.toString().padStart(2, '0');

    if (index === 0) return clamp(next, 0, 9999).toString();
    if (index === 1) return pad(clamp(next, 1, 12));
    const maxDay = getEndOfMonth(
      Number(partsRef.current[0]),
      Number(partsRef.current[1]),
      locale,
      onError,
      index
    );
    return pad(clamp(next, 1, maxDay));
  };

  const moveToPreviousInput = () => {
    if (!rootRef.current) return;
    const focusable = Array.from(
      rootRef.current.querySelectorAll('input')
    ).sort((a, b) => a.tabIndex - b.tabIndex);
    const active =
      document.activeElement instanceof HTMLInputElement
        ? document.activeElement
        : null;
    const index = active ? focusable.indexOf(active) : -1;
    if (index > 0) focusable[index - 1].focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const activeElement = document.activeElement as HTMLInputElement | null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      if (!(activeElement instanceof HTMLInputElement)) return;
      if (event.key === 'ArrowRight') {
        if (
          activeElement.name === 'year' &&
          yearInputRef.current?.selectionEnd === 4
        ) {
          monthInputRef.current?.focus();
          monthInputRef.current?.select();
          event.preventDefault();
        } else if (
          activeElement.name === 'month' &&
          monthInputRef.current?.selectionEnd === 2
        ) {
          dayInputRef.current?.focus();
          dayInputRef.current?.select();
          event.preventDefault();
        }
      } else if (event.key === 'ArrowLeft') {
        if (
          activeElement.name === 'day' &&
          dayInputRef.current?.selectionEnd === 0
        ) {
          monthInputRef.current?.focus();
          monthInputRef.current?.select();
          event.preventDefault();
        } else if (
          activeElement.name === 'month' &&
          monthInputRef.current?.selectionEnd === 0
        ) {
          yearInputRef.current?.focus();
          yearInputRef.current?.select();
          event.preventDefault();
        }
      }
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (!(activeElement instanceof HTMLInputElement)) return;
      const target = segmentIndex(activeElement.name);
      if (target === 3) return;
      const segment = target as 0 | 1 | 2;
      setParts((prev) => {
        const next: MaskParts = [prev[0], prev[1], prev[2]];
        next[segment] = bumpSegment(next[segment], event.key, segment);
        return next;
      });
      setErrorTargets((prev) => prev.filter((item) => item !== segment));
    }

    if (event.key === 'Enter') {
      if (activeElement?.name === 'full') {
        if (commitCompact(compactValue)) setMode(MaskMode.Display);
        else emitChange(null);
      } else if (commitSeparated()) {
        setMode(MaskMode.Display);
      }
    }

    if (event.key === 'Backspace' && activeElement instanceof HTMLInputElement) {
      if (activeElement.value.length === 0) {
        if (activeElement.name === 'day') {
          monthInputRef.current?.focus();
        } else if (activeElement.name === 'month') {
          yearInputRef.current?.focus();
        } else {
          moveToPreviousInput();
        }
      } else if (activeElement.value.length === 1) {
        activeElement.select();
      }
    }
  };

  const handleClear = useCallback(() => {
    setMode(MaskMode.Display);
    setBaseValue(null);
    const empty: MaskParts = ['', '', ''];
    setParts(empty);
    setCompactValue('');
    compactRef.current = '';
    setErrorTargets([]);
    emitChange(null);
    onClear?.();
  }, [emitChange, onClear]);

  const clearExternalValue = useCallback(() => {
    setMode(MaskMode.Display);
    setBaseValue(null);
    const empty: MaskParts = ['', '', ''];
    setParts(empty);
    setCompactValue('');
    compactRef.current = '';
    setErrorTargets([]);
  }, []);

  const activateSeparatedOnYear = useCallback(() => {
    setMode(MaskMode.Separated);
    setTimeout(() => {
      yearInputRef.current?.focus();
      yearInputRef.current?.select();
    }, 0);
  }, []);

  const handleTripleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.name === 'full') return;
    clickCount.current += 1;
    if (clickCount.current === 3) {
      setMode(MaskMode.Full);
      clearTimeout(clickTimer.current);
      clickCount.current = 0;
      return;
    }
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 500);
  };

  const handleSegmentMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setMode(MaskMode.Separated);
    const name = e.currentTarget.dataset.name;
    const focusLater = (ref: RefObject<HTMLInputElement>) => {
      ref.current?.focus();
      setTimeout(() => ref.current?.select(), 0);
    };
    if (name === 'year') focusLater(yearInputRef);
    else if (name === 'month') focusLater(monthInputRef);
    else if (name === 'day') focusLater(dayInputRef);
  };

  const handleFocusFull = () => {
    fullInputRef.current?.select();
  };

  useEffect(() => {
    const next = partsToCompact(parts);
    setCompactValue(next);
    compactRef.current = next;
  }, [parts]);

  useEffect(() => {
    if (value === null) {
      clearExternalValue();
      return;
    }
    const nextTs = resolveMaskTimestamp(value as MaskInputValue);
    if (nextTs === undefined || nextTs === baseValueRef.current) return;

    const nextParts = timestampToDateNumbers(locale, nextTs);
    const compact = partsToCompact(nextParts);
    setCompactValue(compact);
    compactRef.current = compact;
    setParts(nextParts);
    setBaseValue(nextTs);
  }, [value, locale, clearExternalValue]);

  useEffect(() => {
    if (mode === MaskMode.Full) {
      fullInputRef.current?.focus();
      fullInputRef.current?.select();
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (fullContainerRef.current?.contains(target)) return;
      if (focusRef.current?.contains(target)) {
        setMode(MaskMode.Separated);
        return;
      }

      if (modeRef.current === MaskMode.Full) {
        if (!commitCompact(compactRef.current)) {
          setErrorTargets((prev) => [...prev.filter((item) => item !== 3), 3]);
          setParts(compactToParts(compactRef.current) as MaskParts);
        }
      } else if (
        yearInputRef.current &&
        monthInputRef.current &&
        dayInputRef.current
      ) {
        commitSeparated();
      }
      setMode(MaskMode.Display);
    };

    const handleClickOnInput = (event: MouseEvent) => {
      const target = event.target as Node;
      if (yearInputRef.current?.contains(target)) {
        yearInputRef.current.focus();
      } else if (monthInputRef.current?.contains(target)) {
        monthInputRef.current.focus();
      } else if (dayInputRef.current?.contains(target)) {
        dayInputRef.current.focus();
      }
    };

    document.addEventListener('mouseup', handleClickOnInput);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOnInput);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mode, commitCompact, commitSeparated]);

  const fontSize = useMemo(() => {
    const raw = MaskFontStyle?.fontSize;
    return typeof raw === 'string' ? parseFloat(raw) : raw ?? 14;
  }, [MaskFontStyle?.fontSize, mode]);

  return {
    mode,
    parts,
    baseValue,
    compactValue,
    errorTargets,
    fontSize,
    rootRef,
    focusRef,
    fullContainerRef,
    yearInputRef,
    monthInputRef,
    dayInputRef,
    fullInputRef,
    spanRefs,
    handleChange,
    handleKeyDown,
    handleClear,
    activateSeparatedOnYear,
    handleTripleClick,
    handleSegmentMouseDown,
    handleFocusFull,
    setMode,
  };
}

export type MaskController = ReturnType<typeof useMaskController>;
