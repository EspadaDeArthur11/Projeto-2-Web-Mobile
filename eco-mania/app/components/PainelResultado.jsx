export default function PainelResultado({ resultado = {} }) {
  const {
    pontuacao = 0, acertos = 0, erros = 0, maiorSequencia = 0,
    recorde, superouRecorde, categoriaMaiorErro,
  } = resultado;

  return (
    <section className="painel-resultado" aria-labelledby="resultado-titulo">
      <h2 id="resultado-titulo">Resultado da partida</h2>
      <dl>
        <div><dt>Pontuação</dt><dd>{pontuacao}</dd></div>
        <div><dt>Acertos</dt><dd>{acertos}</dd></div>
        <div><dt>Erros</dt><dd>{erros}</dd></div>
        <div><dt>Maior sequência</dt><dd>{maiorSequencia}</dd></div>
        {recorde !== undefined && <div><dt>Recorde</dt><dd>{recorde}</dd></div>}
      </dl>
      {superouRecorde && <p role="status">Novo recorde!</p>}
      {categoriaMaiorErro && <p>Categoria para revisar: <strong>{categoriaMaiorErro}</strong>.</p>}
    </section>
  );
}
