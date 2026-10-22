export default function DicaRevisao({ categoria, catalogo = [] }) {
  if (!categoria) return null;

  const itens = Array.isArray(catalogo)
    ? catalogo.filter((residuo) => residuo.categoria === categoria)
    : [];
  const exemplos = itens.slice(0, 3).map((residuo) => residuo.nome).join(", ");

  return (
    <aside className="dica-revisao">
      <strong>Vale revisar: {categoria}</strong>
      {exemplos && <span>Exemplos: {exemplos}.</span>}
    </aside>
  );
}
