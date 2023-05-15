const express = require("express");

const router = express.Router();

const coffeeController = require("../../app/controllers/CoffeeController");

router.get("/", coffeeController.listCoffee);
router.get("/main", coffeeController.listCoffeeMain);

module.exports = router;
