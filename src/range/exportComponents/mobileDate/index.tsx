import type { IDate, TLocale } from "../../core/type";
import MobileDatePicker from "../../mobileDate/mobileDatePicker";

interface IProps {
  locale?: TLocale;
  defaultValue?: IDate;
  onChange?: (e: IDate) => void;
  tertiaryColor?: string;
  highlightColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  dangerColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
}
export function MobileDate({ ...props }: IProps) {
  const {
    locale = "fa",
    defaultValue,
    onChange,
    tertiaryColor = "#939393",
    highlightColor = "#f4f4f4",
    primaryColor = "#000",
    backgroundColor = "#fff ",
    secondaryColor = "#585858",
    accentColor = "#2563eb",
    dangerColor = "",
  } = props;

  return (
    <MobileDatePicker
      {...props}
      locale={locale}
      model="date"
      defaultValue={defaultValue}
      onChange={onChange}
      tertiaryColor={tertiaryColor}
      highlightColor={highlightColor}
      accentColor={accentColor}
      backgroundColor={backgroundColor}
      dangerColor={dangerColor}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  );
}
