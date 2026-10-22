"use client";

import { useRef, useState } from "react";

export default function Residuo({ residuo, podeJogar = true, onSoltar }) {
  const [deslocamento, setDeslocamento] = useState({ x: 0, y: 0 });
  const inicio = useRef(null);

  if (!residuo) return null;

  function iniciar(evento) {
    if (!podeJogar) return;
    inicio.current = { x: evento.clientX, y: evento.clientY, pointerId: evento.pointerId };
    evento.currentTarget.setPointerCapture?.(evento.pointerId);
  }

  function mover(evento) {
    if (!inicio.current) return;
    setDeslocamento({
      x: evento.clientX - inicio.current.x,
      y: evento.clientY - inicio.current.y,
    });
  }

  function finalizar(evento) {
    if (!inicio.current) return;
    const arrastado = { ...deslocamento };
    inicio.current = null;
    setDeslocamento({ x: 0, y: 0 });
    onSoltar?.(evento, arrastado);
  }

  return (
    <div
      className="residuo"
      style={{ transform: `translate(${deslocamento.x}px, ${deslocamento.y}px)` }}
      onPointerDown={iniciar}
      onPointerMove={mover}
      onPointerUp={finalizar}
      onPointerCancel={finalizar}
      role="img"
      aria-label={residuo.nome}
      tabIndex={podeJogar ? 0 : -1}
    >
      <img src={`/assets/residuos/${residuo.arquivo}`} alt={residuo.nome} draggable="false" />
      <span>{residuo.nome}</span>
    </div>
  );
}
