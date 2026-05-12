import {
  obterTextoTarefa,
  limparInput,
  adicionarTarefaNaLista,
  exibirMensagem,
} from "./dom.js";

import {validarTarefa} from "./tarefas.js";

const form = document.querySelector("#form-tarefa");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = obterTextoTarefa();
  const resultado = validarTarefa(texto);

  if (!resultado.valida) {
    exibirMensagem(resultado.mensagem, "error");
    return;
  }

  adicionarTarefaNaLista(texto);
  exibirMensagem("Tarefa adicionada com sucesso!", "sucesso");
  limparInput();
});