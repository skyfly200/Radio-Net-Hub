// express setup
const bodyParser = require('body-parser');
var express = require('express');
var app = express();
const port = 8080;

// socket.io setup
var http = require('http').Server(app);
var io = require('socket.io')(http);

// mongo setup
const MongoClient = require('mongodb').MongoClient;
const db_cfg = require('./config/db');
var ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/chat', function(req, res, next) {
  res.sendFile(__dirname + '/public/chat.html')
});

app.use(express.static('public'));

MongoClient.connect(db_cfg.url, (err, database) => {
  if (err) return console.log(err)

  var db = database.db(db_cfg.title)

  require('./app/routes')(app, db); 

  io.on('connection', function(socket){
    socket.on('join', function(data) {
      console.log(data);
      userCounter(db, id, 1);
  	});
    var id = "5b0073b9ae8b8416e8fc5bcf";
    socket.on('chat message', function(msg){
      socket.broadcast.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
      userCounter(db, id, -1);
    });
  });

  http.listen(port, () => {
    console.log('We are live on ' + port);
  });          
})

function userCounter(db, id, val) {
  const details = { '_id': new ObjectID(id) };
  const chat = { $inc: { users: val } };
  db.collection('chats').update(details, chat, (err, result) => {
    if (err) {
        console.log({'error':'An error has occurred'});
    }
  });
};