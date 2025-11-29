// import type { ChangeEvent } from "react";

import style from '../../main.module.css';
import Comparison from '../comparison';
import { Calendar } from '../persianDatePicker';
import { ESteps } from '../persianDatePicker/enum';
import { IBaseProps } from '../persianDatePicker/type';
import MaskRange from './maskRange';
import MonthPicker from './monthPicker';
import type { IDate } from './type';

const Manual = (props: IBaseProps) => {
  const {
    date,
    locale = "fa",
    setDate,
    setZone,
    setStep,
    showComparison = true,
    monthPickerClassName,
  } = props;
  const switchHandler = () => {};
  return (
    <div
      className={`
      ${style.flex}
      ${style.flex_col}
      ${style.justify_center}
      ${style.items_center}
      ${style.gap_2}
      ${style.mx_4}
    `}
    >
      <MonthPicker
        {...props}
        monthPickerClassName={monthPickerClassName}
        dateFromOutside={date!}
        onDateChange={(e: IDate) => {
          setDate?.(e);
          setZone?.("manual");
          setStep?.(ESteps.manual);
        }}
        locale={locale}
      />
      <MaskRange {...props}
      setDate={(e: IDate) => {
          setDate?.(e);
          setZone?.("manual");
          setStep?.(ESteps.manual);
        }}
 
 
      />
      <Calendar
        {...props}
        value={date}
        model="range"
        onChange={(e: IDate) => {
          setDate?.(e);
          setZone?.("manual");
          setStep?.(ESteps.manual);
        }}
      />
      {showComparison && (
        <Comparison {...props} switchHandler={switchHandler} />
      )}
    </div>
  );
};

export default Manual;
