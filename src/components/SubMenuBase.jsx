import balancasIcon from "../assets/balancas.png";
import tabletIcon from "../assets/tablet.png";

export default function SubMenuBase({ visible, onSelect }) {
  if (!visible) return null;

  const handleSelect = (tipo) => {
    if (onSelect) {
      onSelect(tipo);
    }
  };

  return (
    <div className="absolute left-14 top-[11.5rem] w-72 bg-white shadow border z-40">
      <ul className="divide-y divide-gray-300">
        <li
          className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSelect("ips")}
        >
          <img src={balancasIcon} alt="Icone balança" className="w-5 h-5" />
          <span className="text-sm">IPs e Portas das Balanças</span>
        </li>
        <li
          className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSelect("tablets")}
        >
          <img src={tabletIcon} alt="Icone tablet" className="w-5 h-5" />
          <span className="text-sm">IPs dos Tablets</span>
        </li>
      </ul>
    </div>
  );
}
