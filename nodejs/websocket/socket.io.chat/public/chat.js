window.onload = function(){
	var socket = io.connect();

	socket.on('connect',function(){
		socket.emit('join',prompt('What is your nickname?'));
		document.getElementById('chat').style.display= 'block';
		
		socket.on('announcement',function(msg){
			var li = document.createElement('li');
			li.className = 'announcement';
			li.innerHTML = msg;
			document.getElementById('messages').appendChild(li);
		});
	});
}