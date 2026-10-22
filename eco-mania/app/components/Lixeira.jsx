import { DADOS_CATEGORIAS } from "@/lib/constantes";

export default function Lixeira({
  categoria,
  rotulo,
  destaque = false,
  mostrarRotulo = true,
  onEscolher,
}) {
  const dados = DADOS_CATEGORIAS[categoria] || { cor: "#555", simbolo: "?", rotulo: categoria };
  const nome = rotulo || dados.rotulo;

  return (
    <button
      type="button"
      className={`lixeira${destaque ? " lixeira-destaque" : ""}`}
      style={{ "--lixeira-cor": dados.cor }}
      onClick={() => onEscolher?.(categoria)}
      aria-label={`Destinar em ${nome}`}
      data-categoria={categoria}
    >
      <span aria-hidden="true" className="lixeira-simbolo">{dados.simbolo}</span>
      {mostrarRotulo && <span>{nome}</span>}
    </button>
  );
}
