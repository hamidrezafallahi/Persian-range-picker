import { useEffect, useRef, useState } from "react";
import type { IDate } from "./type";
import moment from "moment-jalaali";

type MaskProps = {
  defaultValue: IDate["from"];
  onError?: (e: string) => void;
  // tertiaryColor: string | undefined;
  // secondaryColor: string | undefined;
  // dangerColor: string | undefined;
  // InputHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // className?: string;
  locale: "fa" | "en";
};

const DateMask = ({
  defaultValue = new Date().valueOf(),
  locale = "fa",
  onError,
}: MaskProps) => {
  const [separatedValue, setSeparatedValue] = useState<
    [string, string, string]
  >(["2024", "02", "06"]);
  const [baseValue, setBaseValue] = useState<IDate["from"]>(
    moment(defaultValue).locale(locale).valueOf()
  );
  const [fullvalue, setFullValue] = useState("20240202");
  const [isEdit, setIsEdit] = useState<0 | 1 | 2>(0);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const fullRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef(null);
  const clickCount = useRef(0);
  const clickTimer = useRef<HTMLInputElement | null>(null);

  const formatToTimeStamp = (FullValue: string) => {
    let changeToTimestamp = null;
    console.log(FullValue);
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
        setIsEdit(0);
      }
    } else if (e.target.name == "full") {
      setFullValue(newValue);
      if (newValue.length == 8) {
        if (checkDateByRegex(formatToTimeStamp(newValue), locale)) {
          setBaseValue(formatToTimeStamp(newValue));
          setIsEdit(0);
        } else {
          onError?.(locale == "fa" ? "تاریخ نا معتبر است" : "invalid date");
        }
      }
      // if (
      //   locale == "fa"
      //     ? shamsiRegex.test(formatted)
      //     : gregorianRegex.test(formatted)
      // ) {
      //   console.log(locale, formatted);
      // }
    }

    // const checkFormatter = formatted.split("/");
    // چک می‌کنیم که آیا تاریخ درست است یا خیر
    // const isValid = moment(
    //   `${checkFormatter[0]}/${checkFormatter[1]}/${checkFormatter[2]}`,
    //   "jYYYY/jMM/jDD",
    //   true
    // ).isValid();

    // if (isValid) {
    //   // اگر تاریخ معتبر باشد، آن را تنظیم می‌کنیم
    //   // setValue(newValue);
    //   console.log(isValid);
    // }
    // } else {
    //   setValue(newValue);
    // }
  };
  const handleFocus = () => {
    if (inputRef?.current) {
      inputRef.current.select();
    }
  };
  const formatInputValue = (value: string) => {
    value = value.substring(0, 8);
    let sample = "____/__/__".split(""); // Convert to array for mutability

    for (let index = 0; index < value.length; index++) {
      const char = value[index];
      if (index <= 3) {
        sample[index] = char; // YYYY
      } else if (index <= 5) {
        sample[index + 1] = char; // MM
      } else if (index <= 7) {
        sample[index + 2] = char; // DD
      }
    }

    return sample.join("");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fullRef?.current?.contains(event.target as Node) === true) {
        return;
      } else if (focusRef?.current?.contains(event.target as Node) === true) {
        setIsEdit(1);
      } else {
        setIsEdit(0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function moveToNextTabindex(target: number) {
    const focusable = [...document.querySelectorAll("input")].sort(
      (a, b) => a.tabIndex - b.tabIndex
    );

    const active = document.activeElement;
    const index = focusable.indexOf(active);

    // Move to next or loop to first
    if ((index + 1) % focusable.length == 0) {
      setIsEdit(0);
    } else {
      const next = focusable[(index + 1) % focusable.length];
      next.focus();
    }
    setValue((prev) => {
      const newState = [...prev];
      newState[target] = "";
      return newState;
    });
  }
  const handleClick = (e) => {
    if (e.target.name !== "full") {
      clickCount.current += 1;
      if (clickCount.current === 3) {
        console.log("tripleClick");
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
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEdit]);
  useEffect(() => {
    const dateValues = timestampToDateNumbers(baseValue, locale);
    const [year, month, day] = dateValues;
    const temp = `${year}${month}${day}`.substring(0, 8);
    setFullValue(temp);
    setSeparatedValue([year.toString(), month.toString(), day.toString()]);
  }, [baseValue]);
  useEffect(() => {
    const [year, month, day] = separatedValue;
    const temp = `${year}${month}${day}`.substring(0, 8);

    setFullValue(temp);
  }, [separatedValue]);
  return (
    <div
      className="flex mx-auto px-3 py-2 border rounded-lg w-fit"
      // style={{ display: "flex", border: "1px solid blue" }}
    >
      {isEdit !== 2 ? (
        <div ref={focusRef}>
          {isEdit == 0 ? (
            <div className="flex gap-1px bg-red-100 same-font">
              <div>{separatedValue[0] || "____"}</div>
              <div className="same-font">{"/"}</div>
              <div>{separatedValue[1] || "__"}</div>
              <div className="same-font">{"/"}</div>
              <div>{separatedValue[2] || "__"}</div>
            </div>
          ) : (
            <div className="bg-green-100">
              {/* <Logger value={value} /> */}
              <input
                type="text"
                name="year"
                tabIndex={0}
                value={separatedValue[0]}
                onChange={handleChange}
                onClick={handleClick}
                maxLength={4}
                minLength={4}
                className="text-base"
                style={{ width: "4ch" }}
                onDoubleClick={() => {
                  console.log("double");
                }}
              />
              {"/"}
              <input
                type="text"
                name="month"
                tabIndex={1}
                value={separatedValue[1]}
                onChange={handleChange}
                onClick={handleClick}
                maxLength={2}
                minLength={2}
                className="text-base"
                style={{ width: "2ch" }}
              />
              {"/"}
              <input
                type="text"
                name="day"
                tabIndex={2}
                value={separatedValue[2]}
                onChange={handleChange}
                onClick={handleClick}
                maxLength={2}
                minLength={2}
                className="text-base same-font"
                style={{ width: "2ch" }}
              />
            </div>
          )}
        </div>
      ) : (
        <div ref={fullRef} className="relative">
          <input
            id="full"
            type="text"
            name="full"
            ref={inputRef}
            onFocus={() => {
              console.log("focus trigered ");
              handleFocus();
            }}
            value={fullvalue}
            onChange={handleChange}
            maxLength={8}
            minLength={8}
            className="z-10 text-base"
            style={{ width: "10ch" }}
            // onKeyDown={handleKeyDown}
          />
          <span className="z-10 absolute inset-0 bg-blue-600 mx-0 w-full h-full text-base text-center same-font selected-text">
            {formatInputValue(fullvalue)}
          </span>
        </div>
      )}
    </div>
  );
};
export default DateMask;
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
