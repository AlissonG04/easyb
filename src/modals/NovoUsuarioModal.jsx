import { useState, useEffect } from "react";
import usuariosIcon from "../assets/usuarios.png";
import salvarIcon from "../assets/salvar.png";

const privilegiosPadrao = [
  "Usuários",
  "Relatórios",
  "Balanças",
  "Base",
  "Emissão de Pesagens",
  "Operador (Tablet)",
];

export default function NovoUsuarioModal({ visible, onClose }) {
  const [form, setForm] = useState({
    nome: "",
    usuario: "",
    senha: "",
    master: false,
    privilegios: [],
  });

  useEffect(() => {
    if (form.master) {
      setForm((prev) => ({
        ...prev,
        privilegios: [...privilegiosPadrao],
      }));
    }
  }, [form.master]);

  if (!visible) return null;

  const togglePrivilegio = (priv) => {
    setForm((prev) => ({
      ...prev,
      privilegios: prev.privilegios.includes(priv)
        ? prev.privilegios.filter((p) => p !== priv)
        : [...prev.privilegios, priv],
    }));
  };

  const handleGravar = () => {
    console.log("Usuário salvo:", form);
    // Aqui será enviada a requisição para o backend futuramente
  };

  return (
    <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 w-full max-w-3xl bg-white shadow rounded p-4 z-40">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <img src={usuariosIcon} className="w-5 h-5" />
          <h2 className="font-bold">Novo Usuário</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Campos de entrada */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="bg-gray-200 px-3 py-2 rounded text-sm outline-none"
        />
        <input
          type="text"
          placeholder="Usuário"
          value={form.usuario}
          onChange={(e) => setForm({ ...form, usuario: e.target.value })}
          className="bg-gray-200 px-3 py-2 rounded text-sm outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          className="bg-gray-200 px-3 py-2 rounded text-sm outline-none"
        />
      </div>

      {/* Grupo de Privilégio */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <img src={usuariosIcon} className="w-5 h-5" />
          <h3 className="font-semibold text-sm">Grupo de Privilégio</h3>
        </div>

        <div className="grid grid-cols-2 gap-y-2 pl-1">
          {privilegiosPadrao.map((priv) => (
            <label key={priv} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.privilegios.includes(priv)}
                onChange={() => togglePrivilegio(priv)}
                disabled={form.master}
              />
              <span className="text-sm">{priv}</span>
            </label>
          ))}

          <label className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              checked={form.master}
              onChange={() =>
                setForm((prev) => ({ ...prev, master: !prev.master }))
              }
            />
            <span className="font-semibold text-sm">Usuário Master</span>
          </label>
        </div>
      </div>

      {/* Botão Gravar */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleGravar}
          className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          <img src={salvarIcon} className="w-5 h-5" />
          Gravar Novo Usuário
        </button>
      </div>
    </div>
  );
}
