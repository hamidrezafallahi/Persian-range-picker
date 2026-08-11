import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import {
  stepToTimeIndex,
  time,
} from '../core/helper';
import {
  IDate,
  TLocale,
} from '../core/type';
import style from '../main.module.css';
import { ESteps } from '../persianDatePicker/enum';
import { ITimeZone } from '../persianDatePicker/type';
import CompareList from './CompareList';
import CustomSwitch from './customSwitch/customSwitch';
import ManualCompare from './manualCompare';

interface IProps {
  step: ESteps;
  zone: ITimeZone;
  date: IDate;
  locale: TLocale;
  setCompareDate: Dispatch<SetStateAction<IDate | null>>;
  setActiveCompareStep: Dispatch<SetStateAction<ESteps | null>>;
activeCompareStep: ESteps|null;
  componentStep: ESteps;
  primaryColor:string 
  accentColor:string
  tertiaryColor:string
  neutralColor:string
  switchHandler: () => void;
}
function Comparison({ ...props }: IProps) {
  const {
    locale,
    step,
    componentStep = 366,
    setActiveCompareStep,
    primaryColor = "#000",
    switchHandler,
    date,
    setCompareDate,
    accentColor,
    tertiaryColor,
    zone,
    neutralColor,
    activeCompareStep
  } = props;
  const [showCompare, setShowCompare] = useState(false);

  const handleShowCompare = () => {
    setShowCompare(!showCompare);

    if (showCompare) {
      setActiveCompareStep?.(366);
    } else {
      switchHandler();
    }
  };

  useEffect(() => {
    const flag =
      time[stepToTimeIndex[componentStep]].toLowerCase() ==
      time[stepToTimeIndex[step!]].toLowerCase();
    setShowCompare(flag);
  }, [step, componentStep]);
  return (
    <>
      <div
        className={`${style.flex} ${style.justify_between} ${style.w_full} `}
      >
        <div
          style={{ color: primaryColor }}
          dir={locale == "fa" ? "rtl" : "ltr"}
        >
          {locale == "fa" ? "مقایسه" : "Compare"}
        </div>

        <CustomSwitch
          checked={showCompare}
          onChange={handleShowCompare}
          ariaLabel={locale == "fa" ? "مقایسه" : "Compare"}
        />
      </div>
      {showCompare && (
        <>
          {step == ESteps.manual ? (
            <ManualCompare
              locale={locale}
              setCompareDate={setCompareDate}
              step={step}
              accentColor={accentColor}
              tertiaryColor={tertiaryColor}
              date={date}
            />
          ) : (
            <CompareList
              activeCompareStep={activeCompareStep}
              componentStep={componentStep}
              date={date}
              locale={locale}
              setActiveCompareStep={setActiveCompareStep}
              setCompareDate={setCompareDate}
              zone={zone}
              accentColor={accentColor}
              tertiaryColor={tertiaryColor}
              neutralColor={neutralColor}
            />
          )}
        </>
      )}
    </>
  );
}

export default Comparison;
