import {
  obterTextoTarefa,
  limparInput,
  adicionarTarefaNaLista,
} from "./dom.js";

const form = document.querySelector("#form-tarefa");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = obterTextoTarefa();

  adicionarTarefaNaLista(texto);
  limparInput();
});