import printerIcon from "../assets/relatorios.png";
import { useState } from "react";

export default function RelatorioBuscaModal({
  visible,
  onClose,
  titulo,
  onGerar,
}) {
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  if (!visible) return null;

  const gerarRelatorio = () => {
    onGerar({ dataInicial, dataFinal });
  };

  return (
    <div className="absolute left-1/2 top-20 transform -translate-x-1/2 w-full max-w-xl bg-white shadow rounded p-4 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img src={printerIcon} className="w-5 h-5" />
          <h2 className="font-bold text-sm">{titulo}</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Filtro de datas */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex flex-col text-sm">
          <label className="mb-1">Data Inicial</label>
          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            className="bg-gray-200 px-3 py-1 rounded outline-none"
          />
        </div>
        <div className="flex flex-col text-sm">
          <label className="mb-1">Data Final</label>
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            className="bg-gray-200 px-3 py-1 rounded outline-none"
          />
        </div>
      </div>

      {/* Botão */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={gerarRelatorio}
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
        >
          <img src={printerIcon} className="w-5 h-5" />
          Gerar Relatório
        </button>
      </div>
    </div>
  );
}
