const botaoAdicionarTarefa = seletor('.app__button--add-task');
const formulario = seletor('.app__form-add-task');
const textArea = seletor('.app__form-textarea');

const tarefas = [];

botaoAdicionarTarefa.addEventListener('click', () => {
    formulario.classList.toggle('hidden');
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
});



function seletor (texto) {
    return document.querySelector(texto);
}