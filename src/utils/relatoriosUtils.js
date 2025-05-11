export function gerarRelatorioComplemento(dados, filtros) {
  localStorage.setItem("relatorioDados", JSON.stringify(dados));
  localStorage.setItem("relatorioFiltros", JSON.stringify(filtros));
  window.open("/relatorio-complemento.html", "_blank");
}
