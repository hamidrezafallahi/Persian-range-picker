import type { FC, ReactNode } from "react";

import type { TLocale } from "../core/type";

interface Props {
  datePickerBodyClassName?: string;
  year: number;
  month: number;
  renderMonthBody: (year: number, month: number) => ReactNode;
  locale: TLocale;
  onDateClick: (timestamp: number) => void;
}

const DataPickerBody: FC<Props> = ({
  datePickerBodyClassName,
  year,
  month,
  renderMonthBody,
  locale,
}) => {
  return (
    <div
      className={`flex justify-center  w-full ${datePickerBodyClassName} `}
      style={{
        display: "flex",
        flexDirection: locale === "fa" ? "row" : "row-reverse",
        flexWrap: "wrap",
      }}
    >
      <div className={`w-full`}>{renderMonthBody(year, month)}</div>
    </div>
  );
};

export default DataPickerBody;
