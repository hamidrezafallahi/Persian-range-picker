import "./index.css";

import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import Range from "./range";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Range device="desktop" locale="fa" model="date" />
    {/* <JalaaliDateInput /> */}
  </StrictMode>
);
