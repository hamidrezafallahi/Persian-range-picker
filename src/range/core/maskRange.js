import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, } from 'react';
import { Mask } from '../exportComponents/mask';
function MaskRange({ ...props }) {
    const [error, setError] = useState(null);
    const { date, setDate } = props;
    const handleChange = (e, name) => {
        if (name === "from") {
            if (date.to && e > date.to) {
                setError("from");
                return;
            }
            setError(null);
            setDate?.({ from: e, to: date.to });
        }
        else if (name === "to") {
            if (date.from && e < date.from) {
                setError("to");
                return;
            }
            setError(null);
            setDate?.({ from: date.from, to: e });
        }
    };
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mask
            // {...props}
            , { 
                // {...props}
                onMaskChange: (e) => handleChange(e, "from"), defaultValue: date.from, maskClassName: ` rounded-lg w-fit ${error === "from" ? " border-red-100 " : ""}`, prefix: false, suffix: false }), "_", _jsx(Mask
            // {...props}
            , { 
                // {...props}
                onMaskChange: (e) => handleChange(e, "to"), defaultValue: date.to, maskClassName: `rounded-lg w-fit ${error === "from" ? " border-red-100 " : ""}`, prefix: false, suffix: false })] }));
}
export default MaskRange;
