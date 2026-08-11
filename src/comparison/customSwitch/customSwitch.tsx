import style from '../../main.module.css';
import { CustomSwitchProps } from '../../persianDatePicker/type';

function CustomSwitch({ ...props }: CustomSwitchProps) {
  const {
    checked,
    className,
    disabled,
    onChange,
    ariaLabel = 'Compare',
  } = props;

  return (
    <>
      <label className={`${style.switch}`}>
        <input
          type="checkbox"
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          className={className}
          aria-label={ariaLabel}
        />
        <span className={`${style.slider}`} aria-hidden="true"></span>
      </label>
    </>
  );
}

export default CustomSwitch;
