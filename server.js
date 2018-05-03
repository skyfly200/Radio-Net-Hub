const express = require('express');
const app = express();
const port = 8080;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

var url = "mongodb://localhost:27017";
var db_title = 'radio-net-hub';

require('./app/routes')(app, {});
app.listen(port, function() {
  console.log('listening on ' + port)
})
