// Este módulo é responsável por validar as tarefas antes de adiciona-las

// Função para validar o texto da terefa, tem que ter ao menos 3 caracteres

// Array para armazenar as tarefas
let tarefas = [];

// Função para adicionar uma nova tarefa
export function adicionarTarefa(texto) {
  const tarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false,
  };

  tarefas.push(tarefa);
  return tarefa;
}

// Função para validar o texto da tarefa
export function validarTarefa(texto) {
  if (texto.trim() === "") {
    return {
      valida: false,
      mensagem: "A tarefa não pode estar vazia.",
    };
  }

  if (texto.length < 3) {
    return {
      valida: false,
      mensagem: "A tarefa deve ter ao menos 3 caracteres.",
    };
  }

  return { valida: true };
}

// Função para obter todas as tarefas
export function obterTarefas() {
  return tarefas;
}