// import type { ChangeEvent } from "react";

import {
  Dispatch,
  SetStateAction,
} from 'react';

import style from '../../main.module.css';
import Comparison from '../comparison';
import { Calendar } from '../persianDatePicker';
import { ESteps } from '../persianDatePicker/enum';
import {
  CalendarProps2,
  DateValue,
  HandleParams,
  ITimeZone,
} from '../persianDatePicker/type';
import MaskRange from './maskRange';
import MonthPicker from './monthPicker';
import type {
  IDate,
  TLocale,
} from './type';

export interface IManualProps extends Omit<CalendarProps2, "onChange"> {
  step: ESteps;
  zone: ITimeZone;
  value: IDate;
  defaultValue: IDate;
  locale: TLocale;
  onError?: (e: string) => void;
  activeCompareStep: ESteps | null;
  setStep: Dispatch<SetStateAction<ESteps>>;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  // setDate: Dispatch<SetStateAction<IDate>>;
  setActiveCompareStep: Dispatch<SetStateAction<ESteps | null>>;
  setZone: Dispatch<SetStateAction<ITimeZone>>;
  componentStep: ESteps;
  showComparison: boolean;
  monthPickerClassName?: string;
  accentColor: string;
  neutralColor: string;
  primaryColor: string;
  tertiaryColor: string;
  onChange: (e: HandleParams) => void;
}

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
