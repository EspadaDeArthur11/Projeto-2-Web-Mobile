export default function Hud({ modo, pontuacao = 0, vidas, tempoFormatado }) {
  return (
    <header className="hud" aria-label="Informações da partida">
      <div><span>Pontuação</span><strong>{pontuacao}</strong></div>
      {modo === "tempo" ? (
        <div><span>Tempo</span><strong>{tempoFormatado || "01:00"}</strong></div>
      ) : (
        <div><span>Vidas</span><strong aria-label={`${vidas} vidas`}>{"♥".repeat(Math.max(0, vidas ?? 0))}</strong></div>
      )}
    </header>
  );
}
