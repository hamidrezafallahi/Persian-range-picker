import { useEffect, useRef, useState } from "react";
import moment from "moment-jalaali";

import type { IDate } from "./type";

type MaskProps = {
  defaultValue?: IDate["from"];
  onError?: (e: string) => void;
  onChange?: (e: IDate["from"]) => void;
  // tertiaryColor: string | undefined;
  // secondaryColor: string | undefined;
  // dangerColor: string | undefined;
  // InputHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // className?: string;
  locale?: "fa" | "en";
  inputClassName?: string;
};

export function DateMask({
  defaultValue,
  locale = "fa",
  onError,
  inputClassName,
  onChange,
}: MaskProps) {
  const [separatedValue, setSeparatedValue] = useState(["2024", "02", "06"]);
  const [baseValue, setBaseValue] = useState<IDate["from"]>(
    moment(defaultValue).locale(locale).valueOf()
  );
  const [fullValue, setFullValue] = useState<string>("20240202");
  const fullValueRef = useRef<string>("20240202");
  const [isEdit, setIsEdit] = useState<0 | 1 | 2>(0);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const fullRef = useRef<HTMLInputElement | null>(null);
  const fullInputRef = useRef<HTMLInputElement>(null);
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
      if (newValue.length == 4) {
        moveToNextTabindex(1);
      }
      // }
    } else if (e.target.name == "month") {
      setSeparatedValue((prev) => {
        const newState = [...prev];
        newState[1] = newValue;
        return newState;
      });
      if (newValue.length == 2) {
        moveToNextTabindex(2);
      }
    } else if (e.target.name == "day") {
      setSeparatedValue((prev) => {
        const newState = [...prev];
        newState[2] = newValue;
        return newState;
      });
      if (newValue.length == 2) {
        const temp =
          separatedValue[0].toString() +
          separatedValue[1].toString() +
          newValue;
        setBaseValue(changeToTimestamp(temp, locale));
        setIsEdit(0);
      }
    } else if (e.target.name == "full") {
      setFullValue(newValue);
      fullValueRef.current = newValue;
      if (newValue.length == 8) {
        if (checkDateByRegex(formatToTimeStamp(newValue), locale)) {
          setBaseValue(formatToTimeStamp(newValue));
          setIsEdit(0);
        } else {
          onError?.(locale == "fa" ? "تاریخ نا معتبر است" : "invalid date");
          alert(locale == "fa" ? "تاریخ نا معتبر است" : "invalid date");
        }
      }
    }
  };
  const handleFocusFullInput = () => {
    if (fullInputRef.current) {
      fullInputRef.current.select();
    }
  };
  const formatInputValue = (value: string) => {
    const year = value.slice(0, 4).padEnd(4, "_");
    const month = value.slice(4, 6).padEnd(2, "_");
    const day = value.slice(6, 8).padEnd(2, "_");
    return `${year}/${month}/${day}`;
  };
  const handleBlurFullValue = () => {
    setBaseValue(changeToTimestamp(fullValueRef.current, locale));
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setBaseValue(changeToTimestamp(fullValue, locale));
      setIsEdit(0);
    }
  };

  function moveToNextTabindex(target: number) {
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
    }
    setSeparatedValue((prev) => {
      const newState = [...prev];
      newState[target] = "";
      return newState;
    });
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
          handleBlurFullValue();
        }
        setIsEdit(0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEdit]);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const dateValues = timestampToDateNumbers(baseValue, locale);
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

  return (
    <div className="range">
      <div className="flex mx-auto px-3 py-2 border rounded-lg w-fit">
        {isEdit !== 2 ? (
          <div ref={focusRef}>
            {isEdit == 0 ? (
              <div className="flex gap-1px bg-red-100 text-base same-font">
                <div>{separatedValue[0] || "____"}</div>
                <div className="same-font">{"/"}</div>
                <div>{separatedValue[1] || "__"}</div>
                <div className="same-font">{"/"}</div>
                <div>{separatedValue[2] || "__"}</div>
              </div>
            ) : (
              <div className="bg-green-100 text-base same-font">
                <input
                  type="text"
                  name="year"
                  tabIndex={0}
                  value={separatedValue[0]}
                  onChange={handleChange}
                  onClick={handleClick}
                  maxLength={4}
                  minLength={4}
                  className={`same-font ${inputClassName}`}
                  style={{ width: "4ch" }}
                />
                <span
                  style={{
                    userSelect: "none",
                    pointerEvents: "none",
                    width: 0,
                  }}
                >
                  /
                </span>
                <input
                  type="text"
                  name="month"
                  tabIndex={1}
                  value={separatedValue[1]}
                  onChange={handleChange}
                  onClick={handleClick}
                  maxLength={2}
                  minLength={2}
                  className={inputClassName}
                  style={{ width: "2ch" }}
                />
                <span
                  style={{
                    userSelect: "none",
                    pointerEvents: "none",
                    width: 0,
                  }}
                >
                  /
                </span>
                <input
                  type="text"
                  name="day"
                  tabIndex={2}
                  value={separatedValue[2]}
                  onChange={handleChange}
                  onClick={handleClick}
                  maxLength={2}
                  minLength={2}
                  className={inputClassName}
                  style={{ width: "2ch" }}
                />
              </div>
            )}
          </div>
        ) : (
          <div ref={fullRef} className="relative text-base">
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
              style={{ width: "10ch" }}
            />
            <span
              className="top-10 z-10 absolute inset-0 bg-blue-600 mx-0 w-full h-full text-base text-center same-font selected-text"
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              {formatInputValue(fullValue)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function timestampToDateNumbers(timestamp: number, locale: "fa" | "en") {
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
function checkDateByRegex(timestamp: number, locale: "fa" | "en") {
  const gregorianRegex =
    /^(?:19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  const shamsiRegex =
    /^(?:13|14|15)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  if (locale == "fa") {
    moment.loadPersian({ usePersianDigits: false });
    const jDate = moment(timestamp).format("jYYYY/jMM/jDD");
    const isShamsiValid = shamsiRegex.test(jDate);
    return isShamsiValid;
  } else {
    const gDate = moment(timestamp).format("YYYY/MM/DD");
    const isGregorianValid = gregorianRegex.test(gDate);
    return isGregorianValid;
  }
}
function changeToTimestamp(fullvalue: string, locale: "fa" | "en") {
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
