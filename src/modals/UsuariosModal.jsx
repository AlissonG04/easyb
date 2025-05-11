import usuariosIcon from "../assets/usuarios.png";
import editarIcon from "../assets/editar_usuario.png";
import excluirIcon from "../assets/apagar.png";

export default function UsuariosModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded shadow p-4 relative">
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

        {/* Tabela */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Usuário</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Criado em</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Jhon Doe</td>
                <td className="px-4 py-2">JnD</td>
                <td className="px-4 py-2">Administrador</td>
                <td className="px-4 py-2">10/05/2025</td>
                <td className="px-4 py-2 flex gap-3">
                  <img src={editarIcon} className="w-5 h-5 cursor-pointer" />
                  <img src={excluirIcon} className="w-5 h-5 cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Botão Novo Usuário */}
        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100">
            <img src={usuariosIcon} className="w-5 h-5" />
            Novo Usuário
          </button>
        </div>
      </div>
    </div>
  );
}
