import './main.css';

import { createRoot } from 'react-dom/client';

import { InitialComponent } from './initialComponent';

createRoot(document.getElementById("root")!).render(
  <>
    <InitialComponent />
    {/* <DemoComponent /> */}
  </>
);
