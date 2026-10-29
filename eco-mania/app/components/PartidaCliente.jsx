"use client";

/**
 * app/components/PartidaCliente.jsx
 *
 * Camada fina entre as Server Pages (/classico, /tempo) e o componente Jogo.
 * Responsabilidade: receber o catálogo e o modo como props serializáveis,
 * interceptar o fim de partida, calcular/atualizar o recorde,
 * persistir o resultado no sessionStorage e redirecionar para /resultado.
 *
 * Deve ser Client Component porque usa useRouter e funções de armazenamento
 * que só existem no browser.
 */

import { useRouter } from "next/navigation";
import Jogo from "./Jogo";
import { CHAVES_STORAGE } from "@/lib/constantes";
import { atualizarRecorde, lerRecorde, salvarHistorico } from "@/lib/historico";

export default function PartidaCliente({ modo, catalogo }) {
  const router = useRouter();

  function encerrar(resultado) {
    // Calcula se o jogador superou o recorde antes de atualizá-lo.
    const recordeAnterior = lerRecorde(modo);
    const superouRecorde = atualizarRecorde(modo, resultado.pontuacao);

    // Persiste o histórico de partidas (fila de 2).
    salvarHistorico(resultado);

    // Monta o objeto completo que a tela de resultado irá consumir.
    const dadosResultado = {
      ...resultado,
      recorde: superouRecorde ? resultado.pontuacao : recordeAnterior,
      superouRecorde,
    };

    // Transporta o resultado até /resultado via sessionStorage.
    try {
      window.sessionStorage.setItem(
        CHAVES_STORAGE.RESULTADO_SESSAO,
        JSON.stringify(dadosResultado)
      );
    } catch {
      // Falha de armazenamento não impede a navegação (RNF09).
    }

    router.push("/resultado");
  }

  return <Jogo modo={modo} catalogo={catalogo} onEncerrar={encerrar} />;
}
