const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songsController");

router.route("/")
    .get()
    .post()
    .patch()
    .delete()

module.exports = router;