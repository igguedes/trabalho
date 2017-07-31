app.factory('Utils', function(){

	var socket = io();

	return{
		socket: socket
	}
});