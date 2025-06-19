import {
  MobileDate,
} from "../range";

export function InitialComponent() {
  // const handleDateChange = (w) => {
  //   console.log(w);
  // };

  // const handleCompareDateChange = (w) => {
  //   console.log(w);
  // };

  // const handleNavigateChange = (w) => {
  //   console.log(w);
  // };

  // const HandleSubmitDate = (w) => {
  //   console.log(w);
  // };
  // const resetDate = () => {
  //   console.log("Reject");
  // };
  // const device =
  //   /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
  //     navigator.userAgent
  //   )
  //     ? "mobile"
  //     : "desktop";
  return (
    <div className="flex flex-col gap-2">
      {/* <Range
      isOpenDropdown
        device={device}
        locale={"fa"}
        model={"range"}
        onCompareDateChange={handleCompareDateChange}
        onChange={handleDateChange}
        onNavigateChange={handleNavigateChange}
        handleSubmit={HandleSubmitDate}
        handleReject={resetDate}
        showComparison
      /> */}
      {/* <div className="flex flex-col" dir="rtl">
        <DesktopRange onChange={handleDateChange} /> */}
        <MobileDate                                            //fix type of properties of this 
        model="date"
        locale="fa"
        showTime
       />
        {/* <MobileRange onChange={handleDateChange} />
        <DateMask onChange={handleDateChange} /> */}
      {/* </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TimePicker
          defaultValue={1750242875918}
          onChange={(e) => {
            console.log(
              e,
              new Date(e).toLocaleDateString("fa-IR", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })
            );
          }}
        /> */}
        {/* <DesktopDate
          // defaultValue={{from:1750242875918,to:0}}
          showTime
          onChange={(e) => {
            console.log(
              e,
              new Date(e.date.from).toLocaleDateString("fa-IR", {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })
            );
          }}
        />
      </div> */}
    </div>
  );
}
