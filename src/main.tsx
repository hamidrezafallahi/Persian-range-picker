import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Range from "./range";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Range device="desktop" locale="fa" type="date" />
  </StrictMode>
);
