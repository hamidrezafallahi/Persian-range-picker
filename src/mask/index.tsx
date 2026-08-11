import { useMemo } from 'react';

import { ClearIcon } from '../assets/icons/ClearIcon';
import { toPersianDigits } from '../core/helper';
import style from '../main.module.css';
import type { MaskProps } from './types';
import { MaskMode } from './types';
import { useMaskController } from './useMaskController';
import { formatDisplayMask, getLocaleFromCalendar } from './utils';
import {
  MaskDisplayView,
  MaskFullView,
  MaskSeparatedView,
} from './views';

const defaultErrorClass = `${style.border_red_700}`;

/**
 * Mask — Jalali/Gregorian date input with three interaction modes:
 * 1. Display (read-only)
 * 2. Separated year / month / day fields
 * 3. Full select-all compact editor (triple-click)
 *
 * Works standalone or embedded inside DatePicker desktop trigger.
 */
export function Mask(props: MaskProps) {
  const {
    calendarType = 'jalali',
    onError,
    inputClassName,
    maskClassName,
    onMaskChange,
    maskHeight = 36,
    suffix,
    allowClear,
    onClear,
    prefix,
    ErrorClass = defaultErrorClass,
    tertiaryColor = '#939393',
    highlightColor = '#f4f4f4',
    disabled = false,
    maskPlaceHolder,
    isTodaySelectPreset = false,
    exportType = 'IsoString',
    MaskFontStyle,
    defaultValue,
    value,
    Style,
  } = props;

  const locale = getLocaleFromCalendar(calendarType);

  // Keep standalone Mask and DatePicker-embedded Mask visually identical.
  // Avoid `unset`/inherit — <button> UA styles otherwise diverge from <div>.
  const defaultFaFont = 'Tahoma, "Segoe UI", sans-serif';
  const resolvedFontStyle = useMemo(
    () => ({
      fontSize: '14px',
      ...MaskFontStyle,
      fontFamily:
        MaskFontStyle?.fontFamily ??
        (calendarType === 'gregorian' ? 'inherit' : defaultFaFont),
    }),
    [MaskFontStyle, calendarType]
  );

  const controller = useMaskController({
    value,
    defaultValue,
    onMaskChange,
    onError,
    onClear,
    exportType,
    isTodaySelectPreset,
    MaskFontStyle: resolvedFontStyle,
    locale,
  });

  const {
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
  } = controller;

  return (
    <div ref={rootRef} style={{ cursor: disabled ? 'not-allowed' : 'auto' }}>
      <div
        className={`
          ${style.flex}
          ${style.justify_center}
          ${style.items_center}
          ${style.gap_2}
          ${style.rounded_md}
          ${style.w_full}
          ${style.xs_w_40}
          ${style.px_1}
          ${maskClassName ?? ''}
          ${errorTargets.length > 0 ? ErrorClass : ''}
        `}
        style={{
          border: errorTargets.length > 0 ? '1px solid red' : undefined,
          height: `${maskHeight}px`,
          color: tertiaryColor,
          backgroundColor: highlightColor,
          pointerEvents: disabled ? 'none' : 'auto',
          userSelect: disabled ? 'none' : 'auto',
          fontFamily: resolvedFontStyle.fontFamily,
          fontSize: resolvedFontStyle.fontSize,
          ...Style,
        }}
      >
        {allowClear ? (
          <button
            type="button"
            onClick={handleClear}
            aria-label="clear"
            className={`
              ${style.flex}
              ${style.justify_center}
              ${style.items_center}
              ${style.p_1}
              ${style.m_0}
              ${style.rounded_full}
              ${style.border_none}
            `}
          >
            <ClearIcon />
          </button>
        ) : (
          suffix && <div>{suffix}</div>
        )}

        {mode !== MaskMode.Full ? (
          <div
            ref={focusRef}
            className={`${style.flex} ${style.justify_center} ${style.w_full} ${style.items_center}`}
            dir="ltr"
          >
            {mode === MaskMode.Display ? (
              <MaskDisplayView
                locale={locale}
                parts={parts}
                baseValue={baseValue}
                placeholder={maskPlaceHolder}
                fontStyle={resolvedFontStyle}
                disabled={disabled}
                onActivate={activateSeparatedOnYear}
              />
            ) : (
              <MaskSeparatedView
                locale={locale}
                parts={parts}
                fontSize={fontSize}
                fontStyle={resolvedFontStyle}
                inputClassName={inputClassName}
                yearRef={yearInputRef}
                monthRef={monthInputRef}
                dayRef={dayInputRef}
                onChange={handleChange}
                onClick={handleTripleClick}
                onKeyDown={handleKeyDown}
              />
            )}
          </div>
        ) : (
          <MaskFullView
            compactValue={compactValue}
            fontSize={fontSize}
            fontStyle={resolvedFontStyle}
            inputClassName={inputClassName}
            errorClass={ErrorClass}
            errorTargets={errorTargets}
            maskHeight={maskHeight}
            fullContainerRef={fullContainerRef}
            fullInputRef={fullInputRef}
            spanRefs={spanRefs}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocusFull={handleFocusFull}
            onSegmentMouseDown={handleSegmentMouseDown}
            formatDisplay={formatDisplayMask}
            renderDigit={(item) =>
              locale === 'fa' ? toPersianDigits(item) : item
            }
          />
        )}

        <div>{prefix && prefix}</div>
      </div>
    </div>
  );
}

export type {
  MaskErrorTarget,
  MaskFontStyle,
  MaskInputValue,
  MaskMode,
  MaskOutputValue,
  MaskParts,
  MaskProps,
  MaskSegment,
} from './types';
export { MaskMode as MaskModeEnum } from './types';
