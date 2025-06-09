import {
  useRef,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import type {
  IDate,
  IDateProps,
} from '../core/type';
import { CalenderIcon } from '../icons/CalenderIcon';
import { DatePicker } from '../persianDatePicker';

const MobileDatePicker = ({ ...props }: IDateProps) => {
  const {
    onChange,
    defaultValue,
    locale = "fa",
    tertiaryColor = "#939393", // رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر - رنگ متن
    highlightColor = "#f4f4f4", // رنگ برجسته‌کننده برای هاور، نوتیف یا نقاط توجه
  } = props;

  const [showDate, setShowDate] = useState<IDate | undefined>(defaultValue);
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
    onChange?.(date);
    popoverRef.current?.hidePopover();
  };

  return (
    <>
      <button
        style={{ backgroundColor: highlightColor, color: tertiaryColor }}
        popoverTarget="mobileDateModal"
        className="flex justify-center items-center gap-2 rounded-md w-full h-full min-h-8" // need className
      >
        <CalenderIcon />
        <div>{title}</div>
      </button>
      <div
        popover="auto"
        id="mobileDateModal"
        ref={popoverRef}
        className="border-none w-full h-full"
      >
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
      </div>
    </>
  );
};

export default MobileDatePicker;
