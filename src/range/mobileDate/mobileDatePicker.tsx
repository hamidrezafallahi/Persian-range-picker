import { useMemo, useRef, useState } from "react";

import moment from "moment-jalaali";

import { Footer } from "../core/footer";
import { toPersianDigits } from "../core/helper";
import type { IDate, IDateProps, TUnit } from "../core/type";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";
import { TimeColumns } from "../exportComponents/timePicker/exportComponents";

const MobileDatePicker = ({ ...props }: IDateProps) => {
  const {
    onChange,
    defaultValue,
    locale = "fa",
    tertiaryColor = "#939393", // رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر - رنگ متن
    highlightColor = "#f4f4f4", // رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
    primaryColor = "#000",
    chooseTodayClassName = "",
    showTime = false,
    showTimeFormat = "HH:mm:ss",
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    showSecond = true,
    className,
  } = props;
  const initialDate: IDate = useMemo(
    () => ({ from: defaultValue ? defaultValue.from : 0, to: 0 }),
    [defaultValue]
  );

  const [showDate, setShowDate] = useState<IDate>(initialDate);
  const popoverRef = useRef<HTMLDivElement>(null);

 const persian =
     showDate.from > 0
       ? toPersianDigits(
           moment(showDate.from).format(
             showTime ? `jYYYY/jMM/jDD\u2003${showTimeFormat}` : `jYYYY/jMM/jDD`
           )
         )
       : "انتخاب تاریخ";
 
   const gregorian =
     showDate.from > 0
       ? moment(showDate.from).format(
           showTime ? `YYYY/MM/DD\u2003${showTimeFormat}` : `YYYY/MM/DD`
         )
       : "Choose date";
 
   const title = locale === "fa" ? persian : gregorian;

  const handleDateChange = (date: IDate) => {
    setShowDate({ from: date.from, to: 0 });
  };
  const handleSubmit = () => {
    onChange?.({ type: "date", Data: { from: showDate.from, to: 0 } });
    popoverRef.current?.hidePopover();
  };

  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = showDate
      ? moment(showDate.from).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setShowDate({ from: updated.valueOf(), to: 0 });
  };

  const renderOptions = (count: number, unit: TUnit, step = 1) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const active = moment(showDate.from).locale(locale).get(unit);
    return Array.from({ length: Math.ceil(count / step) }, (_, i) => {
      const val = i * step;

      return (
        <button
          key={val}
          onClick={() => handleTimeChange(unit, val)}
          className={`flex justify-center items-center !rounded-md w-6 aspect-square ${
            active === val
              ? "pointer-events-auto opacity-100 text-gray123 "
              : ""
          } `}
          style={{ color: tertiaryColor, fontSize: "14px" }}
        >
          {locale == "fa" ? toPersianDigits(pad(val)) : pad(val)}
        </button>
      );
    });
  };

  const handleClosePopup = () => {
    popoverRef.current?.hidePopover();
  };
  return (
    <div className="range">
      <button
        popoverTarget="mobileDateModal"
        className={`flex justify-between items-center gap-2 px-1 h-9 rounded-md  w-full  ${
          showTime ? "xs:w-40 " : "xs:w-28"
        } ${className}`}
        style={{ color: tertiaryColor, backgroundColor: highlightColor }}
      >
        <div className=" w-full ">{title}</div>{" "}
        <CalenderIcon />
      </button>
      <div
        popover="auto"
        id="mobileDateModal"
        ref={popoverRef}
        className="relative p-0 border-none w-full h-full"
      >
        <div className="p-2">
          {/* ////////////////TODO navigation buttons must change between date and time in situation  */}
          <DatePicker
            {...props}
            locale={locale}
            model="date"
            name="DesktopDate"
            onDateChange={handleDateChange}
            dateFromOutside={{
              from: showDate ? showDate.from : new Date().valueOf(),
              to: 0,
            }}
          />
          {showTime && (
            <div style={{ zIndex: 1000 }}>
              <div
                className="flex justify-center items-center border-b h-9"
                style={{
                  height: "34px",
                  fontSize: "14px",
                  color: tertiaryColor,
                }}
              >
                {locale === "fa"
                  ? toPersianDigits(
                      moment(showDate.from)
                        .locale(locale)
                        .format(showTimeFormat)
                    )
                  : moment(showDate.from).locale(locale).format(showTimeFormat)}
              </div>
              <TimeColumns
                TimeColumnsClassName="flex justify-center items-center  py-2 h-full "
                renderHeight={`${280}px`}
                renderOptions={(count, unit) =>
                  renderOptions(
                    count,
                    unit,
                    unit === "hour"
                      ? hourStep
                      : unit === "minute"
                      ? minuteStep
                      : secondStep
                  )
                }
                hourStep={hourStep}
                minuteStep={minuteStep}
                secondStep={secondStep}
                showSecond={showSecond}
              />
            </div>
          )}
        </div>
        <div className="bottom-0 fixed p-2 w-full" style={{ width: "100" }}>
          <Footer
            setShowDate={setShowDate}
            locale={locale}
            primaryColor={primaryColor}
            highlightColor={highlightColor}
            chooseTodayClassName={chooseTodayClassName}
            showTime={showTime}
            onNowButton={handleClosePopup}
            onTodayButton={handleClosePopup}
            onSubmit={handleSubmit}
            onChange={onChange}    //////type error unknown type fix by net 
          />
        </div>
      </div>
    </div>
  );
};

export default MobileDatePicker;
