/**
 * Serviço de API — Helpdesk Acadêmico
 * 
 * OBJETIVO: Este arquivo centraliza todas as requisições de dados do front-end.
 * Atualmente, ele usa os dados locais de `mockData.js` para simular um banco de dados,
 * mas foi estruturado com `async/await` e `Promises` para que a troca pelo backend real seja contínua.
 * 
 * LÓGICA DE MIGRAÇÃO FUTURA:
 * Quando o Django (DRF) estiver pronto, você vai:
 * 1. Apagar as importações do `mockData`.
 * 2. Instalar o `axios` (ou usar o `fetch` nativo).
 * 3. Substituir o corpo das funções. 
 * 
 * Exemplo de como ficará no futuro:
 *   const BASE_URL = 'http://localhost:8000/api';
 *   export async function getChamados() {
 *     const res = await fetch(`${BASE_URL}/chamados/`, { 
 *         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
 *     });
 *     return res.json();
 *   }
 */

import {
    chamados,
    estatisticas,
    demandasPorCategoria,
    volumePorDia,
    metricas,
    usuarioLogado,
    statusList,
    categorias,
    prioridades,
} from '../data/mockData';

// Simula o tempo de resposta da internet (delay de rede).
// ISSO É CRUCIAL para podermos testar Loading States (spinners) no frontend.
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ---- Auth ----
export async function login(email, senha) {
    await delay(500);
    // Aceita qualquer credencial por hora
    return { success: true, user: usuarioLogado };
}

export async function logout() {
    await delay(200);
    return { success: true };
}

// ---- API: Chamados ----

// GET /api/chamados/
export async function getChamados() {
    await delay();
    // Retorna uma CÓPIA do array para evitar mutações acidentais na referência original
    return [...chamados];
}

// GET /api/chamados/:id/
export async function getChamadoById(id) {
    await delay();
    return chamados.find(c => c.id === id) || null;
}

// POST /api/chamados/
// LÓGICA: Recebe o payload do formulário, adiciona os campos automáticos (id, status padrão, autor, timestamps)
export async function criarChamado(novoChamado) {
    await delay(400); // Simulando tempo de processamento do servidor
    const novo = {
        id: chamados.length + 1,
        ...novoChamado,
        status: statusList[0], // Sempre inicializa como 'Aberto' (id 1)
        criado_por: usuarioLogado, // Associa ao usuário logado na sessão
        // Converte a data atual para padrão ISO8601 (O padrão que o Django DateTimeField usa)
        data_criacao: new Date().toISOString(),
        data_atualizacao: new Date().toISOString(),
    };

    // Adiciona ao topo da lista local (unshift)
    chamados.unshift(novo);
    return novo; // O backend geralmente devolve o objeto recém-criado
}

// PATCH /api/chamados/:id/ -> { "status_id": novoStatusId }
// LÓGICA: Atualiza apenas o status de um chamado específico.
export async function atualizarStatus(chamadoId, novoStatusId) {
    await delay();
    const chamado = chamados.find(c => c.id === chamadoId);
    if (chamado) {
        // Encontra o objeto de status inteiro pelo ID e substitui
        chamado.status = statusList.find(s => s.id === novoStatusId);
        chamado.data_atualizacao = new Date().toISOString();
    }
    return chamado;
}

// DELETE /api/chamados/:id/
// LÓGICA: Remove permanentemente um chamado. No Django, isso faria um `Chamado.objects.get(id=X).delete()`
export async function excluirChamado(chamadoId) {
    await delay();
    const index = chamados.findIndex(c => c.id === chamadoId);
    if (index !== -1) {
        chamados.splice(index, 1); // Remove do array origin (mockData)
    }
    return { success: true };
}

// ---- Dashboard ----
export async function getEstatisticas() {
    await delay();
    return { ...estatisticas };
}

export async function getDemandasPorCategoria() {
    await delay();
    return [...demandasPorCategoria];
}

// ---- Relatórios ----
export async function getVolumePorDia() {
    await delay();
    return [...volumePorDia];
}

export async function getMetricas() {
    await delay();
    return { ...metricas };
}

// ---- Auxiliares ----
export function getStatusList() {
    return [...statusList];
}

export function getCategorias() {
    return [...categorias];
}

export function getPrioridades() {
    return [...prioridades];
}
