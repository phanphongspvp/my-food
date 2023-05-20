const express = require("express");

const router = express.Router();

const riceController = require("../../app/controllers/RiceController");

router.post(
  "/rice/trash/handle-form-restore",
  riceController.handleFormAtcRice
);
router.get("/rice/:id/edit", riceController.editRice);
router.put("/rice/:id", riceController.updateRice);
router.delete("/rice/:id", riceController.deleteRice);
router.delete("/rice/:id/force", riceController.deleteForceRice);
router.get("/rice/trash", riceController.trashRice);
router.patch("/rice/:id/restore", riceController.restoreRice);
router.post("/rice/store", riceController.storeRice);
router.get("/rice/create", riceController.createRice);
router.post("/rice/handle-form-actions", riceController.handleFormActionRice);
router.get("/rice", riceController.mainRice);

module.exports = router;
