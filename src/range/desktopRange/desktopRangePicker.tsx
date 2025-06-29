import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import moment from 'moment-jalaali';

import MainContent from '../core/mainContent';
import NavigateButton from '../core/navigateButton';
import type {
  IDesktopRangeProps,
  ISubmittedData,
} from '../core/type';
import { useRenderPosition } from '../exportComponents/useRenderPosition';
import { DownTriangle } from '../icons/DownTriangle';

export function DesktopRangePicker(props: IDesktopRangeProps) {
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
    onRangeChang,
    onCompareDateChange,
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
    dropdownHeight = 460,
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
          {props.label?.label ?? (locale == "en" ? "Date" : "تاریخ")}
        </label>
      ),
    },
  } = props;
  const isInitialRender = useRef(true);
  const prevDate = useRef(date);
  const prevCompareDate = useRef(compareDate);
  const [showDate, setShowDate] = useState<ISubmittedData>({
    date: {
      from:
        locale === "fa"
          ? moment().locale("fa").startOf("jYear").valueOf()
          : moment().locale("en").startOf("year").valueOf(),
      to: moment().locale(locale).startOf("day").valueOf(),
    },
    compareDate: null,
    Data: null, // or any default value you want for Data
  });

  const [type, setType] = useState<string>("date");
  const [customData, setCustomData] = useState<unknown>(null);

  const handleAccept = () => {
    if (date) {
      if (date.from && date.to && date.from < date.to) {
        if (handleSubmit) {
          if (type == "date") {
            handleSubmit({ type, Data: { date, compareDate } });
          } else {
            handleSubmit({ type, Data: { customData } });
          }
        }

        setShowDate({
          date,
          compareDate,
          Data: customData,
        });
        setOpen?.(false);
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
        if (type == "date") {
          handleSubmit({ type, Data: { date, compareDate } });
        } else {
          handleSubmit({ type, Data: { customData } });
        }
      }
      setShowDate({ date, compareDate, Data: customData });
      setOpen?.(false);
    }
  };
  const handleCancel = () => {
    setOpen?.(false);
    setDate(showDate?.date);
    setStep(366);
    setCompareDate(showDate.compareDate);
    if (handleReject) {
      handleReject();
    }
  };

  const buttonRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useRenderPosition({
    buttonRef: buttonRef as React.RefObject<HTMLElement>,
    popupRef: popupRef,
    setIsOpen: setOpen ?? (() => {}),
    isOpen: open ?? false,
  });

  const handleDropdown = () => {
    setOpen?.((prev) => !prev);
  };
  useEffect(() => {
    if (date) {
      setShowDate((prev) => ({
        ...prev,
        Data: null,
      }));
    }
  }, [counter]);
  useEffect(() => {
    const hasCompareDateChanged =
      compareDate?.from !== prevCompareDate.current?.from ||
      compareDate?.to !== prevCompareDate.current?.to;
    if (onCompareDateChange && compareDate && hasCompareDateChanged) {
      onCompareDateChange({ type: "date", Data: { date, compareDate } });
      setShowDate((prev) => ({
        ...prev,
        compareDate,
      }));
    }
    prevCompareDate.current = compareDate;

    const hasDateChanged =
      date?.from !== prevDate.current?.from ||
      date?.to !== prevDate.current?.to;

    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else if (hasDateChanged && onRangeChang) {
      const isEmpty = !date && !compareDate;
      const isInvalidDateTo = date?.to == null || Number.isNaN(date?.to);
      const isInvalid = date?.from && isInvalidDateTo;

      if (!(isEmpty || isInvalid)) {
        onRangeChang({ type, Data: { date, compareDate } });
      }
    }

    prevDate.current = date;
  }, [date, compareDate]);
  useEffect(() => {
    if (customData) {
      onRangeChang?.({ type, Data: { customData } });
    }
  }, [customData]);
  useEffect(() => {
    setShowDate({
      date,
      compareDate,
      Data: null,
    });
  }, [date, compareDate]);
  return (
    <div
      className={`flex flex-col  justify-center w-fit h-14 relative  ${buttonClassName}`}
      ref={buttonRef as React.RefObject<HTMLDivElement>}
    >
      <div dir={locale == "fa" ? "rtl" : "ltr"}>
        {label.isShowLabel && label.label}
      </div>
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
              : moment(showDate.date?.to).locale("en").format("DD / MM / YYYY")}
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
            width: dropdownWidth,
            height: dropdownHeight,
          }}
          className={`absolute z-50  p-2  border border-gray-300 rounded-lg shadow-md  overflow-hidden  ${
            locale === "fa" ? "right-0" : "left-0"
          }`}
        >
          <div className="relative w-full h-full">
            <MainContent
              {...props}
              model="range"
              locale={locale}
              device={device}
              setCustomData={setCustomData}
              setType={setType}
            />
            <div
              className={`w-full flex ${
                locale !== "fa" ? "justify-end" : "justify-start"
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
                onClick={() => handleAccept()}
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
  );
}
