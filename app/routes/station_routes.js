module.exports = function(app, db) {
    app.get('/stations', (req, res) => {
        // MongoClient.connect(url, function(err, conn) {
        //   if (err) throw err;
        //   var db = conn.db(db_title)
        //   // get station from DB
        //   db.collection('stations').find().toArray(function(err, results) {
        //     // return list of stations in db
        //     res.send(results);
        //   })
        //   conn.close();
        // });
        res.send("hello");
    });
    app.post('/stations', (req, res) => {
        // You'll create your note here.
        res.send('Hello')
    });
};


  // db.stations.insertOne({ name: "", call_sign: "", website: "", freq: 90.5, location: { locality: "", region: "", country: ""} });
  // db.stations.insertOne({ name: "Way High Radio", call_sign: "KWHR", website: "wayhighradio.com", freq: 90.5, location: { locality: "Ward", region: "CO", country: "USA"} });