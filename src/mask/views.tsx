import React, {
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

import { toPersianDigits } from '../core/helper';
import type { TLocale } from '../core/type';
import style from '../main.module.css';
import type { MaskFontStyle, MaskParts } from './types';

interface MaskDisplayViewProps {
  locale: TLocale;
  parts: MaskParts;
  baseValue: number | null;
  placeholder?: string;
  fontStyle?: MaskFontStyle;
  disabled?: boolean;
  onActivate?: () => void;
}

export function MaskDisplayView({
  locale,
  parts,
  baseValue,
  placeholder,
  fontStyle,
  disabled = false,
  onActivate,
}: MaskDisplayViewProps) {
  const faFont = locale === 'fa' ? style.font_Number_Farsi : '';

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={placeholder ?? '____/__/__'}
      className={`${style.flex} ${style.justify_center} ${style.gap_1} ${style.w_full} ${style.items_center} ${faFont}`}
      style={{ ...fontStyle, outline: 'none', cursor: disabled ? 'not-allowed' : 'text' }}
      onFocus={() => {
        if (!disabled) onActivate?.();
      }}
      onClick={() => {
        if (!disabled) onActivate?.();
      }}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          onActivate?.();
          return;
        }
        // Typing a digit while focused activates edit mode
        if (/^[0-9۰-۹]$/.test(e.key)) {
          e.preventDefault();
          onActivate?.();
        }
      }}
    >
      {baseValue == null ? (
        <div>{placeholder ?? '____/__/__'}</div>
      ) : (
        <>
          <div>
            {locale === 'fa'
              ? toPersianDigits(parts[0] || '____')
              : parts[0] || '____'}
          </div>
          <div>{'/'}</div>
          <div>
            {locale === 'fa'
              ? toPersianDigits(parts[1] || '__')
              : parts[1] || '__'}
          </div>
          <div>{'/'}</div>
          <div>
            {locale === 'fa'
              ? toPersianDigits(parts[2] || '__')
              : parts[2] || '__'}
          </div>
        </>
      )}
    </div>
  );
}

interface MaskSeparatedViewProps {
  locale: TLocale;
  parts: MaskParts;
  fontSize: number;
  fontStyle?: MaskFontStyle;
  inputClassName?: string;
  yearRef: RefObject<HTMLInputElement>;
  monthRef: RefObject<HTMLInputElement>;
  dayRef: RefObject<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const inputBaseStyle = (
  width: number,
  fontSize: number,
  fontStyle?: MaskFontStyle
): CSSProperties => ({
  width,
  fontSize,
  color: fontStyle?.color,
  fontFamily: fontStyle?.fontFamily,
  border: 'none',
  outline: 'none',
  background: 'transparent',
});

export function MaskSeparatedView({
  locale,
  parts,
  fontSize,
  fontStyle,
  inputClassName,
  yearRef,
  monthRef,
  dayRef,
  onChange,
  onClick,
  onKeyDown,
}: MaskSeparatedViewProps) {
  const faFont = locale === 'fa' ? style.font_Number_Farsi : '';
  // Match Display/Full: show Unicode Persian digits in edit mode (font alone is not enough on <input>).
  const display = (raw: string) =>
    locale === 'fa' ? toPersianDigits(raw) : raw;

  return (
    <div
      className={`${style.flex} ${style.justify_center} ${style.items_center} ${style.w_full}`}
    >
      <input
        type="text"
        name="year"
        autoComplete="off"
        ref={yearRef}
        value={display(parts[0])}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        maxLength={4}
        minLength={4}
        className={`${faFont} ${inputClassName ?? ''}`}
        style={inputBaseStyle((4 * fontSize) / 2 + 8, fontSize, fontStyle)}
        placeholder="____"
      />
      <span
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
          width: fontSize / 2,
          fontSize,
          color: fontStyle?.color,
          fontFamily: fontStyle?.fontFamily,
        }}
        className={inputClassName}
      >
        /
      </span>
      <input
        type="text"
        name="month"
        autoComplete="off"
        ref={monthRef}
        value={display(parts[1])}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        maxLength={2}
        minLength={2}
        className={`${faFont} ${inputClassName ?? ''}`}
        style={inputBaseStyle((2 * fontSize) / 2 + 6, fontSize, fontStyle)}
        placeholder="__"
      />
      <span
        style={{
          userSelect: 'none',
          pointerEvents: 'none',
          fontSize,
          color: fontStyle?.color,
          fontFamily: fontStyle?.fontFamily,
          width: fontSize / 2,
        }}
      >
        /
      </span>
      <input
        type="text"
        name="day"
        ref={dayRef}
        value={display(parts[2])}
        autoComplete="off"
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        maxLength={2}
        minLength={2}
        className={`${faFont} ${inputClassName ?? ''}`}
        style={inputBaseStyle((2 * fontSize) / 2 + 6, fontSize, fontStyle)}
        placeholder="__"
      />
    </div>
  );
}

