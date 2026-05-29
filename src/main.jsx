import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          borderRadius: "14px",
          background: "rgba(255,255,255,0.9)",
          color: "#0f172a",
          border: "1px solid rgba(226,232,240,0.8)",
          boxShadow: "0 10px 30px -12px rgba(15, 23, 42, 0.25)",
        },
      }}
    />
  </React.StrictMode>
);
