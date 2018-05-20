$(function () {
  var socket = io();
  socket.on('connect', function(data) {
    socket.emit('join', 'Hello server from client');
  });
  $('form').submit(function(){
    var msg = $('#m').val();
    socket.emit('chat message', msg);
    $('#messages').prepend($('<li>').text(msg));
    this.reset();
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').prepend($('<li>').text(msg));
  });
});