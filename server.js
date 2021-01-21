let port=process.env.PORT || 8000;
const socketio = require('socket.io');
const express=require('express');
const http=require('http');
const path=require('path');
const users = {};

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,"views")));

io.on('connection', socket => {
	socket.on('userJoin', name => {
		users[socket.id] = name;
		socket.broadcast.emit('joined', name);
	});

	socket.on('send', msg => {
		socket.broadcast.emit('recieved', { message: msg, name: users[socket.id] });
	});

	socket.on('disconnect', msg => {
		socket.broadcast.emit('left', users[socket.id]);
		delete users[socket.id];
	});
});

server.listen(port, () => console.log(`Server running on port ${port}`));