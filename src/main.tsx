import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Range from "./range";
import JalaaliDateInput from "./range/core/mask";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Range device="desktop" locale="fa" type="range" />
    <JalaaliDateInput />
  </StrictMode>
);
