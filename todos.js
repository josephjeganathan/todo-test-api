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

  let toggledTodo;

  todos = todos.map(todo => {
    if (todo.id !== id) {
      return todo;
    } else {
      toggledTodo = Object.assign({}, todo, {
        completed: !todo.completed
      });
      return toggledTodo;
    }
  });

  return toggledTodo;
};

const getTodos = () => todos;

module.exports = {
  addTodo,
  getTodos,
  toggleTodo
};
