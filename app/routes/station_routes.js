module.exports = function(app, db) {
    app.get('/stations', (req, res) => {
        // get station from DB
        db.collection('stations').find().toArray(function(err, results) {
            // return list of stations in db
            res.send(results);
        })
    });
    app.post('/stations', (req, res) => {
        const station = { name: req.body.name, call_sign: req.body.call_sign };
        db.collection('stations').insert(station, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};
