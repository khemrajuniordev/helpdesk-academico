import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Chamados from './pages/Chamados/Chamados';
import Relatorios from './pages/Relatorios/Relatorios';

// Layout com Sidebar para páginas autenticadas
function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<Login />} />

      {/* Rotas com layout (Sidebar) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
