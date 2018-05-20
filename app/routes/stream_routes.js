var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/streams', (req, res) => {
        // get stream from DB
        db.collection('streams').find().toArray(function(err, results) {
            // return list of streams in db
            res.send(results);
        })
    });
    app.get('/stream/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('streams').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          } 
        });
    });
    app.post('/streams', (req, res) => {
        var dt = new Date();
        const stream = { 
          added_timestamp: dt.toUTCString(), 
          name: req.body.name,
          server: req.body.server,
          mount: req.body.mount,
          type: req.body.type,
          station: req.body.station,
          owner: req.body.owner
        };
        db.collection('streams').insert(stream, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.delete('/stream/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('streams').deleteOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('stream ' + id + ' deleted! ' + item);
          } 
        });
     });
    app.put('/stream/:id', (req, res) => {
        var dt = new Date();
        const details = { '_id': new ObjectID(req.params.id) };
        const stream = { $set: { 
          update_timestamp: dt.toUTCString(), 
          name: req.body.name,
          server: req.body.server,
          mount: req.body.mount,
          type: req.body.type,
          station: req.body.station,
          owner: req.body.owner
        } };
        db.collection('streams').update(details, stream, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(stream);
            } 
        });
    });
};
