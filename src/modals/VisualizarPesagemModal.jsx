import pesagemIcon from "../assets/pesagem.png";

export default function VisualizarPesagemModal({ visible, onClose, pesagem }) {
  if (!visible || !pesagem) return null;

  return (
    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white shadow rounded p-5 z-50">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <div className="flex items-center gap-2">
          <img src={pesagemIcon} className="w-5 h-5" />
          <h2 className="font-bold text-sm">Visualização de Pesagem</h2>
        </div>
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      </div>

      {/* Dados */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <p>
          <strong>Cliente:</strong> {pesagem.cliente}
        </p>
        <p>
          <strong>Produto:</strong> {pesagem.produto}
        </p>
        <p>
          <strong>Motorista:</strong> {pesagem.motorista}
        </p>
        <p>
          <strong>Placa:</strong> {pesagem.placa}
        </p>
        <p>
          <strong>Tara:</strong> {pesagem.tara} kg
        </p>
        <p>
          <strong>Líquido:</strong> {pesagem.liquido} kg
        </p>
        <p>
          <strong>Bruto:</strong> {pesagem.bruto} kg
        </p>
        {pesagem.observacoes && (
          <p className="col-span-2">
            <strong>Observações:</strong> {pesagem.observacoes}
          </p>
        )}
      </div>
    </div>
  );
}
