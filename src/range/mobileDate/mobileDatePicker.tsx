import { useMemo, useRef, useState } from "react";

import moment from "moment-jalaali";

import { Footer } from "../core/footer";
import { toPersianDigits } from "../core/helper";
import type { IDate, IDateProps } from "../core/type";
import { TimePicker } from "../exportComponents/timePicker";
import { CalenderIcon } from "../icons/CalenderIcon";
import { DatePicker } from "../persianDatePicker";

const MobileDatePicker = ({ ...props }: IDateProps) => {
  const {
    onChange,
    defaultValue,
    locale = "fa",
    tertiaryColor = "#939393", // رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر - رنگ متن
    highlightColor = "#f4f4f4", // رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
    primaryColor = "#000",
    chooseTodayClassName = "",
    showTime = true,
    showTimeFormat = "HH:mm:ss",
  } = props;
  const initialDate: IDate = useMemo(
    () => ({
      from: defaultValue?.from && defaultValue.from > 0 ? defaultValue.from : 0,
      to: 0,
    }),
    [defaultValue]
  );

  const [showDate, setShowDate] = useState<IDate>(initialDate);
  const [situation, setSituation] = useState<boolean>(true);

  const popoverRef = useRef<HTMLDivElement>(null);

  const persian = showDate
    ? moment(showDate.from).format("jYYYY/jMM/jDD")
    : locale === "fa"
    ? "انتخاب تاریخ"
    : "Choose date";

  const Gregorian = showDate
    ? moment(showDate.from).format("YYYY/MM/DD")
    : "Choose date";

  const title = locale === "fa" ? persian : Gregorian;

  const handleDateChange = (date: IDate) => {
    setShowDate(date);
    setSituation(false);
  };
  const handleSetTime = (timestamp: number) => {
    setShowDate({ from: timestamp, to: 0 });
  };
  const handleSubmit = () => {
    onChange?.({ type: "date", date: showDate });
    setSituation(true);
    popoverRef.current?.hidePopover();
  };
  const handleClosePopup = () => {
    popoverRef.current?.hidePopover();
  };

  return (
    <div className="range">
      <button
        style={{ backgroundColor: highlightColor, color: tertiaryColor }}
        popoverTarget="mobileDateModal"
        className="flex justify-between items-center gap-2 px-2 rounded-md w-full sm:w-28 h-9" // need className
      >
        <CalenderIcon />
        <div>{title}</div>
      </button>
      <div
        popover="auto"
        id="mobileDateModal"
        ref={popoverRef}
        className="relative p-0 border-none w-full h-full"
      >
        <div className="p-2">
          {/* ////////////////TODO navigation buttons must change between date and time in situation  */}
          <button
            onClick={() => {
              setSituation(!situation);
            }}
          >
            {situation ? "showTime" : "show date"}
          </button>
          {situation && (
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
          )}

          {!situation && (
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
              <TimePicker
                {...props}
                containerClassName="!w-full !h-full bg-red-400 p-2 "
                displayButtonCount={15}
                defaultValue={new Date(showDate?.from ?? Date.now())}
                flatRender={true}
                onGetValue={handleSetTime}
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
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileDatePicker;
