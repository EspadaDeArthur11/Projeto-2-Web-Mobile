const DADOS = {
  vidro: { cor: "#16803c", simbolo: "◇", rotulo: "Vidro" },
  plastico: { cor: "#c53030", simbolo: "♢", rotulo: "Plástico" },
  papel: { cor: "#2b6cb0", simbolo: "▤", rotulo: "Papel" },
  organico: { cor: "#805b35", simbolo: "♧", rotulo: "Orgânico" },
  metal: { cor: "#b7791f", simbolo: "▣", rotulo: "Metal" },
};

export default function Lixeira({ categoria, rotulo, destaque = false, mostrarRotulo = true, onEscolher }) {
  const dados = DADOS[categoria] || { cor: "#555", simbolo: "?", rotulo: categoria };
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
