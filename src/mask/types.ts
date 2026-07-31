import type { CSSProperties, ReactNode } from 'react';

import type { ExportType } from '../core/type';

/** Single-date input for Mask (not range / multiple). */
export type MaskInputValue = number | string | null | undefined;

/**
 * Committed Mask output:
 * - `number` when `exportType="timeStamp"`
 * - `string` when `exportType="IsoString"`
 * - `null` when invalid commit
 */
export type MaskOutputValue = number | string | null;

/** UI mode: display | year/month/day fields | full select-all editor */
export const MaskMode = {
  Display: 0,
  Separated: 1,
  Full: 2,
} as const;
export type MaskMode = (typeof MaskMode)[keyof typeof MaskMode];

export type MaskSegment = 'year' | 'month' | 'day';
export type MaskErrorTarget = 0 | 1 | 2 | 3; // year | month | day | full
export type MaskParts = [string, string, string];

export type MaskFontStyle = Pick<
  CSSProperties,
  'fontFamily' | 'fontSize' | 'color'
>;

/**
 * Mask works standalone or inside DatePicker.
 * Controlled via `value` / uncontrolled via `defaultValue`.
 */
export interface MaskProps {
  value?: MaskInputValue;
  defaultValue?: MaskInputValue;

  onMaskChange?: (value: MaskOutputValue) => void;
  onError?: (message: string) => void;

  calendarType?: 'jalali' | 'gregorian';
  exportType?: ExportType;

  maskClassName?: string;
  inputClassName?: string;
  maskHeight?: number;
  maskPlaceHolder?: string;

  MaskFontStyle?: MaskFontStyle;
  ErrorClass?: string;
  Style?: CSSProperties;

  suffix?: ReactNode | boolean;
  prefix?: ReactNode | boolean;

  allowClear?: boolean;
  onClear?: () => void;

  dir?: 'ltr' | 'rtl';
  disabled?: boolean;
  isTodaySelectPreset?: boolean;

  tertiaryColor?: string;
  highlightColor?: string;
  primaryColor?: string;
  accentColor?: string;
  neutralColor?: string;
  backgroundColor?: string;
}
