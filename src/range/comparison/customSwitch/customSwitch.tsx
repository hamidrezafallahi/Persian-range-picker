import style from '../../../main.module.css';
import { CustomSwitchProps } from '../../persianDatePicker/type';

function CustomSwitch({ ...props }: CustomSwitchProps) {
  const { checked, className, disabled, onChange } = props;

  return (
    <>
      <label className={`${style.switch}`}>
        <input
          type="checkbox"
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          className={className}
        />
        <span className={`${style.slider}`}></span>
      </label>
    </>
  );
}

export default CustomSwitch;
