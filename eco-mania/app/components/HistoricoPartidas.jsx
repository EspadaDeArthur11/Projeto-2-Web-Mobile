"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "eco-mania:historico";

export default function HistoricoPartidas({ registros: registrosIniciais }) {
  const [registros, setRegistros] = useState(registrosIniciais || []);

  useEffect(() => {
    if (registrosIniciais) return;
    try {
      const salvo = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      setRegistros(Array.isArray(salvo) ? salvo.slice(0, 2) : []);
    } catch {
      setRegistros([]);
    }
  }, [registrosIniciais]);

  if (!registros.length) return null;

  return (
    <section className="historico" aria-labelledby="historico-titulo">
      <h2 id="historico-titulo">Últimas partidas</h2>
      <ol>
        {registros.slice(0, 2).map((partida, indice) => (
          <li key={partida.id || `${partida.modo}-${indice}`}>
            <span>{partida.modo === "tempo" ? "Por tempo" : "Clássico"}</span>
            <strong>{partida.pontuacao ?? partida.pontos ?? 0} pontos</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
