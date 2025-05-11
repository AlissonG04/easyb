import { useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Watermark from "../components/Watermark";
import logoEmpresa from "../assets/terra-branca.png";
import UsuariosModal from "../modals/UsuariosModal";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalUsuariosOpen, setModalUsuariosOpen] = useState(false);

  // Função que lida com o item selecionado no menu
  const handleMenuItem = (label) => {
    if (label === "Usuários") {
      setModalUsuariosOpen(true);
      setMenuOpen(false); // opcional: fecha o menu ao abrir o modal
    }
    // Aqui virá novos midais - Futuro
  };

  return (
    <div className="w-screen h-screen bg-gray-300 relative overflow-hidden">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectItem={handleMenuItem}
      />
      <div className="flex items-center justify-center h-[calc(100%-4rem)]">
        <img
          src={logoEmpresa}
          alt="Logo Terra Branca"
          className="max-w-xs w-full"
        />
      </div>
      <UsuariosModal
        visible={modalUsuariosOpen}
        onClose={() => setModalUsuariosOpen(false)}
      />
      <Watermark />
    </div>
  );
}
