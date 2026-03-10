import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      
      {/* Logo / nome do sistema */}
      <div className="sidebar-logo">
        <h1>HelpDesk</h1>
      </div>

      {/* Menu de navegação */}
      <nav className="sidebar-menu">
        <ul>
          <li className="active">Dashboard</li>
          <li>Chamados</li>
          <li>Relatórios</li>
        </ul>
      </nav>

      {/* Rodapé / usuário */}
      <div className="sidebar-footer">
        <span>khemrajunior</span>
        <button>Sair</button>
      </div>

    </aside>
  );
}

export default Sidebar;
