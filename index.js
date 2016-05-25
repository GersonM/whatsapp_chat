var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static('public'));

var users = [];

io.on('connection', function(socket)
{
	console.log('Nuevo usuario:' + socket.client.id);
	users[socket.client.id] = 
	socket.on('chat', function(_msg){
		io.emit('nuevo_mensaje', _msg);
	});
});


http.listen(8080, function () {
	console.log('Muy bien!, eres un crack, sabes trabajar con node JS');
});