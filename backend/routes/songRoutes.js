const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

router.route("/")
    .get(songsController.getAllSongs)
    .post(songsController.createNewSong);

router.route("/search")
    .get(songsController.searchSong);

router.route("/random")
    .get(songsController.getRandomSong);

router.route("/random/17up")
    .get(songsController.getRandomSong17AndAbove);

router.route("/:id")
    .patch(songsController.updateSongAsUsed)
    .delete(songsController.deleteSong);

module.exports = router;