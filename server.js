//http and websocket requirements
var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();

//tcp requirements
var net = require('net');
var pws = undefined;
var tcpconnect = undefined;
//create http server
app.use(express.static(__dirname + '/public'));
var server = http.createServer(app);
server.listen(8080);
console.log('HTTP Server ready on port 8080');


// list of currently connected clients (users)
var clients = [ ];

//create websocket handler
var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  
  //var id = setInterval(function() {
  //  ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ });
  //}, 100);
  var index = clients.push(ws) - 1;
  
  console.log('started client interval');
  ws.on('message', function(message) {
    console.log('received: %s', message);
    for (var i=0; i < clients.length; i++) {
        clients[i].send(message);
    }

  });

  ws.on('close', function() {
    console.log('stopping client interval');
    //clearInterval(id);
     // remove user from the list of connected clients
    clients.splice(index, 1);
  });
});


//create TCP server
// var server = net.createServer(function  (connect) {
//   tcpconnect = connect;
//   console.log('tcp Connection established');
//   //remove this line to get object buffers
//   connect.setEncoding('utf8');

//   connect.on('end', function() {
//     console.log('tcp Connection ended');
//   });

//   connect.on('data', function(data) {
//     console.log('tcp received data');
//     console.log(data);
//     if(pws) {
//       pws.send(JSON.stringify(data), function() { /* ignore errors */ });
//     }
//   });

//   connect.write("Welcome to W12 tcp connection\r\n");

//   //connect.pipe(connect).pipe(log);

// });

// //start tcp listen
// server.listen(7777, function() {
//   console.log('TCP Server ready on port 7777');
// });

