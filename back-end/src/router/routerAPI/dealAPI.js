const express = require("express");

const router = express.Router();

const dealController = require("../../app/controllers/DealController");

router.get("/", dealController.listDeal);
router.get("/main", dealController.listDealMain);

module.exports = router;
