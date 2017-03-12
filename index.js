'use strict';
const Hapi = require('hapi');
const sha1 = require('js-sha1');

// Create server with port and host
const server = new Hapi.Server();
server.connection({ 
    host: process.env.HOST || "0.0.0.0", 
    port: process.env.PORT || 8000 
});

// Add starter route
server.route({
    method: 'GET',
    path: '/index',
    handler: function (request, reply) {
        return reply.view('index.html', {james: 'foobar'});
    }
});

// SHA-1 hash test
server.route({
    method: 'GET',
    path: '/hash',
    handler: function (request, reply) {
      var params = request.query;
      var x = sha1(params['x'] + "smoggy-rabbit");
      return reply(x).code(200);
    }
});

// math add
server.route({
    method: 'GET',
    path: '/math/add',
    handler: function (request, reply) {
      var params = request.query;
      var x = parseFloat(params['x']);
      var y = parseFloat(params['y']);
      var answer = x + y;
      return reply(answer);
    }
});

// math subtract
server.route({
    method: 'GET',
    path: '/math/subtract',
    handler: function (request, reply) {
      var params = request.query;
      var x = parseFloat(params['x']);
      var y = parseFloat(params['y']);
      var answer = x - y;
      return reply(answer);
    }
});

// math multiply
server.route({
    method: 'GET',
    path: '/math/multiply',
    handler: function (request, reply) {
      var params = request.query;
      var x = parseFloat(params['x']);
      var y = parseFloat(params['y']);
      var answer = x * y;
      return reply(answer);
    }
});

// math divide
server.route({
    method: 'GET',
    path: '/math/divide',
    handler: function (request, reply) {
      var params = request.query;
      var x = parseFloat(params['x']);
      var y = parseFloat(params['y']);
      var answer = x / y;
      return reply(answer);
    }
});

// rsvp
server.route(
    {
    method: ['GET','POST'],
    path: '/rsvp',
    handler: function (request, reply) {
      var params = request.payload;
      return reply(params);
    }
});

// this handles the first request
server.route({
  method: 'GET',
  path: '/movies/{id}',
  handler: function(request, reply) {
    let s = encodeURIComponent(request.params.id);
    let select = 'SELECT * FROM movies WHERE id=' + s;
    request.pg.client.query(select, function(err, result) {
      console.log(err);
    return reply(result.rows[0]).code(200);
    });
  }
});

// for hapi-postgres-connection
server.register({ // register all your plugins
  register: require('hapi-postgres-connection') // no options required
}, function (err) {
  if (err) {
    // handle plugin startup error
  }
});

server.register(require("vision"), (err) => {
    server.views({
        engines: {
            html:require('handlebars')
        },
        relativeTo:__dirname
    });
});

server.register(require('inert'), (err) => {
});

server.route({
    method: 'GET',
    path: '/stylesheet.css',
    handler: function (request, reply) {
        // reply.file() expects the file path as parameter
        reply.file('stylesheet.css')
    }
});

// Start the server
server.start((err) => { 
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});

