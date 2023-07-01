const express = require("express");

const router = express.Router();

const juiceController = require("../../app/controllers/JuiceController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.post(
  "/juice/trash/handle-form-restore",
  juiceController.handleFormAtcJuice
);
router.get("/juice/:id/edit", verifyUser, juiceController.editJuice);
router.put("/juice/:id", verifyUser, juiceController.updateJuice);
router.delete("/juice/:id", verifyUser, juiceController.deleteJuice);
router.delete("/juice/:id/force", verifyUser, juiceController.deleteForceJuice);
router.get("/juice/trash", verifyUser, juiceController.trashJuice);
router.patch("/juice/:id/restore", verifyUser, juiceController.restoreJuice);
router.post("/juice/store", verifyUser, juiceController.storeJuice);
router.get("/juice/create", verifyUser, juiceController.createJuice);
router.post(
  "/juice/handle-form-actions",
  verifyUser,
  juiceController.handleFormActionJuice
);
router.get("/juice", verifyUser, juiceController.mainJuice);

module.exports = router;
