import LoginForm from "../components/LoginForm";
import logo from "../assets/logo.png";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-col justify-center items-center relative">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-sm text-center">
        <img src={logo} alt="Logo Easy Balance" className="mx-auto mb-4 w-20" />
        <h1 className="text-xl font-bold text-blue-800">
          EASY <span className="text-blue-500">BALANCE</span>
        </h1>
        <LoginForm />
      </div>
      <span className="absolute bottom-4 right-4 text-sm font-bold text-blue-800">
        EASY <span className="text-blue-500">BALANCE</span>
      </span>
    </div>
  );
}
