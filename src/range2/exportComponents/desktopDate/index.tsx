import type { IDate, TLocale } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";
interface IProps {
  locale?: TLocale;
  defaultValue?: IDate;
  onChange?: (e: IDate) => void;
  tertiaryColor?: string;
  highlightColor?: string;
}
export function DesktopDate({ ...props }: IProps) {
  const {
    locale = "fa",
    defaultValue,
    onChange,
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
  } = props;
  return (
    <DesktopDatePicker
      {...props}
      locale={locale}
      model="date"
      defaultValue={defaultValue}
      onChange={onChange}
      tertiaryColor={tertiaryColor}
      highlightColor={highlightColor}
    />
  );
}
