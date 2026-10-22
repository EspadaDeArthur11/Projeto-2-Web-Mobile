"use client";

import { useEffect, useMemo, useState } from "react";
import Feedback from "./Feedback";
import Hud from "./Hud";
import Lixeiras from "./Lixeiras";
import Residuo from "./Residuo";
import { PONTUACAO, REGRAS_MODOS } from "@/lib/constantes";

export default function Jogo({ modo = "classico", catalogo = [], onEncerrar }) {
  const itens = Array.isArray(catalogo) ? catalogo : catalogo.residuos || [];
  const regras = REGRAS_MODOS[modo] || REGRAS_MODOS.classico;

  const [indice, setIndice] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [vidas, setVidas] = useState(modo === "classico" ? regras.vidasIniciais : null);
  const [tempo, setTempo] = useState(modo === "tempo" ? regras.tempoInicialSegundos : null);
  const [bloqueado, setBloqueado] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [estatisticas, setEstatisticas] = useState({
    acertos: 0,
    erros: 0,
    sequencia: 0,
    maiorSequencia: 0,
  });

  const residuo = itens[indice];

  const tempoFormatado = useMemo(() => {
    if (tempo === null) return undefined;
    const minutos = String(Math.floor(tempo / 60)).padStart(2, "0");
    const segundos = String(tempo % 60).padStart(2, "0");
    return `${minutos}:${segundos}`;
  }, [tempo]);

  useEffect(() => {
    if (modo !== "tempo" || tempo === null || tempo <= 0) return undefined;
    const timer = window.setInterval(() => {
      setTempo((valor) => Math.max(0, valor - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [modo, tempo]);

  useEffect(() => {
    const terminouTempo = modo === "tempo" && tempo === 0;
    const terminouVidas = modo === "classico" && vidas === 0;

    if (terminouTempo || terminouVidas) {
      onEncerrar?.({ modo, pontuacao, vidas, ...estatisticas });
    }
  }, [modo, tempo, vidas, pontuacao, estatisticas, onEncerrar]);

  function responder(categoria) {
    if (bloqueado || !residuo) return;

    const acertou = categoria === residuo.categoria;
    const novaSequencia = acertou ? estatisticas.sequencia + 1 : 0;
    const pontos = acertou
      ? novaSequencia >= PONTUACAO.LIMIAR_BONUS_SEQUENCIA
        ? PONTUACAO.ACERTO_BONUS
        : PONTUACAO.ACERTO_PADRAO
      : PONTUACAO.ERRO;

    setPontuacao((valor) => valor + pontos);
    setEstatisticas((prev) => ({
      acertos: prev.acertos + (acertou ? 1 : 0),
      erros: prev.erros + (acertou ? 0 : 1),
      sequencia: novaSequencia,
      maiorSequencia: Math.max(prev.maiorSequencia, novaSequencia),
    }));

    if (!acertou && modo === "classico") {
      setVidas((valor) => Math.max(0, (valor ?? regras.vidasIniciais) - 1));
    }

    setFeedback({
      natureza: acertou ? "acerto" : "erro",
      mensagem: acertou ? `Acerto! ${residuo.categoria}.` : "Não é essa lixeira.",
      explicacao: acertou ? undefined : residuo.explicacao,
    });

    setBloqueado(true);
    const tempoPausa = acertou ? regras.pausaAcertoMs : regras.pausaErroMs;

    window.setTimeout(() => {
      setIndice((valor) => (itens.length ? (valor + 1) % itens.length : valor));
      setFeedback(null);
      setBloqueado(false);
    }, tempoPausa);
  }

  function soltarResiduo(evento) {
    const elemento = document.elementFromPoint(evento.clientX, evento.clientY);
    const lixeira = elemento?.closest?.("[data-categoria]");
    if (lixeira) responder(lixeira.dataset.categoria);
  }

  if (!residuo) {
    return <Feedback natureza="info" mensagem="Nenhum resíduo disponível." />;
  }

  return (
    <main className="jogo">
      <Hud
        modo={modo}
        pontuacao={pontuacao}
        vidas={vidas}
        tempoFormatado={tempoFormatado}
      />
      <Residuo
        residuo={residuo}
        podeJogar={!bloqueado}
        onSoltar={soltarResiduo}
      />
      <Feedback {...feedback} />
      <Lixeiras onEscolher={responder} />
    </main>
  );
}
