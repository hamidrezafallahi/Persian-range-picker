import {
  DesktopDate,
  TimePicker,
} from "../range";

 

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
    <div className="flex flex-col gap-2">
      {/*<Range
       device={device}
       locale={locale}
       model={model}
       onCompareDateChange={handleCompareDateChange}
       onChange={handleDateChange}
       onNavigateChange={handleNavigateChange}
       handleSubmit={HandleSubmitDate}
       handleReject={resetDate}
       />
       <div className="flex flex-col" dir="rtl"> */}
      {/* <DesktopRange />
      <MobileDate />
      <MobileRange />
      <DateMask /> */}
      <div 
      style={{display:"flex",justifyContent:"space-between"}}>
      <TimePicker 
      defaultValue={1750242875918}
      onChange={(e)=>{console.log(e,new Date(e).toLocaleDateString("fa-IR", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute:"numeric",
          second:"numeric"      }))}} /> 
      <DesktopDate 
            // defaultValue={{from:1750242875918,to:0}}
      showTime onChange={(e)=>{console.log(e,new Date(e.date.from).toLocaleDateString("fa-IR", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute:"numeric",
          second:"numeric"
        }))}} />
      </div>

      {/* </div> */}
    </div>
  );
}
