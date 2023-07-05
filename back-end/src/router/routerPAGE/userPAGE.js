const express = require("express");

const router = express.Router();

const userController = require("../../app/controllers/UserController");

const { verifyUser } = require("../../middleware/UserAuthentication");

router.get("/personal-information", verifyUser, userController.mainUser);

module.exports = router;
