var io = require('socket.io').listen(4000);

io.socket.on('connection',function(socket){
	socket.on('my event',function(content){
		console.log(content);
	});


});
