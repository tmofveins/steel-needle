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
                song_id TEXT PRIMARY KEY,
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

    // Create: Add a new song to the database
    createNewSong(song) {
        const insert = this.db.prepare(`
            INSERT INTO Song (
                song_id, song_title, title_romaji, title_ascii, artist, bpm, date, version, diff_level, diff_name, chart_type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const info = insert.run(
            song.song_id,
            song.song_title,
            song.title_romaji,
            song.title_ascii,
            song.artist,
            song.bpm,
            song.date,
            song.version,
            song.diff_level,
            song.diff_name,
            song.chart_type
        );
        return info.changes;
    }

    getAllSongs() {
        const query = this.db.prepare(`SELECT * FROM Song`);
        return query.all();
    }

    getRandomSong() {
        const query = this.db.prepare(`
            SELECT * FROM Song
            WHERE used = 0
            ORDER BY RANDOM()
            LIMIT 1
        `)
        const result = query.get();
        return result;
    }

    getRandomSong17AndAbove() {
        const query = this.db.prepare(`
            SELECT * FROM Song
            WHERE CAST(diff_level AS INT) > 16 AND used = 0
            ORDER BY RANDOM()
            LIMIT 1
        `)
        const result = query.get();
        return result;
    }

    updateSongAsUsed(id, date) {
        const songID = id;
        const dateUsed = date;
        const query = this.db.prepare(`
            UPDATE Song
            SET used = 1, date_used = ?
            WHERE song_id = ?
        `);
        const info = query.run(dateUsed, songID);
        return info;
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

    deleteSong(id) {
        const query = this.db.prepare(`DELETE FROM Song WHERE song_id = ?`);
        const info = query.run(id);
        return info.changes > 0;
    }

    close() {
        this.db.close();
    }
}

const dbPath = path.resolve(__dirname, "../song_data.sqlite");
const db = new sqliteDB(dbPath);

module.exports = db;