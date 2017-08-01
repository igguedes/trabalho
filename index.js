var routes = require('./routes.js');
var express = require('express');
var routes = require('./routes');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



io.on('connection', function(socket){

  socket.on('evento_seguir', function(data){
  	io.emit('evento_seguir', data);
  });

  socket.on('disconnect', function(){
  	console.log('usuario disconectado');
  	io.emit('disconected');
  });

});



app.get('/socket/socket.io.js', function(req, res) {
  res.sendFile(__dirname + '/node_modules/socket.io/lib/client.js');
});
app.use('/', express.static('front'));
app.use('/images', express.static('img'));
app.use('/back',routes);

app.all('/*', function(req, res, next) {
  res.sendFile('front/index.html', { root: __dirname });
});

http.listen(3000, function(){
	console.log("Servidor iniciado");
});