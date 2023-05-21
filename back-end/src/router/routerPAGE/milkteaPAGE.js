const express = require("express");

const router = express.Router();

const milkteaController = require("../../app/controllers/MilkTeaController");

router.post(
  "/milktea/trash/handle-form-restore",
  milkteaController.handleFormAtcMilkTea
);
router.get("/milktea/:id/edit", milkteaController.editMilkTea);
router.put("/milktea/:id", milkteaController.updateMilkTea);
router.delete("/milktea/:id", milkteaController.deleteMilkTea);
router.delete("/milktea/:id/force", milkteaController.deleteForceMilkTea);
router.get("/milktea/trash", milkteaController.trashMilkTea);
router.patch("/milktea/:id/restore", milkteaController.restoreMilkTea);
router.post("/milktea/store", milkteaController.storeMilkTea);
router.get("/milktea/create", milkteaController.createMilkTea);
router.post(
  "/milktea/handle-form-actions",
  milkteaController.handleFormActionMilkTea
);
router.get("/milktea", milkteaController.mainMilkTea);

module.exports = router;
