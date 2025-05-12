import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, InputHTMLAttributes } from "react";
import moment, { type MomentInput } from "moment-jalaali";
import type { IDate } from "./type";

type MaskProps = {
  dateFromOutside: IDate;
  value: number;
  tertiaryColor: string | undefined;
  secondaryColor: string | undefined;
  dangerColor: string | undefined;
  InputHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  locale: "fa" | "en";
};

const DateMask = ({
  dateFromOutside,
  InputHandleChange,
  value: defaultValue = 14040202,
  className,
  locale,
  tertiaryColor = "#939393",
  secondaryColor = "#585858",
  dangerColor = "#f87171",
}: MaskProps) => {
  const [value, setValue] = useState(["0000", "00", "00"]);
  const [isEdit, setIsEdit] = useState(true);
  const editor = useRef<HTMLInputElement>(null);
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    InputHandleChange(e);
    setIsEdit(false);
  };
  useEffect(() => {
    if (isEdit && editor.current) {
      editor.current.focus();
    }
  }, [isEdit]);

  const formattedValue =
    locale === "fa"
      ? moment(value).locale("fa").format("jYYYY/jMM/jDD")
      : moment(value).format("YYYY/MM/DD");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\D/g, "");
    if (e.target.name == "year") {
      if (newValue.length == 4) {
        console.log(newValue);
        setValue((prev) => {
          const newState = [...prev];
          newState[0] = newValue;
          return newState;
        });
        // setValue([...value,value[0]=newValue])
      }
    } else if (e.target.name == "month") {
      if (newValue.length == 2) {
        console.log(newValue, "month");
        setValue((prev) => {
          const newState = [...prev];
          newState[1] = newValue;
          return newState;
        });
      }
    } else if (e.target.name == "day") {
      if (newValue.length == 2) {
        console.log(newValue, "day");
        setValue((prev) => {
          const newState = [...prev];
          newState[2] = newValue;
          return newState;
        });
      }
    }

    // console.log(e.target.name,e.target.value, value);
    // if (value.length > 8) value = value.slice(0, 8);

    // let formatted = "";
    // if (value.length > 0) {
    //   formatted += value.substring(0, 4);
    // }
    // if (value.length >= 3) {
    //   formatted += "/" + value.substring(4, 6);
    // }
    // if (value.length >= 5) {
    //   formatted += "/" + value.substring(6, 8);
    // }
    // console.log(formatted);

    // setValue(formatted);
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

  // این متد برای اضافه کردن `/` در مکان صحیح است
  // const formatInputValue = (value: string) => {
  //   // اولین `/` پس از 4 رقم، دومین `/` پس از 6 رقم
  //   if (value.length >= 5) {
  //     value = `${value.substring(0, 4)}/${value.substring(4)}`;
  //   }
  //   if (value.length >= 8) {
  //     value = `${value.substring(0, 7)}/${value.substring(7)}`;
  //   }
  //   console.log(value);

  //   return value;
  // };
  console.log(value);

  return (
    <div className="" style={{ display: "flex", border: "1px solid red" }}>
      <input
        type="text"
        name="year"
        // value={value[0]}
        onChange={handleChange}
        maxLength={4}
        className=""
        style={{ border: "1px solid red" }}
      />
      <input
        type="text"
        name="month"
        // value={value[1]}
        onChange={handleChange}
        maxLength={2}
        className=""
        style={{ border: "1px solid red" }}
      />
      <input
        type="text"
        name="day"
        // value={value[2]}
        onChange={handleChange}
        maxLength={2}
        className=""
        style={{ border: "1px solid red" }}
      />
      {/* {isEdit ? (
        <input
          type="text"
          // id="date-input"
          // value={formatInputValue(value)}
          // onChange={handleChange}
          maxLength={10} // طول ورودی محدود به 10 کاراکتر است
          placeholder={formatInputValue(value)}
          className=""
          style={{ border: "1px solid red", background: "#f00" }}
        />
      ) : (
        <div
          style={{
            borderColor:
              dateFromOutside?.from > dateFromOutside?.to ? dangerColor : "",
          }}
          className={`${className}`}
          onClick={() => {
            setIsEdit(true);
          }}
        >
          {formattedValue}
        </div>
      )} */}
    </div>
  );
};
export default DateMask;
