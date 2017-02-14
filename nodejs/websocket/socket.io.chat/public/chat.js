window.onload = function(){
	var socket = io.connect();

	socket.on('connect',function(){
		var nickname = '';
		while(nickname.length == 0){
			nickname = prompt('What is your nickname?');
		}
		socket.emit('join',nickname);
		document.getElementById('mynickname').innerHTML = nickname;
		document.getElementById('chat').style.display= 'block';
		
		
		socket.on('announcement',function(newJoin,all){
			document.getElementById('users').innerHTML = 'current in the chat:' + all;
			
			var li = document.createElement('li');
			li.className = 'announcement';
			li.innerHTML = newJoin + ' join the chat';
			document.getElementById('messages').appendChild(li);
		});
		
		
	});
	
	function addMessage(from, text){
		var li = document.createElement('li');
		li.className = 'message';
		li.innerHTML = '<b>' + from + '</b>:'+ text;
		document.getElementById('messages').appendChild(li);
	};
	
	var msgInput = document.getElementById('input');
	document.getElementById('form').onsubmit = function(){
		addMessage('me', msgInput.value);
		socket.emit('text',input.value);
		
		input.value = '';
		input.focus();
		
		return false;
	};
	
	socket.on('text',addMessage);
	
	socket.on('userchange',function(all){
			document.getElementById('users').innerHTML = 'current in the chat:' + all;	
	});
	
	socket.on('userquit',function(nickname,remains){
		document.getElementById('users').innerHTML = 'current in the chat:' + remains;	
		
		var li = document.createElement('li');
		li.className = 'announcement';
		li.innerHTML = nickname + ' left the chat';
		document.getElementById('messages').appendChild(li);
	});
}