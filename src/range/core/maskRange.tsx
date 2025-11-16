import React, {
  type Dispatch,
  useEffect,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import style from '../../main.module.css';
import { Mask } from '../exportComponents/mask';
import type {
  IDate,
  TLocale,
} from './type';

interface IProps {
  date?: IDate;
  setDate?: Dispatch<React.SetStateAction<IDate>>;
  locale?: TLocale;
  onError?: (e:string)=>void;

}
function MaskRange({ ...props }: IProps) {
  const {onError}=props
  const [error, setError] = useState<"from" | "to" | null>(null);

  const { date, setDate, locale } = props;
  const handleChange = (e: IDate["from"], name: "from" | "to") => {
    if (name === "from") {
      if (date?.to && e && e > date.to) {
        setError("from");
        return;
      }
      setError(null);
      setDate?.({ from: e, to: date?.to });
    } else if (name === "to") {
      if (date?.from && e && e < date.from) {
        setError("to");
        return;
      }
      setError(null);
      let endOfDate: number;
      if (locale == "fa") {
        endOfDate = moment(e).endOf("day").valueOf();
      } else {
        endOfDate = moment(e).utc().endOf("day").valueOf();
      }
      setDate?.({ from: date?.from, to: endOfDate });
    }
  };
  useEffect(()=>{
    if(error !==null){
      if(error==="from"){
        onError?.(
          locale == "fa"? "ناریخ شروع نمیتواند بعد از تاریخ پایان باشد":"The start date cannot be after the end date."
        )
      }else {
        locale == "fa"? "تاریخ پایان نمیتواند قبل از تاریخ شروع ست شود":"End date cannot be set before start date."
      }
    }
  },[error])
  return (
    <div
      className={`
      ${style.w_full}
      ${style.flex}
      ${style.items_center}
      ${style.justify_around}
      ${style.gap_2}
    `}
    >
      <Mask
        {...props}
        onMaskChange={(e) => handleChange(e as number, "to")}
        value={date?.to}
        maskClassName={`${style.w_32}`}
        Style={{ border: error === "to" ? "1px solid red" : undefined }}
        prefix={false}
        suffix={false}
        onError={() => {
          setError("to");
        }}
        exportType="timeStamp"
      />
      <div>{"_"}</div>
      <Mask
        {...props}
        onMaskChange={(e) => handleChange(e as number, "from")}
        value={date?.from}
        maskClassName={`${style.w_32}`}
        Style={{ border: error === "from" ? "1px solid red" : undefined }}
        prefix={false}
        suffix={false}
        onError={() => {
          setError("from");
        }}
        exportType="timeStamp"
      />
    </div>
  );
}

export default MaskRange;
