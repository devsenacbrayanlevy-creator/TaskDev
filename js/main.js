// Importando funções do módulo DOM
import {
  obterTextoTarefa,
  limparInput,
  renderizarTarefas,
  exibirMensagem,
} from "./dom.js";

// Importando funções do módulo Tarefas
import { validarTarefa, adicionarTarefa, obterTarefas } from "./tarefas.js";

// Selicionar o formulário para adicionar um evento de submit
const form = document.querySelector("#form-tarefa");

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