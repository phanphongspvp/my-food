const express = require("express");

const router = express.Router();

const riceController = require("../../app/controllers/RiceController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.post(
  "/rice/trash/handle-form-restore",
  riceController.handleFormAtcRice
);
router.get("/rice/:id/edit", verifyUser, riceController.editRice);
router.put("/rice/:id", verifyUser, riceController.updateRice);
router.delete("/rice/:id", verifyUser, riceController.deleteRice);
router.delete("/rice/:id/force", verifyUser, riceController.deleteForceRice);
router.get("/rice/trash", verifyUser, riceController.trashRice);
router.patch("/rice/:id/restore", verifyUser, riceController.restoreRice);
router.post("/rice/store", verifyUser, riceController.storeRice);
router.get("/rice/create", verifyUser, riceController.createRice);
router.post(
  "/rice/handle-form-actions",
  verifyUser,
  riceController.handleFormActionRice
);
router.get("/rice", verifyUser, riceController.mainRice);

module.exports = router;
