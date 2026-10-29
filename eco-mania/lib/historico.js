/**
 * lib/historico.js
 *
 * Funções utilitárias para gravar e recuperar o histórico de partidas
 * e os recordes de cada modo no localStorage.
 */

import { CHAVES_STORAGE } from "./constantes";

// ─── Recordes ─────────────────────────────────────────────────────────────────

/** Devolve o recorde salvo para o modo informado (0 se não houver). */
export function lerRecorde(modo) {
  const chave =
    modo === "tempo"
      ? CHAVES_STORAGE.RECORDE_TEMPO
      : CHAVES_STORAGE.RECORDE_CLASSICO;
  try {
    return parseInt(window.localStorage.getItem(chave) || "0", 10);
  } catch {
    return 0;
  }
}

/** Salva o recorde do modo se a pontuação atual for maior que o registrado. */
export function atualizarRecorde(modo, pontuacao) {
  const chave =
    modo === "tempo"
      ? CHAVES_STORAGE.RECORDE_TEMPO
      : CHAVES_STORAGE.RECORDE_CLASSICO;
  try {
    const atual = parseInt(window.localStorage.getItem(chave) || "0", 10);
    if (pontuacao > atual) {
      window.localStorage.setItem(chave, String(pontuacao));
      return true; // superou o recorde
    }
  } catch {
    // Falha de armazenamento não interrompe o jogo (RNF09).
  }
  return false;
}

// ─── Histórico de partidas ────────────────────────────────────────────────────

/**
 * Formata um resultado de partida para o formato de registro do histórico.
 * Adiciona um `id` baseado em timestamp para uso como chave React.
 */
export function formatarRegistro(resultado) {
  return {
    id: Date.now(),
    modo: resultado.modo,
    pontuacao: resultado.pontuacao,
    acertos: resultado.acertos,
    erros: resultado.erros,
    maiorSequencia: resultado.maiorSequencia,
  };
}

/**
 * Lê o histórico do localStorage (máximo 2 registros).
 * Devolve array vazio em caso de falha.
 */
export function lerHistorico() {
  try {
    const salvo = JSON.parse(
      window.localStorage.getItem(CHAVES_STORAGE.HISTORICO) || "[]"
    );
    return Array.isArray(salvo) ? salvo.slice(0, 2) : [];
  } catch {
    return [];
  }
}

/**
 * Insere um novo registro na fila de histórico.
 * A fila mantém no máximo 2 posições; o mais antigo é descartado.
 */
export function salvarHistorico(resultado) {
  try {
    const historico = lerHistorico();
    const novoRegistro = formatarRegistro(resultado);
    // Novo na frente → descarta o terceiro se houver.
    const novoHistorico = [novoRegistro, ...historico].slice(0, 2);
    window.localStorage.setItem(
      CHAVES_STORAGE.HISTORICO,
      JSON.stringify(novoHistorico)
    );
  } catch {
    // Falha de armazenamento não interrompe o jogo (RNF09).
  }
}
