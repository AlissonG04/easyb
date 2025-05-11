import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="w-full h-16 bg-white flex items-center px-4 shadow">
      <div className="flex items-center gap-5">
        <div className="text-3xl font-bold text-black cursor-pointer">☰</div>
        <img src={logo} alt="Easy Balance Logo" className="h-10" />
      </div>
    </header>
  );
}
