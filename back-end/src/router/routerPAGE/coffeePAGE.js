const express = require("express");

const router = express.Router();

const coffeeController = require("../../app/controllers/CoffeeController");

router.post(
  "/coffee/trash/handle-form-restore",
  coffeeController.handleFormAtcCoffee
);
router.get("/coffee/:id/edit", coffeeController.editCoffee);
router.put("/coffee/:id", coffeeController.updateCoffee);
router.delete("/coffee/:id", coffeeController.deleteCoffee);
router.delete("/coffee/:id/force", coffeeController.deleteForceCoffee);
router.get("/coffee/trash", coffeeController.trashCoffee);
router.patch("/coffee/:id/restore", coffeeController.restoreCoffee);
router.post("/coffee/store", coffeeController.storeCoffee);
router.get("/coffee/create", coffeeController.createCoffee);
router.post(
  "/coffee/handle-form-actions",
  coffeeController.handleFormActionCoffee
);
router.get("/coffee", coffeeController.mainCoffee);

module.exports = router;
