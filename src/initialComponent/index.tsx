// import { useState } from 'react';

import {
  DateMask,
  Range,
  DesktopDate,
  DesktopRange,
  MobileDate,
  MobileRange,
} from "../range";
import type { IDate } from "../range/core/type";

export function InitialComponent() {
  const handleDateChange = (w: IDate) => {
    console.log(
      new Date(w?.from).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
      }),
      new Date(w?.to).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
      })
    );
  };

  const handleCompareDateChange = (date: IDate, compareDate: IDate) => {
    console.log(
      "date : ",
      new Date(date?.from).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
      }),
      new Date(date?.to).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
      }),
      "compare date : ",
      new Date(compareDate?.from).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
      }),
      new Date(compareDate?.to).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
      })
    );
  };

  const handleNavigateChange = (date: IDate, compareDate: IDate | null) => {
    console.log(
      "date : ",
      new Date(date?.from).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
      }),
      new Date(date?.to).toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
      }),
      "compare date : ",
      compareDate &&
        new Date(compareDate.from).toLocaleDateString("fa-IR", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
        }),
      compareDate &&
        new Date(compareDate.to).toLocaleDateString("fa-IR", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
        })
    );
  };

  const HandleSubmitDate = (w: IDate, e: IDate | null) => {
    console.log(w, e);
  };
  const resetDate = () => {
    console.log("Reject");
  };
  const handleChange = (e: number) => {
    console.log(e);
  };

  // const device = "desktop";
  // const model = "range";
  // const locale = "fa";

  // const [activeCompareStep, setActiveCompareStep] = useState<ESteps | null>(
  //   null
  // );
  // const [open, setOpen] = useState(false);
  // const [date, setDate] = useState<IDate>({ from: 0, to: 0 });
  // const [compareDate, setCompareDate] = useState<IDate | null>({
  //   from: 0,
  //   to: 0,
  // });
  // const [counter, setCounter] = useState(0);
  // const [step, setStep] = useState<ESteps>(7);
  // const [tabKey, setTabKey] = useState<ITime | string>("manual");
  // const [zone, setZone] = useState<ITimeZone>("manual");

  return (
    <>
      <div className="range">
        <Range
          // device={device}
          // locale={locale}
          // model={model}
          onCompareDateChange={handleCompareDateChange}
          onChange={handleDateChange}
          onNavigateChange={handleNavigateChange}
          handleSubmit={HandleSubmitDate}
          handleReject={resetDate}
        />
        <DesktopDate />
        <DesktopRange />
        <MobileDate />
        <MobileRange />
        <DateMask onChange={handleChange} />
      </div>
    </>
  );
}
