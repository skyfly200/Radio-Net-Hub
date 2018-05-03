const express = require('express');
const app = express();
const port = 8080;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

var url = "mongodb://localhost:27017/radio-net-hub";
var db_title = 'radio-net-hub';

app.listen(port, function() {
  console.log('listening on', port)
})

app.get('/', (req, res) => {
  MongoClient.connect(url, function(err, conn) {
    if (err) throw err;
    var db = conn.db(db_title)
    // get station from DB
    db.collection('stations').find().toArray(function(err, results) {
      // return list of stations in db
      res.send(results);
    })
    conn.close();
  });
})

// db.stations.insertOne({ name: "", call_sign: "", website: "", freq: 90.5, location: { locality: "", region: "", country: ""} });
// db.stations.insertOne({ name: "Way High Radio", call_sign: "KWHR", website: "wayhighradio.com", freq: 90.5, location: { locality: "Ward", region: "CO", country: "USA"} });