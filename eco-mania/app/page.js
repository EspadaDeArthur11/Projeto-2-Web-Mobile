/**
 * app/page.js — Rota raiz: /
 * Server Component.
 *
 * Menu principal da aplicação: apresentação, escolha de modo,
 * preferência de acessibilidade e histórico das últimas partidas.
 */

import BotaoModo from "./components/BotaoModo";
import CaixaDaltonico from "./components/CaixaDaltonico";
import HistoricoPartidas from "./components/HistoricoPartidas";

export default function Home() {
  return (
    <main className="menu">
      <header className="menu-cabecalho">
        <h1>Eco Mania</h1>
        <p>Aprenda a separar o lixo corretamente jogando rodadas rápidas.</p>
      </header>

      <section className="menu-modos" aria-labelledby="modos-titulo">
        <h2 id="modos-titulo">Escolha o modo de jogo</h2>
        <div className="menu-botoes">
          <BotaoModo
            destino="/classico"
            titulo="Clássico"
            descricao="Você tem 3 vidas. Cada erro custa uma. Jogue até perder todas."
            cor="#2b6cb0"
          />
          <BotaoModo
            destino="/tempo"
            titulo="Por Tempo"
            descricao="60 segundos no relógio. Acerte o máximo antes que o tempo acabe."
            cor="#c05621"
          />
        </div>
      </section>

      <section className="menu-opcoes" aria-labelledby="opcoes-titulo">
        <h2 id="opcoes-titulo">Acessibilidade</h2>
        <CaixaDaltonico />
      </section>

      <HistoricoPartidas />
    </main>
  );
}
