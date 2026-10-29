/**
 * app/classico/page.js — Rota: /classico
 * Server Component.
 *
 * Lê o catálogo de resíduos diretamente do disco (sem requisição HTTP)
 * e inicia a partida no modo clássico.
 */

import catalogo from "@/data/residuos.json";
import PartidaCliente from "../components/PartidaCliente";

export const metadata = {
  title: "Eco Mania — Modo Clássico",
};

export default function PaginaClassico() {
  return <PartidaCliente modo="classico" catalogo={catalogo.residuos} />;
}
