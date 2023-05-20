const express = require("express");

const router = express.Router();

const soupController = require("../../app/controllers/SoupController");

router.post(
  "/soup/trash/handle-form-restore",
  soupController.handleFormAtcSoup
);
router.get("/soup/:id/edit", soupController.editSoup);
router.put("/soup/:id", soupController.updateSoup);
router.delete("/soup/:id", soupController.deleteSoup);
router.delete("/soup/:id/force", soupController.deleteForceSoup);
router.get("/soup/trash", soupController.trashSoup);
router.patch("/soup/:id/restore", soupController.restoreSoup);
router.post("/soup/store", soupController.storeSoup);
router.get("/soup/create", soupController.createSoup);
router.post("/soup/handle-form-actions", soupController.handleFormActionSoup);
router.get("/soup", soupController.mainSoup);

module.exports = router;
