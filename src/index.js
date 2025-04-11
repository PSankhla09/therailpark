import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="257027473727-pq6dk83vdlr7bin1d07bkp7hkh37802d.apps.googleusercontent.com">
      <HashRouter>
        <App />
      </HashRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
