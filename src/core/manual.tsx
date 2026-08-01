// import type { ChangeEvent } from "react";

import Comparison from '../comparison';
import style from '../main.module.css';
import { Calendar } from '../persianDatePicker';
import { ESteps } from '../persianDatePicker/enum';
import {
  DateValue,
  IManualProps,
} from '../persianDatePicker/type';
import MaskRange from './maskRange';
import MonthPicker from './monthPicker';
import type { IDate } from './type';

const Manual = (props: IManualProps) => {
  const {
    value,
    defaultValue,
    onChange,
    locale = "fa",
    setZone,
    setStep,
    onError,
    showComparison = true,
    monthPickerClassName,
    activeCompareStep,
    componentStep,
    setActiveCompareStep,
    setCompareDate,
    step,
    zone,
    accentColor,
    neutralColor,
    primaryColor,
    tertiaryColor,
    highlightColor,
    secondaryColor,
    backgroundColor,
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
        monthPickerClassName={monthPickerClassName}
        dateFromOutside={value!}
        onDateChange={(e: IDate) => {
          onChange?.({ type: "range", Data: { date: e } });
          setZone?.("manual");
          setStep?.(ESteps.manual);
        }}
        locale={locale}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        backgroundColor={backgroundColor}
        highlightColor={highlightColor}
        tertiaryColor={tertiaryColor}
      />
      <MaskRange
        date={value}
        onError={onError}
        locale={locale}
        onDateChange={(e: IDate) => {
          onChange?.({ type: "range", Data: { date: e } });
          setZone("manual");
          setStep(ESteps.manual);
        }}
      />
      <Calendar
        {...props}
        value={value}
        defaultValue={defaultValue}
        model="range"
        onChange={(e: DateValue) => {
          onChange?.({ type: "range", Data: { date: e } });
          setZone?.("manual");
          setStep?.(ESteps.manual);
        }}
      />
      {showComparison && (
        <Comparison
          switchHandler={switchHandler}
          date={value}
          activeCompareStep={activeCompareStep}
          componentStep={componentStep}
          locale={locale}
          setActiveCompareStep={setActiveCompareStep}
          setCompareDate={setCompareDate}
          step={step}
          zone={zone}
          accentColor={accentColor}
          neutralColor={neutralColor}
          primaryColor={primaryColor}
          tertiaryColor={tertiaryColor}
        />
      )}
    </div>
  );
};

export default Manual;
