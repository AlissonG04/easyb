import { useEffect, useState } from "react";
import tabletIcon from "../assets/tablet.png";
import salvarIcon from "../assets/salvar.png";
import editarIcon from "../assets/editar.png";

export default function IpsTabletsModal({ visible, onClose }) {
  const [dados, setDados] = useState([]);
  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState("sucesso");

  useEffect(() => {
    if (!visible) return;

    const carregar = async () => {
      try {
        const res = await fetch("http://localhost:3000/tablets");
        const data = await res.json();
        setDados(data.map((t) => ({ ...t, editando: false })));
      } catch (err) {
        console.error("Erro ao carregar tablets:", err);
        setTipoMensagem("erro");
        setMensagem("Erro ao carregar tablets.");
        setTimeout(() => setMensagem(null), 4000);
      }
    };

    carregar();
  }, [visible]);

  const toggleEdicao = (index) => {
    setDados((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, editando: !item.editando }
          : { ...item, editando: false }
      )
    );
  };

  const handleChange = (index, campo, valor) => {
    setDados((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [campo]: valor } : item))
    );
  };

  const salvar = async () => {
    try {
      for (const item of dados) {
        if (!item.editando) continue;

        const response = await fetch(
          `http://localhost:3000/tablets/${item.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pa_carregadeira: item.carregadeira,
              ip: item.ip,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao atualizar ${item.carregadeira}`);
        }
      }

      setTipoMensagem("sucesso");
      setMensagem("Tablets atualizados com sucesso!");
      setTimeout(() => setMensagem(null), 3000);
      onClose();
    } catch (err) {
      console.error("Erro ao salvar tablets:", err);
      setTipoMensagem("erro");
      setMensagem("Erro ao salvar tablets.");
      setTimeout(() => setMensagem(null), 4000);
    }
  };

  if (!visible) return null;

  return (
    <>
      {mensagem && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow text-sm z-[9999] ${
            tipoMensagem === "sucesso"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {mensagem}
        </div>
      )}

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
            <div
              key={item.id}
              className="bg-gray-200 p-4 rounded w-1/2 relative"
            >
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
    </>
  );
}
