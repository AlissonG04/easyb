import usuariosIcon from "../assets/usuarios.png";

export default function ConfirmarExclusaoModal({
  visible,
  usuario,
  onConfirm,
  onCancel,
}) {
  if (!visible || !usuario) return null;

  return (
    <div className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 w-full max-w-md bg-white shadow rounded p-4 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 border-b pb-2">
        <img src={usuariosIcon} className="w-5 h-5" />
        <h2 className="font-bold text-sm">Confirmar Exclusão</h2>
      </div>

      <p className="mt-4 text-sm text-gray-700">
        Tem certeza que deseja excluir o usuário <strong>{usuario.nome}</strong>
        ?
      </p>

      {/* Botões */}
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Cancelar
        </button>
        <button
          onClick={() => onConfirm(usuario)}
          className="px-4 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
        >
          Confirmar Exclusão
        </button>
      </div>
    </div>
  );
}
