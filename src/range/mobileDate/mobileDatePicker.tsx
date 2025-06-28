import {
  useEffect,
  useRef,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import { Footer } from '../core/footer';
import { toPersianDigits } from '../core/helper';
import type {
  IDate,
  IDateProps,
  TUnit,
} from '../core/type';
import { TimeColumns } from '../exportComponents/timePicker/exportComponents';
import { CalenderIcon } from '../icons/CalenderIcon';
import { DatePicker } from '../persianDatePicker';

export function MobileDate({ ...props }: IDateProps) {
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
  // const initialDate: number = useMemo(() => {
  //   let temp: number = 0; // Initialize temp as a number
  //   const temp2: any = defaultValue;
  //   if (defaultValue) {
  //     if (temp2 instanceof Date) {
  //       temp = temp2.valueOf();
  //     } else if (typeof defaultValue === "number") {
  //       temp = temp2; // Use the number directly
  //     }
  //   }
  //   return temp;
  // }, [defaultValue]);

  const [showDate, setShowDate] = useState<number>(0);
  const popoverRef = useRef<HTMLDivElement>(null);

  const persian =
    showDate > 0
      ? toPersianDigits(
          moment(showDate).format(
            showTime ? `${showTimeFormat}\u2003jYYYY/jMM/jDD` : `jYYYY/jMM/jDD`
          )
        )
      : "انتخاب تاریخ";

  const gregorian =
    showDate > 0
      ? moment(showDate).format(
          showTime ? `${showTimeFormat}\u2003YYYY/MM/DD` : `YYYY/MM/DD`
        )
      : "Choose date";

  const title = locale === "fa" ? persian : gregorian;

  const handleDateChange = (e: IDate) => {
    setShowDate(e.from);
  };
  const handleSubmit = () => {
    onChange?.({ type: "date", Data: { from: showDate, to: 0 } });
    popoverRef.current?.hidePopover();
  };

  const handleTimeChange = (unit: TUnit, value: number) => {
    const updated = showDate
      ? moment(showDate).locale(locale).set(unit, value)
      : moment().locale(locale).set(unit, value);
    setShowDate(updated.valueOf());
  };

  const renderOptions = (count: number, unit: TUnit, step = 1) => {
    const pad = (num: number) => num.toString().padStart(2, "0");

    const active = moment(showDate).locale(locale).get(unit);
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
  function isDate(value: Date | number | undefined): value is Date {
    return value instanceof Date;
  }

  useEffect(() => {
    let temp: number = 0; // Initialize temp as a number
    const temp2: Date | number | undefined = defaultValue; // Specify a union type

    if (temp2 !== undefined) {
      // Check if temp2 is not undefined
      if (isDate(temp2)) {
        temp = temp2.valueOf();
      } else if (typeof temp2 === "number") {
        temp = temp2; // Use the number directly
      }
    }

    setShowDate(temp);
  }, [defaultValue]);

  return (
    <div className="range">
      <button
        popoverTarget="mobileDateModal"
        className={`flex justify-between items-center gap-2 px-1 h-9 rounded-md  w-full  ${
          showTime ? "xs:w-40 " : "xs:w-28"
        } ${className}`}
        style={{ color: tertiaryColor, backgroundColor: highlightColor }}
      >
        <CalenderIcon />
        <div className="w-full">{title}</div>
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
            defaultValue={
              defaultValue ? { from: defaultValue, to: 0 } : undefined
            }
            locale={locale}
            model="date"
            name="DesktopDate"
            onDateChange={handleDateChange}
            dateFromOutside={{
              from: showDate ?? new Date().valueOf(),
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
                      moment(showDate).locale(locale).format(showTimeFormat)
                    )
                  : moment(showDate).locale(locale).format(showTimeFormat)}
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
            onChange={onChange} //////type error unknown type fix by net
          />
        </div>
      </div>
    </div>
  );
}
