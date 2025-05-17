import React from 'react';

import { DateMask } from './mask';
import type { IDate } from './type';

interface IProps {
  date: IDate;
}
function MaskRange({ ...props }: IProps) {
  const { date } = props;
  const handleChange = (e: number) => {
    console.log(e);
  };

  return (
    <div className="flex">
      <DateMask onChange={handleChange} defaultValue={date.from} />
      {"_"}
      <DateMask onChange={handleChange} defaultValue={date.to} />
    </div>
  );
}

export default MaskRange;
