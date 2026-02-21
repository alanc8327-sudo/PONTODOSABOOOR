// script.js
let pedidos = [];
let total = 0;

function adicionarPedido(item, preco) {
  pedidos.push({item, preco});
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("lista-pedido");
  lista.innerHTML = "";
  total = 0;

  pedidos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.item} - R$ ${p.preco.toFixed(2)}`;
    lista.appendChild(li);
    total += p.preco;
  });

  document.getElementById("total").textContent = `Total: R$ ${total.toFixed(2)}`;
}

function imprimirPedido() {
  let recibo = "=== Ponto Do Sabor ===\n\n";
  pedidos.forEach(p => {
    recibo += `${p.item} - R$ ${p.preco.toFixed(2)}\n`;
  });
  recibo += `\nTotal: R$ ${total.toFixed(2)}\n\nObrigado e Volte Sempre!`;

  const printWindow = window.open("", "", "width=600,height=400");
  printWindow.document.write("<pre>" + recibo + "</pre>");
  printWindow.print();

}
