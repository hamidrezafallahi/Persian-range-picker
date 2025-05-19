import { useEffect, useState } from "react";

// import { CustomSwitch } from "@components/atoms/defaultElements";
import { stepToTimeIndex, time } from "../core/helper";
import type { IBaseProps } from "../core/type";
import { ESteps } from "../core/type";
import CompareList from "./CompareList";
import CustomSwitch from "./customSwitch/customSwitch";
import ManualCompare from "./manualCompare";
interface IProps extends IBaseProps {
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
  } = props;
  const [showCompare, setShowCompare] = useState(false);

  const handleShowCompare = () => {
    setShowCompare(!showCompare);

    if (showCompare) {
      setActiveCompareStep(366);
    } else {
      switchHandler();
    }
  };

  useEffect(() => {
    const flag =
      time[stepToTimeIndex[componentStep]].toLowerCase() ==
      time[stepToTimeIndex[step]].toLowerCase();
    setShowCompare(flag);
  }, [step, componentStep]);

  return (
    <>
      <div className="flex justify-between w-full">
        <div
          style={{ color: primaryColor }}
          dir={locale == "fa" ? "rtl" : "ltr"}
        >
          {locale == "fa" ? "مقایسه" : "Compare"}
        </div>

        <CustomSwitch checked={showCompare} onChange={handleShowCompare} />
      </div>
      {showCompare && (
        <>
          {step == ESteps.manual ? (
            <ManualCompare {...props} />
          ) : (
            <CompareList {...props} />
          )}
        </>
      )}
    </>
  );
}

export default Comparison;
