const db = require("../db.js");

const getAllSongs = (_, res) => {
    try {
        const songs = db.getAllSongs();
        if (!songs.length) {
            return res.status(404).json({ message: "No songs found" });
        }
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching songs", error: err.message });
    }
};

const createNewSong = (req, res) => {
    const songData = req.body;

    const requiredFields = [
        'song_id', 'song_title', 'title_romaji', 'title_ascii', 'artist',
        'bpm', 'date', 'version', 'diff_level', 'diff_name', 'chart_type'
    ];

    for (const field of requiredFields) {
        if (!songData[field]) {
            return res.status(400).json({ message: `Missing required field: ${field}` });
        }
    }

    try {
        const changed = db.createNewSong(songData);
        if (changed !== 1) {
            return res.status(400).json({ message: "Bad request" });
        }
        res.status(201).json({ message: 'Song added successfully', row_id: row_id });
    } catch (err) {
        res.status(500).json({ message: 'Error adding song', error: err.message });
    }
};

const updateSongAsUsed = (req, res) => {
    const { id } = req.params;
    const { date } = req.body;
    console.log(req.params);

    try {
        const info = db.updateSongAsUsed(id, date);
        if (info.changes === 0) {
            return res.status(404).json({ message: "Song not found" });
        }
        res.json({ message: "Song used in game - updated in database" });
    } catch (err) {
        res.status(500).json({ message: "Error updating song", error: err.message });
    }
};

const deleteSong = (req, res) => {
    const { id } = req.params;

    try {
        const deleted = db.deleteSong(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json({ message: 'Song deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting song', error: err.message });
    }
};

const searchSong = (req, res) => {
    const term = req.query.term;
    if (!term) {
        return res.status(400).json({ message: "Search term is required" });
    }

    try {
        const results = db.searchSongs(term);
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Error searching songs", error: err.message });
    }
};

const getRandomSong = (req, res) => {
    try {
        const song = db.getRandomSong();
        if (!song) {
            return res.status(404).json({ message: "Couldn't get random song" });
        }
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: "Error fetching random song", error: err.message });
    }
};

const getRandomSong17AndAbove = (req, res) => {
    try {
        const song = db.getRandomSong17AndAbove();
        if (!song) {
            return res.status(404).json({ message: "Couldn't get random song" });
        }
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: "Error fetching random song", error: err.message });
    }
};

module.exports = {
    getAllSongs,
    createNewSong,
    updateSongAsUsed,
    deleteSong,
    searchSong,
    getRandomSong,
    getRandomSong17AndAbove,
};
