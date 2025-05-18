import type { FC, ReactNode } from "react";

import moment from "moment-jalaali";
import type { TLocale } from "../core/type";

interface Props {
  datePickerBodyClassName?: string;
  year: number;
  month: number;
  renderMonthBody: (year: number, month: number) => ReactNode;
  locale: TLocale;
  onDateClick: (timestamp: number) => void;
  model: "range" | "date";
  chooseTodayClassName?: string;
  primaryColor?: string;
  highlightColor?: string;
}

const DataPickerBody: FC<Props> = ({
  datePickerBodyClassName,
  year,
  month,
  renderMonthBody,
  locale,
  onDateClick,
  chooseTodayClassName,
  model,
  primaryColor,
  highlightColor,
}) => {
  const today =
    locale == "fa"
      ? moment().locale("fa").clone().startOf("day").valueOf()
      : new Date().setHours(0, 0, 0, 0).valueOf();
  return (
    <div
      className={`flex justify-center  w-full  ${datePickerBodyClassName} `}
      style={{
        display: "flex",
        flexDirection: locale === "fa" ? "row" : "row-reverse",
        flexWrap: "wrap",
      }}
    >
      <div className={`w-full`}>{renderMonthBody(year, month)}</div>
      {model == "date" && (
        <button
          onClick={() => {
            onDateClick(today);
          }}
          style={{ backgroundColor: highlightColor, color: primaryColor }}
          className={` w-full h-10  text-center  ${chooseTodayClassName}`}
        >
          {locale == "fa" ? "انتخاب امروز" : "Choose today"}
        </button>
      )}
    </div>
  );
};

export default DataPickerBody;
