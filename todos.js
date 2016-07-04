'use strict';

let todos = [];
let nextTodoId = 1;

const addTodo = text => {
  let todo = {
    id: nextTodoId++,
    text,
    completed: false
  };
  todos.push(todo);

  return todo;
};

const toggleTodo = id => {
  todos = todos.map(todo => {
    if (todo.id !== id) {
      return todo;
    } else {
      return Object.assign({}, todo, {
        completed: !todo.completed
      });
    }
  });
};

const getTodos = () => todos;

module.exports = {
  addTodo,
  getTodos,
  toggleTodo
};


