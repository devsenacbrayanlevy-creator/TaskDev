// Importando funções do módulo DOM
import {
  obterTextoTarefa,
  limparInput,
  renderizarTarefas,
  exibirMensagem,
  exibirDica,
} from "./dom.js";

// Importando funções do módulo Tarefas
import {
  validarTarefa,
  adicionarTarefa,
  obterTarefas,
  excluirTarefa,
} from "./tarefas.js";
import { toggleConcluida } from "./tarefas.js";

// Importando função para buscar dica
import { buscarDica } from "./api.js";

// Selicionar o formulário para adicionar um evento de submit
const form = document.querySelector("#form-tarefa");

// Função para iniciar a aplicação, buscando uma dica e exibindo-a
async function iniciarAplicacao() {
  const dica = await buscarDica();
  exibirDica(dica);
}

// renderiza tarefas salvas ao iniciar
iniciarAplicacao().then(() => {
  renderizarTarefas(obterTarefas());
});
// Evento de submit para adicionar um nova tarefa
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = obterTextoTarefa();
  const resultado = validarTarefa(texto);

  if (!resultado.valida) {
    exibirMensagem(resultado.mensagem, "erro");
    return;
  }

  adicionarTarefa(texto);
  renderizarTarefas(obterTarefas());
  exibirMensagem("Tarefa adicionada com sucesso!", "sucesso");
  limparInput();
});

// Evento de clique para excluir tarefa na lista
const listaTarefas = document.querySelector("#lista-tarefas");
listaTarefas.addEventListener("click", (event) => {
  // verificar se foi clicado no botão de excluir
  const botaoExcluir = event.target.closest('button[data-action="delete"]');
  if (botaoExcluir) {
    const tarefaId = Number(botaoExcluir.dataset.id);
    excluirTarefa(tarefaId);
    renderizarTarefas(obterTarefas());
    exibirMensagem("Tarefa excluída com sucesso!", "sucesso");
    return;
  }

  // verificar se foi clicado no botão de toggle (marcar concluída)
  const botaoToggle = event.target.closest('button[data-action="toggle"]');
  if (botaoToggle) {
    const tarefaId = Number(botaoToggle.dataset.id);
    toggleConcluida(tarefaId);
    renderizarTarefas(obterTarefas());
    return;
  }
});

// Evento de clique para o botão Sair
const btnSair = document.querySelector("#btn-sair");
btnSair.addEventListener("click", () => {
  window.location.href = "/login.html";
});
