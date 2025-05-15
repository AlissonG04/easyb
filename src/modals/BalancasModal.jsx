import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import balancaIcon from "../assets/balancas.png";
import pauseIcon from "../assets/pause.png";
import playIcon from "../assets/iniciar.png";
import SolicitacaoComplementoModal from "../modals/SolicitacaoComplementoModal";

const socket = io("http://localhost:3000");

export default function BalancasModal({ visible, onClose }) {
  const [peso1, setPeso1] = useState(0);
  const [peso2, setPeso2] = useState(0);
  const [ativo1, setAtivo1] = useState(true);
  const [ativo2, setAtivo2] = useState(true);
  const [complementoModal, setComplementoModal] = useState({
    visivel: false,
    balanca: "",
  });

  useEffect(() => {
    const receberPeso = (data) => {
      if (data.balanca === "Balança 01" && ativo1) {
        setPeso1(data.peso);
      } else if (data.balanca === "Balança 02" && ativo2) {
        setPeso2(data.peso);
      }
    };

    socket.on("peso-balanca", receberPeso);

    return () => {
      socket.off("peso-balanca", receberPeso);
    };
  }, [ativo1, ativo2]);

  if (!visible) return null;

  const abrirComplemento = (balanca) => {
    setComplementoModal({ visivel: true, balanca });
  };

  const renderBalanca = (nome, peso, ativo, setAtivo) => (
    <div className="bg-gray-200 rounded p-6 w-80 flex flex-col items-center shadow">
      <div className="bg-white px-4 py-1 rounded text-base mb-4 font-semibold">
        {nome}
      </div>
      <div className="bg-white text-6xl font-bold px-6 py-4 border w-full text-center mb-5">
        {peso}
      </div>
      <button
        onClick={() => abrirComplemento(nome)}
        className="bg-blue-700 text-white px-6 py-2 rounded mb-5 text-sm hover:bg-blue-800 transition"
      >
        Complemento
      </button>
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={() => setAtivo(false)}
          title="Pausar"
          className="w-8 h-8 flex items-center justify-center"
        >
          <img src={pauseIcon} alt="Pause" className="w-6 h-6" />
        </button>
        <button
          onClick={() => setAtivo(true)}
          title="Iniciar"
          className="w-8 h-8 flex items-center justify-center"
        >
          <img src={playIcon} alt="Play" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-6xl bg-white shadow rounded p-6 z-50">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <img src={balancaIcon} className="w-5 h-5" />
            <h2 className="font-bold">Balanças</h2>
          </div>
          <button onClick={onClose} className="text-xl font-bold">
            ×
          </button>
        </div>

        <div className="flex justify-around mt-8 gap-10">
          {renderBalanca("Balança 01", peso1, ativo1, setAtivo1)}
          {renderBalanca("Balança 02", peso2, ativo2, setAtivo2)}
        </div>
      </div>

      <SolicitacaoComplementoModal
        visible={complementoModal.visivel}
        balanca={complementoModal.balanca}
        onClose={() => setComplementoModal({ visivel: false, balanca: "" })}
      />
    </>
  );
}
