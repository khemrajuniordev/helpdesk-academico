// Importa o css (vamos criar já já)
import "./Header.css";

// Componente Header
export default function Header() {

  return (

    // header = barra superior do sistema
    <header className="header">

      {/* Título da página */}
      <h1 className="header-title">
        Visão Geral
      </h1>

      {/* Botão de ação */}
      <button className="header-button">
        Novo Chamado
      </button>

    </header>
  );
}
