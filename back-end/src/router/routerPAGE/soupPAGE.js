const express = require("express");

const router = express.Router();

const soupController = require("../../app/controllers/SoupController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.post(
  "/soup/trash/handle-form-restore",
  soupController.handleFormAtcSoup
);
router.get("/soup/:id/edit", verifyUser, soupController.editSoup);
router.put("/soup/:id", verifyUser, soupController.updateSoup);
router.delete("/soup/:id", verifyUser, soupController.deleteSoup);
router.delete("/soup/:id/force", verifyUser, soupController.deleteForceSoup);
router.get("/soup/trash", verifyUser, soupController.trashSoup);
router.patch("/soup/:id/restore", verifyUser, soupController.restoreSoup);
router.post("/soup/store", verifyUser, soupController.storeSoup);
router.get("/soup/create", verifyUser, soupController.createSoup);
router.post(
  "/soup/handle-form-actions",
  verifyUser,
  soupController.handleFormActionSoup
);
router.get("/soup", verifyUser, soupController.mainSoup);

module.exports = router;
