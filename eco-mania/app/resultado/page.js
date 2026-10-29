"use client";

/**
 * app/resultado/page.js — Rota: /resultado
 * Client Component — depende de sessionStorage, que só existe no browser.
 *
 * Recupera o resultado gravado por PartidaCliente ao fim da partida.
 * Se não houver resultado (acesso direto à URL), redireciona para o menu.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PainelResultado from "../components/PainelResultado";
import DicaRevisao from "../components/DicaRevisao";
import { CHAVES_STORAGE } from "@/lib/constantes";
import catalogo from "@/data/residuos.json";

export default function PaginaResultado() {
  const router = useRouter();
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(CHAVES_STORAGE.RESULTADO_SESSAO);
      if (!raw) {
        // Sem partida registrada → volta ao menu (critério de aceite do README).
        router.replace("/");
        return;
      }
      setResultado(JSON.parse(raw));
    } catch {
      router.replace("/");
    } finally {
      setCarregando(false);
    }
  }, [router]);

  if (carregando) return null;
  if (!resultado) return null;

  return (
    <main className="resultado">
      <h1>Fim de jogo</h1>

      <PainelResultado resultado={resultado} />

      <DicaRevisao
        categoria={resultado.categoriaMaiorErro}
        catalogo={catalogo.residuos}
      />

      <nav className="resultado-acoes">
        <a href={`/${resultado.modo}`} className="botao-primario">
          Jogar novamente
        </a>
        <a href="/" className="botao-secundario">
          Voltar ao menu
        </a>
      </nav>
    </main>
  );
}
