var http = require('http');
var express = require('express');
var app = express(); //initialize express application

var server = http.createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 8080;
server.listen(port);

//pass app and express to middleware
require('./config/middleware.js')(app, express);

//pass io to socket module
require('./config/socketconnection.js')(io);
