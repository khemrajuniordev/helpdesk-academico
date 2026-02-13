import "./Sidebar.css";

export default function Sidebar() {
  return (

    <aside className="sidebar">

      {/* Logo */}
      <div className="logo">
        HelpDesk
      </div>

      {/* Menu */}
      <nav className="menu">

        <button className="menu-item active">
          Dashboard
        </button>

        <button className="menu-item">
          Chamados
        </button>

        <button className="menu-item">
          Relatórios
        </button>

      </nav>

      {/* Rodapé */}
      <div className="sidebar-footer">
        Sair
      </div>

    </aside>
  );
}
