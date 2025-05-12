// Gerar relatório de solicitações de complemento
export function gerarRelatorioComplemento(dados, filtros) {
  localStorage.setItem("relatorioDados", JSON.stringify(dados));
  localStorage.setItem("relatorioFiltros", JSON.stringify(filtros));
  window.open("/relatorio-complemento.html", "_blank");
}

// Gerar relatório de Usuários
export function gerarRelatorioUsuarios(dados, filtros) {
  localStorage.setItem("relatorioDados", JSON.stringify(dados));
  localStorage.setItem("relatorioFiltros", JSON.stringify(filtros));
  window.open("/relatorio-usuarios.html", "_blank");
}

// Gerar Ticket
export function emitirTicketPesagem(dados) {
  const url = `/ticket-pesagem.html?dados=${encodeURIComponent(
    JSON.stringify(dados)
  )}`;
  window.open(url, "_blank");
}
