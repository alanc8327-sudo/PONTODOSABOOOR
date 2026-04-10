let pedidos = [];

// Tabela de taxas por bairro
const taxas = {
  "Rio Da Praia": 6,
  "Maitinga": 7,
  "Mangue Seco": 8,
  "Jardim Rafael": 9,
  "Jardim  Das Cançoes": 9,
  "Vila Ho": 7,
  "Rivieira": 20,
  "Centro": 15,
  "Centreville(Balsa)": 18,
  "Sitio São João": 25,
  "São Lourenço": 25,
  "Chacaras": 15,
  "Vista Linda": 12,
  "Indaia": 15,
  "Saoc": 10,


};

function adicionarPedido(nome, preco) {
  pedidos.push({ nome, preco });
  atualizarResumo();
}

function atualizarResumo() {
  if (pedidos.length === 0) {
    document.getElementById("resumo").innerText = "Nenhum pedido ainda.";
    return;
  }

  let resumo = "";
  let subtotal = 0;
  pedidos.forEach((item, i) => {
    resumo += `${i + 1}. ${item.nome} - R$${item.preco.toFixed(2)}\n`;
    subtotal += item.preco;
  });

  document.getElementById("resumo").innerText = resumo + `\nSubtotal: R$${subtotal.toFixed(2)}`;
}

function finalizarPedido() {
  let endereco = document.getElementById("endereco").value;
  let bairro = document.getElementById("bairro").value;
  let pagamento = document.getElementById("pagamento").value;

  if (!endereco || !bairro || !pagamento) {
    alert("Por favor, preencha todos os campos.");
    return;

  }

  let subtotal = pedidos.reduce((acc, item) => acc + item.preco, 0);
  let taxaEntrega = taxas[bairro] || 0;
  let total = subtotal + taxaEntrega;
  let pagamentoTexto = `Pagamento: ${pagamento}`;


  let resumo = document.getElementById("resumo").innerText;
  resumo += `\nTaxa de entrega (${bairro}): R$${taxaEntrega.toFixed(2)}\nTotal: R$${total.toFixed(2)}\nEndereço: ${endereco} - ${bairro}\n${pagamentoTexto} \nPrazo de entrega: 55-65 minutos.\nObrigado por escolher o Ponto Do Sabor!`;

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


