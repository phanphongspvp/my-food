const express = require("express");

const router = express.Router();

const milkTeaController = require("../../app/controllers/milkTeaController");

router.get("/", milkTeaController.listMilkTea);
router.get("/main", milkTeaController.listMilkTeaMain);

module.exports = router;
