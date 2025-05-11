import { useState } from "react";
import balancaIcon from "../assets/balancas.png";
import salvarIcon from "../assets/salvar.png";
import editarIcon from "../assets/editar.png";

export default function IpsPortasBalancasModal({ visible, onClose }) {
  const [balancas, setBalancas] = useState([
    { nome: "Balança 01", ip: "192.168.0.27", porta: "23", editando: false },
    { nome: "Balança 02", ip: "192.168.0.127", porta: "6432", editando: false },
  ]);

  const toggleEdicao = (index) => {
    setBalancas((prev) =>
      prev.map((b, i) => (i === index ? { ...b, editando: !b.editando } : b))
    );
  };

  const handleChange = (index, field, value) => {
    const novaLista = [...balancas];
    novaLista[index][field] = value;
    setBalancas(novaLista);
  };

  const handleSalvar = () => {
    console.log("Dados enviados ao servidor:", balancas);
    // Futuramente será feita requisição para o backend
  };

  if (!visible) return null;

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow rounded p-4 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img src={balancaIcon} className="w-5 h-5" />
          <h2 className="font-bold">IPs e Portas das Balanças</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Balanças */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {balancas.map((b, i) => (
          <div key={i} className="bg-gray-200 p-4 rounded space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm w-16">Balança:</label>
              <input
                type="text"
                value={b.nome}
                readOnly={!b.editando}
                onChange={(e) => handleChange(i, "nome", e.target.value)}
                className="flex-1 text-sm px-2 py-1 rounded bg-white outline-none"
              />
              <img
                src={editarIcon}
                className="w-4 h-4 cursor-pointer"
                onClick={() => toggleEdicao(i)}
                title="Editar"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm w-16">IP:</label>
              <input
                type="text"
                value={b.ip}
                readOnly={!b.editando}
                onChange={(e) => handleChange(i, "ip", e.target.value)}
                className="flex-1 text-sm px-2 py-1 rounded bg-white outline-none"
              />
              <img
                src={editarIcon}
                className="w-4 h-4 cursor-pointer"
                onClick={() => toggleEdicao(i)}
                title="Editar"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm w-16">Porta:</label>
              <input
                type="text"
                value={b.porta}
                readOnly={!b.editando}
                onChange={(e) => handleChange(i, "porta", e.target.value)}
                className="flex-1 text-sm px-2 py-1 rounded bg-white outline-none"
              />
              <img
                src={editarIcon}
                className="w-4 h-4 cursor-pointer"
                onClick={() => toggleEdicao(i)}
                title="Editar"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Botão salvar */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSalvar}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          <img src={salvarIcon} className="w-5 h-5" />
          Salvar Dados no Servidor
        </button>
      </div>
    </div>
  );
}
