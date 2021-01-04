let port=process.env.PORT;
port=8000;
const io = require('socket.io')(port);
console.log(port)
const users = {};

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

