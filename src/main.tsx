import "./index.css";

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { DateMask } from "./range";
import { InitialComponent } from "./initialComponent";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InitialComponent />
    <DateMask />
  </StrictMode>
);
