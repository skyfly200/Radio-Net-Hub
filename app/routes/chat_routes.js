var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.post('/chats', (req, res) => {
    var dt = new Date();
    const chat = { added_timestamp: dt.toUTCString(), name: req.body.name, type: "public" };
    db.collection('chats').insert(chat, (err, result) => {
        if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
        } else {
            res.send(result.ops[0]);
        }
    });
  });
};
