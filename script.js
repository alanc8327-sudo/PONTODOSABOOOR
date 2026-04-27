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

function adicionarPedido(nome, preco, quantidade = 1, observacao = "") {
  let itemExistente = pedidos.find(p => p.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
    if (observacao) {
      itemExistente.observacao = observacao; // atualiza observação se houver
    }
  } else {
    pedidos.push({ nome, preco, quantidade, observacao });
  }

  atualizarResumo();
}




function removerPedido(nome,preco, quantidade = 1) {
  let index = pedidos.findIndex(p => p.nome === nome && p.quantidade >= quantidade);
  if (index !== -1) {
    pedidos[index].quantidade -= quantidade;
    if (pedidos[index].quantidade <= 0) {
      pedidos.splice(index, 1);
    }

    
    atualizarResumo();
    }
  }



// Atualiza o resumo do pedido listando cada item
function atualizarResumo() {
  let resumo = "";
  let total = 0;

  pedidos.forEach(item => {
    let subtotal = item.quantidade * item.preco;
    total += subtotal;
    let obs = item.observacao ? ` (Obs: ${item.observacao})` : "";
    resumo += `${item.nome} x${item.quantidade} - R$ ${subtotal.toFixed(2)}${obs}\n`;
  });

  if (resumo === "") {
    resumo = "Nenhum pedido ainda.";
  } else {
    resumo += `\nTotal: R$ ${total.toFixed(2)}`;
  }

  document.getElementById("resumo").innerText = resumo;
}

function finalizarPedido() {
  let endereco = document.getElementById("endereco").value;
  let bairro = document.getElementById("bairro").value;
  let pagamento = document.getElementById("pagamento").value;

  if (!endereco || !bairro || !pagamento || pedidos.length === 0) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let subtotal = pedidos.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);
  let taxaEntrega = taxas[bairro] || 0;
  let total = subtotal + taxaEntrega;

  let resumo = "";
  pedidos.forEach(item => {
    let subtotalItem = item.quantidade * item.preco;
    let obs = item.observacao ? ` (Obs: ${item.observacao})` : "";
    resumo += `${item.nome} x${item.quantidade} - R$ ${subtotalItem.toFixed(2)}${obs}\n`;
  });

  resumo += `\nSubtotal: R$ ${subtotal.toFixed(2)}`;
  resumo += `\nTaxa de entrega (${bairro}): R$ ${taxaEntrega.toFixed(2)}`;
  resumo += `\nTotal: R$ ${total.toFixed(2)}`;
  resumo += `\nEndereço: ${endereco} - ${bairro}`;
  resumo += `\nPagamento: ${pagamento}`;
  resumo += `\nPrazo de entrega: 55-65 minutos.`;
  resumo += `\nObrigado por escolher o Ponto Do Sabor!`;

  let mensagem = encodeURIComponent(resumo);
  let url = `https://wa.me/5513991873557?text=${mensagem}`;
  window.open(url, "_blank");
}






 


function limparPedidos() {
  pedidos = [];
  document.getElementById("resumo").innerText = "Nenhum pedido ainda.";
}

const stars = document.querySelectorAll('.star');
let rating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    rating = star.getAttribute('data-value');
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('selected');
    }
  });
});

function enviarFeedback() {
  const comentario = document.getElementById('comentario').value;
  if (rating === 0) {
    alert("Por favor, selecione uma nota.");
    return;
  }
  if (comentario.trim() === "") {
    alert("Por favor, escreva um comentário.");
    return;
  }

  let whatsappMessage = `Feedback do cliente:\nNota: ${rating} estrelas\nComentário: ${comentario}`;
  let url = `https://wa.me/5513991873557?text=${encodeURIComponent(whatsappMessage)}`;
  window.open(url, "_blank");


}


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
  
  // Número do WhatsApp da empresa (substitua pelo seu)
  const numero = "5513991873557"; 
  
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
}


