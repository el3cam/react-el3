import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
const element = React.createElement(App, null);

createRoot(root).render(element);