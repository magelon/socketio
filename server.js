
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

io.sockets.on('connection',function(socket){
	socket.on('clientMessage',function(content){
		socket.emit('serverMessage','You said:'+content);
		socket.broadcast.emit('serverMessage',socket.username+' said:'+content);
		});


		socket.on('login',function(username){
			socket.username=username;
			if(!socket.username){
				socket.username=socket.id;
			}
			socket.emit('serverMessage','Currently looged in as:'+username);
			socket.broadcast.emit('serverMessage','User '+username+' logged in');
		});

		//let client login event emitter
		socket.emit('login');

		//servermessage when socket user disconnected
		socket.on('disconnect', function() {
 		if (! socket.username) {
 		socket.username = socket.id;
 		}
 		socket.broadcast.emit('serverMessage', 'User ' + socket.username + ' disconnected');
 		});





});
