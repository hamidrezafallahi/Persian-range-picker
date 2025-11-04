import {
  DatePicker,
  TimePicker,
} from '../range';
import Calendar from '../range/exportComponents/Calendar';
import { Range } from '../range/exportComponents/rangePicker/range';

export default function DemoComponent() {
  return (
 <>
 <div className=''>

 </div>
  <Calendar/>

 <Range
 />
   <DatePicker
        showSecond
        showTime
        showMask
        // exportType="timeStamp"
      />
   <TimePicker
        showSecond
        
        // exportType="timeStamp"
      />
 </>
  );
}
