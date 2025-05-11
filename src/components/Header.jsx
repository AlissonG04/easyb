import logo from "../assets/logo.png";

export default function Header({ onMenuClick }) {
  return (
    <header className="w-full h-16 bg-white flex items-center px-4 shadow relative z-50">
      <div className="flex items-center gap-3">
        <div
          onClick={onMenuClick}
          className="text-3xl font-bold text-black cursor-pointer"
        >
          ☰
        </div>
        <img src={logo} alt="Easy Balance Logo" className="h-8" />
      </div>
    </header>
  );
}
