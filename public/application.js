var socket = io();

var $messages = $('.messages');
var $sendMessage = $('.send-message');
var $newMessage = $('.new-message');
var $username = $('.username');

$sendMessage.on('click', function() {
  socket.send('message', {user: $username.val(), text: $newMessage.val()});
  $username.hide();
  $newMessage.val("");
});

socket.on('message', function(message) {
  $('<p class="message">' + message.user + ': ' + message.text + '</p>').appendTo($messages);
});
