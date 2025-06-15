import type { IDate } from "../../core/type";
import MobileDatePicker from "../../mobileDate/mobileDatePicker";

interface IProps {
  calendarType?: "shamsi" | "gregorian";
  defaultValue?: IDate;
  onChange?: (e: { type: "date"; date: IDate }) => void;
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
