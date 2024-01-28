const Database = require("better-sqlite3");
const path = require("path");
//const sqliteDB = new Database("../song_data.sqlite", { verbose: console.log });

class sqliteDB {
    constructor(dbFile) {
        this.db = new Database(dbFile, { verbose: console.log });
        this.init();
    }

    init() {
        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS Song(
                song_id INTEGER PRIMARY KEY,
                song_title TEXT NOT NULL,
                title_romaji TEXT NOT NULL,
                title_ascii TEXT NOT NULL,
                artist TEXT NOT NULL,
                bpm TEXT NOT NULL,
                date TEXT NOT NULL,
                version TEXT NOT NULL,
                diff_level TEXT NOT NULL,
                diff_name TEXT NOT NULL,
                chart_type TEXT NOT NULL
            )
        `).run();
    }

    getAllSongs() {
        try {
            const query = this.db.prepare(`SELECT * FROM Song`);
            return query.all();
        } catch (err) {
            console.error("Error fetching songs: ", err.message);
            return [];
        }
    }

    close() {
        this.db.close();
    }
}

const dbPath = path.resolve(__dirname, "../song_data.sqlite");
const db = new sqliteDB(dbPath);

module.exports = db;