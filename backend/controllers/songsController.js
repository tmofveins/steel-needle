const db = require("../db.js");

const getAllSongs = (req, res) => {
    /*
    const statement = db.prepare("SELECT * FROM Song");
    
    try {
        const songs = statement.all();
        if (!songs.length) return res.status(400).json({ message: "No songs found" });
        res.json(songs);
    } catch (err) {
        console.error(err.message);
    }
    */
   
    const songs = db.getAllSongs();
    if (!songs.length) return res.status(400).json({ message: "No songs found" });
    res.json(songs);
};

const createNewSong = (req, res) => {

};

const updateSong = (req, res) => {

};

const deleteSong = (req, res) => {

};

const searchSong = (req, res) => {
    const results = db.searchSongs(req.query.term);
    res.json(results);
};

const getRandomSong = (req, res) => {

};

module.exports = {
    getAllSongs,
    createNewSong,
    updateSong,
    deleteSong,
    searchSong, 
    getRandomSong,
}