import style from '../../main.module.css';
import { period } from '../core/helper';
import type {
  IBaseProps,
  ITimeSections,
} from '../core/type';
import { TickIcon } from '../icons/TickIcon';

const CompareList = ({ ...props }: IBaseProps) => {
  const {
    date,
    zone,
    setActiveCompareStep,
    activeCompareStep,
    setCompareDate,
    componentStep,
    locale = "fa",
    accentColor = "#2563eb", // تأکیدی (برای جلب توجه، مثلاً نوتیفیکیشن‌ها یا CTAها)- آبی
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    neutralColor = "#9cc5f1", //رنگ خنثی، اغلب برای پس‌زمینه یا متن - آبی کمرنگ
  } = props;

  const timeHandler = (item: ITimeSections) => {
    setCompareDate?.(item.value);
    setActiveCompareStep?.(item.step);
  };
  const templatePeriods = period(date!, locale, zone!);

  const filteredPeriod = templatePeriods.filter(
    (item) =>
      componentStep &&
      item.step >= componentStep &&
      !(item.timeZone === "lastMonth" && zone === "lastThreeMonth")
  );

  // useEffect(() => {
  //   const temp = templatePeriods.find(
  //     (item) => item.step == activeCompareStep
  //   )?.value;
  //   if (temp) {
  //     setCompareDate({ from: temp.from, to: temp.to });
  //   }
  // }, [counter]);

  return (
    <>
      {filteredPeriod.map((item, index) => {
        const active = item.step == activeCompareStep;
        // if (
        //   active &&
        //   compareDate.from !== item.value.from &&
        //   compareDate.to !== item.value.to
        // ) {
        //   setCompareDate(item.value);
        // }
        const stringDateFrom = new Date(item.value.from).toLocaleDateString(
          `${locale == "fa" ? "fa-IR" : "en-UK"}`,
          {
            weekday: "long",
            month: "long",
            day: "numeric",
          }
        );
        const stringDateTo = new Date(item.value.to).toLocaleDateString(
          `${locale == "fa" ? "fa-IR" : "en-UK"}`,
          {
            weekday: "long",
            month: "long",
            day: "numeric",
          }
        );
        return (
          <button
            key={index}

            type="button"
            onClick={() => timeHandler(item)}
            // style={{backgroundColor:"red"}}
            className={`${style.relative} ${style.flex} ${style.flex_col} ${style.border_none} ${style.rounded_md} ${
              style.items_start
            }
            ${style.gap_y_2} ${style.pb_2} ${style.w_full} ${style.h_fit}
               
                ${index < filteredPeriod.length - 1 && style.border_b}
                `}
            dir={locale == "fa" ? "rtl" : "ltr"}
          >
            <div style={{ color: active ? accentColor : tertiaryColor }}>
              {item.title}
            </div>
            <div
              style={{
                color: active ? neutralColor : tertiaryColor,
              }}
              className={`${style.text_xs} ${style.whitespace_nowrap} ${style.overflow_hidden}`}
            >
              {locale == "fa" ? " از " : "From "}
              {stringDateFrom}
              {locale == "fa" ? " تا " : "To "}
              {stringDateTo}
            </div>
            {active && (
              <span
                className={`${style.absolute} ${style.my_auto}   ${
                  locale == "en" ? style.right_5 : style.left_5
                }`}
              >
                <TickIcon {...props} />
              </span>
            )}
          </button>
        );
      })}
    </>
  );
};
export default CompareList;
