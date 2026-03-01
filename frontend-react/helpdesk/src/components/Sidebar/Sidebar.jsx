import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, BarChart3, LogOut, ShieldCheck } from 'lucide-react';
import { usuarioLogado } from '../../data/mockData';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <ShieldCheck size={24} />
        <h1>HelpDesk</h1>
      </div>

      {/* Menu de navegação */}
      <nav className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/chamados" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <Ticket size={18} />
              <span>Chamados</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/relatorios" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <BarChart3 size={18} />
              <span>Relatórios</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Rodapé / usuário */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{usuarioLogado.avatar}</div>
          <div className="sidebar-user-info">
            <span className="sidebar-username">{usuarioLogado.nome}</span>
            <span className="sidebar-role">{usuarioLogado.role}</span>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
