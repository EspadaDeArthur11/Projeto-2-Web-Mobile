export default function Feedback({ mensagem, natureza = "info", explicacao }) {
  if (!mensagem && !explicacao) return null;

  return (
    <div className={`feedback feedback-${natureza}`} role="status" aria-live="polite">
      {mensagem && <strong>{mensagem}</strong>}
      {explicacao && <span>{explicacao}</span>}
    </div>
  );
}
