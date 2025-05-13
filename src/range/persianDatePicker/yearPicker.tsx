import type { FC } from 'react';
import {
  useMemo,
  useState,
} from 'react';

import { LeftChevron } from '../icons/LeftChevron';
import { RightChevron } from '../icons/RightChevron';
import { convertToPersianNumbers } from './helper';

interface Props {
  currentYear: number;
  onSelectYear: (year: number) => void;
  yearPickerClassName?: string;
  backgroundColor?: string;
  secondaryColor?: string;
  primaryColor?: string;
}

const YearPicker: FC<Props> = ({
  currentYear,
  onSelectYear,
  yearPickerClassName,
  backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
  secondaryColor = "#585858", //رنگ فرعی یا مکمل برای تأکید ثانویه   - متن #585858   ,
  primaryColor = "#000", //رنگ اصلی (برای دکمه‌ها، لینک‌ها یا تأکید اصلی برند)
}) => {
  const [page, setPage] = useState(0);

  const yearList = useMemo(() => {
    const firstYear = currentYear + page * 20;
    const yearArray: number[] = [];
    for (let i = 0; i < 20; i++) {
      yearArray.push(firstYear - i);
    }

    return yearArray;
  }, [page, currentYear]);

  const changePageHandler = (offset: -1 | 1) => {
    setPage((prev) => prev + offset);
  };

  const selectYearHandler = (year: number) => {
    onSelectYear(year);
  };

  return (
    <div
      className={`w-full flex flex-col min-h-[327px] ${yearPickerClassName}`}
    >
      <div className={`w-full flex justify-between`}>
        <div onClick={() => changePageHandler(1)}>
          <RightChevron secondaryColor={secondaryColor} />
        </div>
        <div>
          <span
            style={{ color: primaryColor }}
            className="font-bold text-sm"
          >{`${convertToPersianNumbers(
            yearList[0].toString()
          )} - ${convertToPersianNumbers(
            yearList[yearList.length - 1].toString()
          )}`}</span>
        </div>
        <div onClick={() => changePageHandler(-1)}>
          <LeftChevron secondaryColor={secondaryColor} />
        </div>
      </div>
      <div
        className={`w-full mx-auto flex flex-wrap justify-center items-center pt-4  overflow-y-auto  !h-full`} //need classname
      >
        {yearList.map((year) => (
          <div
            style={{
              backgroundColor: year === currentYear ? secondaryColor : "",
              color: year === currentYear ? backgroundColor : secondaryColor,
              fontWeight: year === currentYear ? "500" : "",
            }}
            key={year}
            className={`w-[80px] h-9 flex justify-center items-center rounded 
           

            `}
            onClick={() => selectYearHandler(year)}
          >
            <span className="text-sm">
              {convertToPersianNumbers(year.toString())}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearPicker;
