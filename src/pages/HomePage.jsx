import Header from "../components/Header";
import Watermark from "../components/Watermark";
import logoEmpresa from "../assets/terra-branca.png";

export default function HomePage() {
  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
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
