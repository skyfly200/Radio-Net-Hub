const stationRoutes = require('./station_routes');
const userRoutes = require('./user_routes');
const streamRoutes = require('./stream_routes');
module.exports = function(app, db) {
  stationRoutes(app, db);
  userRoutes(app, db);
  streamRoutes(app, db);
  // Other route groups go here
};