export function reimprimirTicketPesagem(pesagem) {
  const novaJanela = window.open("", "_blank");
  if (!novaJanela) return;

  const gerarVia = (numero) => `
    <div class="ticket">
      <div class="flex">
        <img src="../src/assets/terra-branca.png" class="logo" />
        <div><span class="bold">Pesagem:</span> ${numero}</div>
        <div>
          <div><span class="bold">Data de Emissão:</span> ${pesagem.data}</div>
          <div><span class="bold">Hora:</span> ${pesagem.hora}</div>
        </div>
      </div>
      <table>
        <tr>
          <td><span class="bold">Cliente:</span><br>${pesagem.cliente}</td>
          <td><span class="bold">Produto:</span><br>${pesagem.produto}</td>
        </tr>
        <tr>
          <td><span class="bold">Motorista:</span><br>${pesagem.motorista}</td>
          <td><span class="bold">Placa:</span><br>${pesagem.placa}</td>
        </tr>
        <tr>
          <td colspan="2"><span class="bold">Observações:</span><br>${
            pesagem.observacoes || ""
          }</td>
        </tr>
        <tr>
          <td colspan="2" class="right">
            <span class="bold">Tara:</span> ${pesagem.tara} |
            <span class="bold">Líquido:</span> ${pesagem.liquido} |
            <span class="bold">Bruto:</span> ${pesagem.bruto}
          </td>
        </tr>
        <tr>
          <td colspan="2"><span class="bold">Emitido Por:</span> _____________</td>
        </tr>
      </table>
    </div>
  `;

  const html = `
    <html>
      <head>
        <title>Ticket de Pesagem</title>
        <style>
          body { font-family: sans-serif; padding: 1rem; }
          .ticket { border: 1px solid #000; padding: 1rem; margin-bottom: 1rem; }
          .flex { display: flex; justify-content: space-between; }
          .bold { font-weight: bold; }
          .logo { height: 50px; }
          table { width: 100%; margin-top: 1rem; border-collapse: collapse; }
          td { border: 1px solid #000; padding: 4px; font-size: 14px; }
          .right { text-align: right; }
          .print-btn { position: fixed; top: 10px; right: 10px; }
          @media print { .print-btn { display: none; } }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">🖨️ Imprimir</button>
        <div id="conteudo">
          ${gerarVia("01") + gerarVia("01")}
        </div>
      </body>
    </html>
  `;

  novaJanela.document.write(html);
  novaJanela.document.close();
}
