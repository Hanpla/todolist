const todoForm = document.getElementById('todo-form');
const todoContainer = document.getElementById('todo-container');

// Load saved todos on page load
window.addEventListener('load', () => {
    const savedTodos = getSavedTodos();
    savedTodos.forEach((todo) => {
        todoContainer.insertAdjacentHTML('beforeend', createTodoItem(todo));
    });
});

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = todoForm.querySelector('input').value;
    todoForm.reset();
    todoContainer.insertAdjacentHTML('beforeend', createTodoItem(newTodo));
    saveNewTodo(newTodo);
});

function createTodoItem(todo) {
    return `
        <div class="todo-item">
            <span>${todo}</span>
            <span class="delete-button" onclick="deleteTodoItem(this)">X</span>
        </div>
    `;
}

function saveNewTodo(todo) {
    const savedTodos = getSavedTodos();
    savedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
}

function getSavedTodos() {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
}

function deleteTodoItem(element) {
    const todoItem = element.parentNode;
    const todoText = todoItem.querySelector('span').innerText;
    todoItem.remove();
    removeTodoFromLocalStorage(todoText);
}

function removeTodoFromLocalStorage(todo) {
    const savedTodos = getSavedTodos();
    const updatedTodos = savedTodos.filter((savedTodo) => savedTodo !== todo);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}