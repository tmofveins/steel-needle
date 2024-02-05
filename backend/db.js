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
                chart_type TEXT NOT NULL,
                used INTEGER DEFAULT 0 NOT NULL,
                date_used TEXT
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

    getRandomSong() {
        const query = this.db.prepare(`
            SELECT * FROM Song
            WHERE used = 0
            ORDER BY RANDOM()
            LIMIT 1
        `)
        const result = query.all();
        return result;
    }

    getRandomSong17AndAbove() {
        const query = this.db.prepare(`
            SELECT * FROM Song
            WHERE CAST(diff_level AS INT) > 16 AND used = 0
            ORDER BY RANDOM()
            LIMIT 1
        `)
        const result = query.all();
        return result;
    }

    updateSong(id, date) {
        const songID = id;
        const dateUsed = date;
        const query = this.db.prepare(`
            UPDATE Song
            SET used = 1, date_used = ?
            WHERE song_id = ?
        `);
        const result = query.run(dateUsed, songID);
        return result;
    }
    
    searchSongs(term) {
        const searchTerm = `%${term}%`;
        const query = this.db.prepare(`
            SELECT * FROM Song
            WHERE song_title LIKE ?
            OR title_romaji LIKE ?
            OR title_ascii LIKE ?
        `);

        const results = query.all(searchTerm, searchTerm, searchTerm);
        return results;
    }

    close() {
        this.db.close();
    }
}

const dbPath = path.resolve(__dirname, "../song_data.sqlite");
const db = new sqliteDB(dbPath);

module.exports = db;