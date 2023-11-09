const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("../song_data.sqlite", sqlite.OPEN_READONLY, (err) => {
    if (err) return console.error(err);
});

module.exports = db;