"use client";

import { useEffect, useState } from "react";
import { CHAVES_STORAGE } from "@/lib/constantes";

export default function CaixaDaltonico({ onChange }) {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    try {
      setAtivo(window.localStorage.getItem(CHAVES_STORAGE.MOSTRAR_ROTULOS) === "true");
    } catch {
      // O jogo continua funcionando quando o armazenamento está indisponível.
    }
  }, []);

  function alternar() {
    const novoValor = !ativo;
    setAtivo(novoValor);
    onChange?.(novoValor);
    try {
      window.localStorage.setItem(CHAVES_STORAGE.MOSTRAR_ROTULOS, String(novoValor));
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
