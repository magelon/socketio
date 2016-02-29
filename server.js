
var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
var fs = require('fs');




httpd.listen(4000);

function handler(req,res){
	fs.readFile(__dirname + '/index.html',
		function(err,data){
			if(err){
				res.writeHead(500);
				return res.end('Error loading index.html');
			}
				res.writeHead(200);
				res.end(data);
	}
);


}

io.of('/chat').on('connection',function(socket){

	socket.on('clientMessage',function(content){
		socket.emit('serverMessage','You said:'+content);

		if(!socket.username){
			socket.username=socket.id;
		}

		var broadcast =socket.broadcast;
		var room = socket.room;
		var message = content;
		var username = socket.username;

		if(room){
			broadcast.to(room);
			broadcast.emit('serverMessage',username+' said:'+message);
		}

if(!room){
		socket.room = 'hall';
		socket.join(socket.room);
		socket.broadcast.to(socket.room);
		socket.broadcast.emit('serverMessage',socket.username+' said:'+content);
				}
		});


		socket.on('login',function(username){
			socket.username=username;
			if(!socket.username){
				socket.username=socket.id;
			}
			socket.emit('serverMessage','Currently looged in as:'+username);
			socket.broadcast.emit('serverMessage','User '+username+' logged in');
		});



		//servermessage when socket user disconnected
		socket.on('disconnect', function() {
 		if (! socket.username) {
 		socket.username = socket.id;
 		}
 		socket.broadcast.emit('serverMessage', 'User ' + socket.username + ' disconnected');
 		});

		socket.on('join',function(room){

			socket.leave(socket.room);
			socket.room=room;
			socket.join(socket.room);

			if(!socket.username){
				socket.suername = socket.id;
						}
						socket.emit('serverMessage','You joined room '+socket.room);
						socket.broadcast.to(socket.room).emit('serverMessage','User '+socket.username+' joined this room');

		});

		//let client login event emitter
		socket.emit('login');

});
