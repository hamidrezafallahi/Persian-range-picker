import type { IDateProps } from "../../core/type";
import MobileDatePicker from "../../mobileDate/mobileDatePicker";
interface IProps {
  calendarType?: IDateProps["calendarType"];
  defaultValue?: IDateProps["defaultValue"];
  onChange?: IDateProps["onChange"];
  tertiaryColor?: IDateProps["tertiaryColor"];
  highlightColor?: IDateProps["highlightColor"];
  primaryColor?: IDateProps["primaryColor"];
  backgroundColor?: IDateProps["backgroundColor"];
  secondaryColor?: IDateProps["secondaryColor"];
  accentColor?: IDateProps["accentColor"];
  dangerColor?: IDateProps["dangerColor"];
}

export function MobileDate({ ...props }: IProps) {
  const {
    calendarType = "shamsi",
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
  const locale = calendarType == "shamsi" ? "fa" : "en";
  return (
    <MobileDatePicker
      {...props}
      locale={locale}
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
