import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import MainContent from '../core/mainContent';
import NavigateButton from '../core/navigateButton';
import type {
  IDate,
  IDesktopProps,
  ISubmittedData,
} from '../core/type';
import { useRenderPosition } from '../exportComponents/useRenderPosition';
import { DownTriangle } from '../icons/DownTriangle';

export function DesktopRangePicker(props: IDesktopProps) {
  const userAgent = navigator.userAgent;
  const deviceType =
    /Mobile|Android|iPhone|iPad|iPod|Opera Mini|BlackBerry|IEMobile/i.test(
      userAgent
    )
      ? "mobile"
      : "desktop";

  const {
    setDate,
    date,
    zone,
    compareDate = { from: 0, to: 0 },
    setOpen,
    open,
    handleSubmit,
    handleReject,
    onChange,
    setCompareDate,
    counter,
    setStep,
    isShowNavigationButton = true,
    primaryColor = "#000", //رنگ اصلی (برای دکمه‌ها، لینک‌ها یا تأکید اصلی برند)
    backgroundColor = "#fff", //رنگ پس‌زمینه کلی یا نواحی بزرگ
    tertiaryColor = "#939393", //رنگ سوم، معمولاً برای جزئیات یا عناصر کم‌اهمیت‌تر   -  رنگ متن
    // tabClassName = "",
    dateClassName,
    locale = "fa",
    onError,
    // className,
    buttonClassName,
    dropdownWidth = 460,
    dropdownHeight = 495,
    device = deviceType,
    label = {
      isShowLabel: true,
      label: (
        <label
          className="text-xs"
          style={{
            color: tertiaryColor,
          }}
        >
          {props.label?.label ?? (props.locale == "en" ? "Date" : "تاریخ")}
        </label>
      ),
    },
  } = props;

  const isFirstRun = useRef(true);
  const initSubmittedData: ISubmittedData = useMemo(() => {
    return {
      date: {
        from: date
          ? date.from
          : locale === "fa"
          ? moment().locale("fa").startOf("jYear").valueOf()
          : moment().locale("en").startOf("year").valueOf(),
        to: date ? date.to : moment().locale(locale).startOf("day").valueOf(),
      },
      compareDate,
    };
  }, [date, compareDate]);
  const [showDate, setShowDate] = useState<ISubmittedData>(initSubmittedData);

  const handleAccept = (date: IDate, compareDate: IDate | null) => {
    if (date) {
      if (date.from && date.to && date.from < date.to) {
        if (handleSubmit) {
          handleSubmit(date, compareDate);
        }

        setShowDate({ date, compareDate });
        setOpen(false);
      } else {
        if (onError) {
          onError(
            `${
              locale == "fa"
                ? "تاریخ پایان نمی‌تواند زودتر از تاریخ آغاز باشد."
                : "The end date must not be earlier than the start date."
            }`
          );
        }
      }
    } else {
      if (handleSubmit) {
        handleSubmit(date, compareDate);
      }
      setShowDate({ date, compareDate });
      setOpen(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setDate(showDate.date);
    setStep(366);
    setCompareDate(showDate.compareDate);
    if (handleReject) {
      handleReject();
    }
  };
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (onChange) {
      const isEmpty = !date && !compareDate;
      const isInvalidDateTo = date?.to == null || Number.isNaN(date?.to);
      const isInvalid = date?.from && isInvalidDateTo;

      if (!(isEmpty || isInvalid)) {
        onChange(date, compareDate);
        if (date && zone !== "manual") {
          // setShowDate({ date, compareDate });
        }
      }
    }
  }, [date, compareDate, onChange]);
  useEffect(() => {
    if (date) {
      setShowDate({ date, compareDate });
    }
  }, [counter]);

  useEffect(() => {
    // const handleClickOutside = (event: MouseEvent) => {
    //   if (
    //     dropdownRef.current &&
    //     !dropdownRef.current.contains(event.target as Node)
    //   ) {
    //     setOpen(false);
    //   }
    // };
    // if (open) {
    //   document.addEventListener("mousedown", handleClickOutside);
    // } else {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // }
    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, [open]);

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const hookPosition = useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLButtonElement>,
    enabled: open,
    popupSize: { width: dropdownWidth, height: dropdownHeight },
  });

  const handleDropdown = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setPosition(hookPosition);
  }, [hookPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className={`relative flex flex-col justify-between w-fit h-14 ${buttonClassName}`}
        ref={buttonRef as React.RefObject<HTMLDivElement>}
      >
        {label.isShowLabel && label.label}
        <div className="flex gap-2">
          <div
            className={`flex justify-center items-center gap-2 px-2 border border-gray-300 rounded-lg w-72 h-8 cursor-pointer ${dateClassName}`}
            onClick={handleDropdown}
          >
            <div
              className={`px-2 w-fit  text-center `}
              style={{
                color: tertiaryColor,
              }}
            >
              {locale === "fa"
                ? moment(showDate.date?.from)
                    .locale("fa")
                    .format("jDD / jMM / jYYYY")
                : moment(showDate.date?.from)
                    .locale("en")
                    .format("DD / MM / YYYY")}
            </div>
            <div
              className={`text-center`}
              style={{
                color: tertiaryColor,
              }}
            >
              -
            </div>
            <div
              className={`"px-2 w-fit text-center`}
              style={{
                color: tertiaryColor,
              }}
            >
              {locale === "fa"
                ? moment(showDate.date?.to)
                    .locale("fa")
                    .format("jDD / jMM / jYYYY")
                : moment(showDate.date?.to)
                    .locale("en")
                    .format("DD / MM / YYYY")}
            </div>
            <DownTriangle />
          </div>
          {zone !== "manual" && isShowNavigationButton && (
            <NavigateButton {...props} locale={locale} />
          )}
        </div>
        {open && (
          <div
            ref={popupRef}
            style={{
              backgroundColor: backgroundColor,
              position: "absolute",
              top: position.top,
              left: position.left,
              zIndex: 1000,
            }}
            className={`absolute z-50  p-2  border border-gray-300 rounded-lg shadow-md w-[460px] h-[495px] overflow-hidden  ${
              locale === "fa" ? "right-0" : "left-0"
            }`}
          >
            <div className="relative w-full h-full">
              <MainContent
                {...props}
                model="range"
                locale={locale}
                device={device}
              />
              <div
                className={`w-full flex ${
                  locale == "fa" ? "justify-end" : "justify-start"
                } gap-2 absolute bottom-0 `}
              >
                {/* ${tabClassName} */}
                <button
                  style={{ color: primaryColor }}
                  className="p-2 px-3 rounded-md"
                  onClick={handleCancel}
                >
                  {locale == "fa" ? "لغو" : "Cancel"}
                </button>
                <button
                  onClick={() => handleAccept(date, compareDate)}
                  style={{
                    background: primaryColor,
                    borderColor: primaryColor,
                    color: backgroundColor,
                  }}
                  className={` p-2 px-3 border  rounded-md`}
                >
                  {locale == "fa" ? "اعمال" : "Accept"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
