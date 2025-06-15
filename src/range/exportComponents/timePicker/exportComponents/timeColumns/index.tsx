import React from "react";

type Props = {
  renderHeight?: string;
  // tertiaryColor?: string;
  width?: number;
  renderOptions: (
    count: number,
    unit: "hour" | "minute" | "second"
  ) => React.ReactNode[];
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showSecond?: boolean;
};

export const TimeColumns: React.FC<Props> = ({
  renderHeight,
  renderOptions,
  showSecond,
  width,
}) => {
  return (
    <div className="flex gap-4" style={{ width: width }}>
      {showSecond && (
        <div
          className="flex flex-col gap-4 px-2 overflow-y-auto"
          style={{ maxHeight: renderHeight }}
        >
          {renderOptions(60, "second")}
        </div>
      )}
      <div
        className="flex flex-col gap-4 px-2 overflow-y-auto"
        style={{ maxHeight: renderHeight }}
      >
        {renderOptions(60, "minute")}
      </div>
      <div
        className="flex flex-col gap-4 px-2 overflow-y-auto"
        style={{ maxHeight: renderHeight }}
      >
        {renderOptions(24, "hour")}
      </div>
    </div>
  );
};
