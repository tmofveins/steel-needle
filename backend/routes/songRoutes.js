const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

router.route("/")
    .get(songsController.getAllSongs)

router.route("/:id")
    .patch(songsController.updateSong)

router.route("/search")
    .get(songsController.searchSong)

router.route("/random")
    .get(songsController.getRandomSong)

router.route("/random/17up")
    .get(songsController.getRandomSong17AndAbove)

module.exports = router;