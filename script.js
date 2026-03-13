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

