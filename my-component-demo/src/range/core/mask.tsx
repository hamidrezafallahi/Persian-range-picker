import type { ChangeEvent } from 'react';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import type { IDate } from './type';

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

const Mask = ({
  dateFromOutside,
  InputHandleChange,
  value,
  className,
  locale,
  tertiaryColor = "#939393",
  secondaryColor = "#585858",
  dangerColor = "#f87171",
}: MaskProps) => {
  const [isEdit, setIsEdit] = useState(false);
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

  const inputMask = locale === "fa" ? "0000/00/00" : "0000/00/00";

  return (
    <>
      {isEdit ? (
        <></>
      ) : (
        // <MaskedInput
        //   ref={editor}
        //   value={formattedValue}
        //   mask={inputMask}
        //   className="w-28 text-center"
        //   style={{
        //     fontFamily: "IRANSans",
        //     borderWidth: "1px",
        //     borderColor: secondaryColor,
        //     color: tertiaryColor,
        //   }}
        //   onBlur={handleBlur}
        // />
        <div
          style={{
            borderColor:
              dateFromOutside?.from > dateFromOutside?.to ? dangerColor : "",
          }}
          className={`${className}  `}
          onClick={() => {
            setIsEdit(true);
          }}
        >
          {formattedValue}
        </div>
      )}
    </>
  );
};
export default Mask;
