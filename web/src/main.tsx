//https://github.com/diegodls
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AuthProvider } from "./contexts/auth";
import { ModalProvider } from "./contexts/modal";

import "./styles/global.css";

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
