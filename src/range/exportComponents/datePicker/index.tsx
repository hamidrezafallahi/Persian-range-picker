import moment from 'moment-jalaali';

import { getTimestamp } from '../../core/helper';
import type {
  AcceptableDateValue,
  IDateProps,
} from '../../core/type';
import { DesktopDatePicker } from '../../desktopDate/desktopDatePicker';
import { MobileDate } from '../../mobileDate/mobileDatePicker';
import { useMediaQuery } from '../useMediaQuery';

type CustomDateProps = Omit<IDateProps, "defaultValue" | "locale"> & {
  defaultValue?: AcceptableDateValue;
};
export function DatePicker({ ...props }: CustomDateProps) {
  const { onChange, exportType = "IsoString" } = props;
const {match}=useMediaQuery("XSUP")

  const { calendarType = "shamsi", defaultValue } = props;
  const locale = calendarType == "shamsi" ? "fa" : "en";
  const changeHandler = (e: number | string) => {
    if (!e) return;
   if (exportType == "IsoString") {
          onChange?.(
           locale == "fa"
             ? moment(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
             : moment.utc(e).format("YYYY-MM-DDTHH:mm:ss.SSSZ"));
       } else {
         locale == "fa"
             ? moment(e).valueOf()
             : moment.utc(e).valueOf()
       }
  };
 
  return (
    <>
      {match ? (
        <DesktopDatePicker
          {...props}
          locale={locale}
          onChange={changeHandler}
          defaultValue={getTimestamp(defaultValue)}
        />
      ) : (
        <MobileDate
          {...props}
          locale={locale}
          onChange={changeHandler}
          defaultValue={getTimestamp(defaultValue)}
        />
      )}
    </>
  );
}
