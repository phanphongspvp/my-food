const express = require("express");

const router = express.Router();

const noodleController = require("../../app/controllers/NoodleController");

router.post(
  "/noodle/trash/handle-form-restore",
  noodleController.handleFormAtcNoodle
);
router.get("/noodle/:id/edit", noodleController.editNoodle);
router.put("/noodle/:id", noodleController.updateNoodle);
router.delete("/noodle/:id", noodleController.deleteNoodle);
router.delete("/noodle/:id/force", noodleController.deleteForceNoodle);
router.get("/noodle/trash", noodleController.trashNoodle);
router.patch("/noodle/:id/restore", noodleController.restoreNoodle);
router.post("/noodle/store", noodleController.storeNoodle);
router.get("/noodle/create", noodleController.createNoodle);
router.post(
  "/noodle/handle-form-actions",
  noodleController.handleFormActionNoodle
);
router.get("/noodle", noodleController.mainNoodle);

module.exports = router;
