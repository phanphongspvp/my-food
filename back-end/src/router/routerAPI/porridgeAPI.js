const express = require("express");

const router = express.Router();

const porridgeController = require("../../app/controllers/PorridgeController");

router.get("/", porridgeController.listPorridge);
router.get("/main", porridgeController.listPorridgeMain);

module.exports = router;
