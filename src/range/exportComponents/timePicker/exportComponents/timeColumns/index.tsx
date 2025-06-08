import React from "react";

type Props = {
  renderHeight: string;
  renderOptions: (
    count: number,
    unit: "hour" | "minute" | "second"
  ) => React.ReactNode[];
};

export const TimeColumns: React.FC<Props> = ({
  renderHeight,
  renderOptions,
}) => {
  return (
    <div className="flex gap-4 bg-red-100">
      <div
        className="flex flex-col gap-4 px-0 px-2 overflow-y-auto"
        style={{ height: renderHeight }}
      >
        {renderOptions(24, "hour")}
      </div>
      <div
        className="flex flex-col gap-2 px-2 overflow-y-auto"
        style={{ height: renderHeight }}
      >
        {renderOptions(60, "minute")}
      </div>
      <div
        className="flex flex-col gap-2 px-2 overflow-y-auto"
        style={{ height: renderHeight }}
      >
        {renderOptions(60, "second")}
      </div>
    </div>
  );
};
