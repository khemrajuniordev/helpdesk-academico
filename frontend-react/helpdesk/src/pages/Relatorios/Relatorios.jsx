import { useState, useEffect } from 'react';
import { Download, RefreshCw, Plus } from 'lucide-react';
import NovoChamadoModal from '../../components/NovoChamadoModal/NovoChamadoModal';
import { getVolumePorDia, getMetricas } from '../../services/api';
import './Relatorios.css';

/**
 * PÁGINA: Relatórios Estatísticos (/relatorios)
 * 
 * OBJETIVO: Exibir gráficos e métricas numéricas mais avançadas sobre o desempenho 
 * do atendimento (SLA, volumetria diária).
 */
function Relatorios() {
    // ------------------------------------------------------------------------
    // ESTADOS (Hooks)
    // ------------------------------------------------------------------------
    const [volume, setVolume] = useState([]);
    const [metricas, setMetricas] = useState({ percentualNoPrazo: 0, tempoMedioResposta: '', tempoMedioResolucao: '' });
    const [modalOpen, setModalOpen] = useState(false);

    // Busca dados simultaneamente ao carregar a página
    useEffect(() => {
        async function loadData() {
            const [volumeData, metricasData] = await Promise.all([
                getVolumePorDia(),
                getMetricas(),
            ]);
            setVolume(volumeData);
            setMetricas(metricasData);
        }
        loadData();
    }, []);

    // ------------------------------------------------------------------------
    // CÁLCULOS PARA OS GRÁFICOS
    // ------------------------------------------------------------------------

    // Gráfico de Barras (Volume): Encontra o dia de maior movimento para definir a altura 100% da barra
    const maxVolume = Math.max(...volume.map(v => v.quantidade), 1);

    // Gráfico de Rosca (SLA): Matemática pura de SVG para desenhar o progresso circular animado
    // radius = Raio do círculo
    const radius = 40;
    // circumference = Tamanho total do contorno (2 * PI * Raio)
    const circumference = 2 * Math.PI * radius;
    // offset = Quanto da linha do círculo deve ficar vazia baseada na porcentagem
    const offset = circumference - (metricas.percentualNoPrazo / 100) * circumference;

    return (
        <div className="relatorios-page">
            <div className="page-header">
                <h1>Relatórios Estatísticos</h1>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                    <Plus size={18} />
                    Novo Chamado
                </button>
            </div>

            {/* Banner */}
            <div className="relatorios-banner animate-fade-in">
                <div className="banner-text">
                    <h2>Processamento de Dados</h2>
                    <p>
                        Estes relatórios são gerados através do processamento auxiliar desenvolvido em
                        C, analisando eficiência de atendimento e volumetria semanal.
                    </p>
                </div>
                <div className="banner-actions">
                    <button className="btn btn-banner">
                        <Download size={16} />
                        Exportar CSV
                    </button>
                    <button className="btn btn-banner-outline">
                        <RefreshCw size={16} />
                        Re-calcular Métricas
                    </button>
                </div>
            </div>

            {/* Cards de relatórios */}
            <div className="relatorios-grid">
                {/* Volume por dia */}
                <div className="card relatorio-card">
                    <div className="relatorio-card-header">
                        <h3>Volume por Dia</h3>
                        <span className="relatorio-period">Últimos 7 dias</span>
                    </div>
                    <div className="volume-chart">
                        {volume.map((v, i) => (
                            <div className="volume-bar-group" key={v.dia}>
                                <div className="volume-bar-wrapper">
                                    <div
                                        className="volume-bar"
                                        style={{
                                            height: `${(v.quantidade / maxVolume) * 100}%`,
                                            animationDelay: `${i * 0.08}s`,
                                        }}
                                    >
                                        <span className="volume-value">{v.quantidade}</span>
                                    </div>
                                </div>
                                <span className="volume-label">{v.dia}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SLA & Resolução */}
                <div className="card relatorio-card">
                    <div className="relatorio-card-header">
                        <h3>SLA e Resolução</h3>
                    </div>

                    <div className="sla-content">
                        {/* Donut chart */}
                        <div className="donut-container">
                            <svg viewBox="0 0 100 100" className="donut-svg">
                                <circle
                                    cx="50" cy="50" r={radius}
                                    fill="none"
                                    stroke="var(--gray-200)"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="50" cy="50" r={radius}
                                    fill="none"
                                    stroke="var(--primary-500)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    className="donut-progress"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="donut-label">
                                <span className="donut-percent">{metricas.percentualNoPrazo}%</span>
                            </div>
                            <p className="donut-description">
                                Chamados Resolvidos no Prazo
                                <br />
                                <small>Média baseada no último mês de operação.</small>
                            </p>
                        </div>

                        {/* Métricas */}
                        <div className="sla-metrics">
                            <div className="sla-metric">
                                <span className="sla-metric-label">Tempo médio de resposta</span>
                                <span className="sla-metric-value">{metricas.tempoMedioResposta}</span>
                            </div>
                            <div className="sla-metric">
                                <span className="sla-metric-label">Tempo médio de resolução</span>
                                <span className="sla-metric-value">{metricas.tempoMedioResolucao}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NovoChamadoModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}

export default Relatorios;
