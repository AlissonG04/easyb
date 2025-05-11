import { useState } from "react";
import tabletIcon from "../assets/tablet.png";
import editarIcon from "../assets/editar.png";
import salvarIcon from "../assets/salvar.png";

export default function IpsTabletsModal({ visible, onClose }) {
  const [tablets, setTablets] = useState([
    {
      nome: "Pá Carregadeira 414",
      ip: "192.168.0.27",
      editando: false,
    },
    {
      nome: "Pá Carregadeira 415",
      ip: "192.168.0.127",
      editando: false,
    },
  ]);

  const toggleEdicao = (index) => {
    setTablets((prev) =>
      prev.map((t, i) => (i === index ? { ...t, editando: !t.editando } : t))
    );
  };

  const handleChange = (index, campo, valor) => {
    setTablets((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [campo]: valor } : t))
    );
  };

  const handleSalvar = () => {
    console.log("📡 Salvando IPs dos Tablets:", tablets);
    // Integração futura com back-end
  };

  if (!visible) return null;

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl bg-white shadow rounded p-6 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <img src={tabletIcon} className="w-5 h-5" />
          <h2 className="font-bold text-sm">IPs dos Tablets</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Tablets */}
      <div className="flex justify-around gap-4 mt-6">
        {tablets.map((tablet, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded p-4 w-80 shadow flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Tablet:</div>
              <button onClick={() => toggleEdicao(index)}>
                <img
                  src={editarIcon}
                  alt="Editar"
                  className="w-4 h-4 cursor-pointer"
                />
              </button>
            </div>
            <input
              type="text"
              value={tablet.nome}
              onChange={(e) => handleChange(index, "nome", e.target.value)}
              disabled={!tablet.editando}
              className="bg-white px-3 py-1 text-sm rounded outline-none"
            />
            <div className="text-sm font-medium mt-2">IP:</div>
            <input
              type="text"
              value={tablet.ip}
              onChange={(e) => handleChange(index, "ip", e.target.value)}
              disabled={!tablet.editando}
              className="bg-white px-3 py-1 text-sm rounded outline-none"
            />
          </div>
        ))}
      </div>

      {/* Botão salvar */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSalvar}
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
        >
          <img src={salvarIcon} className="w-5 h-5" />
          Salvar Dados no Servidor
        </button>
      </div>
    </div>
  );
}
