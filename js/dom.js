// dom.js
// Timers para controlar o fade e limpeza da mensagem
let mensagemTimer = null; // inicia o processo de esconder (remove .show)
let mensagemClearTimer = null; // limpa o conteúdo depois do fade
export function obterTextoTarefa() {
  const input = document.querySelector("#input-tarefa");
  return input.value;
}

// Função para limpar o campo do input após adicionar uma tarefa
export function limparInput() {
  const input = document.querySelector("#input-tarefa");
  input.value = "";
  input.focus();
}

// Função para renderizar a lista de tarefas no DOM
export function renderizarTarefas(tarefas) {
  const lista = document.querySelector("#lista-tarefas");
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    // estrutura o item com texto e botão para facilitar o posicionamento
    const li = document.createElement("li");
    li.className = "tarefa-item";

    // botão de toggle (esquerda)
    const botaoToggle = document.createElement("button");
    botaoToggle.className = "botao-toggle";
    botaoToggle.dataset.action = "toggle";
    botaoToggle.dataset.id = tarefa.id;
    botaoToggle.setAttribute("aria-label", "Marcar tarefa");

    // texto da tarefa
    const textoEl = document.createElement("span");
    textoEl.className = "tarefa-text";
    textoEl.textContent = tarefa.texto;

    if (tarefa.concluida) {
      // não riscar o texto — apenas marcar visualmente o botão
      botaoToggle.classList.add("active");
    }

    // botão de excluir (direita)
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.dataset.action = "delete";
    botaoExcluir.dataset.id = tarefa.id;
    botaoExcluir.className = "botao-excluir";

    li.appendChild(botaoToggle);
    li.appendChild(textoEl);
    li.appendChild(botaoExcluir);
    lista.appendChild(li);
  });
}

// Função para exibir mensagens de validação ou sucesso para o usuário
export function exibirMensagem(mensagem, tipo) {
  let areaMensagem = document.querySelector("#mensagem");

  // cria o elemento de mensagem se não existir
  if (!areaMensagem) {
    areaMensagem = document.createElement("p");
    areaMensagem.id = "mensagem";
    document.body.insertBefore(
      areaMensagem,
      document.querySelector("#lista-tarefas"),
    );
  }

  // define o texto e as classes (ex: 'erro' ou 'sucesso') para estilização via CSS
  areaMensagem.textContent = mensagem;

  // remove timers anteriores se existirem
  if (mensagemTimer) {
    clearTimeout(mensagemTimer);
    mensagemTimer = null;
  }
  if (mensagemClearTimer) {
    clearTimeout(mensagemClearTimer);
    mensagemClearTimer = null;
  }

  // aplica classes sem sobrescrever acidentalmente outras — usa classList
  areaMensagem.classList.remove("erro", "sucesso", "show");
  if (tipo) areaMensagem.classList.add(tipo);
  // forza o layout e em seguida adiciona a classe 'show' para disparar o fade-in
  // (ajuda em casos onde a mesma mensagem reaparece rapidamente)
  void areaMensagem.offsetWidth; // reflow
  areaMensagem.classList.add("show");

  // após 2s inicia o fade-out (remove a classe 'show').
  mensagemTimer = setTimeout(() => {
    areaMensagem.classList.remove("show");
    mensagemTimer = null;
  }, 2000);

  // depois do tempo + duração do fade, limpa o conteúdo e classes
  mensagemClearTimer = setTimeout(() => {
    areaMensagem.textContent = "";
    areaMensagem.classList.remove("erro", "sucesso");
    mensagemClearTimer = null;
  }, 2000 + 500); // 500ms = duração do transition definida no CSS
}

// Função exibir dados da API

export function exibirDica(dica) {
  let areaDica = document.querySelector("#dica");

  if (!areaDica) {
    areaDica = document.createElement("p");
    areaDica.id = "dica";
    document.body.appendChild(areaDica);
  }

  if (dica) {
    areaDica.textContent = `💡 Dica do dia: ${dica}`;
  } else {
    areaDica.textContent = `⚠️ Não foi possível carregar a dica.`;
  }
}
