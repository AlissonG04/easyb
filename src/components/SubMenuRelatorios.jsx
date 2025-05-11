import relatoriosIcon from "../assets/relatorios.png";

export default function SubMenuRelatorios({ visible, onSelect }) {
  if (!visible) return null;

  return (
    <div className="absolute left-14 top-[4.5rem] w-72 bg-white shadow border z-40">
      <ul className="divide-y divide-gray-300">
        <li
          onClick={() => onSelect("complemento")}
          className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
        >
          <img src={relatoriosIcon} alt="Icone relatório" className="w-5 h-5" />
          <span className="text-sm">
            Solicitações de Complemento, Listagem Analítica
          </span>
        </li>
        <li
          onClick={() => onSelect("usuarios")}
          className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
        >
          <img src={relatoriosIcon} alt="Icone relatório" className="w-5 h-5" />
          <span className="text-sm">Usuários Cadastrados</span>
        </li>
      </ul>
    </div>
  );
}
