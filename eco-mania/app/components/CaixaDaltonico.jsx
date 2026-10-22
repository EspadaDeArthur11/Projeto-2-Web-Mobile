"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "eco-mania:mostrar-rotulos";

export default function CaixaDaltonico({ onChange }) {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    try {
      setAtivo(window.localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // O jogo continua funcionando quando o armazenamento está indisponível.
    }
  }, []);

  function alternar() {
    const novoValor = !ativo;
    setAtivo(novoValor);
    onChange?.(novoValor);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(novoValor));
    } catch {
      // A preferência é apenas uma conveniência e não deve interromper o jogo.
    }
  }

  return (
    <label className="caixa-daltonico">
      <input type="checkbox" checked={ativo} onChange={alternar} />
      <span>Exibir o nome nas lixeiras</span>
    </label>
  );
}
