import { useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Watermark from "../components/Watermark";
import logoEmpresa from "../assets/terra-branca.png";
import UsuariosModal from "../modals/UsuariosModal";
import RelatorioBuscaModal from "../modals/RelatorioBuscaModal";
import { gerarRelatorioComplemento } from "../utils/relatoriosUtils";
import { gerarRelatorioUsuarios } from "../utils/relatoriosUtils";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalUsuariosOpen, setModalUsuariosOpen] = useState(false);
  const [relatorioAberto, setRelatorioAberto] = useState(null); // "complemento" | "usuarios" | null

  const handleMenuItem = (label) => {
    if (label === "Usuários") {
      setModalUsuariosOpen(true);
      setMenuOpen(false);
    }
  };

  const dadosMockComplemento = [
    {
      data: "09/05/2025",
      placa: "ABC-2A22",
      balanca: "01",
      solicitante: "Jhon Doe",
      tara: 21000,
      liquido: 38500,
      brutoD: 59500,
      brutoF: 59700,
      operador: "Jane Doe",
      status: "Finalizada",
      horaSolicitacao: "11:00:58",
      horaFinalizacao: "11:05:02",
    },
    {
      data: "09/05/2025",
      placa: "AAC-A33",
      balanca: "02",
      solicitante: "Jane Doe",
      tara: 10000,
      liquido: 14000,
      brutoD: 24000,
      brutoF: 24000,
      operador: "Jane Doe",
      status: "Rejeitado",
      horaSolicitacao: "10:00:51",
      horaFinalizacao: "10:05:00",
    },
  ];

  const dadosMockUsuarios = [
    {
      nome: "Jhon Doe",
      usuario: "jnd",
      criadoEm: "10/05/2025",
      privilegios: ["Usuários", "Relatórios"],
    },
    {
      nome: "Maria Silva",
      usuario: "msilva",
      criadoEm: "08/05/2025",
      privilegios: ["Base", "Operador (Tablet)"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-300 relative overflow-y-auto">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />

      <SideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectItem={handleMenuItem}
        onRelatorioSelect={(tipo) => {
          setRelatorioAberto(tipo);
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
          if (relatorioAberto === "complemento") {
            gerarRelatorioComplemento(dadosMockComplemento, filtros);
          } else if (relatorioAberto === "usuarios") {
            gerarRelatorioUsuarios(dadosMockUsuarios, filtros);
          }
        }}
      />

      <Watermark />
    </div>
  );
}
