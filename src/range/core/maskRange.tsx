import React, { type Dispatch, useState } from "react";

import { Mask } from "../exportComponents/mask";
import type { IDate, TLocale } from "./type";
import moment from "moment-jalaali";

interface IProps {
  date: IDate;
  setDate: Dispatch<React.SetStateAction<IDate>>;
  locale: TLocale;
}
function MaskRange({ ...props }: IProps) {
  const [error, setError] = useState<"from" | "to" | null>(null);
  const { date, setDate, locale } = props;
  const handleChange = (e: IDate["from"], name: "from" | "to") => {
    if (name === "from") {
      if (date.to && e > date.to) {
        setError("from");
        return;
      }
      setError(null);
      setDate?.({ from: e, to: date.to });
    } else if (name === "to") {
      if (date.from && e < date.from) {
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
      setDate?.({ from: date.from, to: endOfDate });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Mask
        // {...props}
        onMaskChange={(e) => handleChange(e as number, "from")}
        defaultValue={date.from}
        maskClassName={` rounded-lg w-fit ${
          error === "from" ? " border-red-100 " : ""
        }`}
        prefix={false}
        suffix={false}
        exportType="timeStamp"
      />
      {"_"}
      <Mask
        // {...props}
        onMaskChange={(e) => handleChange(e as number, "to")}
        defaultValue={date.to}
        maskClassName={`rounded-lg w-fit ${
          error === "from" ? " border-red-100 " : ""
        }`}
        prefix={false}
        suffix={false}
        exportType="timeStamp"
      />
    </div>
  );
}

export default MaskRange;
