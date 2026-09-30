import React from "react";
import ReactDOM from "react-dom/client";

// La App (estan todos los otros archivos)
import App from "./src/App.jsx";
import "./src/components/temas.css";

// 1. ICONOS
import "@fortawesome/fontawesome-free/css/all.min.css";

// 2. FUENTE POPPINS
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
