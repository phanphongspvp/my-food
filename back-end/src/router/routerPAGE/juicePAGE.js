const express = require("express");

const router = express.Router();

const juiceController = require("../../app/controllers/JuiceController");

router.post(
  "/juice/trash/handle-form-restore",
  juiceController.handleFormAtcJuice
);
router.get("/juice/:id/edit", juiceController.editJuice);
router.put("/juice/:id", juiceController.updateJuice);
router.delete("/juice/:id", juiceController.deleteJuice);
router.delete("/juice/:id/force", juiceController.deleteForceJuice);
router.get("/juice/trash", juiceController.trashJuice);
router.patch("/juice/:id/restore", juiceController.restoreJuice);
router.post("/juice/store", juiceController.storeJuice);
router.get("/juice/create", juiceController.createJuice);
router.post(
  "/juice/handle-form-actions",
  juiceController.handleFormActionJuice
);
router.get("/juice", juiceController.mainJuice);

module.exports = router;
