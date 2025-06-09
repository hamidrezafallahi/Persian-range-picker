import React from "react";

type TUnit = "hour" | "minute" | "second";

type Props = {
  renderHeight: string;
  renderOptions: (
    count: number,
    unit: "hour" | "minute" | "second"
  ) => React.ReactNode[];
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showSecond?: boolean;
  changeOnScroll?: boolean;
  onScrollChange?: (unit: TUnit, delta: number) => void;
};

export const TimeColumns: React.FC<Props> = ({
  renderHeight,
  renderOptions,
  showSecond,
  changeOnScroll,
  onScrollChange,
}) => {
  const handleWheel = (unit: TUnit) => (e: React.WheelEvent) => {
    if (!changeOnScroll) return;
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    onScrollChange?.(unit, delta);
  };

  return (
    <div className="flex gap-4">
      <div
        className="flex flex-col gap-4 px-2 overflow-y-auto"
        style={{ maxHeight: renderHeight }}
        onWheel={handleWheel("hour")}
      >
        {renderOptions(24, "hour")}
      </div>
      <div
        className="flex flex-col gap-4 px-2 overflow-y-auto"
        style={{ maxHeight: renderHeight }}
        onWheel={handleWheel("minute")}
      >
        {renderOptions(60, "minute")}
      </div>
      {showSecond && (
        <div
          className="flex flex-col gap-4 px-2 overflow-y-auto"
          style={{ maxHeight: renderHeight }}
          onWheel={handleWheel("second")}
        >
          {renderOptions(60, "second")}
        </div>
      )}
    </div>
  );
};
