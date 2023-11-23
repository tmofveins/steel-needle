const db = require("../db.js");

const getAllSongs = (req, res) => {
    const statement = db.prepare("SELECT * FROM Song");
    
    try {
        const songs = statement.all();
        if (!songs.length) return res.status(400).json({ message: "No songs found" });
        res.json(songs);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getAllSongs,
}