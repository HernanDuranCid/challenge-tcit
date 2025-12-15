import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";

// Punto de entrada de la aplicación React
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Proveedor del store global */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);