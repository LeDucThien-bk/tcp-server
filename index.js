var net = require('net');
var redis = require('redis');
var redisClient = redis.createClient();
let db = require('./src/database');		// Initialize mongoose connection

var server = net.createServer(function (socket) {
	socket.write('{"Ans":"ok"}');
	socket.on('data', function (data) {
		var bread = socket.bytesRead;
		console.log('Bytes read : ' + bread);
		var str = String(data);		//force data to be string type
		var objStr = '{' + str.split('{')[1].split('}')[0] + '}'		//get the data string between { and }
		var objId = str.split('{')[0].replace(/\W/g, '')		//get the Id and strip the non-alphanumeric characters
		var obj = JSON.parse(objStr)
		redisClient.set(objId, objStr);
		console.log(objId);
		// console.log(obj);
		redisClient.get(objId, function (error, result) {
			if (error) {
				console.log(error);
				throw error;
			}
			console.log('GET result ->' + result);
		});
	});
});


server.listen(1337, '127.0.0.1');