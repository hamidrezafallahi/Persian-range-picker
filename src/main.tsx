import "./main.css";

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { InitialComponent } from "./initialComponent";
// import DemoComponent from "./demoComponent";

createRoot(document.getElementById("root")!).render(
  <>
    <InitialComponent />
    {/* <DemoComponent /> */}
  </>
);
