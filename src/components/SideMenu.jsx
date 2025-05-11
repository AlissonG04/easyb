import { useState, useRef, useEffect } from "react";
import usuariosIcon from "../assets/usuarios.png";
import relatoriosIcon from "../assets/relatorios.png";
import balancasIcon from "../assets/balancas.png";
import ferramentasIcon from "../assets/ferramentas.png";
import pesagemIcon from "../assets/pesagem.png";
import sairIcon from "../assets/sair.png";
import SubMenuRelatorios from "./SubMenuRelatorios";
import SubMenuBase from "./SubMenuBase";

export default function SideMenu({ isOpen, onClose }) {
  const menuRef = useRef();
  const [menuMinimized, setMenuMinimized] = useState(false);
  const [submenuRelOpen, setSubmenuRelOpen] = useState(false);
  const [submenuBaseOpen, setSubmenuBaseOpen] = useState(false);

  // Fecha o menu se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose(); // ← função que está no HomePage
        setMenuMinimized(false);
        setSubmenuRelOpen(false);
        setSubmenuBaseOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClick = (label) => {
    if (label === "Relatórios") {
      setMenuMinimized(true);
      setSubmenuRelOpen(true);
      setSubmenuBaseOpen(false);
    } else if (label === "Base") {
      setMenuMinimized(true);
      setSubmenuRelOpen(false);
      setSubmenuBaseOpen(true);
    } else {
      setMenuMinimized(false);
      setSubmenuRelOpen(false);
      setSubmenuBaseOpen(false);
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
    <div ref={menuRef}>
      <div
        className={`fixed top-16 left-0 ${
          menuMinimized ? "w-14" : "w-56"
        } bg-white shadow transition-all duration-300 mt-[8px]`}
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

      <SubMenuRelatorios visible={submenuRelOpen} />
      <SubMenuBase visible={submenuBaseOpen} />
    </div>
  );
}
