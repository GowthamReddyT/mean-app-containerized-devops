const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// IMPORTANT: read from docker environment variable
db.url = process.env.MONGO_URI || "mongodb://localhost:27017/tasks";

db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;
