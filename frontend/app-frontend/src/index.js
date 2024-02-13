import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import App from "./App";

/**
 * Entry point of the React application.
 * Initializes the root element and renders the main <App /> component.
 * Utilizes React.StrictMode for development mode checks and optimizations.
 * @module Index
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
