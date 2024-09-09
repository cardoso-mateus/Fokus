const botaoAdicionarTarefa = seletor('.app__button--add-task');
const formulario = seletor('.app__form-add-task');
const textArea = seletor('.app__form-textarea');
const ulTarefas = seletor('.app__section-task-list');
const botaoCancelar = seletor('.app__form-footer__button--cancel');

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `;

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('app_button-edit');
    botaoEditar.onclick = () => {
        const novaDescricao = prompt("Editar tarefa!");
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();
        }
    }
    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src','/imagens/edit.png');
    botaoEditar.append(imagemBotao);

    li.append(svg);
    li.append(paragrafo);
    li.append(botaoEditar);

    return li;
}

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

botaoAdicionarTarefa.addEventListener('click', () => {
    formulario.classList.toggle('hidden');
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    textArea.value = '';
    formulario.classList.toggle('hidden');
});

botaoCancelar.addEventListener('click', () => {
    if (textArea.value) {
        textArea.value = '';
    }
    formulario.classList.toggle('hidden');
})

function seletor (texto) {
    return document.querySelector(texto);
}