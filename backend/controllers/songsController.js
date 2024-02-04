const db = require("../db.js");

const getAllSongs = (req, res) => {
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
    const song = db.getRandomSong();
    if (!song.length) return res.status(400).json({ message: "Couldn't get random song" });
    console.log(song);
    res.json(song);
};

const getRandomSong17AndAbove = (req, res) => {
    const song = db.getRandomSong17AndAbove();
    if (!song.length) return res.status(400).json({ message: "Couldn't get random song" });
    console.log(song);
    res.json(song);
};

module.exports = {
    getAllSongs,
    createNewSong,
    updateSong,
    deleteSong,
    searchSong, 
    getRandomSong,
    getRandomSong17AndAbove,
}