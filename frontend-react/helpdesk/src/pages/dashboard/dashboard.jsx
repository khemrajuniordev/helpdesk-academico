import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Clock, Loader, XCircle, Plus } from 'lucide-react';
import StatCard from '../../components/StatCard/StatCard';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import NovoChamadoModal from '../../components/NovoChamadoModal/NovoChamadoModal';
import { getEstatisticas, getChamados, getDemandasPorCategoria } from '../../services/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, abertos: 0, emAndamento: 0, fechados: 0 });
  const [chamados, setChamados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      const [statsData, chamadosData, categoriasData] = await Promise.all([
        getEstatisticas(),
        getChamados(),
        getDemandasPorCategoria(),
      ]);
      setStats(statsData);
      setChamados(chamadosData);
      setCategorias(categoriasData);
    }
    loadData();
  }, []);

  const maxCategoria = Math.max(...categorias.map(c => c.quantidade), 1);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Visão Geral</h1>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={18} />
          Novo Chamado
        </button>
      </div>

      {/* Cards de estatísticas */}
      <div className="stats-grid">
        <StatCard
          icon={ClipboardList}
          label="Total"
          value={stats.total}
          description="Chamados registrados"
          color="blue"
        />
        <StatCard
          icon={Clock}
          label="Abertos"
          value={stats.abertos}
          description="Aguardando atendimento"
          color="green"
        />
        <StatCard
          icon={Loader}
          label="Em Andamento"
          value={stats.emAndamento}
          description="Sendo processados"
          color="yellow"
        />
        <StatCard
          icon={XCircle}
          label="Fechados"
          value={stats.fechados}
          description="Resolvidos ou cancelados"
          color="red"
        />
      </div>

      {/* Chamados Recentes + Categorias */}
      <div className="dashboard-bottom">
        <div className="card chamados-recentes">
          <div className="card-title-row">
            <h3>Chamados Recentes</h3>
            <button className="link-btn" onClick={() => navigate('/chamados')}>Ver todos</button>
          </div>
          <div className="chamados-list">
            {chamados.slice(0, 5).map((chamado, i) => (
              <div
                className="chamado-item animate-slide-in"
                key={chamado.id}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <StatusBadge status={chamado.status.nome} />
                <div className="chamado-item-info">
                  <span className="chamado-item-titulo">{chamado.titulo}</span>
                  <span className="chamado-item-meta">
                    {chamado.criado_por.nome} • {chamado.categoria}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card categorias-card">
          <div className="card-title-row">
            <h3>📊 Demandas por Categoria</h3>
          </div>
          <div className="categorias-list">
            {categorias.map(cat => (
              <div className="categoria-item" key={cat.categoria}>
                <span className="categoria-nome">{cat.categoria}</span>
                <div className="categoria-bar-container">
                  <div
                    className="categoria-bar"
                    style={{ width: `${(cat.quantidade / maxCategoria) * 100}%` }}
                  ></div>
                </div>
                <span className="categoria-count">{cat.quantidade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NovoChamadoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onChamadoCriado={() => {
          getEstatisticas().then(setStats);
          getChamados().then(setChamados);
          getDemandasPorCategoria().then(setCategorias);
        }}
      />
    </div>
  );
}

export default Dashboard;
