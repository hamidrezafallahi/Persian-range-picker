import './main.module.css';

import { createRoot } from 'react-dom/client';

import DemoComponent from './demoComponent';

// import { InitialComponent } from './initialComponent';

createRoot(document.getElementById("root")!).render(
  <>
    {/* <InitialComponent /> */}
    <DemoComponent />
  </>
);
