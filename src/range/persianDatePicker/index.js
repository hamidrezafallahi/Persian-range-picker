import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import moment from "moment-jalaali";
import Calendar from "./Calendar";
export const DatePicker = ({ ...props }) => {
    const { locale = "fa", dateFromOutside, onDateChange } = props;
    const initDate = useMemo(() => {
        return {
            from: dateFromOutside.from,
            to: dateFromOutside.to,
        };
    }, [dateFromOutside]);
    const [date, setDate] = useState(initDate);
    const onChange = (e) => {
        if (e.from === undefined)
            return;
        const { from, to } = e;
        onDateChange?.({ from, to });
    };
    useEffect(() => {
        setDate(dateFromOutside);
    }, [dateFromOutside]);
    return (_jsx(Calendar, { ...props, onChange: (from, to) => {
            onChange({ from, to });
            setDate({ from, to });
        }, startDate: moment(date?.from)
            .locale(locale)
            .clone()
            .startOf("day")
            .valueOf(), endDate: moment(date?.to).locale(locale).clone().startOf("day").valueOf() }));
};
