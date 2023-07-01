const express = require("express");

const router = express.Router();

const porridgeController = require("../../app/controllers/PorridgeController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.post(
  "/porridge/trash/handle-form-restore",
  porridgeController.handleFormAtcPorridge
);
router.get("/porridge/:id/edit", verifyUser, porridgeController.editPorridge);
router.put("/porridge/:id", verifyUser, porridgeController.updatePorridge);
router.delete("/porridge/:id", verifyUser, porridgeController.deletePorridge);
router.delete(
  "/porridge/:id/force",
  verifyUser,
  porridgeController.deleteForcePorridge
);
router.get("/porridge/trash", verifyUser, porridgeController.trashPorridge);
router.patch(
  "/porridge/:id/restore",
  verifyUser,
  porridgeController.restorePorridge
);
router.post("/porridge/store", verifyUser, porridgeController.storePorridge);
router.get("/porridge/create", verifyUser, porridgeController.createPorridge);
router.post(
  "/porridge/handle-form-actions",
  verifyUser,
  porridgeController.handleFormActionPorridge
);
router.get("/porridge", verifyUser, porridgeController.mainPorridge);

module.exports = router;
