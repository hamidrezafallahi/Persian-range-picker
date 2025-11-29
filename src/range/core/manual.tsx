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
  ITimeZone,
} from '../persianDatePicker/type';
import MaskRange from './maskRange';
import MonthPicker from './monthPicker';
import type {
  IDate,
  TLocale,
} from './type';

interface IProps extends CalendarProps2 {
  step: ESteps;
  zone: ITimeZone;
  date: IDate;
  locale: TLocale;
  onError?:(e:string)=>void
  activeCompareStep: ESteps | null;
  setStep: Dispatch<SetStateAction<ESteps>>;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  setDate: Dispatch<SetStateAction<IDate>>;
  setActiveCompareStep: Dispatch<SetStateAction<ESteps | null>>;
  setZone: Dispatch<SetStateAction<ITimeZone>>;
  componentStep: ESteps;
  showComparison: boolean;
  monthPickerClassName?: string;
  accentColor: string;
  neutralColor: string;
  primaryColor: string;
  tertiaryColor: string;
}

const Manual = (props: IProps) => {
  const {
    date,
    locale = "fa",
    setDate,
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
  console.log(date);
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
        date={date}
        onError={onError}
        locale={locale}
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
        <Comparison
          switchHandler={switchHandler}
          date={date}
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
