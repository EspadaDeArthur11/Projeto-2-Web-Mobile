/**
 * Constantes e configurações do jogo Eco Mania
 * Centraliza cores oficiais CONAMA, categorias, pontuação, regras e chaves de armazenamento.
 */

export const CATEGORIAS = ["vidro", "plastico", "papel", "organico", "metal"];

export const DADOS_CATEGORIAS = {
  vidro: {
    cor: "#16803c",
    simbolo: "◇",
    rotulo: "Vidro",
  },
  plastico: {
    cor: "#c53030",
    simbolo: "♢",
    rotulo: "Plástico",
  },
  papel: {
    cor: "#2b6cb0",
    simbolo: "▤",
    rotulo: "Papel",
  },
  organico: {
    cor: "#805b35",
    simbolo: "♧",
    rotulo: "Orgânico",
  },
  metal: {
    cor: "#b7791f",
    simbolo: "▣",
    rotulo: "Metal",
  },
};

export const PONTUACAO = {
  ACERTO_PADRAO: 10,
  ACERTO_BONUS: 15,
  LIMIAR_BONUS_SEQUENCIA: 3,
  ERRO: 0,
};

export const REGRAS_MODOS = {
  classico: {
    vidasIniciais: 3,
    pausaAcertoMs: 1200,
    pausaErroMs: 3000,
  },
  tempo: {
    tempoInicialSegundos: 60,
    pausaAcertoMs: 600,
    pausaErroMs: 1600,
  },
};

export const CHAVES_STORAGE = {
  MOSTRAR_ROTULOS: "eco-mania:mostrar-rotulos",
  HISTORICO: "eco-mania:historico",
  RECORDE_CLASSICO: "eco-mania:recorde-classico",
  RECORDE_TEMPO: "eco-mania:recorde-tempo",
  RESULTADO_SESSAO: "eco-mania:resultado-partida",
};
