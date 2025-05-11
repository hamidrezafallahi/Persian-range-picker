import { useEffect, useState } from "react";
// import { CustomSwitch } from "@components/atoms/defaultElements";
import { stepToTimeIndex, time } from "../core/helper";
import { ESteps } from "../core/type";
import type { IBaseProps } from "../core/type";
import CompareList from "./CompareList";
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
      <div className="flex justify-between">
        <div
          style={{ color: primaryColor }}
          dir={locale == "fa" ? "rtl" : "ltr"}
        >
          {locale == "fa" ? "مقایسه" : "Compare"}
        </div>
        {/* <CustomSwitch
          checked={showCompare}
          disabled={!enableCompare}
          onChange={handleShowCompare}
          className={`*:!shadow-none   ${
            showCompare ? "*:before:!bg-main-black" : "*:before:!bg-gray-gray6"
          }   [&>.ant-switch-inner]:!bg-[#F5F5F6] [&>.ant-switch-inner]:!border  [&>.ant-switch-inner]:!border-gray-gray6`}
        /> */}
        {/* <CustomSwitch
          checked={showCompare}
          disabled={!enableCompare}
          onChange={handleShowCompare}
          className={`*:!shadow-none   ${
            showCompare ? "*:before:!bg-main-black" : "*:before:!bg-gray-gray6"
          }   [&>.ant-switch-inner]:!bg-[#F5F5F6] [&>.ant-switch-inner]:!border  [&>.ant-switch-inner]:!border-gray-gray6`}
        /> */}
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
