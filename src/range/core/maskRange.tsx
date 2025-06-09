import React, { type Dispatch, useState } from "react";

import { DateMask } from "./mask";
import type { IDate, TLocale } from "./type";

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
      setDate?.({ from: date.from, to: e });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DateMask
        locale={locale}
        onChange={(e) => handleChange(e as number, "from")}
        defaultValue={date.from}
        maskClassName={` rounded-lg ${
          error === "from" ? " border-red-100 " : ""
        }`}
        prefix={false}
        suffix={false}
      />
      {"_"}
      <DateMask
        locale={locale}
        onChange={(e) => handleChange(e as number, "to")}
        defaultValue={date.to}
        maskClassName={`rounded-lg ${
          error === "from" ? " border-red-100 " : ""
        }`}
        prefix={false}
        suffix={false}
      />
    </div>
  );
}

export default MaskRange;
