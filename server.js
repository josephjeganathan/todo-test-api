'use strict';

const Hapi = require('hapi');
const todos = require('./todos');

const server = new Hapi.Server();

server.connection({
  port: 8000,
  host: 'localhost',
  routes: {
    cors: true
  },
  labels: ['api']
});

server.connection({
  port: 8001,
  host: 'localhost',
  labels: ['messaging']
});
let api = server.select('api');
let messaging = server.select('messaging');

var socket = require('socket.io')(messaging.listener);

api.route({
  method: 'GET',
  path: '/todos',
  handler: function (request, reply) {
    reply(todos.getTodos());
  }
});

api.route({
  method: 'POST',
  path: '/todos',
  handler: function (request, reply) {
    let addedTodo = todos.addTodo(request.payload.text);

    socket.emit('TodoAdded',addedTodo);
    reply(addedTodo);
  }
});

api.route({
  method: 'POST',
  path: '/todos/toggle',
  handler: function (request, reply) {
    let toggledTodo = todos.toggleTodo(request.payload.id);

    socket.emit('TodoToggled', toggledTodo);
    reply(toggledTodo);
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info);
});
