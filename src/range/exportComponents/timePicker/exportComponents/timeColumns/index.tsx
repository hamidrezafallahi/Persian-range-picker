import React, { useRef } from "react";
import style from "../../../../../main.module.css";
type Props = {
  renderHeight?: string;
  renderOptions: (
    count: number,
    unit: "hour" | "minute" | "second"
  ) => React.ReactNode[];
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showSecond?: boolean;
  TimeColumnsClassName?: string;
};

const TimeColumn: React.FC<{
  count: number;
  unit: "hour" | "minute" | "second";
  renderHeight?: string;
  renderOptions: Props["renderOptions"];
}> = ({ count, unit, renderHeight, renderOptions }) => {
  const title = unit == "hour" ? "HH" : unit == "minute" ? "MM" : "SS";
  const ref = useRef(null);
  return (
    <div className={`${style.flex} ${style.flex_col} ${style.gap_4}`}>
      <div
        className={`${style.flex} ${style.justify_center}`}
        style={{
          // position: "sticky",
          // top: 0,
          color: "#939393",
        }}
      >
        {title}
      </div>
      <div
        className={`
  ${style.relative}
  ${style.flex}
  ${style.flex_col}
  ${style.gap_4}
  ${style.px_2}
  ${style.overflow_x_hidden}
  ${style.overflow_y_auto}
`}
        style={{ maxHeight: renderHeight, scrollBehavior: "smooth" }}
        id={unit}
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
}) => {
  return (
    <div
      className={`
      ${style.flex}
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
      />
      <TimeColumn
        count={60}
        unit="minute"
        renderHeight={renderHeight}
        renderOptions={renderOptions}
      />
      {showSecond && (
        <TimeColumn
          count={60}
          unit="second"
          renderHeight={renderHeight}
          renderOptions={renderOptions}
        />
      )}
    </div>
  );
};
