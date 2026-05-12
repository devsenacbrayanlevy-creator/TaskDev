// Importando funções do módulo DOM
import {
  obterTextoTarefa,
  limparInput,
  renderizarTarefas,
  exibirMensagem,
} from "./dom.js";

// Importando funções do módulo Tarefas
import {validarTarefa, adicionarTarefa, obterTarefas} from "./tarefas.js";

// Selecionar o formulário para adicionar um evento de submit
const form = document.querySelector("#form-tarefa");

// Evento de submit para adicionar uma nova tarefa
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = obterTextoTarefa();
  const resultado = validarTarefa(texto);

  if (!resultado.valida) {
    exibirMensagem(resultado.mensagem, "error");
    return;
  }

  adicionarTarefaNaLista(texto);
  renderizarTarefas
  exibirMensagem("Tarefa adicionada com sucesso!", "sucesso");
  limparInput();
});