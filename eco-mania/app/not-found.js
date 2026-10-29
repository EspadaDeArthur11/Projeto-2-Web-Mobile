/**
 * app/not-found.js — Página 404
 * Server Component — exibida para qualquer URL não mapeada.
 */

import Link from "next/link";

export const metadata = {
  title: "Eco Mania — Página não encontrada",
};

export default function NaoEncontrado() {
  return (
    <main className="nao-encontrado">
      <h1>404</h1>
      <p>Esta página não existe.</p>
      <Link href="/" className="botao-primario">
        Voltar ao menu
      </Link>
    </main>
  );
}
