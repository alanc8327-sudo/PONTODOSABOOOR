let pedidos = [];

// Tabela de taxas por bairro
const taxas = {
  "Saoc": 6,
  "Albatroz 2": 7,
  "Centro": 10,
  "Sitio": 15,
  "Maitinga": 10,
  "Rio Da Praia": 9,
  "Mangue Seco": 9,
  "Pedralina": 8,
  "Ana Paula": 10,
  " V.L Lado Praia": 10,
  "V.L Lado Chacara": 12,
  "V.L Invasao": 15,
  "Indiaia": 18,
  "Rivieira": 25,
  "Sao Lourenco": 30,
};

// ===== TOGGLE SIDEBAR =====
function toggleSidebar() {
    const sidebar = document.getElementById('sidebarCarrinho');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;

    sidebar.classList.toggle('aberto');
    overlay.classList.toggle('ativo');
    body.classList.toggle('sidebar-aberta');
}

// ===== ADICIONAR/REMOVER PEDIDO =====
function adicionarPedido(nome, preco, quantidade = 1, observacao = "") {
  let nomeChave = observacao? `${nome}_${observacao}` : nome;
  let itemExistente = pedidos.find(p => p.nomeChave === nomeChave);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    pedidos.push({
      nome,
      nomeChave,
      preco,
      quantidade,
      observacao
    });
  }
  atualizarResumo();

  // Animação no botão mobile
  const btn = document.getElementById('btnToggleSidebar');
  btn.classList.add('pulse');
  setTimeout(() => btn.classList.remove('pulse'), 500);

  // Limpa input de obs
  if (observacao) {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
      if (input.value === observacao) input.value = '';
    });
  }
}

function removerPedido(nome) {
  let index = pedidos.findIndex(p => p.nome === nome);
  if (index!== -1) {
    pedidos[index].quantidade -= 1;
    if (pedidos[index].quantidade <= 0) {
      pedidos.splice(index, 1);
    }
    atualizarResumo();
  }
}

// ===== ATUALIZA RESUMO + BADGE =====
function atualizarResumo() {
  const resumoEl = document.getElementById("resumo");
  const badgeEl = document.getElementById("badgeQtd");
  const totalEl = document.getElementById("sidebarTotal");

  if (pedidos.length === 0) {
    resumoEl.innerHTML = "Nenhum pedido ainda.";
    badgeEl.textContent = "0";
    totalEl.textContent = "Total: R$ 0,00";
    return;
  }

  let html = "";
  let subtotal = 0;
  let qtdTotal = 0;

  pedidos.forEach((item) => {
    const subtotalItem = item.quantidade * item.preco;
    subtotal += subtotalItem;
    qtdTotal += item.quantidade;
    let obs = item.observacao? `<br><small>Obs: ${item.observacao}</small>` : "";

    html += `
      <div class="item-pedido">
        <span>${item.quantidade}x ${item.nome} - R$ ${subtotalItem.toFixed(2)}${obs}</span>
        <button class="btn-remover" onclick="removerPedido('${item.nome}')">×</button>
      </div>`;
  });

  resumoEl.innerHTML = html;
  badgeEl.textContent = qtdTotal;
  totalEl.textContent = `Total: R$ ${subtotal.toFixed(2)}`;
}

function finalizarPedido() {
  let endereco = document.getElementById("endereco").value;
  let bairro = document.getElementById("bairro").value;
  let pagamento = document.getElementById("pagamento").value;

  if (!endereco ||!bairro ||!pagamento || pedidos.length === 0) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let subtotal = pedidos.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);
  let taxaEntrega = taxas[bairro] || 0;
  let total = subtotal + taxaEntrega;

  let resumo = "🧾 *PEDIDO PONTO DO SABOR*\n\n";
  pedidos.forEach(item => {
    let subtotalItem = item.quantidade * item.preco;
    let obs = item.observacao? ` (Obs: ${item.observacao})` : "";
    resumo += `${item.quantidade}x ${item.nome} - R$ ${subtotalItem.toFixed(2)}${obs}\n`;
  });

  resumo += `\nSubtotal: R$ ${subtotal.toFixed(2)}`;
  resumo += `\nTaxa de entrega (${bairro}): R$ ${taxaEntrega.toFixed(2)}`;
  resumo += `\n*Total: R$ ${total.toFixed(2)}*`;
  resumo += `\n\n📍 Endereço: ${endereco} - ${bairro}`;
  resumo += `\n💳 Pagamento: ${pagamento}`;
  resumo += `\n⏱ Prazo de entrega: 55-65 minutos`;
  resumo += `\n\nObrigado por escolher o Ponto Do Sabor!`;

  let mensagem = encodeURIComponent(resumo);
  let url = `https://wa.me/5513991873557?text=${mensagem}`;
  window.open(url, "_blank");
}

function limparPedidos() {
  pedidos = [];
  atualizarResumo();
}

// ===== FEEDBACK =====
let nota = 0;

function avaliar(valor) {
  nota = valor;
  const estrelas = document.querySelectorAll(".stars i");
  estrelas.forEach((estrela, index) => {
    if (index < valor) {
      estrela.classList.add("selecionada");
      estrela.classList.remove("fa-regular");
      estrela.classList.add("fa-solid");
    } else {
      estrela.classList.remove("selecionada");
      estrela.classList.remove("fa-solid");
      estrela.classList.add("fa-regular");
    }
  });
}

function enviarFeedback() {
  const nome = document.getElementById("feedbackNome").value;
  const mensagem = document.getElementById("feedbackMsg").value;

  if (!nota) {
    alert("Por favor, selecione uma nota de 1 a 5 estrelas.");
    return;
  }
  if (!mensagem) {
    alert("Por favor, escreva seu feedback antes de enviar.");
    return;
  }

  const texto = `⭐ Avaliação: ${nota} estrelas\n👤 Nome: ${nome || "Cliente"}\n💬 Feedback: ${mensagem}`;
  const numero = "5513991873557";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
}