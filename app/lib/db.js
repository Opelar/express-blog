const mongoose = require("mongoose");
const config = require("../../config/default")

mongoose.connect(config.url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once("open", function() {
  console.log("Connect to the database successfully.");
});

db.on("error", function(error) {
  console.log("Error in MongoDb connection: " + error);
  mongoose.disconnect();
});

db.on("close", function() {
  console.log("The database is disconnected and the database is reconnected.");
  mongoose.connect(config.url, { server: { auto_reconnect: true } });
});

module.exports = db;
