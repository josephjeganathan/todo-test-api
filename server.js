'use strict';

const Hapi = require('hapi');
const todos = require('./todos');

const server = new Hapi.Server();
server.connection({
  port: 8000,
  host: 'localhost',
  routes: {
    cors: true
  }
});

server.route({
  method: 'GET',
  path: '/todos',
  handler: function (request, reply) {
    reply(todos.getTodos());
  }
});

server.route({
  method: 'POST',
  path: '/todos',
  handler: function (request, reply) {
    reply(todos.addTodo(request.payload.text));
  }
});


server.route({
  method: 'POST',
  path: '/todos/toggle',
  handler: function (request, reply) {
    reply(todos.toggleTodo(request.payload.id));
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
