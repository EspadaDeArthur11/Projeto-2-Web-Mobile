import Lixeira from "./Lixeira";
import { CATEGORIAS } from "@/lib/constantes";

export default function Lixeiras({ lixeiraSobPonteiro, mostrarRotulo = true, onEscolher }) {
  return (
    <div className="lixeiras" role="group" aria-label="Escolha a lixeira">
      {CATEGORIAS.map((categoria) => (
        <Lixeira
          key={categoria}
          categoria={categoria}
          destaque={lixeiraSobPonteiro === categoria}
          mostrarRotulo={mostrarRotulo}
          onEscolher={onEscolher}
        />
      ))}
    </div>
  );
}
