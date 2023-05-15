const express = require("express");

const router = express.Router();

const soupController = require("../../app/controllers/SoupController");

router.get("/", soupController.listSoup);
router.get("/main", soupController.listSoupMain);

module.exports = router;
