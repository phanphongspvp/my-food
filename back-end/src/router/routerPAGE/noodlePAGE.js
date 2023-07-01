const express = require("express");

const router = express.Router();

const noodleController = require("../../app/controllers/NoodleController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.post(
  "/noodle/trash/handle-form-restore",
  noodleController.handleFormAtcNoodle
);
router.get("/noodle/:id/edit", verifyUser, noodleController.editNoodle);
router.put("/noodle/:id", verifyUser, noodleController.updateNoodle);
router.delete("/noodle/:id", verifyUser, noodleController.deleteNoodle);
router.delete(
  "/noodle/:id/force",
  verifyUser,
  noodleController.deleteForceNoodle
);
router.get("/noodle/trash", verifyUser, noodleController.trashNoodle);
router.patch("/noodle/:id/restore", verifyUser, noodleController.restoreNoodle);
router.post("/noodle/store", verifyUser, noodleController.storeNoodle);
router.get("/noodle/create", verifyUser, noodleController.createNoodle);
router.post(
  "/noodle/handle-form-actions",
  verifyUser,
  noodleController.handleFormActionNoodle
);
router.get("/noodle", verifyUser, noodleController.mainNoodle);

module.exports = router;
