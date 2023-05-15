const express = require("express");

const router = express.Router();

const riceController = require("../../app/controllers/RiceController");

router.get("/rice/:id/edit", riceController.editRice);
router.put("/rice/:id", riceController.updateRice);
router.delete("/rice/:id", riceController.deleteRice);
router.get("/rice/trash", riceController.trashRice);
router.post("/rice/store", riceController.storeRice);
router.get("/rice/create", riceController.createRice);
router.post("/rice/handle-form-actions", riceController.handleFormActionRice);
router.get("/rice", riceController.mainRice);

module.exports = router;
