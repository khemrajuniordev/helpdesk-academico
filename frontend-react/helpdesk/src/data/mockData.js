/**
 * Dados mockados para o Helpdesk Acadêmico
 * Estrutura espelha os models Django (Chamado, Status, User)
 * para facilitar integração futura com a API REST.
 */

// Usuários (espelha django.contrib.auth.models.User)
export const usuarios = [
  { id: 1, nome: 'Maria Silva', email: 'maria@empresa.com', role: 'cliente', avatar: 'M' },
  { id: 2, nome: 'João Souza', email: 'joao@empresa.com', role: 'cliente', avatar: 'J' },
  { id: 3, nome: 'Carlos Lima', email: 'carlos@empresa.com', role: 'atendente', avatar: 'C' },
  { id: 4, nome: 'Ana Paula', email: 'ana@empresa.com', role: 'cliente', avatar: 'A' },
  { id: 5, nome: 'khemrajunior', email: 'khemraj@empresa.com', role: 'administrador', avatar: 'K' },
];

// Status possíveis (espelha chamados.models.Status)
export const statusList = [
  { id: 1, nome: 'Aberto' },
  { id: 2, nome: 'Em andamento' },
  { id: 3, nome: 'Fechado' },
];

// Categorias
export const categorias = ['Software', 'Hardware', 'Setup', 'Rede'];

// Prioridades
export const prioridades = ['Alta', 'Média', 'Baixa'];

// Chamados (espelha chamados.models.Chamado)
export const chamados = [
  {
    id: 1,
    titulo: 'Erro no acesso ao ERP',
    descricao: 'Não consigo logar no sistema financeiro',
    status: statusList[0],
    prioridade: 'Alta',
    categoria: 'Software',
    criado_por: usuarios[0],
    data_criacao: '2026-02-28T10:30:00',
    data_atualizacao: '2026-02-28T10:30:00',
  },
  {
    id: 2,
    titulo: 'Troca de toner - Impressora RH',
    descricao: 'A impressora do RH está com a impressão...',
    status: statusList[1],
    prioridade: 'Média',
    categoria: 'Hardware',
    criado_por: usuarios[1],
    data_criacao: '2026-02-27T14:00:00',
    data_atualizacao: '2026-02-28T09:00:00',
  },
  {
    id: 3,
    titulo: 'Configuração de novo notebook',
    descricao: 'Instalação de softwares básicos para o novo...',
    status: statusList[2],
    prioridade: 'Baixa',
    categoria: 'Setup',
    criado_por: usuarios[2],
    data_criacao: '2026-02-26T08:15:00',
    data_atualizacao: '2026-02-27T16:00:00',
  },
  {
    id: 4,
    titulo: 'Internet lenta no setor comercial',
    descricao: 'Vários usuários relatando lentidão extrema.',
    status: statusList[0],
    prioridade: 'Alta',
    categoria: 'Rede',
    criado_por: usuarios[3],
    data_criacao: '2026-02-28T11:45:00',
    data_atualizacao: '2026-02-28T11:45:00',
  },
];

// Usuário logado (admin)
export const usuarioLogado = usuarios[4];

// Estatísticas
export const estatisticas = {
  total: chamados.length,
  abertos: chamados.filter(c => c.status.nome === 'Aberto').length,
  emAndamento: chamados.filter(c => c.status.nome === 'Em andamento').length,
  fechados: chamados.filter(c => c.status.nome === 'Fechado').length,
};

// Demandas por categoria (para o gráfico do Dashboard)
export const demandasPorCategoria = categorias.map(cat => ({
  categoria: cat,
  quantidade: chamados.filter(c => c.categoria === cat).length,
}));

// Relatórios — Volume últimos 7 dias
export const volumePorDia = [
  { dia: 'D1', quantidade: 3 },
  { dia: 'D2', quantidade: 5 },
  { dia: 'D3', quantidade: 2 },
  { dia: 'D4', quantidade: 7 },
  { dia: 'D5', quantidade: 4 },
  { dia: 'D6', quantidade: 6 },
  { dia: 'D7', quantidade: 3 },
];

// Relatórios — SLA & Resolução
export const metricas = {
  percentualNoPrazo: 80,
  tempoMedioResposta: '14 min',
  tempoMedioResolucao: '3.5 horas',
};
