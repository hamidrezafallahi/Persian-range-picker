import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import { CalenderIcon } from '../icons/CalenderIcon';
import type {
  IDate,
  TLocale,
} from './type';

type TimeZone = "year" | "month" | "day";
type MaskProps = {
  defaultValue?: IDate["from"];
  onError?: (e: string) => void;
  onChange?: (e: IDate["from"]) => void;
  // tertiaryColor: string | undefined;
  // secondaryColor: string | undefined;
  // dangerColor: string | undefined;
  // InputHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // className?: string;
  locale?: TLocale;
  inputClassName?: string;
  maskClassName?: string;
  Icon?: ReactNode | boolean;
  maskHeight?: number;
  maskFontSize?: number;
  ErrorClass?: string;
};
const defaultErrorClass = "bg-red-100 ";
export function DateMask({
  defaultValue,
  locale = "fa",
  onError,
  inputClassName,
  maskClassName,
  onChange,
  maskHeight = 41.6,
  Icon = <CalenderIcon />,
  maskFontSize = 16,
  ErrorClass = defaultErrorClass,
}: MaskProps) {
  const temp = timestampToDateNumbers(locale, defaultValue);
  const [separatedValue, setSeparatedValue] = useState(temp);
  const [baseValue, setBaseValue] = useState<IDate["from"] | null>(null);
  const [fullValue, setFullValue] = useState<string>(
    `${temp[0]}${temp[1]}${temp[2]}`
  );
  const fullValueRef = useRef<string>(`${temp[0]}${temp[1]}${temp[2]}`);
  const [isEdit, setIsEdit] = useState<0 | 1 | 2>(0);
  const [errorTarget, setErrorTarget] = useState<number[]>([]);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const fullRef = useRef<HTMLInputElement | null>(null);
  const yearInputRef = useRef<HTMLInputElement | null>(null);
  const monthInputRef = useRef<HTMLInputElement | null>(null);
  const dayInputRef = useRef<HTMLInputElement | null>(null);
  const fullInputRef = useRef<HTMLInputElement>(null);
  const span0 = useRef<HTMLSpanElement | null>(null);
  const span1 = useRef<HTMLSpanElement | null>(null);
  const span2 = useRef<HTMLSpanElement | null>(null);
  const spanRefs = [span0, span1, span2];
  const clickCount = useRef(0);
  const clickTimer = useRef<number>(0);
  const isInitialMount = useRef(true);

  const formatToTimeStamp = (FullValue: string) => {
    let changeToTimestamp = null;
    if (locale == "en") {
      changeToTimestamp = moment(FullValue, "YYYYMMDD").valueOf();
    } else {
      changeToTimestamp = moment(FullValue, "jYYYYjMMjDD").valueOf();
    }
    return changeToTimestamp;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, "");
    if (e.target.name == "year") {
      setSeparatedValue((prev) => {
        const newState = [...prev];
        newState[0] = newValue;
        return newState;
      });
      if (errorTarget.includes(0)) {
        setErrorTarget((prev) => {
          return [...prev.filter((item) => item !== 0)];
        });
      }
      if (newValue.length == 4) {
        validValue(
          newValue,
          locale,
          yearInputRef as React.RefObject<HTMLInputElement>,
          onError as () => void
        );
      }
      // }
    } else if (e.target.name == "month") {
      setSeparatedValue((prev) => {
        const newState = [...prev];
        newState[1] = newValue;
        return newState;
      });
      if (errorTarget.includes(1)) {
        setErrorTarget((prev) => {
          return [...prev.filter((item) => item !== 1)];
        });
      }
      if (newValue.length == 2) {
        validValue(
          newValue,
          locale,
          monthInputRef as React.RefObject<HTMLInputElement>,
          onError as () => void
        );
      }
    } else if (e.target.name == "day") {
      setSeparatedValue((prev) => {
        const newState = [...prev];
        newState[2] = newValue;
        return newState;
      });
      if (errorTarget.includes(2)) {
        setErrorTarget((prev) => {
          return [...prev.filter((item) => item !== 2)];
        });
      }
      if (newValue.length == 2) {
        if (
          !validValue(
            newValue,
            locale,
            dayInputRef as React.RefObject<HTMLInputElement>,
            onError as () => void
          )
        ) {
          setErrorTarget((prev) => [...prev, 2]);
        }
      }

      // if (newValue.length == 2) {
      //   const temp =
      //     separatedValue[0].toString() +
      //     separatedValue[1].toString() +
      //     newValue;
      //   setBaseValue(changeToTimestamp(temp, locale));
      //   setIsEdit(0);
      // }
    } else if (e.target.name == "full") {
      setFullValue(newValue);
      fullValueRef.current = newValue;
      if (errorTarget.includes(3)) {
        setErrorTarget((prev) => {
          return [...prev.filter((item) => item !== 3)];
        });
      }
      if (newValue.length == 8) {
        if (!checkDateByRegex(formatToTimeStamp(newValue), locale)) {
          onError?.(locale == "fa" ? "تاریخ نا معتبر است" : "invalid date");
          setErrorTarget((prev) => [...prev, 3]);
        }
      }
    }
  };
  const handleFocusFullInput = () => {
    if (fullInputRef.current) {
      // fullInputRef.current.select();
    }
  };
  const formatInputValue = (value: string) => {
    const year = value.slice(0, 4).padEnd(4, "_");
    const month = value.slice(4, 6).padEnd(2, "_");
    const day = value.slice(6, 8).padEnd(2, "_");
    return `${year}/${month}/${day}`;
  };
  function handleCount(
    value: string,
    arrow: React.KeyboardEvent<HTMLInputElement>["key"],
    index: number
  ) {
    const numValue = Number(value);
    let result: string = value;

    const clamp = (val: number, min: number, max: number) =>
      Math.min(Math.max(val, min), max).toString();

    const pad = (val: number) => val.toString().padStart(2, "0");

    const isUp = arrow === "ArrowUp";
    if (index === 0) {
      // Year
      if (locale === "fa") {
        const min = 1300;
        const max = 1500;
        const newVal = isUp ? numValue + 1 : numValue - 1;
        result = clamp(newVal, min, max);
      } else {
        const min = 1900;
        const max = 2100;
        const newVal = isUp ? numValue + 1 : numValue - 1;
        result = clamp(newVal, min, max);
      }
    } else if (index === 1) {
      const min = 1;
      const max = 12;
      const newVal = isUp ? numValue + 1 : numValue - 1;
      result = pad(Math.min(Math.max(newVal, min), max));
    } else if (index === 2) {
      const min = 1;
      const max = getEndOfMonth(
        Number(separatedValue[0]),
        Number(separatedValue[1]),
        locale
      );

      const newVal = isUp ? numValue + 1 : numValue - 1;
      result = pad(Math.min(Math.max(newVal, min), max));
    }

    return result;
  }
  function validValue(
    value: string,
    locale: TLocale,
    ref: React.RefObject<HTMLInputElement>,
    onError: (e: string) => void
  ): boolean {
    const num = Number(value);
    const name: TimeZone = ref.current.name as TimeZone;
    const target =
      name == "year" ? 0 : name == "month" ? 1 : name == "day" ? 2 : 3;
    const ranges = {
      year:
        locale === "fa" ? { min: 1300, max: 1500 } : { min: 1900, max: 2100 },
      month: { min: 1, max: 12 },

      day: {
        min: 1,
        max: getEndOfMonth(
          Number(separatedValue[0]),
          Number(separatedValue[1]),
          locale
        ),
      },
    };
    const { min, max } = ranges[name];

    if (num < min || num > max) {
      ref.current.select();
      setErrorTarget((prev) => [...prev, target]);
      onError?.("تاریخ اشتباه است ");
      return false;
    } else {
      if (name !== "day") {
        const focusable = [...document.querySelectorAll("input")].sort(
          (a, b) => a.tabIndex - b.tabIndex
        );

        const active =
          document.activeElement instanceof HTMLInputElement
            ? document.activeElement
            : null;
        const index = focusable.indexOf(active as HTMLInputElement);
        if ((index + 1) % focusable.length !== 0) {
          const next = focusable[(index + 1) % focusable.length];

          next.focus();
          next.select();
        }
      }
      return true;
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const activeElement = document.activeElement;
    if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
      if (activeElement instanceof HTMLInputElement) {
        if (event.key == "ArrowRight") {
          if (
            activeElement.name == "year" &&
            yearInputRef.current?.selectionEnd == 4
          ) {
            monthInputRef.current?.focus();
            monthInputRef.current?.select();
            event.preventDefault();
          } else if (
            activeElement.name == "month" &&
            monthInputRef.current?.selectionEnd == 2
          ) {
            dayInputRef.current?.focus();
            dayInputRef.current?.select();

            event.preventDefault();
          }
        } else if (event.key == "ArrowLeft") {
          if (
            activeElement.name == "day" &&
            dayInputRef.current?.selectionEnd == 0
          ) {
            monthInputRef.current?.focus();
            monthInputRef.current?.select();
            event.preventDefault();
          } else if (
            activeElement.name == "month" &&
            monthInputRef.current?.selectionEnd == 0
          ) {
            yearInputRef.current?.focus();
            yearInputRef.current?.select();
            event.preventDefault();
          }
        }
      }
    }

    if (event.key == "ArrowUp" || event.key == "ArrowDown") {
      event.preventDefault();
      if (activeElement instanceof HTMLInputElement) {
        const target =
          activeElement.name == "year"
            ? 0
            : activeElement.name == "month"
            ? 1
            : 2;
        setSeparatedValue((prev) => {
          const newState = [...prev];

          newState[target] = handleCount(newState[target], event.key, target);
          return newState;
        });
      }
    }

    if (event.key === "Enter") {
      setBaseValue(changeToTimestamp(fullValue, locale));
      setIsEdit(0);
    }
    if (event.key === "Backspace") {
      if (activeElement instanceof HTMLInputElement) {
        if (activeElement.value.length == 0) {
          if (activeElement.tabIndex > 0) {
            moveToPreviousTabindex();
          }
        } else if (activeElement.value.length == 1) {
          activeElement.select();
        }
      }
    }
  };

  function moveToPreviousTabindex() {
    const focusable = [...document.querySelectorAll("input")].sort(
      (a, b) => a.tabIndex - b.tabIndex
    );

    const active =
      document.activeElement instanceof HTMLInputElement
        ? document.activeElement
        : null;
    const index = focusable.indexOf(active as HTMLInputElement);

    if (index > 0) {
      const prev = focusable[index - 1];
      prev.focus();
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.name !== "full") {
      clickCount.current += 1;
      if (clickCount.current === 3) {
        setIsEdit(2);
        clearTimeout(clickTimer.current);
        clickCount.current = 0;
        return;
      }
    }
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 500);
  };
  const handleFocusOnRelatedInputElement = (
    e: React.MouseEvent<HTMLSpanElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.currentTarget.dataset.name);
    setIsEdit(1);
    if (e.currentTarget.dataset.name == "year") {
      yearInputRef.current?.focus();
      yearInputRef.current?.select();
      setTimeout(() => {
        yearInputRef.current?.select();
      }, 0);
    } else if (e.currentTarget.dataset.name == "month") {
      monthInputRef.current?.focus();
      setTimeout(() => {
        monthInputRef.current?.select();
      }, 0);
    } else if (e.currentTarget.dataset.name == "day") {
      dayInputRef.current?.focus();
      setTimeout(() => {
        dayInputRef.current?.select();
      }, 0);
    }
  };
  useEffect(() => {
    if (isEdit == 2) {
      fullInputRef.current?.focus();
      fullInputRef.current?.select();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (fullRef?.current?.contains(event.target as Node) === true) {
        return;
      } else if (focusRef?.current?.contains(event.target as Node) === true) {
        setIsEdit(1);
      } else {
        if (isEdit == 2) {
          console.log("handleClickOutside full");
          //check valid

          if (
            !checkDateByRegex(formatToTimeStamp(fullValueRef.current), locale)
          ) {
            setErrorTarget((prev) => [...prev, 3]);
          } else {
            setBaseValue(changeToTimestamp(fullValueRef.current, locale));
          }
        }
        if (
          yearInputRef.current &&
          monthInputRef.current &&
          dayInputRef.current
        ) {
          const temp =
            yearInputRef.current.value.toString() +
            monthInputRef.current.value.toString() +
            dayInputRef.current.value.toString();
          console.log("handleClickOutside separated");
          const active = document.activeElement as HTMLInputElement;
          console.log(active.name);
          const targetRef =
            active.name == "year"
              ? yearInputRef
              : active.name == "month"
              ? monthInputRef
              : active.name == "day"
              ? dayInputRef
              : fullInputRef;

          if (
            validValue(
              active.value,
              locale,
              targetRef as React.RefObject<HTMLInputElement>,
              onError as () => void
            )
          ) {
            setErrorTarget((prev) => [...prev, 3]);
          } else {
            setBaseValue(changeToTimestamp(temp, locale));
          }
        }
        setIsEdit(0);
      }
    };
    const handleClickOnInput = (event: MouseEvent) => {
      if (yearInputRef.current?.contains(event.target as Node) === true) {
        yearInputRef.current.focus();
      } else if (
        monthInputRef.current?.contains(event.target as Node) === true
      ) {
        monthInputRef.current.focus();
      } else {
        dayInputRef.current?.focus();
      }
    };
    document.addEventListener("mouseup", handleClickOnInput);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mouseup", handleClickOnInput);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEdit]);
  useEffect(() => {
    if (!baseValue) {
      return;
    }
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const dateValues = timestampToDateNumbers(locale, baseValue);
    const [year, month, day] = dateValues;
    const temp = `${year}${month}${day}`.substring(0, 8);
    setFullValue(temp);
    fullValueRef.current = temp;
    setSeparatedValue([year.toString(), month.toString(), day.toString()]);
    onChange?.(baseValue);
  }, [baseValue]);
  useEffect(() => {
    const [year, month, day] = separatedValue;
    const temp = `${year}${month}${day}`.substring(0, 8);
    setFullValue(temp);
    fullValueRef.current = temp;
  }, [separatedValue]);
  useEffect(() => {
    if (defaultValue) {
      setBaseValue(defaultValue);
    }
  }, [defaultValue]);
  return (
    <div
      className={`range flex justify-end bg-gray-5 rounded w-40 range align-base ${maskClassName} 
 
      `} // ${ errorTarget && ErrorClass}
      style={{ height: `${maskHeight}px` }}
      dir="ltr"
    >
      <div
        className="flex justify-center items-center gap-2 px-2 border rounded-lg w-full align-center"
        style={{ height: `${maskHeight}px` }}
      >
        {isEdit !== 2 ? (
          <div
            ref={focusRef}
            className="flex justify-center w-full item-center"
          >
            {isEdit == 0 ? (
              <div
                style={{ fontSize: maskFontSize }}
                className="flex justify-center gap-1 w-full text-base item-center same-font"
              >
                <div className={`${errorTarget.includes(0) && ErrorClass}`}>
                  {separatedValue[0] || "____"}
                </div>
                <div>{"/"}</div>
                <div className={`${errorTarget.includes(1) && ErrorClass}`}>
                  {separatedValue[1] || "__"}
                </div>
                <div>{"/"}</div>
                <div className={`${errorTarget.includes(2) && ErrorClass}`}>
                  {separatedValue[2] || "__"}
                </div>
              </div>
            ) : (
              <div
                className="flex justify-center items-center same-font"
                style={{ gap: "1px" }}
              >
                <input
                  type="text"
                  name="year"
                  tabIndex={0}
                  ref={yearInputRef}
                  value={separatedValue[0]}
                  onChange={handleChange}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  maxLength={4}
                  minLength={4}
                  className={`same-font bg-gray-5 ${inputClassName} ${
                    errorTarget.includes(0) && ErrorClass
                  }`}
                  style={{
                    width: (4 * maskFontSize) / 2 + 8,
                    fontSize: maskFontSize,
                  }}
                  placeholder="____"
                />
                <span
                  style={{
                    userSelect: "none",
                    pointerEvents: "none",
                    // width: maskFontSize / 2,
                    fontSize: maskFontSize,
                    // paddingRight: "2px",
                    // paddingLeft: "2px",
                  }}
                  className={` ${inputClassName}`}
                >
                  /
                </span>
                <input
                  type="text"
                  name="month"
                  tabIndex={1}
                  ref={monthInputRef}
                  value={separatedValue[1]}
                  onChange={handleChange}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  maxLength={2}
                  minLength={2}
                  className={`same-font bg-gray-5 ${inputClassName} ${
                    errorTarget.includes(1) && ErrorClass
                  }`}
                  style={{
                    width: (2 * maskFontSize) / 2 + 8,
                    fontSize: maskFontSize,
                  }}
                  placeholder="__"
                />
                <span
                  className="same-font"
                  style={{
                    userSelect: "none",
                    pointerEvents: "none",
                    fontSize: maskFontSize,
                    // width: maskFontSize / 2,
                    // width: "1ch",
                    // paddingRight: "1px",
                    // paddingLeft: "1px",
                  }}
                >
                  /
                </span>
                <input
                  type="text"
                  name="day"
                  tabIndex={2}
                  ref={dayInputRef}
                  value={separatedValue[2]}
                  onChange={handleChange}
                  onClick={handleClick}
                  onKeyDown={handleKeyDown}
                  maxLength={2}
                  minLength={2}
                  className={`same-font bg-gray-5 ${inputClassName} ${
                    errorTarget.includes(2) && ErrorClass
                  }`}
                  style={{
                    fontSize: maskFontSize,
                    width: (2 * maskFontSize) / 2 + 8,
                  }}
                  placeholder="__"
                />
              </div>
            )}
          </div>
        ) : (
          <div
            ref={fullRef}
            className={`relative flex justify-center w-full text-base p-2 `}
            style={{ height: `${maskHeight}px` }}
          >
            <input
              id="full"
              type="text"
              name="full"
              ref={fullInputRef}
              onFocus={() => {
                handleFocusFullInput();
              }}
              value={fullValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              maxLength={8}
              minLength={8}
              className={`opacity-0`}
              style={{ display: "hidden", width: "0px" }}
            />
            <div
              className={`z-10 absolute inset-0  mx-auto    text-base flex justify-center items-center same-font  ${
                inputClassName && inputClassName
              }
              ${errorTarget.includes(3) && ErrorClass}
              `}
              onKeyDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{
                display: "flex",
                gap: "3px",
                fontSize: maskFontSize,
                // height: `${maskHeight}px`,
                // userSelect: "none",
                // pointerEvents: "none",
              }}
            >
              {formatInputValue(fullValue)
                .split("/")
                .map((item, index) => {
                  return (
                    <>
                      <span
                        key={index}
                        data-name={
                          index == 0 ? "year" : index == 1 ? "month" : "day"
                        }
                        ref={spanRefs[index]}
                        onMouseDown={handleFocusOnRelatedInputElement}
                        className={` same-font ${inputClassName} ${
                          //selected-text
                          errorTarget.includes(index) && ErrorClass
                        }`}
                        style={{
                          // userSelect: "none",
                          // pointerEvents: "none",
                          fontSize: maskFontSize,
                        }}
                      >
                        <span
                          className={`${
                            errorTarget.includes(index) && ErrorClass
                          }`}
                        >
                          {item}
                        </span>
                      </span>
                      {index !== 2 && <span className=" ">/</span>}
                    </>
                  );
                })}
            </div>
          </div>
        )}
        <div className="">{Icon && Icon}</div>
      </div>
    </div>
  );
}

function timestampToDateNumbers(locale: TLocale, timestamp?: number) {
  const year =
    locale == "fa"
      ? moment(timestamp).format("jYYYY")
      : moment(timestamp).format("YYYY");
  const month =
    locale == "fa"
      ? moment(timestamp).format("jMM")
      : moment(timestamp).format("MM");
  const day =
    locale == "fa"
      ? moment(timestamp).locale(locale).format("jDD")
      : moment(timestamp).locale(locale).format("DD");
  return [year, month, day];
}
function checkDateByRegex(timestamp: number, locale: TLocale) {
  const gregorianRegex =
    /^(?:19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  const shamsiRegex =
    /^(?:13|14|15)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  if (locale == "fa") {
    const jDate = moment(timestamp).format("jYYYY/jMM/jDD");
    const isShamsiValid = shamsiRegex.test(jDate);
    return isShamsiValid;
  } else {
    const gDate = moment(timestamp).format("YYYY/MM/DD");
    const isGregorianValid = gregorianRegex.test(gDate);
    return isGregorianValid;
  }
}
function changeToTimestamp(fullvalue: string, locale: TLocale) {
  let changeToTimestamp = new Date().valueOf();
  switch (fullvalue.length) {
    case 0:
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      changeToTimestamp =
        locale == "fa"
          ? moment(fullvalue, "jYYYY").valueOf()
          : moment(fullvalue, "YYYY").valueOf();
      break;
    case 5:
    case 6:
      changeToTimestamp =
        locale == "fa"
          ? moment(fullvalue, "jYYYYjMM").valueOf()
          : moment(fullvalue, "YYYYMM").valueOf();
      break;
    case 7:
    case 8:
      changeToTimestamp =
        locale == "fa"
          ? moment(fullvalue, "jYYYYjMMjDD").valueOf()
          : moment(fullvalue, "YYYYMMDD").valueOf();
      break;
    default:
      break;
  }
  return changeToTimestamp;
}

function getEndOfMonth(year: number, month: number, locale: TLocale): number {
  if (locale == "fa") {
    // ساختن تاریخ شمسی و گرفتن روز آخر ماه
    const jMoment = moment(`${year}/${month}/01`, "jYYYY/jM/jD");
    return jMoment.endOf("jMonth").jDate(); // فقط روز آخر را می‌دهد
  } else {
    // ساختن تاریخ میلادی و گرفتن روز آخر ماه
    const gMoment = moment(`${year}-${month}-01`, "YYYY-M-D");
    return gMoment.endOf("month").date(); // فقط روز آخر را می‌دهد
  }
}
