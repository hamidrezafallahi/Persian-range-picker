import type { IDate, TLocale } from "../../core/type";
import { DesktopDatePicker } from "../../desktopDate/desktopDatePicker";

interface IProps {
  locale?: TLocale;
  defaultValue?: IDate;
  onChange?: (e: { type: "date"; date: IDate }) => void;
  tertiaryColor?: string;
  highlightColor?: string;
  showTime?: boolean;
}
export function DesktopDate({ ...props }: IProps) {
  const { locale } = props;
  return <DesktopDatePicker {...props} model="date" locale={locale} />;
}
