function listaDeTarefas() {
  const inputTarefa = document.querySelector('.input-tarefa');
  const btnTarefa = document.querySelector('.btn-tarefa');
  const tarefas = document.querySelector('.tarefas');

  //Cria uma lista
  function criaLi() {
    const li = document.createElement('li');
    return li;
  }
  //Faz com que possa ser criado apertando o ENTER
  inputTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      if (!inputTarefa.value) return;
      criaTarefa(inputTarefa.value);
    }
  });

  //Limpa o input para ser escrito novamente
  function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
  }
  //Cria o botão de apagar no li criado
  function criaBotaoApagar(li) {
    li.innerText += ' ';
    const button = document.createElement('button');
    button.innerText = 'Apagar';
    button.setAttribute('class', 'apagar buttonjs');
    li.appendChild(button);
  }

  //Cria uma tarefa que é adicionada na ul -> tarefas
  function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
  }

  //Captura o click do botão e pega o valor escrito no input
  btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  });

  //Adicona a função de remover a lista no button criado no li
  document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
      el.parentElement.remove();
      salvarTarefas();
    }
  });

  //Salva as tarefas e atualiza elas no JSON (Atualiza o estado de cada uma)
  function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
      listaDeTarefas.push(tarefaTexto);
    }
    //Converte um array em string por meio de JSON
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
  }
  //Pega a string salva no localStorage, converte para array e "cria" novamente as listas com os dados previamente salvos
  function adicionaTarefasSalvas() {
    //Converte uma string em array por meio do JSON
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas) {
      criaTarefa(tarefa);
    }
  }
  adicionaTarefasSalvas();
}
listaDeTarefas();
