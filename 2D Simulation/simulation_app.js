var express = require('express'),
	app = express(),
	server = require('http').createServer(app);
	io = require('socket.io')(server);
	path = require('path');

var player_exists = false;
var starting_game_data;

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/MVP Simulation.html');
});

io.on('connection', function(socket) {

	socket.on('username', function(username) {
		socket.username = username;
		console.log(username + ' has connected to the server!');
	});

	socket.on('receive_position', function(data) {
		socket.broadcast.emit('update_position', data);
	});

	socket.on('receive_flip_block', function(data) {
		socket.broadcast.emit('update_flip_block', data);
	});

	socket.on('receive_movement_data', function(data) {
		socket.broadcast.emit('update_movement_data', data);
	});

	socket.on('receive_gesture_data', function(data) {
		socket.broadcast.emit('update_gesture_data', data);
	});

	socket.on('setInitialPosition', function(data) {
		if (player_exists == false) {
			player_exists = true;
			starting_game_data = data;
		} else {
			socket.emit('setInitialPosition', starting_game_data);
		}
	});
});

server.listen(8080);