import moment from "moment-jalaali";

import Comparison from "../comparison";
import { DatePicker } from "../persianDatePicker";
import Mask from "./mask";
import MonthPicker from "./monthPicker";
import type { IBaseProps, IDate } from "./type";
import type { ChangeEvent } from "react";
import { ESteps } from "./type";
const Manual = (props: IBaseProps) => {
  const currentDate = moment().locale("fa");

  const {
    date,
    locale,
    defaultValue,
    setDate,
    setZone,
    setStep,
    isShowComparison = true,
    maskClassName,
    monthPickerClassName,
    tertiaryColor,
    secondaryColor,
    dangerColor,
    type,
  } = props;

  const defaultRange = defaultValue ??
    date ?? {
      from:
        locale === "fa"
          ? currentDate.clone().startOf("jYear").valueOf()
          : currentDate.clone().startOf("year").valueOf(),
      to: currentDate.clone().endOf("day").valueOf(),
    };
  const InputHandleChangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value.toString();
    const dateMoment =
      locale === "fa"
        ? moment(inputDate, "jYYYY/jMM/jDD").locale("fa")
        : moment(inputDate, "YYYY/MM/DD");

    const dateTimestamp = new Date(dateMoment.format("YYYY/MM/DD")).setHours(
      0,
      0,
      0,
      0
    );
    setDate((prevState) => ({
      ...prevState,
      from: dateTimestamp,
    }));
  };
  const InputHandleChangeTo = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value.toString();
    const dateMoment =
      locale === "fa"
        ? moment(inputDate, "jYYYY/jMM/jDD").locale("fa")
        : moment(inputDate, "YYYY/MM/DD");

    const dateTimestamp = new Date(dateMoment.format("YYYY/MM/DD")).setHours(
      0,
      0,
      0,
      0
    );
    setDate((prevState) => ({
      ...prevState,
      to: dateTimestamp,
    }));
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <MonthPicker
        monthPickerClassName={monthPickerClassName}
        dateFromOutside={date}
        onDateChange={(e: IDate) => {
          setDate(e);
          setZone("manual");
          setStep(ESteps.manual);
        }}
        {...props}
      />
      <div className="flex gap-1 py-2">
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
      </div>

      <DatePicker
        chooseTodayClassName="!bg-red-500"
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
        model={type}
        {...props}
      />
      <div className="w-full">
        {isShowComparison && <Comparison {...props} />}
      </div>
    </div>
  );
};

export default Manual;
