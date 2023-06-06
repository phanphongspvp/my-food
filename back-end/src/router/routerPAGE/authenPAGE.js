const express = require("express");

const router = express.Router();

const authController = require("../../app/controllers/AuthController");

router.get("/admin/logout", authController.handleLogout);
router.post("/admin/login", authController.handleLogin);
router.post("/create/register", authController.registerCreate);
router.get("/admin/login", authController.loginPage);
router.get("/admin/register", authController.registerPage);

module.exports = router;