interface MaskFullViewProps {
  compactValue: string;
  fontSize: number;
  fontStyle?: MaskFontStyle;
  inputClassName?: string;
  errorClass?: string;
  errorTargets: number[];
  maskHeight: number;
  fullContainerRef: RefObject<HTMLDivElement>;
  fullInputRef: RefObject<HTMLInputElement>;
  spanRefs: RefObject<HTMLSpanElement>[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocusFull: () => void;
  onSegmentMouseDown: (e: React.MouseEvent<HTMLSpanElement>) => void;
  formatDisplay: (compact: string) => string;
  renderDigit: (item: string) => ReactNode;
}

export function MaskFullView({
  compactValue,
  fontSize,
  fontStyle,
  inputClassName,
  errorClass,
  errorTargets,
  maskHeight,
  fullContainerRef,
  fullInputRef,
  spanRefs,
  onChange,
  onKeyDown,
  onFocusFull,
  onSegmentMouseDown,
  formatDisplay,
  renderDigit,
}: MaskFullViewProps) {
  return (
    <div
      ref={fullContainerRef}
      className={`${style.relative} ${style.flex} ${style.justify_center} ${style.w_full} ${style.text_base} ${style.p_2}`}
      style={{ height: `${maskHeight}px` }}
      dir="ltr"
    >
      <input
        id="full"
        type="text"
        name="full"
        ref={fullInputRef}
        onFocus={onFocusFull}
        autoComplete="off"
        value={compactValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        maxLength={8}
        minLength={8}
        className={`${style.opacity_0} ${style.w_full}`}
        style={{
          width: (8 * fontSize) / 2,
          fontSize,
          color: fontStyle?.color,
          fontFamily: fontStyle?.fontFamily,
        }}
      />
      <div
        className={`${style.z_10} ${style.absolute} ${style.inset_0} ${style.mx_auto} ${style.text_base} ${style.flex} ${style.justify_center} ${style.items_center} ${inputClassName ?? ''}`}
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        style={{ display: 'flex', fontSize }}
      >
        {formatDisplay(compactValue)
          .split('/')
          .map((item, index) => (
            <React.Fragment key={index}>
              <span
                data-name={index === 0 ? 'year' : index === 1 ? 'month' : 'day'}
                ref={spanRefs[index]}
                onMouseDown={onSegmentMouseDown}
                className={`${style.selected_text} ${inputClassName ?? ''}`}
                style={{
                  fontSize,
                  color: fontStyle?.color,
                  fontFamily: fontStyle?.fontFamily,
                }}
              >
                <span
                  style={{ lineHeight: '10px' }}
                  className={`${style.selected_text} ${
                    errorTargets.includes(index) ? errorClass ?? '' : ''
                  }`}
                >
                  {renderDigit(item)}
                </span>
              </span>
              {index !== 2 && (
                <span
                  style={{ width: fontSize / 2 + 6, height: fontSize + 1 }}
                  className={`${style.flex} ${style.justify_center} ${style.items_center} ${style.selected_text}`}
                >
                  /
                </span>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
