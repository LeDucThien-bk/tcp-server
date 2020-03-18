var net = require('net');
var redis = require('redis');
var redisClient = redis.createClient();
var server = net.createServer(function (socket) {	
	socket.write('{"Ans":"ok"}');
	socket.on('data', function (data) {
		var bread = socket.bytesRead;
		console.log('Bytes read : ' + bread);
		console.log('Data sent to server : ' + data);
	});
});
server.listen(23456, '10.1.10.93');