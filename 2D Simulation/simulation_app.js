var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	path = require('path');

var starting_game_data = new Map();

var recentRoom = -1;
var nextRoom = 0;
var unoccupiedRooms = [];
var numPlayersInRoom = [];
var numClients = true
var room_to_join;

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/MVP Simulation.html');
});

io.on('connection', function(socket) {

	if (recentRoom >= 0) {
		room_to_join = "Room" + recentRoom;
		socket.join(room_to_join);
		//numPlayersInRoom[recentRoom] = 2;
		recentRoom = -1;
	} else {
		if (unoccupiedRooms.length != 0) {
			room_to_join = "Room" + unoccupiedRooms[0];
			socket.join(room_to_join);
			//numPlayersInRoom[unoccupiedRooms[0]] = 1;
			recentRoom = unoccupiedRooms[0];
			unoccupiedRooms.splice(0, 1);
		} else {
			room_to_join = "Room" + nextRoom;
			socket.join(room_to_join);
			//numPlayersInRoom[nextRoom] = 1;
			recentRoom = nextRoom;
			nextRoom++;
		}
	}


	socket.on('username', function(username) {
		socket.username = username;
		console.log(username + ' has connected to the server!');
	});

	socket.on('receive_position', function(data) {
		socket.to(data.room).emit('update_position', data);
	});

	socket.on('receive_flip_block', function(data) {
		socket.to(data.room).emit('update_flip_block', data);
	});

	socket.on('receive_movement_data', function(data) {
		socket.to(data.room).emit('update_movement_data', data);
	});

	socket.on('receive_gesture_data', function(data) {
		socket.to(data.room).emit('update_gesture_data', data);
	});

	socket.on('receive_user_message', function(data) {
		io.to(data.room).emit('update_user_message', data.message);
	});

	socket.on('end_game_for_all_users', function(data) {
		socket.to(data.room).emit('end_game_for_user', data.time);
		unoccupiedRooms.push(data.room.substring(4));
	});

	socket.on('setInitialPosition', function(data) {
		console.log("Room to join: " + room_to_join);
		if (numClients) {
			starting_game_data.set(room_to_join, data);
			socket.emit('here_is_your_room', room_to_join);
			numClients = false;
		} else {
			console.log("Sharing data");
			socket.emit('setInitialPosition', starting_game_data.get(room_to_join));
			socket.emit('here_is_your_room', room_to_join);
			numClients = true;
		}
	});
});

server.listen(8080);