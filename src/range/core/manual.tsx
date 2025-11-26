// import type { ChangeEvent } from "react";

import style from '../../main.module.css';
import Comparison from '../comparison';
import { DatePicker } from '../exportComponents/datePicker';
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
 
        value={date!}
        onChange={(e) => {
          setDate?.({
            from: e,
            to:null
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
