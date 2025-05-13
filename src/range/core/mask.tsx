import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { IDate } from "./type";

type MaskProps = {
  // dateFromOutside: IDate;
  // value: number;
  // tertiaryColor: string | undefined;
  // secondaryColor: string | undefined;
  // dangerColor: string | undefined;
  // InputHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // className?: string;
  // locale: "fa" | "en";
};

const DateMask = ({}: // dateFromOutside,
// InputHandleChange,
// value: defaultValue = 14040202,
// className,
// locale,
// tertiaryColor = "#939393",
// secondaryColor = "#585858",
// dangerColor = "#f87171",
MaskProps) => {
  const [value, setValue] = useState<[string, string, string]>([
    "2024",
    "02",
    "06",
  ]);
  const [fullvalue, setFullValue] = useState("20240206");
  const [isEdit, setIsEdit] = useState<0 | 1 | 2>(0);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const gregorianRegex =
    /^(?:19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  const shamsiRegex =
    /^(?:13|14|15)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  const inputRef = useRef(null);

  // const editor = useRef<HTMLInputElement>(null);
  // const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
  //   InputHandleChange(e);
  //   setIsEdit(false);
  // };
  // useEffect(() => {
  //   if (isEdit && editor.current) {
  //     editor.current.focus();
  //   }
  // }, [isEdit]);

  // const formattedValue =
  //   locale === "fa"
  //     ? moment(value).locale("fa").format("jYYYY/jMM/jDD")
  //     : moment(value).format("YYYY/MM/DD");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, "");
    if (e.target.name == "year") {
      setValue((prev) => {
        const newState = [...prev];
        newState[0] = newValue;
        return newState;
      });
      if (newValue.length == 4) {
        moveToNextTabindex(1);
      }
      // }
    } else if (e.target.name == "month") {
      console.log(newValue, "month");
      setValue((prev) => {
        const newState = [...prev];
        newState[1] = newValue;
        return newState;
      });
      if (newValue.length == 2) {
        moveToNextTabindex(2);
      }
    } else if (e.target.name == "day") {
      setValue((prev) => {
        const newState = [...prev];
        newState[2] = newValue;
        return newState;
      });
      if (newValue.length == 2) {
        setIsEdit(0);
        console.log("setNow");
      }
    } else if (e.target.name == "full") {
      console.log("setFullValue");
      setFullValue(newValue);

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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("backWay");

    if (e.key === "Backspace") {
      console.log("Backspace key code:", e.keyCode);
      setFullValue(""); // Logs key code (8 for Backspace)
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
      console.log(
        inputRef?.current,
        focusRef,
        focusRef?.current?.contains(event.target as Node)
      );
      if (focusRef?.current?.contains(event.target as Node) === true) {
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
  return (
    <div
      className="flex mx-auto px-3 py-2 border rounded-lg w-fit"
      // style={{ display: "flex", border: "1px solid blue" }}
      ref={focusRef}
    >
      {isEdit == 0 ? (
        <div className="flex gap-1px bg-red-100 same-font">
          <div>{value[0] || "____"}</div>
          <div className="same-font">{"/"}</div>
          <div>{value[1] || "__"}</div>
          <div className="same-font">{"/"}</div>
          <div>{value[2] || "__"}</div>
        </div>
      ) : isEdit == 1 ? (
        <div className="bg-green-100">
          <Logger value={value} />
          <input
            type="text"
            name="year"
            tabIndex={0}
            value={value[0]}
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
            value={value[1]}
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
            value={value[2]}
            onChange={handleChange}
            onClick={handleClick}
            maxLength={2}
            minLength={2}
            className="text-base same-font"
            style={{ width: "2ch" }}
          />
        </div>
      ) : (
        <div className="relative bg-blue-600">
          <input
            id="full"
            type="text"
            name="full"
            ref={inputRef}
            // onFocus={handleFocus}
            value={fullvalue}
            onChange={handleChange}
            maxLength={8}
            minLength={8}
            // className="z-10 opacity-0 text-base"
            style={{ width: "10ch" }}
            // onKeyDown={handleKeyDown}
          />
          {/* <span
            id="mySpan"
            className="z-10 absolute inset-0 mx-0 w-full h-full text-base text-center same-font"
          >
            {formatInputValue(fullvalue)}
          </span> */}
        </div>
      )}
    </div>
  );
};
export default DateMask;
const Logger = (value) => {
  console.log(value);
  return <></>;
};
