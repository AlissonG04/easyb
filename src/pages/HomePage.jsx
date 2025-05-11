import { useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Watermark from "../components/Watermark";
import logoEmpresa from "../assets/terra-branca.png";
import UsuariosModal from "../modals/UsuariosModal";
import RelatorioBuscaModal from "../modals/RelatorioBuscaModal";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalUsuariosOpen, setModalUsuariosOpen] = useState(false);
  const [relatorioAberto, setRelatorioAberto] = useState(null); // "complemento" | "usuarios" | null

  // Menu principal (ex: Usuários)
  const handleMenuItem = (label) => {
    if (label === "Usuários") {
      setModalUsuariosOpen(true);
      setMenuOpen(false);
    }
    // Outros modais futuros
  };

  return (
    <div className="min-h-screen bg-gray-300 relative overflow-y-auto">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />

      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectItem={handleMenuItem}
        onRelatorioSelect={(tipo) => {
          setRelatorioAberto(tipo); // "complemento" ou "usuarios"
          setMenuOpen(false);
        }}
      />

      {/* Logo no fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src={logoEmpresa}
          alt="Logo Terra Branca"
          className="max-w-xs w-full opacity-100"
        />
      </div>

      {/* Modais */}
      <UsuariosModal
        visible={modalUsuariosOpen}
        onClose={() => setModalUsuariosOpen(false)}
      />

      <RelatorioBuscaModal
        visible={!!relatorioAberto}
        titulo={
          relatorioAberto === "complemento"
            ? "Solicitações de Complemento"
            : relatorioAberto === "usuarios"
            ? "Usuários Cadastrados"
            : ""
        }
        onClose={() => setRelatorioAberto(null)}
        onGerar={(filtros) => {
          console.log("Gerar relatório:", relatorioAberto, filtros);
        }}
      />

      <Watermark />
    </div>
  );
}
