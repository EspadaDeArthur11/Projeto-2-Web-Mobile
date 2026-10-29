/**
 * app/tempo/page.js — Rota: /tempo
 * Server Component.
 *
 * Lê o catálogo de resíduos diretamente do disco (sem requisição HTTP)
 * e inicia a partida no modo por tempo.
 */

import catalogo from "@/data/residuos.json";
import PartidaCliente from "../components/PartidaCliente";

export const metadata = {
  title: "Eco Mania — Modo por Tempo",
};

export default function PaginaTempo() {
  return <PartidaCliente modo="tempo" catalogo={catalogo.residuos} />;
}
