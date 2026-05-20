// Este módulo é responsável por validar e persistir tarefas

const STORAGE_KEY = "tarefas";

// Array para armazenar as tarefas (carregado do localStorage)
let tarefas = [];

// salva o array de tarefas no localStorage
function salvarTarefas() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  } catch (e) {
    // falha silenciosa — localStorage pode estar indisponível
    console.warn("Não foi possível salvar tarefas:", e);
  }
}

// carrega tarefas do localStorage para a variável `tarefas`
function carregarTarefas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      tarefas = parsed;
    }
  } catch (e) {
    console.warn("Erro ao carregar tarefas do storage:", e);
    tarefas = [];
  }
}

// carregar no momento do import do módulo
carregarTarefas();

// Função para adicionar uma nova tarefa
export function adicionarTarefa(texto) {
  const tarefa = {
    id: Date.now(),
    texto: texto,
    concluida: false,
  };

  tarefas.push(tarefa);
  salvarTarefas();
  return tarefa;
}

// Função para excluir uma tarefa pelo id
export function excluirTarefa(id) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  salvarTarefas();
}

// Alterna o estado 'concluida' de uma tarefa e persiste
export function toggleConcluida(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (!tarefa) return;
  tarefa.concluida = !tarefa.concluida;
  salvarTarefas();
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
  // retorna cópia para evitar mutação externa
  return tarefas.slice();
}
