import { useState } from 'react';
import { X } from 'lucide-react';
import { criarChamado, getCategorias, getPrioridades } from '../../services/api';
import './NovoChamadoModal.css';

function NovoChamadoModal({ isOpen, onClose, onChamadoCriado }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('Média');
    const [categoria, setCategoria] = useState('Software');
    const [loading, setLoading] = useState(false);

    const categorias = getCategorias();
    const prioridades = getPrioridades();

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!titulo.trim()) return;

        setLoading(true);
        try {
            const novo = await criarChamado({ titulo, descricao, prioridade, categoria });
            if (onChamadoCriado) onChamadoCriado(novo);
            setTitulo('');
            setDescricao('');
            setPrioridade('Média');
            setCategoria('Software');
            onClose();
        } finally {
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
