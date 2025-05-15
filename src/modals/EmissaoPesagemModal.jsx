import { useState, useEffect } from "react";
import pesagemIcon from "../assets/pesagem.png";
import imprimirIcon from "../assets/relatorios.png";
import { emitirTicketPesagem } from "../utils/relatoriosUtils";

export default function EmissaoPesagemModal({ visible, onClose }) {
  const [form, setForm] = useState({
    cliente: "",
    produto: "",
    placa: "",
    motorista: "",
    tara: "",
    liquido: "",
    bruto: "",
    observacoes: "",
  });

  useEffect(() => {
    const tara = parseFloat(form.tara) || 0;
    const liquido = parseFloat(form.liquido) || 0;
    const bruto = tara + liquido;
    setForm((prev) => ({ ...prev, bruto: bruto.toFixed(2) }));
  }, [form.tara, form.liquido]);

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmitir = async () => {
    try {
      const now = new Date();
      const payload = {
        cliente: form.cliente,
        produto: form.produto,
        placa: form.placa,
        motorista: form.motorista,
        observacoes: form.observacoes,
        tara: parseInt(form.tara) || 0,
        liquido: parseInt(form.liquido) || 0,
        bruto: parseInt(form.bruto) || 0,
        data: now.toISOString().split("T")[0], // yyyy-mm-dd
        hora: now.toTimeString().split(" ")[0], // HH:MM:SS
      };

      const response = await fetch("http://localhost:3000/pesagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao emitir pesagem.");
      }

      const pesagemSalva = await response.json();
      emitirTicketPesagem(pesagemSalva); // gera o ticket com dados reais

      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao emitir a pesagem.");
    }
  };

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow rounded p-5 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <img src={pesagemIcon} className="w-5 h-5" />
          <h2 className="font-bold text-sm">Emissão de Pesagens</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Campos principais */}
      <div className="space-y-3">
        <input
          type="text"
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
          placeholder="Nome do Cliente"
          className="w-full bg-gray-200 px-3 py-2 rounded text-sm outline-none"
        />
        <input
          type="text"
          name="produto"
          value={form.produto}
          onChange={handleChange}
          placeholder="Produto"
          className="w-full bg-gray-200 px-3 py-2 rounded text-sm outline-none"
        />

        <div className="flex gap-3">
          <input
            type="text"
            name="placa"
            value={form.placa}
            onChange={handleChange}
            placeholder="Placa"
            className="w-1/3 bg-gray-200 px-3 py-2 rounded text-sm outline-none"
          />
          <input
            type="text"
            name="motorista"
            value={form.motorista}
            onChange={handleChange}
            placeholder="Nome do Motorista"
            className="w-2/3 bg-gray-200 px-3 py-2 rounded text-sm outline-none"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            name="tara"
            value={form.tara}
            onChange={handleChange}
            placeholder="Tara"
            className="w-1/3 bg-gray-200 px-3 py-2 rounded text-sm outline-none"
          />
          <textarea
            name="observacoes"
            value={form.observacoes}
            onChange={handleChange}
            placeholder="Observações"
            className="w-2/3 bg-gray-200 px-3 py-2 rounded text-sm outline-none h-[64px]"
          />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            name="liquido"
            value={form.liquido}
            onChange={handleChange}
            placeholder="Líquido"
            className="w-1/2 bg-gray-200 px-3 py-2 rounded text-sm outline-none"
          />
          <input
            type="text"
            name="bruto"
            value={form.bruto}
            disabled
            placeholder="Bruto"
            className="w-1/2 bg-gray-200 px-3 py-2 rounded text-sm outline-none opacity-70"
          />
        </div>
      </div>

      {/* Botão Emitir */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleEmitir}
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
        >
          <img src={imprimirIcon} className="w-5 h-5" />
          Emitir Pesagem
        </button>
      </div>
    </div>
  );
}
