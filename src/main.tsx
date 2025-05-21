import './main.css';

// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

import { InitialComponent } from './initialComponent';

createRoot(document.getElementById("root")!).render(
  <>
    <InitialComponent />
    <div>test2</div>
    99999

    <p>fsdfsdf</p>
  </>
);
