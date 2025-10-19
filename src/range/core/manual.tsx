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
      ${style.mx_auto}
      ${style.xs_w_60}
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
        locale={locale}
        // secondaryColor={secondaryColor}
        // tertiaryColor={tertiaryColor}
        // dangerColor={dangerColor}
        // InputHandleChange={InputHandleChangeFrom}
        // dateFromOutside={date}
        date={date!}
        setDate={setDate!}
      />
      <DatePicker
        {...props}
        name="custom range"
        dateFromOutside={date!}
        onDateChange={(e: IDate) => {
          setDate?.({
            from: e.from,
            to: moment(e.to).locale("fa").clone().endOf("day").valueOf(),
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
