var express = require('express'),
	app = express(),
	server = require('http').createServer(app);
	io = require('socket.io')(server);
	path = require('path');

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/MVP Simulation.html');
});

io.on('connection', function(socket) {
	socket.on('join', function(data) {
		console.log(data);
	})
});

server.listen(8080);