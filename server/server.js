var express = require('express');
var app = express(); //initialize express application
var io = require('socket.io')(app);


var port = process.env.PORT || 8080;
app.listen(port);

//pass app and express to middleware
require('./config/middleware.js')(app, express);

//pass io to socket module
requre('./config/socketconnection.js')(io);
