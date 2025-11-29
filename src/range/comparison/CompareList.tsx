import {
  Dispatch,
  SetStateAction,
} from 'react';

import style from '../../main.module.css';
import { period } from '../core/helper';
import {
  IDate,
  TLocale,
} from '../core/type';
import { TickIcon } from '../icons/TickIcon';
import { ESteps } from '../persianDatePicker/enum';
import {
  IColorProps,
  ITimeSections,
  ITimeZone,
} from '../persianDatePicker/type';

interface ICompareList extends IColorProps {
  zone: ITimeZone;
  date: IDate;
  setActiveCompareStep: Dispatch<SetStateAction<ESteps | null>>;
  activeCompareStep: ESteps | null;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  componentStep: ESteps|null;
  locale: TLocale;
  accentColor:string;
  tertiaryColor:string;
  neutralColor:string;
}
const CompareList = ({ ...props }: ICompareList) => {
  const {
    date,
    zone,
    setActiveCompareStep,
    activeCompareStep,
    setCompareDate,
    componentStep,
    locale,
    accentColor ,
    tertiaryColor ,
    neutralColor,  
  } = props;

  const timeHandler = (item: ITimeSections) => {
    setCompareDate?.(item.value);
    setActiveCompareStep(item.step);
  };
  const templatePeriods = period(date!, locale, zone!);

  const filteredPeriod = templatePeriods.filter(
    (item) =>
      componentStep &&
      item.step >= componentStep &&
      !(item.timeZone === "lastMonth" && zone === "lastThreeMonth")
  );

  return (
    <>
      {filteredPeriod.map((item, index) => {
        const active = item.step == activeCompareStep;
        const stringDateFrom = new Date(item.value.from).toLocaleDateString(
          `${locale == "fa" ? "fa-IR" : "en-UK"}`,
          {
            weekday: "long",
            month: "long",
            day: "numeric",
          }
        );
        const stringDateTo = new Date(item.value.to).toLocaleDateString(
          `${locale == "fa" ? "fa-IR" : "en-UK"}`,
          {
            weekday: "long",
            month: "long",
            day: "numeric",
          }
        );
        return (
          <button
            key={index}
            type="button"
            onClick={() => timeHandler(item)}
            className={`${style.relative} ${style.flex} ${style.flex_col} ${
              style.border_none
            } ${style.rounded_md} ${style.items_start}
            ${style.gap_y_2} ${style.pb_2} ${style.w_full} ${style.h_fit}
               
                ${index < filteredPeriod.length - 1 && style.border_b}
                `}
            dir={locale == "fa" ? "rtl" : "ltr"}
          >
            <div style={{ color: active ? accentColor : tertiaryColor }}>
              {item.title}
            </div>
            <div
              style={{
                color: active ? neutralColor : tertiaryColor,
              }}
              className={`${style.text_xs} ${style.whitespace_nowrap} ${style.overflow_hidden}`}
            >
              {locale == "fa" ? " از " : "From "}
              {stringDateFrom}
              {locale == "fa" ? " تا " : "To "}
              {stringDateTo}
            </div>
            {active && (
              <span
                className={`${style.absolute} ${style.my_auto}   ${
                  locale == "en" ? style.right_5 : style.left_5
                }`}
              >
                <TickIcon accentColor={accentColor} />
              </span>
            )}
          </button>
        );
      })}
    </>
  );
};
export default CompareList;
