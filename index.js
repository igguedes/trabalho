var routes = require('./routes.js');
var express = require('express');
var routes = require('./routes');
var app = express();


app.use(express.static('front'));


app.use(routes);


app.listen(3000, function(){
	console.log("servidor rodando porta 3000");
});