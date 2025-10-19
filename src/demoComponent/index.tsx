import {
  DatePicker,
  TimePicker,
} from '../range';
import { Range } from '../range/exportComponents/rangePicker/range';

export default function DemoComponent() {
  return (
 <>
 <div className=''>

 </div>
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
