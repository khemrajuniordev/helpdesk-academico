/**
 * Dados mockados para o Helpdesk Acadêmico
 * 
 * OBJETIVO: Este arquivo atua como um "banco de dados falso" temporário no desenvolvimento (Front-End First).
 * LÓGICA: A estrutura dos objetos aqui espelha intencionalmente a arquitetura real dos `models` do Django.
 * Isso garante que, quando o momento de conectar a API real chegar, o frontend já estará esperando o formato exato 
 * das respostas JSON (facilitando muito a integração).
 */

// ----------------------------------------------------------------------------
// 1. Usuários (Espelha o modelo padrão do Django: django.contrib.auth.models.User)
// ----------------------------------------------------------------------------
// A propriedade 'role' define as permissões da interface (ex: apenas admin pode excluir).
export const usuarios = [
  { id: 1, nome: 'Maria Silva', email: 'maria@empresa.com', role: 'cliente', avatar: 'M' },
  { id: 2, nome: 'João Souza', email: 'joao@empresa.com', role: 'cliente', avatar: 'J' },
  { id: 3, nome: 'Carlos Lima', email: 'carlos@empresa.com', role: 'atendente', avatar: 'C' },
  { id: 4, nome: 'Ana Paula', email: 'ana@empresa.com', role: 'cliente', avatar: 'A' },
  { id: 5, nome: 'khemrajunior', email: 'khemraj@empresa.com', role: 'administrador', avatar: 'K' },
];

// ----------------------------------------------------------------------------
// 2. Status Possíveis (Espelha o modelo chamados.models.Status no backend)
// ----------------------------------------------------------------------------
// LÓGICA: Cada chamado está atrelado a um ID de status. Isso foi separado em objetos 
// pois no futuro o Django retornará chaves estrangeiras.
export const statusList = [
  { id: 1, nome: 'Aberto' },
  { id: 2, nome: 'Em andamento' },
  { id: 3, nome: 'Fechado' },
];

// ----------------------------------------------------------------------------
// 3. Tipos Auxiliares (Categorias e Prioridades)
// ----------------------------------------------------------------------------
export const categorias = ['Software', 'Hardware', 'Setup', 'Rede'];
export const prioridades = ['Alta', 'Média', 'Baixa'];

// ----------------------------------------------------------------------------
// 4. Chamados Base do Sistema (Espelha o modelo chamados.models.Chamado)
// ----------------------------------------------------------------------------
// LÓGICA: Tabela central. Note que 'status' e 'criado_por' contêm objetos completos.
// No Django REST Framework (DRF), usaríamos serializers aninhados (nested serializers)
// para entregar esses dados populados em uma única requisição na rota /api/chamados.
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
    status: statusList[1], // Em andamento
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
    status: statusList[2], // Fechado
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

// Simulando o contexto de autenticação global. Define quem está vendo a tela.
export const usuarioLogado = usuarios[4];

// ----------------------------------------------------------------------------
// 5. Agregações para Páginas (Simulando views anotadas/agrupadas do Django)
// ----------------------------------------------------------------------------

// A página de Dashboard precisa de totais gerais. 
// LÓGICA: Filtramos a cópia local. Num backend real, faríamos um `Chamado.objects.filter().count()`.
export const estatisticas = {
  total: chamados.length,
  abertos: chamados.filter(c => c.status.nome === 'Aberto').length,
  emAndamento: chamados.filter(c => c.status.nome === 'Em andamento').length,
  fechados: chamados.filter(c => c.status.nome === 'Fechado').length,
};

// Dados pro gráfico de barras de categoria no Dashboard.
export const demandasPorCategoria = categorias.map(cat => ({
  categoria: cat,
  quantidade: chamados.filter(c => c.categoria === cat).length,
}));

// Relatórios fixos pro gráfico temporal (volume gerado nos últimos dias)
export const volumePorDia = [
  { dia: 'D1', quantidade: 3 },
  { dia: 'D2', quantidade: 5 },
  { dia: 'D3', quantidade: 2 },
  { dia: 'D4', quantidade: 7 },
  { dia: 'D5', quantidade: 4 },
  { dia: 'D6', quantidade: 6 },
  { dia: 'D7', quantidade: 3 },
];

// Relatórios — Métricas baseadas em SLA (SLA indica o acordo de nível de serviço / prazo).
export const metricas = {
  percentualNoPrazo: 80,
  tempoMedioResposta: '14 min',
  tempoMedioResolucao: '3.5 horas',
};
