// Importa o React, que é a biblioteca principal
import React from 'react'

// Importa o ReactDOM, responsável por renderizar na tela
import ReactDOM from 'react-dom/client'

// Importa o componente App (nosso app inteiro)
import App from './App'

// importa o CSS global (estilos que valem para toda a aplicação)
import "./index.css";

// Cria a raiz da aplicação e liga ao index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode ajuda a encontrar erros durante o desenvolvimento
  <React.StrictMode>
    {/* Renderiza o App, como ligar a TV na tomada */}
    <App />
  </React.StrictMode>
)
