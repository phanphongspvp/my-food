const express = require("express");

const router = express.Router();

const milkteaController = require("../../app/controllers/MilkTeaController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.post(
  "/milktea/trash/handle-form-restore",
  milkteaController.handleFormAtcMilkTea
);
router.get("/milktea/:id/edit", verifyUser, milkteaController.editMilkTea);
router.put("/milktea/:id", verifyUser, milkteaController.updateMilkTea);
router.delete("/milktea/:id", verifyUser, milkteaController.deleteMilkTea);
router.delete(
  "/milktea/:id/force",
  verifyUser,
  milkteaController.deleteForceMilkTea
);
router.get("/milktea/trash", verifyUser, milkteaController.trashMilkTea);
router.patch(
  "/milktea/:id/restore",
  verifyUser,
  milkteaController.restoreMilkTea
);
router.post("/milktea/store", verifyUser, milkteaController.storeMilkTea);
router.get("/milktea/create", verifyUser, milkteaController.createMilkTea);
router.post(
  "/milktea/handle-form-actions",
  verifyUser,
  milkteaController.handleFormActionMilkTea
);
router.get("/milktea", verifyUser, milkteaController.mainMilkTea);

module.exports = router;
