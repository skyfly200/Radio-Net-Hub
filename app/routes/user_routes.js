var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          } 
        });
    });
    app.post('/users', (req, res) => {
        var dt = new Date();
        const user = { added_timestamp: dt.toUTCString(), username: req.body.username, role: "admin" };
        db.collection('users').insert(user, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').deleteOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('user ' + id + ' deleted! ' + item);
          } 
        });
     });
    app.put('/user/:id', (req, res) => {
        var dt = new Date();
        const details = { '_id': new ObjectID(req.params.id) };
        const user = { $set: { update_timestamp: dt.toUTCString(), username: req.body.username, role: "admin" } };
        db.collection('users').update(details, user, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(user);
            } 
        });
    });
};
