const socket = io();

let form = document.getElementById('myForm');
let sendBtn = document.getElementById('sendlogo');
let msg = document.getElementById('msgInput');
let container = document.getElementsByClassName('container')[0];
let tone = new Audio('/includes/tone.mp3');


const append = (msg, pos) => {
	const msgele = document.createElement('div');
	msgele.innerHTML = msg;
	msgele.classList.add('message');
	msgele.classList.add(pos);
	container.append(msgele);
	if (pos == 'left') {
		tone.play();
	}
	container.scrollTop = container.scrollHeight - container.clientHeight;
};

const name = prompt("Enter Your name");
socket.emit('userJoin', name);
socket.on('joined', name => {
	append(`${name} joined the chat.`, 'right');
});


socket.on('recieved', data => {
	append(`${data.name} :<br>${data.message}`, 'left');
});


socket.on('left', name => {
	append(`${name} is left the chat`, 'left');
});

form.addEventListener('submit',e => {
	e.preventDefault();
	const message = msg.value;
	if (message != "") {
		append(`You :<br>${message}`, 'right');
		socket.emit('send', message)
		msg.value = '';
		msg.focus();
	}
})

sendBtn.addEventListener('click', e => {
	e.preventDefault();
	const message = msg.value;
	if (message != "") {
		append(`You<br>${message}`, 'right');
		socket.emit('send', message)
		msg.value = '';
		msg.focus();
	}
});