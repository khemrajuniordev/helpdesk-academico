import { useState, useEffect, useRef } from 'react';
import { Search, Plus, MoreVertical, Clock, Loader, XCircle, CircleDot, Trash2 } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import NovoChamadoModal from '../../components/NovoChamadoModal/NovoChamadoModal';
import { getChamados, atualizarStatus, getStatusList, excluirChamado } from '../../services/api';
import { usuarioLogado } from '../../data/mockData';
import './Chamados.css';

function Chamados() {
    const [chamados, setChamados] = useState([]);
    const [busca, setBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('Todos os Status');
    const [modalOpen, setModalOpen] = useState(false);
    const [menuAberto, setMenuAberto] = useState(null);
    const menuRef = useRef(null);

    // Fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickFora(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuAberto(null);
            }
        }
        document.addEventListener('mousedown', handleClickFora);
        return () => document.removeEventListener('mousedown', handleClickFora);
    }, []);

    useEffect(() => {
        getChamados().then(setChamados);
    }, []);

    // Filtros
    const chamadosFiltrados = chamados.filter(c => {
        const matchBusca =
            c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
            c.criado_por.nome.toLowerCase().includes(busca.toLowerCase());
        const matchStatus =
            filtroStatus === 'Todos os Status' || c.status.nome === filtroStatus;
        return matchBusca && matchStatus;
    });

    function getPrioridadeClass(prioridade) {
        const map = { 'Alta': 'alta', 'Média': 'media', 'Baixa': 'baixa' };
        return map[prioridade] || 'media';
    }

    async function handleMudarStatus(chamadoId, novoStatusId) {
        const statusList = getStatusList();
        const novoStatus = statusList.find(s => s.id === novoStatusId);
        if (!novoStatus) return;

        // Atualiza localmente primeiro (UI responsiva)
        setChamados(prev => prev.map(c =>
            c.id === chamadoId
                ? { ...c, status: novoStatus, data_atualizacao: new Date().toISOString() }
                : c
        ));
        setMenuAberto(null);

        // Atualiza no "backend" (mock)
        await atualizarStatus(chamadoId, novoStatusId);
    }

    async function handleExcluir(chamadoId) {
        if (!window.confirm('Tem certeza que deseja excluir este chamado?')) return;

        // Remove from the UI immediately
        setChamados(prev => prev.filter(c => c.id !== chamadoId));
        setMenuAberto(null);

        try {
            await excluirChamado(chamadoId);
        } catch (error) {
            console.error('Erro ao excluir:', error);
            // Revert state if necessary in an actual app
            getChamados().then(setChamados);
        }
    }

    const statusOptions = getStatusList();

    return (
        <div className="chamados-page">
            <div className="page-header">
                <h1>Gerenciar Chamados</h1>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                    <Plus size={18} />
                    Novo Chamado
                </button>
            </div>

            {/* Barra de busca e filtros */}
            <div className="chamados-toolbar card">
                <div className="search-box">
                    <Search size={18} className="search-icon" />
                    <input
                        id="busca-chamados"
                        type="text"
                        className="input-field search-input"
                        placeholder="Buscar por título ou usuário..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                </div>
                <select
                    id="filtro-status"
                    className="select-field"
                    value={filtroStatus}
                    onChange={e => setFiltroStatus(e.target.value)}
                >
                    <option>Todos os Status</option>
                    <option>Aberto</option>
                    <option>Em andamento</option>
                    <option>Fechado</option>
                </select>
            </div>

            {/* Tabela */}
            <div className="card chamados-table-container">
                <table className="chamados-table">
                    <thead>
                        <tr>
                            <th>Chamado</th>
                            <th>Status</th>
                            <th>Prioridade</th>
                            <th>Usuário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamadosFiltrados.map((chamado, i) => (
                            <tr
                                key={chamado.id}
                                className="animate-fade-in"
                                style={{ animationDelay: `${i * 0.05}s` }}
                            >
                                <td>
                                    <div className="chamado-cell">
                                        <span className="chamado-cell-titulo">{chamado.titulo}</span>
                                        <span className="chamado-cell-desc">{chamado.descricao}</span>
                                    </div>
                                </td>
                                <td>
                                    <StatusBadge status={chamado.status.nome} />
                                </td>
                                <td>
                                    <span className={`prioridade-tag prioridade-${getPrioridadeClass(chamado.prioridade)}`}>
                                        {chamado.prioridade}
                                    </span>
                                </td>
                                <td>
                                    <div className="usuario-cell">
                                        <div className="usuario-avatar-sm">{chamado.criado_por.avatar}</div>
                                        <span>{chamado.criado_por.nome}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="action-menu-container" ref={menuAberto === chamado.id ? menuRef : null}>
                                        <button
                                            className="action-btn"
                                            onClick={() => setMenuAberto(menuAberto === chamado.id ? null : chamado.id)}
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                        {menuAberto === chamado.id && (
                                            <div className="action-dropdown animate-fade-in">
                                                <span className="dropdown-label">ALTERAR STATUS:</span>

                                                {chamado.status.nome === 'Aberto' && (
                                                    <>
                                                        <button className="dropdown-item" onClick={() => handleMudarStatus(chamado.id, 2)}>
                                                            <Loader size={14} className="dropdown-icon-yellow" /> Em andamento
                                                        </button>
                                                        <button className="dropdown-item" onClick={() => handleMudarStatus(chamado.id, 3)}>
                                                            <XCircle size={14} className="dropdown-icon-red" /> Fechado
                                                        </button>
                                                    </>
                                                )}

                                                {chamado.status.nome === 'Em andamento' && (
                                                    <>
                                                        <button className="dropdown-item" onClick={() => handleMudarStatus(chamado.id, 1)}>
                                                            <CircleDot size={14} className="dropdown-icon-green" /> Voltar para Aberto
                                                        </button>
                                                        <button className="dropdown-item" onClick={() => handleMudarStatus(chamado.id, 3)}>
                                                            <XCircle size={14} className="dropdown-icon-red" /> Fechado
                                                        </button>
                                                    </>
                                                )}

                                                {chamado.status.nome === 'Fechado' && (
                                                    <>
                                                        <button className="dropdown-item" onClick={() => handleMudarStatus(chamado.id, 1)}>
                                                            <CircleDot size={14} className="dropdown-icon-green" /> Reabrir Chamado
                                                        </button>
                                                        {usuarioLogado.role === 'administrador' && (
                                                            <>
                                                                <div className="dropdown-divider"></div>
                                                                <button className="dropdown-item dropdown-item-danger" onClick={() => handleExcluir(chamado.id)}>
                                                                    <Trash2 size={14} /> Excluir Chamado
                                                                </button>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {chamadosFiltrados.length === 0 && (
                    <div className="empty-state">
                        <p>Nenhum chamado encontrado</p>
                    </div>
                )}
            </div>

            <NovoChamadoModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onChamadoCriado={() => getChamados().then(setChamados)}
            />
        </div>
    );
}

export default Chamados;
