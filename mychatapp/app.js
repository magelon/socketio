var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


var http = require('http').Server(app);

var io = require('socket.io')(http);

http.listen(4000,function(){
  console.log('chatapp listening on port 4000!');
});

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static('elsimulator'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
