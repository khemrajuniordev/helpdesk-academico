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
export const chamados = [];

// Simulando o contexto de autenticação global. Define quem está vendo a tela.
export const usuarioLogado = usuarios[4];

// ----------------------------------------------------------------------------
// 5. Agregações para Páginas (Simulando views anotadas/agrupadas do Django)
// ----------------------------------------------------------------------------

// A página de Dashboard precisa de totais gerais. 
// LÓGICA: Filtramos a cópia local. Num backend real, faríamos um `Chamado.objects.filter().count()`.
export const estatisticas = {
  total: 0,
  abertos: 0,
  emAndamento: 0,
  fechados: 0,
};

// Dados pro gráfico de barras de categoria no Dashboard.
export const demandasPorCategoria = categorias.map(cat => ({
  categoria: cat,
  quantidade: 0,
}));

// Relatórios fixos pro gráfico temporal (volume gerado nos últimos dias)
export const volumePorDia = [
  { dia: 'D1', quantidade: 0 },
  { dia: 'D2', quantidade: 0 },
  { dia: 'D3', quantidade: 0 },
  { dia: 'D4', quantidade: 0 },
  { dia: 'D5', quantidade: 0 },
  { dia: 'D6', quantidade: 0 },
  { dia: 'D7', quantidade: 0 },
];

// Relatórios — Métricas baseadas em SLA (SLA indica o acordo de nível de serviço / prazo).
export const metricas = {
  percentualNoPrazo: 0,
  tempoMedioResposta: '0 min',
  tempoMedioResolucao: '0 horas',
};
