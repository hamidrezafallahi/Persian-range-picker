import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import "./main.css";
import { createRoot } from "react-dom/client";
import { InitialComponent } from "./initialComponent";
// import DemoComponent from "./demoComponent";
// import { InitialComponent } from "./initialComponent";
createRoot(document.getElementById("root")).render(_jsx(_Fragment, { children: _jsx(InitialComponent, {}) }));
