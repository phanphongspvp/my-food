const express = require("express");

const router = express.Router();

const juiceController = require("../../app/controllers/JuiceController");

router.get("/", juiceController.listJuice);
router.get("/main", juiceController.listJuiceMain);

module.exports = router;
