// import type { ChangeEvent } from "react";

import moment from 'moment-jalaali';

import style from '../../main.module.css';
import Comparison from '../comparison';
import { DatePicker } from '../persianDatePicker';
import MaskRange from './maskRange';
import MonthPicker from './monthPicker';
import type {
  IBaseProps,
  IDate,
} from './type';
import { ESteps } from './type';

const Manual = (props: IBaseProps) => {
  const {
    date,
    locale = "fa",
    // defaultValue,
    setDate,
    setZone,
    setStep,
    showComparison = true,
    monthPickerClassName,
    model,
 
    // secondaryColor,
    // tertiaryColor,
    // dangerColor,
    // InputHandleChange,
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
      <MaskRange
        {...props}
        
        // InputHandleChange={InputHandleChangeFrom}
      />
      <DatePicker
        {...props}
        name="custom range"
        value={date!}
        onDateChange={(e: IDate) => {
          setDate?.({
            from: e.from,
            to: e.to !== null ? moment(e.to).locale("fa").clone().endOf("day").valueOf(): e.to,
          });
          setZone?.("manual");
          setStep?.(ESteps.manual);
        }}
        model={model}
        locale={locale}

      />

      {showComparison && (
        <Comparison {...props} switchHandler={switchHandler} />
      )}
    </div>
  );
};

export default Manual;
