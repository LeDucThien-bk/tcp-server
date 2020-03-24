var net = require('net');
var redis = require('redis');
var redisClient = redis.createClient();
require('dotenv').config()
let db = require('./src/database');		// Initialize mongoose connection

//API server part
var express = require('express');
let bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json({limit: '50mb'}));


var tcpServer = net.createServer(function (socket) {
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

tcpServer.listen(1337, '127.0.0.1');

app.listen(process.env.API_PORT);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
let api = require('./route.js');
app.use('/api',api);