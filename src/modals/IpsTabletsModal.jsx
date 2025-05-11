import { useState } from "react";
import tabletIcon from "../assets/tablet.png";
import salvarIcon from "../assets/salvar.png";
import editarIcon from "../assets/editar.png";

export default function IpsTabletsModal({ visible, onClose }) {
  const [dados, setDados] = useState([
    {
      carregadeira: "414",
      tablet: "Pá Carregadeira 414",
      ip: "192.168.0.27",
      editando: false,
    },
    {
      carregadeira: "415",
      tablet: "Pá Carregadeira 415",
      ip: "192.168.0.127",
      editando: false,
    },
  ]);

  if (!visible) return null;

  const toggleEdicao = (index) => {
    setDados((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, editando: !item.editando } : item
      )
    );
  };

  const handleChange = (index, campo, valor) => {
    setDados((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [campo]: valor } : item))
    );
  };

  const salvar = () => {
    console.log("Dados salvos:", dados);
    // futuramente: chamada ao backend
  };

  return (
    <div className="absolute left-1/2 top-20 transform -translate-x-1/2 w-full max-w-4xl bg-white shadow rounded p-4 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img src={tabletIcon} className="w-5 h-5" />
          <h2 className="font-bold">IPs dos Tablets</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Blocos */}
      <div className="flex justify-around mt-6 gap-4">
        {dados.map((item, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded w-1/2 relative">
            <div className="mb-2">
              <label className="block text-sm font-medium">
                Pá Carregadeira:
              </label>
              <input
                type="text"
                value={item.carregadeira}
                disabled={!item.editando}
                onChange={(e) =>
                  handleChange(index, "carregadeira", e.target.value)
                }
                className="w-full px-2 py-1 text-sm rounded outline-none"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Tablet:</label>
              <input
                type="text"
                value={item.tablet}
                disabled={!item.editando}
                onChange={(e) => handleChange(index, "tablet", e.target.value)}
                className="w-full px-2 py-1 text-sm rounded outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">IP:</label>
              <input
                type="text"
                value={item.ip}
                disabled={!item.editando}
                onChange={(e) => handleChange(index, "ip", e.target.value)}
                className="w-full px-2 py-1 text-sm rounded outline-none"
              />
            </div>

            <button
              onClick={() => toggleEdicao(index)}
              className="absolute top-2 right-2"
              title="Editar"
            >
              <img src={editarIcon} alt="Editar" className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Botão de salvar */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={salvar}
          className="flex items-center gap-2 px-4 py-2 rounded bg-white hover:bg-gray-100 text-sm"
        >
          <img src={salvarIcon} className="w-5 h-5" />
          Salvar Dados no Servidor
        </button>
      </div>
    </div>
  );
}
