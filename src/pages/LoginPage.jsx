import LoginForm from "../components/LoginForm";
import logo from "../assets/logo.png";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-col justify-center items-center relative">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-sm text-center">
        <img src={logo} alt="Logo SYNSCALE" className="mx-auto mb-4 w-20" />
        <h1 className="text-xl font-bold" style={{ color: "#1d2b52" }}>
          SYN SCALE
        </h1>
        <LoginForm />
      </div>
      <span
        className="absolute bottom-4 right-4 text-sm font-bold"
        style={{ color: "#1d2b52" }}
      >
        SYN SCALE
      </span>
    </div>
  );
}
