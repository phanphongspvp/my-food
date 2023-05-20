const express = require("express");

const router = express.Router();

const porridgeController = require("../../app/controllers/PorridgeController");

router.post(
  "/porridge/trash/handle-form-restore",
  porridgeController.handleFormAtcPorridge
);
router.get("/porridge/:id/edit", porridgeController.editPorridge);
router.put("/porridge/:id", porridgeController.updatePorridge);
router.delete("/porridge/:id", porridgeController.deletePorridge);
router.delete("/porridge/:id/force", porridgeController.deleteForcePorridge);
router.get("/porridge/trash", porridgeController.trashPorridge);
router.patch("/porridge/:id/restore", porridgeController.restorePorridge);
router.post("/porridge/store", porridgeController.storePorridge);
router.get("/porridge/create", porridgeController.createPorridge);
router.post(
  "/porridge/handle-form-actions",
  porridgeController.handleFormActionPorridge
);
router.get("/porridge", porridgeController.mainPorridge);

module.exports = router;
