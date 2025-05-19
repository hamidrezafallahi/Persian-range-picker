import './main.scss';

// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

import { InitialComponent } from './initialComponent';

createRoot(document.getElementById("root")!).render(
  <>
    <InitialComponent />
  </>
);
