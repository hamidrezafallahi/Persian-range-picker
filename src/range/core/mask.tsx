import { useEffect, useRef, useState, type ReactNode } from "react";

import moment from "moment-jalaali";
import { CalenderIcon } from "../icons/CalenderIcon";
import type { IDate, TLocale } from "./type";

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
};

export function DateMask({
  defaultValue,
  locale = "fa",
  onError,
  inputClassName,
  maskClassName,
  onChange,
  maskHeight = 41.6,
  Icon = <CalenderIcon />,
}: MaskProps) {
  const temp = timestampToDateNumbers(locale, defaultValue);
  const [separatedValue, setSeparatedValue] = useState(temp);
  const [baseValue, setBaseValue] = useState<IDate["from"] | null>(null);
  const [fullValue, setFullValue] = useState<string>(
    `${temp[0]}${temp[1]}${temp[2]}`
  );
  const fullValueRef = useRef<string>(`${temp[0]}${temp[1]}${temp[2]}`);
  const [isEdit, setIsEdit] = useState<0 | 1 | 2>(0);
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
        newState[0] =
          newValue.length !== 4
            ? newValue
            : validValue(newValue, "year", locale);
        return newState;
      });
      if (newValue.length == 4) {
        moveToNextTabindex();
      }
      // }
    } else if (e.target.name == "month") {
      setSeparatedValue((prev) => {
        const newState = [...prev];
        newState[1] =
          newValue.length !== 2
            ? newValue
            : validValue(newValue, "month", locale);
        return newState;
      });
      if (newValue.length == 2) {
        moveToNextTabindex();
      }
    } else if (e.target.name == "day") {
      setSeparatedValue((prev) => {
        const newState = [...prev];
        newState[2] =
          newValue.length !== 2
            ? newValue
            : validValue(newValue, "day", locale);
        return newState;
      });
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
      if (newValue.length == 8) {
        if (checkDateByRegex(formatToTimeStamp(newValue), locale)) {
          // setBaseValue(formatToTimeStamp(newValue));
          // setIsEdit(0);
        } else {
          onError?.(locale == "fa" ? "تاریخ نا معتبر است" : "invalid date");
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
    name: "year" | "month" | "day",
    locale: TLocale
  ): string {
    const num = Number(value);
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
    const clamped = Math.min(Math.max(num, min), max);
    if (name !== "year") {
      return clamped.toString().padStart(2, "0");
    }
    return clamped.toString();
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
            monthInputRef.current?.setSelectionRange(0, 0);
          } else if (
            activeElement.name == "month" &&
            monthInputRef.current?.selectionEnd == 2
          ) {
            dayInputRef.current?.focus();
            dayInputRef.current?.setSelectionRange(0, 0);
          }
        } else if (event.key == "ArrowLeft") {
          if (
            activeElement.name == "day" &&
            dayInputRef.current?.selectionEnd == 0
          ) {
            monthInputRef.current?.focus();
            monthInputRef.current?.setSelectionRange(2, 2);
          } else if (
            activeElement.name == "month" &&
            monthInputRef.current?.selectionEnd == 0
          ) {
            yearInputRef.current?.focus();
            yearInputRef.current?.setSelectionRange(4, 4);
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

  function moveToNextTabindex() {
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
    // setSeparatedValue((prev) => {
    //   const newState = [...prev];
    //   newState[target] = "";
    //   return newState;
    // });
  }
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
          console.log("handleClickOutside");
          setBaseValue(changeToTimestamp(fullValueRef.current, locale));
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
          console.log("handleClickOutside");

          setBaseValue(changeToTimestamp(temp, locale));
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
      className={`flex justify-end bg-gray-5 rounded w-91 range align-base ${maskClassName}`}
      style={{ height: `${maskHeight}px` }}
    >
      <div
        className="flex justify-center gap-2 border rounded-lg w-full align-base"
        style={{ height: `${maskHeight}px` }}
      >
        <div className="">{Icon && Icon}</div>
        {isEdit !== 2 ? (
          <div
            ref={focusRef}
            className="flex justify-center px-2 py-2 w-full dir-rtl"
          >
            {isEdit == 0 ? (
              <div className="flex gap-1px text-base same-font">
                <div>{separatedValue[0] || "____"}</div>
                <div className="same-font">{"/"}</div>
                <div>{separatedValue[1] || "__"}</div>
                <div className="same-font">{"/"}</div>
                <div>{separatedValue[2] || "__"}</div>
              </div>
            ) : (
              <div className="text-base same-font">
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
                  className={`same-font ${inputClassName}`}
                  style={{ width: "2.4rem" }}
                  placeholder="____"
                />
                <span
                  style={{
                    userSelect: "none",
                    pointerEvents: "none",
                    width: "10px",
                  }}
                  className={`same-font ${inputClassName}`}
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
                  className={`same-font ${inputClassName}`}
                  style={{ width: "1.2rem" }}
                  placeholder="__"
                />
                <span
                  style={{
                    userSelect: "none",
                    pointerEvents: "none",
                    width: "10px",
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
                  className={`same-font ${inputClassName}`}
                  style={{ width: "1.2rem" }}
                  placeholder="__"
                />
              </div>
            )}
          </div>
        ) : (
          <div
            ref={fullRef}
            className={`relative flex justify-center w-full text-base  dir-rtl`}
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
              className={`opacity-0 ${inputClassName}`}
              style={{ width: "5.5rem", textAlign: "end" }}
            />
            <div
              className={`z-10 absolute inset-0  mx-auto   text-base flex justify-center items-center same-font selected-text${
                inputClassName && inputClassName
              }`}
              onKeyDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              style={{
                display: "flex",
                width: "5.5rem",
                // height: `${maskHeight}px`,
                // userSelect: "none",
                // pointerEvents: "none",
              }}
            >
              {formatInputValue(fullValue)
                .split("/")
                .map((item, index) => {
                  return (
                    <span
                      key={index}
                      data-name={
                        index == 0 ? "year" : index == 1 ? "month" : "day"
                      }
                      ref={spanRefs[index]}
                      onMouseDown={handleFocusOnRelatedInputElement}
                      className={`text-base text-center same-font selected-text h-fit my-auto  ${inputClassName}`}
                      style={{
                        // userSelect: "none",
                        // pointerEvents: "none",
                        width: "100px",
                      }}
                    >
                      <span>{item}</span>
                      {index !== 2 && <span className="selected-text">/</span>}
                    </span>
                  );
                })}
            </div>
          </div>
        )}
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
