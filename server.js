const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db_cfg = require('./config/db');

// express setup
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db_cfg.url, (err, database) => {
  if (err) return console.log(err)
  var db = database.db(db_cfg.title)
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})