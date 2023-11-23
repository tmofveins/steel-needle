const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

router.route("/")
    .get(songsController.getAllSongs)
    .post()
    .patch()
    .delete()

module.exports = router;