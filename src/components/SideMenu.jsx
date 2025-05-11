import { useState } from "react";
import usuariosIcon from "../assets/usuarios.png";
import relatoriosIcon from "../assets/relatorios.png";
import balancasIcon from "../assets/balancas.png";
import ferramentasIcon from "../assets/ferramentas.png";
import pesagemIcon from "../assets/pesagem.png";
import sairIcon from "../assets/sair.png";
import SubMenuRelatorios from "./SubMenuRelatorios";

export default function SideMenu({ isOpen, onClose }) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [menuMinimized, setMenuMinimized] = useState(false);

  if (!isOpen) return null; // Esconde completamente se o menu estiver fechado

  const handleClick = (label) => {
    if (label === "Relatórios") {
      setMenuMinimized(true);
      setSubmenuOpen(true);
    } else {
      setMenuMinimized(false);
      setSubmenuOpen(false);
    }
  };

  const items = [
    { label: "Usuários", icon: usuariosIcon },
    { label: "Relatórios", icon: relatoriosIcon },
    { label: "Balanças", icon: balancasIcon },
    { label: "Base", icon: ferramentasIcon },
    { label: "Emissão de Pesagens", icon: pesagemIcon },
    { label: "Sair", icon: sairIcon },
  ];

  return (
    <>
      <div
        className={`fixed top-16 left-0 ${
          menuMinimized ? "w-14" : "w-56"
        } bg-white shadow transition-all duration-300 z-50"} mt-[8px]`}
        style={{ zIndex: 50 }}
      >
        <ul className="divide-y divide-gray-300">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item.label)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5" />
              {!menuMinimized && <span className="text-sm">{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>

      <SubMenuRelatorios visible={submenuOpen} />
    </>
  );
}
