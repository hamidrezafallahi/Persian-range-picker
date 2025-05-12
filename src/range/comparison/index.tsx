import { useEffect, useState } from "react";

// import { CustomSwitch } from "@components/atoms/defaultElements";
import { stepToTimeIndex, time } from "../core/helper";
import type { IBaseProps } from "../core/type";
import { ESteps } from "../core/type";
import CompareList from "./CompareList";
import CustomSwitch from "./customSwitch/customSwitch";
import ManualCompare from "./manualCompare";

function Comparison({ ...props }: IBaseProps) {
  const {
    locale,
    step,
    componentStep = 366,
    setActiveCompareStep,
    primaryColor = "#000",
  } = props;
  const [showCompare, setShowCompare] = useState(false);
  const [enableCompare, setEnableCompare] = useState(false);

  const handleShowCompare = () => {
    setShowCompare(!showCompare);
    if (showCompare) {
      setActiveCompareStep(366);
    }
  };

  useEffect(() => {
    const flag =
      time[stepToTimeIndex[componentStep]].toLowerCase() ==
      time[stepToTimeIndex[step]].toLowerCase();
    setShowCompare(flag);
    setEnableCompare(flag);
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

        <CustomSwitch
          checked={showCompare}
          disabled={!enableCompare}
          onChange={handleShowCompare}
          className={`*:!shadow-none   ${
            showCompare ? "*:before:!bg-main-black" : "*:before:!bg-gray-gray6"
          } `}
        />
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
