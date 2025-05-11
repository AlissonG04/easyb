import usuariosIcon from "../assets/usuarios.png";
import relatoriosIcon from "../assets/relatorios.png";
import balancasIcon from "../assets/balancas.png";
import ferramentasIcon from "../assets/ferramentas.png";
import pesagemIcon from "../assets/pesagem.png";
import sairIcon from "../assets/sair.png";

export default function SideMenu({ isOpen }) {
  const items = [
    { label: "Usuários", icon: usuariosIcon },
    { label: "Relatórios", icon: relatoriosIcon },
    { label: "Balanças", icon: balancasIcon },
    { label: "Base", icon: ferramentasIcon },
    { label: "Emissão de Pesagens", icon: pesagemIcon },
    { label: "Sair", icon: sairIcon },
  ];

  return (
    <div
      className={`fixed top-16 left-0 w-56 bg-white shadow transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } mt-[10px]`}
      style={{ zIndex: 50 }}
    >
      <ul className="divide-y divide-gray-300">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
