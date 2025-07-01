// import { InitialComponent } from "./initialComponent";
import "./main.css";

// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import DemoComponent from "./demoComponent";

// import { InitialComponent } from "./initialComponent";

createRoot(document.getElementById("root")!).render(
  <>
    {/* <InitialComponent /> */}
    <DemoComponent />
  </>
);
