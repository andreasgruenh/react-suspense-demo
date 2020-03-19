import React from "react";
import { createRoot } from "react-dom";
import {} from "react-dom/experimental";
import { BrowserRouter } from "react-router-dom";
import {} from "react/experimental";
import { App } from "./App";
import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
