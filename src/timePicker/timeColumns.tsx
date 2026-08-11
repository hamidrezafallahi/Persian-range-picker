import React, { useRef } from 'react';

import style from '../main.module.css';

export type TimeUnit = 'hour' | 'minute' | 'second';

type Props = {
  renderHeight?: string;
  renderOptions: (
    count: number,
    unit: TimeUnit
  ) => React.ReactNode[];
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showSecond?: boolean;
  TimeColumnsClassName?: string;
  /** Unique prefix so multiple pickers do not share hour/minute/second DOM ids. */
  idPrefix?: string;
};

export function timeColumnDomId(idPrefix: string, unit: TimeUnit): string {
  return `${idPrefix}-${unit}`;
}

export function scrollTimeColumn(
  idPrefix: string,
  unit: TimeUnit,
  value: number
): void {
  const targetDiv = document.getElementById(timeColumnDomId(idPrefix, unit));
  if (targetDiv) {
    targetDiv.scrollTop = value * 40;
  }
}

const TimeColumn: React.FC<{
  count: number;
  unit: TimeUnit;
  renderHeight?: string;
  renderOptions: Props['renderOptions'];
  tertiaryColor?: string;
  highlightColor?: string;
  idPrefix: string;
}> = ({ ...props }) => {
  const {
    count,
    unit,
    renderHeight,
    renderOptions,
    tertiaryColor = '#939393',
    idPrefix,
  } = props;
  const title = unit == 'hour' ? 'HH' : unit == 'minute' ? 'MM' : 'SS';
  const ref = useRef(null);
  return (
    <div className={`${style.flex} ${style.flex_col} ${style.gap_4}`}>
      <div
        className={`${style.flex} ${style.justify_center} `}
        style={{ color: tertiaryColor, fontSize: '14px' }}
      >
        {title}
      </div>
      <div
        ref={ref}
        className={`
  ${style.relative}
  ${style.flex}
  ${style.flex_col}
  ${style.gap_4}
  ${style.px_2}
  ${style.overflow_x_hidden}
  ${style.overflow_y_auto}
  ${style.rprp_scrollbar}
`}
        style={{ maxHeight: renderHeight, scrollBehavior: 'smooth' }}
        id={timeColumnDomId(idPrefix, unit)}
      >
        {renderOptions(count, unit)}
      </div>
    </div>
  );
};

export const TimeColumns: React.FC<Props> = ({
  renderHeight,
  renderOptions,
  showSecond,
  TimeColumnsClassName,
  idPrefix = 'rprp-time',
}) => {
  return (
    <div
      className={`
      ${style.flex}
      ${style.w_full}
      ${style.justify_evenly}
      ${style.gap_4}   
      ${TimeColumnsClassName}
    `}
      dir="ltr"
    >
      <TimeColumn
        count={24}
        unit="hour"
        renderHeight={renderHeight}
        renderOptions={renderOptions}
        idPrefix={idPrefix}
      />
      <TimeColumn
        count={60}
        unit="minute"
        renderHeight={renderHeight}
        renderOptions={renderOptions}
        idPrefix={idPrefix}
      />
      {showSecond && (
        <TimeColumn
          count={60}
          unit="second"
          renderHeight={renderHeight}
          renderOptions={renderOptions}
          idPrefix={idPrefix}
        />
      )}
    </div>
  );
};
