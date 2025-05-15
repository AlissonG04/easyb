import printerIcon from "../assets/relatorios.png";
import { useState } from "react";

export default function RelatorioBuscaModal({ visible, onClose, titulo }) {
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  if (!visible) return null;

  const gerarRelatorio = async () => {
    try {
      let url = "";
      let html = "";
      let dadosFormatados = [];

      const filtros = { dataInicial, dataFinal };

      if (titulo.includes("Usuários")) {
        url = "http://localhost:3000/usuarios";
        html = "public/relatorio-usuarios.html";

        const res = await fetch(url);
        const dados = await res.json();
        dadosFormatados = dados.map((u) => ({
          ...u,
          criadoEm: new Date(u.criado_em).toLocaleDateString("pt-BR"),
        }));
      } else if (titulo.includes("Complemento")) {
        const query = new URLSearchParams();
        if (dataInicial) query.append("dataInicial", dataInicial);
        if (dataFinal) query.append("dataFinal", dataFinal);

        url = `http://localhost:3000/complementos?${query.toString()}`;
        html = "public/relatorio-complemento.html";

        const res = await fetch(url);
        const dados = await res.json();
        dadosFormatados = dados.map((c) => ({
          ...c,
          brutoD: c.bruto_antes,
          brutoF: c.bruto_depois,
          horaSolicitacao: c.hora_solicitacao,
          horaFinalizacao: c.hora_finalizacao,
        }));
      } else if (titulo.includes("Pesagem")) {
        const query = new URLSearchParams();
        if (dataInicial) query.append("dataInicial", dataInicial);
        if (dataFinal) query.append("dataFinal", dataFinal);

        url = `http://localhost:3000/pesagens?${query.toString()}`;
        html = "/relatorios/relatorio-pesagens.html";

        const res = await fetch(url);
        dadosFormatados = await res.json();
      }

      // Salvar localStorage e abrir relatório
      localStorage.setItem("relatorioDados", JSON.stringify(dadosFormatados));
      localStorage.setItem("relatorioFiltros", JSON.stringify(filtros));
      window.open(html, "_blank");
    } catch (err) {
      console.error("Erro ao gerar relatório:", err);
      alert("Erro ao gerar relatório.");
    }
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
