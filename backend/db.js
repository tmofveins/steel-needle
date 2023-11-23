const Database = require("better-sqlite3");
const db = new Database("../song_data.sqlite", { verbose: console.log });

module.exports = db;