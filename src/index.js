const todos = getTodos();

const buttonAddTodo = document.getElementById('button-add-todo');
const inputTodoName = document.getElementById('todo-name');
const inputTodoDate = document.getElementById('todo-date');
const ul = document.querySelector('ul');

buttonAddTodo.addEventListener('click', addTodo);

// ul.addEventListener('click', (event) => {
//     console.log('click' + event.target);
// });

// ul.addEventListener('change', (event) => {
//     console.log('change' + event.target);
// });

refresh();

function addTodo() {
    let date = new Date().getTime();
    let before = new Date(inputTodoDate.value).getTime();
    
    if (!inputTodoName.value || !inputTodoDate.value || before < date) {
        return
    }
    
    todos.push({
        'todo': inputTodoName.value,
        'date': date,
        'before': before
    });
    refresh();
}

function getTodos() {
    return [];
}

function refresh() {
    if (todos.length > 0) {
        ul.innerHTML = '';
        for (let i = 0; i < todos.length; i++) {
            ul.append(createTodoItem(todos[i]['todo'], todos[i]['date'], todos[i]['before']));
        }
    }
}

function createTodoItem(text, date, before) {
    let li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action d-flex justify-content-start align-items-center';
    li.innerHTML = `<div class="ms-2 me-auto">
        <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
            ${text}
    </div>
    <div class="m-2 ms-2">
        <div class="ms-2"><small>Добавлено: ${date}</small></div>
            <div class="ms-2"><small>Сделать до: ${before}</small></div>
                <div class="ms-2"><span class="badge bg-primary rounded-pill">Осталось: ${datediff(date, before)} дней</span></div>
            </div>
            <div class="m-2 ms-2">
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>`;

    function datediff(first, second) {
        return Math.floor((second - first) / (1000 * 60 * 60 * 24))
    }

    return li;
}