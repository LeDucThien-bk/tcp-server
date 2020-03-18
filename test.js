

var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	// client.write('{“Default”:“NHV”,“Time”:”06:15:59;15/02/20”,“Mode”:”Tudong”,“Phase”:”8”,“Script”:”A0”,“Cycle”:”8/123”,“Fa”:”0/26/18;25/30/18;0/23/18;0/20/18;0/26/26;25/30/26;0/23/26;0/20/26”,“DA”:” 0/26/26;25/30/26;0/23/26;0/20/26;0/26/26;25/30/26;0/23/26;0/20/26”}');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('connect',function(){
	// writing data to server
	client.write('hello from client');  
  });

client.on('close', function() {
	console.log('Connection closed');
});