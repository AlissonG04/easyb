import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui vai a lógica real de autenticação futuramente
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Usuário:"
        className="px-3 py-2 border border-gray-300 bg-gray-100 text-sm rounded"
      />
      <input
        type="password"
        placeholder="Senha:"
        className="px-3 py-2 border border-gray-300 bg-gray-100 text-sm rounded"
      />
      <button
        type="submit"
        className="bg-blue-700 text-white py-2 rounded font-bold hover:bg-blue-800"
      >
        Entrar
      </button>
    </form>
  );
}
