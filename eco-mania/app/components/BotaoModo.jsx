export default function BotaoModo({ destino, titulo, descricao, cor = "#2f855a" }) {
  return (
    <a
      href={destino}
      style={{ "--modo-cor": cor }}
      className="botao-modo"
      aria-label={`${titulo}: ${descricao}`}
    >
      <strong>{titulo}</strong>
      <span>{descricao}</span>
    </a>
  );
}
