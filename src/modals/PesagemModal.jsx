import { useState } from "react";
import lupaIcon from "../assets/buscar.png";
import printerIcon from "../assets/relatorios.png";
import visualizarIcon from "../assets/visualizar.png";
import pesagemIcon from "../assets/pesagem.png";

export default function PesagemModal({ visible, onClose }) {
  const [filtros, setFiltros] = useState({
    cliente: "",
    motorista: "",
    placa: "",
    numero: "",
    dataInicial: "",
    dataFinal: "",
  });

  const [resultados, setResultados] = useState([]);

  const dadosMock = [
    {
      numero: "001",
      cliente: "Jhon Doe Smith",
      motorista: "Jane Doe Santos",
      placa: "ABC-1A11",
      produto: "Milho",
    },
    {
      numero: "002",
      cliente: "Jhon Doe Smith",
      motorista: "Jane Doe Santos",
      placa: "CBA-1155",
      produto: "Milho",
    },
    {
      numero: "003",
      cliente: "Jhon Doe Smith",
      motorista: "Jane Doe Santos",
      placa: "ABC-1A11",
      produto: "Milho",
    },
  ];

  const handleBuscar = () => {
    const filtrado = dadosMock.filter((item) => {
      return (
        (!filtros.cliente ||
          item.cliente.toLowerCase().includes(filtros.cliente.toLowerCase())) &&
        (!filtros.motorista ||
          item.motorista
            .toLowerCase()
            .includes(filtros.motorista.toLowerCase())) &&
        (!filtros.placa ||
          item.placa.toLowerCase().includes(filtros.placa.toLowerCase())) &&
        (!filtros.numero || item.numero === filtros.numero)
      );
    });
    setResultados(filtrado);
  };

  if (!visible) return null;

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-5xl bg-white shadow rounded p-5 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <img src={pesagemIcon} className="w-5 h-5" />
          <h2 className="font-bold text-sm">Pesagem</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={filtros.cliente}
          onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })}
          className="bg-gray-200 px-3 py-2 rounded outline-none"
        />
        <input
          type="text"
          placeholder="Nome do Motorista"
          value={filtros.motorista}
          onChange={(e) =>
            setFiltros({ ...filtros, motorista: e.target.value })
          }
          className="bg-gray-200 px-3 py-2 rounded outline-none"
        />
        <input
          type="text"
          placeholder="Placa"
          value={filtros.placa}
          onChange={(e) => setFiltros({ ...filtros, placa: e.target.value })}
          className="bg-gray-200 px-3 py-2 rounded outline-none"
        />
        <input
          type="text"
          placeholder="Pesagem"
          value={filtros.numero}
          onChange={(e) => setFiltros({ ...filtros, numero: e.target.value })}
          className="bg-gray-200 px-3 py-2 rounded outline-none"
        />
        <input
          type="date"
          value={filtros.dataInicial}
          onChange={(e) =>
            setFiltros({ ...filtros, dataInicial: e.target.value })
          }
          className="bg-gray-200 px-3 py-2 rounded outline-none"
        />
        <input
          type="date"
          value={filtros.dataFinal}
          onChange={(e) =>
            setFiltros({ ...filtros, dataFinal: e.target.value })
          }
          className="bg-gray-200 px-3 py-2 rounded outline-none"
        />
      </div>

      {/* Botão de busca */}
      <div className="flex items-center justify-center my-4">
        <button
          onClick={handleBuscar}
          className="flex items-center gap-2 text-sm font-medium hover:scale-105 transition"
        >
          <img src={lupaIcon} className="w-5 h-5" />
          Buscar Pesagem
        </button>
      </div>

      {/* Tabela */}
      <div className="border rounded mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-2">Num. Pesagem</th>
              <th className="text-left p-2">Cliente</th>
              <th className="text-left p-2">Motorista</th>
              <th className="text-left p-2">Placa</th>
              <th className="text-left p-2">Produto</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((r, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">{r.numero}</td>
                <td className="p-2">{r.cliente}</td>
                <td className="p-2">{r.motorista}</td>
                <td className="p-2">{r.placa}</td>
                <td className="p-2">{r.produto}</td>
                <td className="p-2 flex gap-3">
                  <button title="Visualizar">
                    <img
                      src={visualizarIcon}
                      alt="Visualizar"
                      className="w-5 h-5"
                    />
                  </button>
                  <button title="Imprimir">
                    <img src={printerIcon} alt="Imprimir" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {resultados.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 p-4">
                  Nenhuma pesagem encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
