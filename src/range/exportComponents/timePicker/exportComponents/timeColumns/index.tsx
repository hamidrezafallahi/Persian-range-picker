import React from "react";

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
    TimeColumnsClassName?:string

};

const TimeColumn: React.FC<{
  count: number;
  unit: "hour" | "minute" | "second";
  renderHeight?: string;
  renderOptions: Props["renderOptions"];
}> = ({ count, unit, renderHeight, renderOptions }) => {
  return(
  <div
    className="flex flex-col gap-4 px-2 overflow-y-auto overflow-x-hidden"
    style={{ maxHeight: renderHeight }}
  >
    {renderOptions(count, unit)}
  </div>
)
};

export const TimeColumns: React.FC<Props> = ({
  renderHeight,
  renderOptions,
  showSecond,
  TimeColumnsClassName
}) => {
  return (
    <div className={`flex gap-4 ${TimeColumnsClassName}`} >
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
