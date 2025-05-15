import { useEffect, useState } from "react";
import balancaIcon from "../assets/balancas.png";
import salvarIcon from "../assets/salvar.png";
import editarIcon from "../assets/editar.png";

export default function IpsPortasBalancasModal({ visible, onClose }) {
  const [balancas, setBalancas] = useState([]);
  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState("sucesso"); // "erro"

  useEffect(() => {
    if (!visible) return;

    const carregarBalanças = async () => {
      try {
        const res = await fetch("http://localhost:3000/balancas-config");
        const data = await res.json();
        setBalancas(data.map((b) => ({ ...b, editando: false })));
      } catch (err) {
        console.error("Erro ao carregar balanças:", err);
        setTipoMensagem("erro");
        setMensagem("Erro ao carregar balanças");
        setTimeout(() => setMensagem(null), 4000);
      }
    };

    carregarBalanças();
  }, [visible]);

  const toggleEdicao = (index) => {
    setBalancas((prev) =>
      prev.map((b, i) => ({
        ...b,
        editando: i === index ? !b.editando : false,
      }))
    );
  };

  const handleChange = (index, field, value) => {
    const novaLista = [...balancas];
    novaLista[index][field] = value;
    setBalancas(novaLista);
  };

  const handleSalvar = async () => {
    try {
      for (const b of balancas) {
        if (!b.editando) continue;

        const response = await fetch(
          `http://localhost:3000/balancas-config/${b.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nome: b.nome,
              ip: b.ip,
              porta: b.porta,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao atualizar ${b.nome}`);
        }

        console.log(`${b.nome} atualizada`);
      }

      setTipoMensagem("sucesso");
      setMensagem("Balanças atualizadas com sucesso!");
      setTimeout(() => setMensagem(null), 3000);

      onClose();
    } catch (err) {
      console.error("Erro ao salvar alterações:", err);
      setTipoMensagem("erro");
      setMensagem("Erro ao salvar uma ou mais balanças.");
      setTimeout(() => setMensagem(null), 4000);
    }
  };

  if (!visible) return null;

  return (
    <>
      {/* Toast */}
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

      {/* Modal */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow rounded p-4 z-40">
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
            <div
              key={b.id}
              className="bg-gray-200 p-4 rounded space-y-2 relative"
            >
              <button
                className="absolute top-2 right-2"
                onClick={() => toggleEdicao(i)}
                title="Editar esta balança"
              >
                <img src={editarIcon} className="w-4 h-4 cursor-pointer" />
              </button>

              <div className="flex items-center gap-2">
                <label className="text-sm w-16">Balança:</label>
                <input
                  type="text"
                  value={b.nome}
                  readOnly={!b.editando}
                  onChange={(e) => handleChange(i, "nome", e.target.value)}
                  className="flex-1 text-sm px-2 py-1 rounded bg-white outline-none"
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
    </>
  );
}
