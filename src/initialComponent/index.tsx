import { DateMask, Range } from "../range";
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

  const handleNavigateChange = (date: IDate, compareDate: IDate) => {
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

  const HandleSubmitDate = (w: IDate, e: IDate) => {
    console.log(w, e);
  };
  const resetDate = () => {
    console.log("Reject");
  };
  const handleChange = (e: number) => {
    console.log(e);
  };
  return (
    <>
      <div className="range">
        <Range
          device="desktop"
          locale="fa"
          model="range"
          onCompareDateChange={handleCompareDateChange}
          onChange={handleDateChange}
          onNavigateChange={handleNavigateChange}
          handleSubmit={HandleSubmitDate}
          handleReject={resetDate}
        />
        <DateMask onChange={handleChange} />
        <div className="p-3 border">test</div>
      </div>
      <button>template</button>
    </>
  );
}
