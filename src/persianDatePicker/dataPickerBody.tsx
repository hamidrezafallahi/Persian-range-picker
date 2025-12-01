import type {
  FC,
  ReactNode,
} from 'react';

import type { TLocale } from '../core/type';
import style from '../main.module.css';

interface Props {
  datePickerBodyClassName?: string;
  year: number;
  month: number;
  renderMonthBody: (year: number, month: number) => ReactNode;
  locale: TLocale;
 
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
  ${style.w_full} ${style.p_2}
`}
      >
        {renderMonthBody(year, month)}
      </div>
    </div>
  );
};

export default DataPickerBody;
