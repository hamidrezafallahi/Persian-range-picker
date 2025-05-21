import type { Dispatch } from 'react';

import { DateMask } from './mask';
import type {
  IDate,
  TLocale,
} from './type';

interface IProps {
  date: IDate;
  setDate: Dispatch<React.SetStateAction<IDate>>;
  locale: TLocale;
}
function MaskRange({ ...props }: IProps) {
  const { date, setDate, locale } = props;
  const handleChange = (e: IDate["from"], name: "from" | "to") => {
    console.log(e);
    if (name == "from") {
      setDate?.({ from: e, to: date.to });
    } else if (name == "to") {
      setDate?.({ from: date.from, to: e });
    }
  };
  return (
    <div className="flex items-center gap-2">
      <DateMask
        locale={locale}
        onChange={(e) => handleChange(e as number, "from")}
        defaultValue={date.from}
        maskClassName="bg-white rounded-lg flex justify-center"
        prefix={false}
        suffix={false}
      />
      {"_"}
      <DateMask
        locale={locale}
        onChange={(e) => handleChange(e as number, "to")}
        defaultValue={date.to}
        maskClassName="bg-white rounded-lg flex justify-center"
        suffix={false}
        prefix={false}
      />
    </div>
  );
}

export default MaskRange;
