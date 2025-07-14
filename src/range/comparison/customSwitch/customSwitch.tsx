import style from "../../../main.module.css";
interface IProps {
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
  className?: string;
}
function CustomSwitch({ ...props }: IProps) {
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
