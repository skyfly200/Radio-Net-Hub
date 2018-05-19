var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/stations', (req, res) => {
        // get station from DB
        db.collection('stations').find().toArray(function(err, results) {
            // return list of stations in db
            res.send(results);
        })
    });
    app.get('/station/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('stations').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          } 
        });
    });
    app.post('/stations', (req, res) => {
        var dt = new Date();
        const station = { added_timestamp: dt.toUTCString(), name: req.body.name, call_sign: req.body.call_sign, website: req.body.website };
        db.collection('stations').insert(station, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.delete('/station/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('stations').deleteOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Station ' + id + ' deleted! ' + item);
          } 
        });
     });
    app.put('/station/:id', (req, res) => {
        var dt = new Date();
        const details = { '_id': new ObjectID(req.params.id) };
        const station = { update_timestamp: dt.toUTCString(), name: req.body.name, call_sign: req.body.call_sign, website: req.body.website };
        db.collection('stations').update(details, station, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(station);
            } 
        });
    });
};
