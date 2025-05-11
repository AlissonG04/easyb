import { useEffect, useState } from "react";
import balancaIcon from "../assets/balancas.png";
import pauseIcon from "../assets/pause.png";
import playIcon from "../assets/iniciar.png";

export default function BalancasModal({ visible, onClose }) {
  const [peso1, setPeso1] = useState(0);
  const [peso2, setPeso2] = useState(0);
  const [ativo1, setAtivo1] = useState(true);
  const [ativo2, setAtivo2] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ativo1) setPeso1((Math.random() * 10000).toFixed(2));
      if (ativo2) setPeso2((Math.random() * 10000).toFixed(2));
    }, 1000);
    return () => clearInterval(interval);
  }, [ativo1, ativo2]);

  if (!visible) return null;

  const renderBalanca = (nome, peso, ativo, setAtivo) => (
    <div className="bg-gray-200 rounded p-4 w-64 flex flex-col items-center shadow">
      <div className="bg-white px-3 py-1 rounded text-sm mb-3 font-semibold">
        {nome}
      </div>
      <div className="bg-white text-4xl font-bold px-6 py-3 border w-full text-center mb-4">
        {peso}
      </div>
      <button className="bg-blue-700 text-white px-4 py-2 rounded mb-4 text-sm">
        Complemento
      </button>
      <div className="flex gap-4">
        <button
          onClick={() => setAtivo(false)}
          title="Pausar"
          className="w-6 h-6"
        >
          <img src={pauseIcon} alt="Pause" />
        </button>
        <button
          onClick={() => setAtivo(true)}
          title="Iniciar"
          className="w-6 h-6"
        >
          <img src={playIcon} alt="Play" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-5xl bg-white shadow rounded p-4 z-50">
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img src={balancaIcon} className="w-5 h-5" />
          <h2 className="font-bold">Balanças</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      <div className="flex justify-around mt-6">
        {renderBalanca("Balança 01", peso1, ativo1, setAtivo1)}
        {renderBalanca("Balança 02", peso2, ativo2, setAtivo2)}
      </div>
    </div>
  );
}
