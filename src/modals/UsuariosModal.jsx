import { useState, useEffect } from "react";
import usuariosIcon from "../assets/usuarios.png";
import lupaIcon from "../assets/buscar.png";
import maisIcon from "../assets/adicionar.png";
import editarIcon from "../assets/editar_usuario.png";
import excluirIcon from "../assets/apagar.png";
import NovoUsuarioModal from "./NovoUsuarioModal";
import EditarUsuarioModal from "./EditarUsuarioModal";
import ConfirmarExclusaoModal from "./ConfirmarExclusaoModal";

export default function UsuariosModal({ visible, onClose }) {
  const [filtro, setFiltro] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [novoUsuarioAberto, setNovoUsuarioAberto] = useState(false);
  const [usuarioParaEditar, setUsuarioParaEditar] = useState(null);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);

  useEffect(() => {
    if (visible) {
      fetchUsuarios();
    }
  }, [visible]);

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/usuarios");
      const data = await res.json();
      setUsuarios(data);
      setResultados(data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  const buscarUsuarios = () => {
    if (filtro.trim() === "") {
      setResultados(usuarios);
    } else {
      const filtrado = usuarios.filter((u) =>
        u.nome.toLowerCase().includes(filtro.toLowerCase())
      );
      setResultados(filtrado);
    }
  };

  const handleExcluirConfirmado = async (usuario) => {
    try {
      const res = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir usuário");

      // Remove localmente da lista
      setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
      setResultados((prev) => prev.filter((u) => u.id !== usuario.id));
      setUsuarioParaExcluir(null);
      console.log("Usuário excluído com sucesso");
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      alert("Erro ao excluir usuário.");
    }
  };

  if (!visible) return null;

  return (
    <div className="relative z-50">
      <div className="relative w-full max-w-3xl mx-auto mt-10 bg-white shadow rounded p-4">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <img src={usuariosIcon} className="w-5 h-5" />
            <h2 className="font-bold">Usuários</h2>
          </div>
          <button onClick={onClose} className="text-xl font-bold">
            ×
          </button>
        </div>

        {/* Busca */}
        <div className="mt-4 flex items-center gap-2 border-b pb-2">
          <input
            type="text"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Digite o nome do usuário..."
            className="flex-1 bg-gray-200 px-3 py-2 rounded text-sm outline-none"
          />
          <button onClick={buscarUsuarios}>
            <img src={lupaIcon} alt="Buscar" className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de usuários */}
        <div className="mt-4 h-40 overflow-y-auto border border-gray-300 rounded p-2">
          {resultados.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum usuário encontrado.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-600">
                  <th className="py-1">Nome</th>
                  <th>Usuário</th>
                  <th>Criado em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((u, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-1">{u.nome}</td>
                    <td>{u.usuario}</td>
                    <td>{new Date(u.criado_em).toLocaleDateString("pt-BR")}</td>
                    <td className="flex gap-3 py-1">
                      <button
                        title="Editar"
                        onClick={() => setUsuarioParaEditar(u)}
                      >
                        <img
                          src={editarIcon}
                          alt="Editar"
                          className="w-5 h-5 cursor-pointer"
                        />
                      </button>
                      <button
                        title="Excluir"
                        onClick={() => setUsuarioParaExcluir(u)}
                      >
                        <img
                          src={excluirIcon}
                          alt="Excluir"
                          className="w-5 h-5 cursor-pointer"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Botão adicionar */}
        <div className="mt-4 flex justify-start">
          <button
            onClick={() => setNovoUsuarioAberto(true)}
            className="text-2xl font-bold hover:scale-110 transition"
          >
            <img src={maisIcon} alt="Novo Usuário" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Modais auxiliares */}
      <NovoUsuarioModal
        visible={novoUsuarioAberto}
        onClose={() => setNovoUsuarioAberto(false)}
        onUsuarioCriado={fetchUsuarios} // recarrega a lista após salvar
      />

      <EditarUsuarioModal
        visible={!!usuarioParaEditar}
        onClose={() => setUsuarioParaEditar(null)}
        usuario={usuarioParaEditar}
        onUsuarioEditado={fetchUsuarios}
      />

      <ConfirmarExclusaoModal
        visible={!!usuarioParaExcluir}
        onCancel={() => setUsuarioParaExcluir(null)}
        onConfirm={handleExcluirConfirmado}
        usuario={usuarioParaExcluir}
      />
    </div>
  );
}
