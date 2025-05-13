import "./index.css";

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import Range from "./range";
import DateMask from "./range/core/mask";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Range device="desktop" locale="fa" model="date" />
    <DateMask />
  </StrictMode>
);
