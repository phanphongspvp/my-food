const express = require("express");

const router = express.Router();

const noodleController = require("../../app/controllers/NoodleController");

router.get("/", noodleController.listNoodle);
router.get("/main", noodleController.listNoodleMain);

module.exports = router;
