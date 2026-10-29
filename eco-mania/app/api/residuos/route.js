/**
 * app/api/residuos/route.js — Endpoint: GET /api/residuos
 * Server — executado exclusivamente no servidor Next.js.
 *
 * Serve o catálogo de resíduos em JSON para consumo externo (RF18).
 *
 * Parâmetros de query:
 *   ?categoria=vidro   → filtra por categoria
 *   (sem parâmetro)    → devolve o catálogo completo
 *
 * Respostas:
 *   200  Catálogo completo ou filtrado
 *   404  Categoria informada não existe no catálogo
 */

import { NextResponse } from "next/server";
import catalogo from "@/data/residuos.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get("categoria");

  // Sem filtro → devolve o catálogo completo.
  if (!categoria) {
    return NextResponse.json(catalogo);
  }

  // Com filtro → seleciona apenas os resíduos da categoria solicitada.
  const filtrado = catalogo.residuos.filter(
    (residuo) => residuo.categoria === categoria
  );

  if (filtrado.length === 0) {
    return NextResponse.json(
      { erro: `Categoria "${categoria}" não encontrada no catálogo.` },
      { status: 404 }
    );
  }

  return NextResponse.json({ residuos: filtrado });
}
