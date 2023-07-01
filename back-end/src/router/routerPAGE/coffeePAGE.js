const express = require("express");

const router = express.Router();

const coffeeController = require("../../app/controllers/CoffeeController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.post(
  "/coffee/trash/handle-form-restore",
  coffeeController.handleFormAtcCoffee
);
router.get("/coffee/:id/edit", verifyUser, coffeeController.editCoffee);
router.put("/coffee/:id", verifyUser, coffeeController.updateCoffee);
router.delete("/coffee/:id", verifyUser, coffeeController.deleteCoffee);
router.delete(
  "/coffee/:id/force",
  verifyUser,
  coffeeController.deleteForceCoffee
);
router.get("/coffee/trash", verifyUser, coffeeController.trashCoffee);
router.patch("/coffee/:id/restore", verifyUser, coffeeController.restoreCoffee);
router.post("/coffee/store", verifyUser, coffeeController.storeCoffee);
router.get("/coffee/create", verifyUser, coffeeController.createCoffee);
router.post(
  "/coffee/handle-form-actions",
  verifyUser,
  coffeeController.handleFormActionCoffee
);
router.get("/coffee", verifyUser, coffeeController.mainCoffee);

module.exports = router;
