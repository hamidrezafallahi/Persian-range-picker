import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
function CustomSwitch({ ...props }) {
    const { checked, className, disabled, onChange } = props;
    return (_jsx(_Fragment, { children: _jsxs("label", { className: "switch", children: [_jsx("input", { type: "checkbox", onChange: onChange, checked: checked, disabled: disabled, className: className }), _jsx("span", { className: "slider" })] }) }));
}
export default CustomSwitch;
