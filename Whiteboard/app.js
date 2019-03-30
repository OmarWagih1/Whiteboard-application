const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;
app.use(express.static(__dirname + '/application'));
var history = [];
function onConnection(socket){
  for (var i in history) {
    socket.emit('drawing', history[i]);
 }
  socket.on('drawing', function(data){
    history.push(data);
    socket.broadcast.emit('drawing', data)
  });
}
io.on('connection', onConnection);
http.listen(port, () => console.log('listening on port ' + port));