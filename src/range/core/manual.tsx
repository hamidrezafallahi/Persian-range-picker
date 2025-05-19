// import type { ChangeEvent } from "react";

import moment from "moment-jalaali";

import Comparison from "../comparison";
import { DatePicker } from "../persianDatePicker";
import MaskRange from "./maskRange";
import MonthPicker from "./monthPicker";
import type { IBaseProps, IDate } from "./type";
import { ESteps } from "./type";

const Manual = (props: IBaseProps) => {
  const {
    date,
    locale = "fa",
    // defaultValue,
    setDate,
    setZone,
    setStep,
    isShowComparison = true,
    monthPickerClassName,
    model,
    // secondaryColor,
    // tertiaryColor,
    // dangerColor,
    // InputHandleChange,
  } = props;
  const switchHandler = () => {};

  return (
    <div className="flex flex-col items-center gap-4">
      <MonthPicker
        {...props}
        monthPickerClassName={monthPickerClassName}
        dateFromOutside={date}
        onDateChange={(e: IDate) => {
          setDate(e);
          setZone("manual");
          setStep(ESteps.manual);
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
        date={date}
        setDate={setDate}
      />
      {/* <div className="flex gap-1 py-2">
        <Mask
          locale={locale}
          InputHandleChange={InputHandleChangeFrom}
          dateFromOutside={date}
          value={date?.from}
          className={`${maskClassName} text-center text-gray-gray8  w-28 px-2 py-1 rounded-lg font-IRANSans border border-gray-gray6 ${
            date?.from > date?.to && "border-state-error1"
          } `}
          secondaryColor={secondaryColor}
          tertiaryColor={tertiaryColor}
          dangerColor={dangerColor}
        />

        {"  _  "}
        <Mask
          locale={locale}
          InputHandleChange={InputHandleChangeTo}
          value={defaultRange?.to}
          dateFromOutside={defaultRange}
          className={`${maskClassName} text-center text-gray-gray8 w-28 px-2 py-1 rounded-lg font-IRANSans border border-gray-gray6 ${
            date?.from > date?.to && "border-state-error1"
          }`}
          secondaryColor={secondaryColor}
          tertiaryColor={tertiaryColor}
          dangerColor={dangerColor}
        />
      </div> */}

      <DatePicker
        {...props}
        chooseTodayClassName="bg-red-500"
        name="custom range"
        dateFromOutside={date}
        onDateChange={(e: IDate) => {
          setDate({
            from: e.from,
            to: moment(e.to).locale("fa").clone().endOf("day").valueOf(),
          });
          setZone("manual");
          setStep(ESteps.manual);
        }}
        model={model}
        locale={locale}
      />
      <div className="w-full">
        {isShowComparison && (
          <Comparison {...props} switchHandler={switchHandler} />
        )}
      </div>
    </div>
  );
};

export default Manual;
