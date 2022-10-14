// Node modules
import React from "react";
import ReactDOM from "react-dom/client";

// Project files
import App from "./App";

// Properties
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
