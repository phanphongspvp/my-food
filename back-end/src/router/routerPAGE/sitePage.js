const express = require("express");

const router = express.Router();

const siteController = require("../../app/controllers/SiteController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.post("/upload", verifyUser, siteController.upload);
router.get("/", verifyUser, siteController.home);

module.exports = router;
