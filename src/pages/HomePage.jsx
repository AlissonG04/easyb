import { useState } from "react";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Watermark from "../components/Watermark";
import logoEmpresa from "../assets/terra-branca.png";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-screen h-screen bg-gray-300 relative overflow-hidden">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex items-center justify-center h-[calc(100%-4rem)]">
        <img
          src={logoEmpresa}
          alt="Logo Terra Branca"
          className="max-w-xs w-full"
        />
      </div>
      <Watermark />
    </div>
  );
}
