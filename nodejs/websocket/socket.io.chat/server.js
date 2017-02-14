var express = require('express'), 
	sio = require('socket.io');
	
var app = express.createServer();
app.use(express.bodyParser());
app.use(express.static('public'));

app.listen(8000);

var io = sio.listen(app);

io.sockets.on("connection",function(socket){
	var clientKeys = Object.keys(io.sockets.connected)
	console.log("someone connected,current client:"+ clientKeys.length);
	console.log(clientKeys);
	socket.on('join',function(name){
		var nicknames = new Array();
		nicknames.push(name);
		for (var i=0;i<clientKeys.length;++i){
			var client = io.sockets.connected[clientKeys[i]];
			
			if (client){
				if (client.nickname){
					nicknames.push(client.nickname);
				}
				if (client.nickname == name){
					console.log("nickname existing");
				
					// emit nickname exist event
				}
			}
		}
		socket.nickname = name;
		console.log(nicknames.join());
		socket.broadcast.emit('announcement',name,nicknames.join());
		socket.emit('userchange',nicknames.join());
	});
	
	// disconnect
	socket.on('disconnect',function(){
		
		if (socket.nickname){
			var remains = getUserNicknames();
			
			socket.broadcast.emit('userquit',socket.nickname,remains.join());
		}
		console.log("someone disconnected: " + socket.nickname);
	});
	
	// text
	socket.on('text',function(msg){
		socket.broadcast.emit('text',socket.nickname,msg);
	});
});

// get nicknames for the current connected user
function getUserNicknames(){
	var clientKeys = Object.keys(io.sockets.connected);
	var nicknames = new Array();
	for (var i=0;i<clientKeys.length;++i){
		var client = io.sockets.connected[clientKeys[i]];
		if (client && client.nickname){				
			nicknames.push(client.nickname);
		}
	}
	return nicknames;
};