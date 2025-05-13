import './index.css';

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import {
  DateMask,
  Range,
} from './range';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Range device="desktop" locale="fa" model="date" />
    <DateMask inputClassName="bg-red-500" />
  </StrictMode>
);
