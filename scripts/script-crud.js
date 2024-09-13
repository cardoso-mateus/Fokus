/*
// lista de querySelectors que selecionam elementos do DOM
// elementos identificados por uma string simples são tags HTML
// elementos identificados por uma string começada com um '.' são classes CSS
// elementos identificados por uma string começada com um '#' são IDs
*/
const botaoAdicionarTarefa = seletor('.app__button--add-task');
const formulario = seletor('.app__form-add-task');
const textArea = seletor('.app__form-textarea');
const ulTarefas = seletor('.app__section-task-list');
const botaoCancelar = seletor('.app__form-footer__button--cancel');

/*
// array que armazena as tarefas, ela carrega as tarefas do localStorage ou inicializa como um array vazio
// JSON.parse() converte uma string em um objeto
// localStorage.getItem() obtém um item do localStorage
*/
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

/*
// função que atualiza as tarefas no localStorage
// JSON.stringify() converte um objeto em uma string formatada como JSON
// localStorage.setItem() armazena uma string com o nome da chave e o valor que no caso é o array de tarefas
*/
function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

/*
// função que cria um elemento de tarefa
// document.createElement() cria um elemento HTML
// constante li recebe o elemento <li>, li.classList.add() adiciona uma classe a ele
// constante svg recebe o elemento <svg>, svg.innerHTML recebe uma string que é o conteúdo do svg em forma de tag HTML
// paragrafo recebe o elemento <p>, paragrafo.classList.add() adiciona uma classe a ele
// paragrafo.textContent insere o conteúdo textual do parágrafo no HTML, no caso será a propriedade descricao do objeto tarefa
// botaoEditar recebe o elemento <button>, botaoEditar.classList.add() adiciona uma classe a ele
// botaoEditar.onclick atribui uma função ao evento onclick do botão, que permite editar a descrição da tarefa
// a constante novaDescricao recebe o conteúdo de prompt() que exibe uma janela de prompt para o usuário digitar o novo valor
// a string "Editar tarefa!" é o texto que será exibido no prompt
// no bloco if, se o usuário digitar algo e confirmar, paragrafo.textContent e tarefa.descricao recebem o novo valor
// a tarefa é atualizada com o novo valor a menos que o usuário cancele a operação ou digite uma descrição vazia
// atualizarTarefas() é chamada para atualizar o localStorage
// imagemBotao recebe o elemento <img>, imagemBotao.setAttribute() define o atributo src da imagem como '/imagens/edit.png'
// botaoEditar.append() adiciona o elemento <img> ao elemento <button>
// li.append() adiciona o elemento <svg>, <p> e <button> ao elemento <li>
// o elemento <li> é retornado para ser adicionado ao DOM dentro do elemento <ul> armazenado em ulTarefas
*/
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

/*
// para cada tarefa no array tarefas, criarElementoTarefa é chamada e armazenada na constante elementoTarefa
// ulTarefas.append() adiciona o elemento criado ao DOM dentro do elemento <ul>
*/
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

/*
// botaoAdicionarTarefa.addEventListener() adiciona um evento ao botão, no caso o evento click
// quando o botão é clicado, formulario.classList.toggle('hidden') adiciona ou remove a classe 'hidden' do elemento <form>
*/
botaoAdicionarTarefa.addEventListener('click', () => {
    formulario.classList.toggle('hidden');
});

/*
// formulario.addEventListener() adiciona um evento ao formulário, no caso o evento submit e armazena em a resposta do evento em "e"
// e.preventDefault() impede que o formulário seja enviado de forma padrão, como por exemplo, recarregando a página
// a constante tarefa recebe um objeto com a propriedade descricao e o valor do textArea
// textArea.value é o valor do campo de texto do formulário
// tarefas.push() adiciona o objeto tarefa ao array tarefas
// a constante elementoTarefa recebe o retorno da função criarElementoTarefa com o objeto tarefa como argumento
// ulTarefas.append() adiciona o elemento criado ao DOM dentro do elemento <ul>
// atualizarTarefas() é chamada para atualizar o localStorage, caso contrário o elemento será criado mas não salvo no localStorage
// textArea.value é limpo e formulario.classList.toggle('hidden') adiciona ou remove a classe 'hidden' do elemento <form>
*/
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

/*
// botaoCancelar.addEventListener() adiciona um evento ao botão, no caso o evento click
// no if, se textArea.value não está vazio, textArea.value é limpo
// formulario.classList.toggle('hidden') adiciona ou remove a classe 'hidden' do elemento <form>
*/
botaoCancelar.addEventListener('click', () => {
    if (textArea.value) {
        textArea.value = '';
    }
    formulario.classList.toggle('hidden');
})

/*
// função seletor recebe uma string como argumento e retorna o elemento do DOM que corresponde ao argumento passado
// document.querySelector() obtém o elemento do DOM que corresponde a string passada como argumento
*/
function seletor (texto) {
    return document.querySelector(texto);
}