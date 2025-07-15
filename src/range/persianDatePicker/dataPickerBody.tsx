import type { FC, ReactNode } from "react";
import style from "../../main.module.css";

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
  // const today = moment().locale(locale).clone().startOf("day").valueOf();
  return (
    <div
      className={`
      ${style.flex}
      ${style.justify_center}
      ${style.w_full}
      ${datePickerBodyClassName}
    `}
      style={{
        display: "flex",
        flexDirection: locale === "fa" ? "row" : "row-reverse",
        flexWrap: "wrap",
      }}
    >
      <div
        className={`
  ${style.w_full}
`}
      >
        {renderMonthBody(year, month)}
      </div>
    </div>
  );
};

export default DataPickerBody;
