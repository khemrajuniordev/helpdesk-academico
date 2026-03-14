import { useState, useEffect, useRef } from 'react';
import { Search, Plus, MoreVertical, Clock, Loader, XCircle, CircleDot, Trash2 } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import NovoChamadoModal from '../../components/NovoChamadoModal/NovoChamadoModal';
import { getChamados, atualizarStatus, getStatusList, excluirChamado } from '../../services/api';
import { usuarioLogado } from '../../data/mockData';
import './Chamados.css';

/**
 * PÁGINA: Gerenciamento de Chamados (/chamados)
 * 
 * OBJETIVO: Exibir a lista de tickets do sistema, permitindo busca, filtro por status,
 * criação de novos tickets e atualização de status/exclusão em tempo real.
 */
function Chamados() {
    // ------------------------------------------------------------------------
    // ESTADOS (Hooks)
    // ------------------------------------------------------------------------
    // 'chamados' guarda a lista de objetos vinda da API
    const [chamados, setChamados] = useState([]);
    // 'busca' é controlado pelo input de pesquisa (texto livre)
    const [busca, setBusca] = useState('');
    // 'filtroStatus' controla a aba de categorias de status (Aberto, Em andamento, etc)
    const [filtroStatus, setFiltroStatus] = useState('Todos os Status');
    // 'modalOpen' controla a visibilidade do componente <NovoChamadoModal />
    const [modalOpen, setModalOpen] = useState(false);
    // 'menuAberto' guarda o ID do chamado que tem o dropdown de ações aberto
    const [menuAberto, setMenuAberto] = useState(null);

    // useRef é usado aqui para detectar "cliques fora" do dropdown e fechá-lo
    const menuRef = useRef(null);

    // ------------------------------------------------------------------------
    // EFEITOS DE CICLO DE VIDA
    // ------------------------------------------------------------------------
    // Módulo 1: Fecha o menu de dropdown caso o usuário clique em qualquer lugar fora dele
    useEffect(() => {
        function handleClickFora(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuAberto(null);
            }
        }
        document.addEventListener('mousedown', handleClickFora);
        return () => document.removeEventListener('mousedown', handleClickFora);
    }, []);

    // Módulo 2: Busca os chamados assim que a tela abre (o Array vazio [] garante que rode só 1x)
    useEffect(() => {
        getChamados().then(setChamados);
    }, []);

    // ------------------------------------------------------------------------
    // LÓGICA DE DADOS ESTACIONÁRIA
    // ------------------------------------------------------------------------
    // Aplicação dos dois filtros simultaneamente: Busca em texto + Dropdown de Status
    const chamadosFiltrados = chamados.filter(c => {
        const matchBusca =
            c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
            c.criado_por.nome.toLowerCase().includes(busca.toLowerCase());
        const matchStatus =
            filtroStatus === 'Todos os Status' || c.status.nome === filtroStatus;
        return matchBusca && matchStatus;
    });

    // Converte os textos (Alta, Média, Baixa) nas classes de CSS correspondentes
    function getPrioridadeClass(prioridade) {
        const map = { 'Alta': 'alta', 'Média': 'media', 'Baixa': 'baixa' };
        return map[prioridade] || 'media';
    }

    // ------------------------------------------------------------------------
    // AÇÕES DE MUTABILIDADE (CRUD)
    // ------------------------------------------------------------------------

    // Atualiza o Status de um Chamado
    async function handleMudarStatus(chamadoId, novoStatusId) {
        const statusList = getStatusList();
        const novoStatus = statusList.find(s => s.id === novoStatusId);
        if (!novoStatus) return;

        // LÓGICA "Optimistic Update" (Atualização Otimista):
        // Primeiro, alteramos a interface gráfica instantaneamente para parecer super rápida ao usuário.
        setChamados(prev => prev.map(c =>
            c.id === chamadoId
                ? { ...c, status: novoStatus, data_atualizacao: new Date().toISOString() }
                : c
        ));
        setMenuAberto(null);

        // Depois, enviamos via rede pro backend atualizar o banco real de forma silenciosa.
        await atualizarStatus(chamadoId, novoStatusId);
    }

    // Exclui um chamado
    async function handleExcluir(chamadoId) {
        // Confirmação antes de prosseguir com a exclusão
        if (!window.confirm('Tem certeza que deseja excluir este chamado?')) return;

        // LÓGICA "Optimistic Update" (Atualização Otimista):
        // Remove da UI imediatamente para uma experiência de usuário mais fluida.
        setChamados(prev => prev.filter(c => c.id !== chamadoId));
        setMenuAberto(null); // Fecha o menu de ações após a exclusão

        try {
            // Requisição para a API mock (futuro DELETE /api/chamados/X)
            await excluirChamado(chamadoId);
        } catch (error) {
            console.error('Erro ao excluir:', error);
            // Em caso de erro na API, reverte a alteração otimista buscando os dados limpos novamente
            // Isso garante que a UI reflita o estado real do backend.
            getChamados().then(setChamados);
        }
    }

    // Obtém a lista de opções de status para uso em filtros ou dropdowns
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
