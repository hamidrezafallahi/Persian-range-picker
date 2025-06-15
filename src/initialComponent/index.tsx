import {
  DateMask,
  DesktopDate,
  DesktopRange,
  MobileDate,
  MobileRange,
  TimePicker,
} from "../range";

// import type { IDate } from "../range/core/type";

export function InitialComponent() {
  // const handleDateChange = (w) => {
  //   if (w?.date?.from) {
  //     console.log(
  //       new Date(w.date.from).toLocaleDateString("fa-IR", {
  //         weekday: "long",
  //         month: "long",
  //         day: "numeric",
  //         hour: "numeric",
  //         minute: "numeric",
  //         second: "numeric",
  //       })
  //     );
  //   }
  // };

  // const handleCompareDateChange = (date: IDate, compareDate: IDate) => {
  //   console.log(
  //     "date : ",
  //     new Date(date?.from).toLocaleDateString("fa-IR", {
  //       weekday: "long",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //     }),
  //     new Date(date?.to).toLocaleDateString("fa-IR", {
  //       weekday: "long",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //     }),
  //     "compare date : ",
  //     new Date(compareDate?.from).toLocaleDateString("fa-IR", {
  //       weekday: "long",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //     }),
  //     new Date(compareDate?.to).toLocaleDateString("fa-IR", {
  //       weekday: "long",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //     })
  //   );
  // };

  // const handleNavigateChange = (date: IDate, compareDate: IDate | null) => {
  //   console.log(
  //     "date : ",
  //     new Date(date?.from).toLocaleDateString("fa-IR", {
  //       weekday: "long",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //     }),
  //     new Date(date?.to).toLocaleDateString("fa-IR", {
  //       weekday: "long",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //     }),
  //     "compare date : ",
  //     compareDate &&
  //       new Date(compareDate.from).toLocaleDateString("fa-IR", {
  //         weekday: "long",
  //         month: "long",
  //         day: "numeric",
  //         hour: "numeric",
  //       }),
  //     compareDate &&
  //       new Date(compareDate.to).toLocaleDateString("fa-IR", {
  //         weekday: "long",
  //         month: "long",
  //         day: "numeric",
  //         hour: "numeric",
  //       })
  //   );
  // };

  // const HandleSubmitDate = (w: IDate, e: IDate | null) => {
  //   console.log(w, e);
  // };
  // const resetDate = () => {
  //   console.log("Reject");
  // };
  // const handleChange = (e: number | null) => {
  //   console.log(e);
  // };

  return (
    <>
      {/* <Range
          // device={device}
          // locale={locale}
          // model={model}
          onCompareDateChange={handleCompareDateChange}
          onChange={handleDateChange}
          onNavigateChange={handleNavigateChange}
          handleSubmit={HandleSubmitDate}
          handleReject={resetDate}
        /> */}
      {/* <div className="flex flex-col" dir="rtl"> */}
      <DesktopDate />
      <DesktopRange />
      <MobileDate />
      <MobileRange />
      <DateMask />
      <TimePicker />

      {/* </div> */}
    </>
  );
}
