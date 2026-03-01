import { useState } from 'react';
import { X } from 'lucide-react';
import { criarChamado, getCategorias, getPrioridades } from '../../services/api';
import './NovoChamadoModal.css';

/**
 * COMPONENTE: Modal de Novo Chamado
 * 
 * OBJETIVO: Um popup (modal) sobreposto à tela atual para criar um ticket rapidamente.
 * Recebe props:
 * - isOpen: booleano para mostrar/esconder o modal
 * - onClose: função para fechar o modal
 * - onChamadoCriado: callback chamada pós-sucesso para atualizar a lista "pai"
 */
function NovoChamadoModal({ isOpen, onClose, onChamadoCriado }) {
    // ------------------------------------------------------------------------
    // ESTADOS (Hooks) do Formulário
    // ------------------------------------------------------------------------
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    // Valores padrão iniciais para os Selects
    const [prioridade, setPrioridade] = useState('Média');
    const [categoria, setCategoria] = useState('Software');
    // Controle de estado de carregamento (previne duplo clique e mostra feedback)
    const [loading, setLoading] = useState(false);

    // Listas de opções carregadas da API (Mock)
    const categorias = getCategorias();
    const prioridades = getPrioridades();

    // Se o modal não estiver aberto, não renderiza nada na DOM
    if (!isOpen) return null;

    // Função executada ao submeter o formulário
    async function handleSubmit(e) {
        // Previne o comportamento padrão do HTML de recarregar a página
        e.preventDefault();

        // Validação básica: Título é obrigatório e não pode ser só espaços
        if (!titulo.trim()) return;

        setLoading(true); // Bloqueia o botão e mostra 'Criando...'
        try {
            // Chamada assíncrona para a API (POST /api/chamados)
            const novo = await criarChamado({ titulo, descricao, prioridade, categoria });

            // Se o componente "Pai" (ex: Dashboard ou Chamados.jsx) passou a função,
            // chamamos ela agora para que a tabela seja atualizada lá.
            if (onChamadoCriado) onChamadoCriado(novo);

            // Limpa o formulário para o próximo uso
            setTitulo('');
            setDescricao('');
            setPrioridade('Média');
            setCategoria('Software');

            onClose(); // Fecha o modal
        } finally {
            // Independente de sucesso ou erro (Try/Catch), sempre destrava o botão no final
            setLoading(false);
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Novo Chamado</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Título *</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Descreva o problema brevemente"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Descrição</label>
                        <textarea
                            className="input-field novo-chamado-textarea"
                            placeholder="Detalhe o problema aqui..."
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            rows={4}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="label">Prioridade</label>
                            <select
                                className="select-field"
                                value={prioridade}
                                onChange={e => setPrioridade(e.target.value)}
                            >
                                {prioridades.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="label">Categoria</label>
                            <select
                                className="select-field"
                                value={categoria}
                                onChange={e => setCategoria(e.target.value)}
                            >
                                {categorias.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Criando...' : 'Criar Chamado'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NovoChamadoModal;
