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
		for (var i=0;i<clientKeys.length;++i){
			var client = io.sockets.connected[clientKeys[i]];
			if (client && client.nickname == name){
				console.log("nickname existing");
				// emit nickname exist event
			}
		}
		socket.nickname = name;
		socket.broadcast.emit('announcement',name + ' join the chat');
	});
	
});