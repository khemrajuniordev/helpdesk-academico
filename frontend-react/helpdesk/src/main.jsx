// Importa React
import React from "react";

// Importa ReactDOM (responsável por renderizar no navegador)
import ReactDOM from "react-dom/client";

// Importa o componente principal
import App from "./App.jsx";

// Importa o CSS global
import "./styles/global.css";

// Cria a raiz da aplicação
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
