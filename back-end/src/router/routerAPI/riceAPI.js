const express = require("express");

const router = express.Router();

const riceController = require("../../app/controllers/RiceController");

router.get("/main", riceController.listRiceMain);
router.get("/", riceController.listRice);

module.exports = router;
