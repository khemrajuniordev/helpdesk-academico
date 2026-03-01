/**
 * Serviço de API — Helpdesk Acadêmico
 * 
 * Todas as funções retornam Promises com dados mockados.
 * Para integrar com o backend Django, basta trocar os imports
 * por chamadas fetch/axios para a API REST.
 * 
 * Exemplo futuro:
 *   const BASE_URL = 'http://localhost:8000/api';
 *   export async function getChamados() {
 *     const res = await fetch(`${BASE_URL}/chamados/`);
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

// Simula delay de rede
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

// ---- Chamados ----
export async function getChamados() {
    await delay();
    return [...chamados];
}

export async function getChamadoById(id) {
    await delay();
    return chamados.find(c => c.id === id) || null;
}

export async function criarChamado(novoChamado) {
    await delay(400);
    const novo = {
        id: chamados.length + 1,
        ...novoChamado,
        status: statusList[0], // Aberto
        criado_por: usuarioLogado,
        data_criacao: new Date().toISOString(),
        data_atualizacao: new Date().toISOString(),
    };
    chamados.unshift(novo);
    return novo;
}

export async function atualizarStatus(chamadoId, novoStatusId) {
    await delay();
    const chamado = chamados.find(c => c.id === chamadoId);
    if (chamado) {
        chamado.status = statusList.find(s => s.id === novoStatusId);
        chamado.data_atualizacao = new Date().toISOString();
    }
    return chamado;
}

export async function excluirChamado(chamadoId) {
    await delay();
    const index = chamados.findIndex(c => c.id === chamadoId);
    if (index !== -1) {
        chamados.splice(index, 1);
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
