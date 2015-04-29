const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', function(socket) {
  console.log('Someone connected!!!');
  socket.emit('message', { user: 'turingbot', text: 'Welcome!' });
  socket.broadcast.emit('message', { user: 'turingbot', text: 'Someone new has connected.' });

  socket.on('message', function(channel, message) {
    console.log(channel + ': ' + message.text);
    io.sockets.emit('message', { user: message.user, text: message.text });
  });
});


http.listen(3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
