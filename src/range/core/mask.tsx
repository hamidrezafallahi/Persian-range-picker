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
  const [value, setValue] = useState(defaultValue);
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
    console.log(e.target.name, formattedValue);

    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    let formatted = "";
    if (value.length > 0) {
      formatted += value.substring(0, 4);
    }
    if (value.length >= 3) {
      formatted += "/" + value.substring(4, 6);
    }
    if (value.length >= 5) {
      formatted += "/" + value.substring(6, 8);
    }
    console.log(formatted);

    setValue(formatted);
    const checkFormatter = formatted.split("/");
    // چک می‌کنیم که آیا تاریخ درست است یا خیر
    const isValid = moment(
      `${checkFormatter[0]}/${checkFormatter[1]}/${checkFormatter[2]}`,
      "jYYYY/jMM/jDD",
      true
    ).isValid();

    if (isValid) {
      // اگر تاریخ معتبر باشد، آن را تنظیم می‌کنیم
      // setValue(newValue);
      console.log(isValid);
    }
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

  return (
    <div className="" style={{ display: "flex", border: "1px solid red" }}>
      <input
        type="number"
        // id="date-input"
        name="year"
        value={value}
        onChange={handleChange}
        maxLength={4} // طول ورودی محدود به 10 کاراکتر است
        // placeholder={formatInputValue(value)}
        className=""
        style={{ border: "1px solid red" }}
      />
      <input
        type="number"
        // id="date-input"
        name="month"
        value={value}
        onChange={handleChange}
        maxLength={2} // طول ورودی محدود به 10 کاراکتر است
        // placeholder={formatInputValue(value)}
        className=""
        style={{ border: "1px solid red" }}
      />
      <input
        type="number"
        // id="date-input"
        name="day"
        value={value}
        onChange={handleChange}
        maxLength={2} // طول ورودی محدود به 10 کاراکتر است
        // placeholder={formatInputValue(value)}
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
