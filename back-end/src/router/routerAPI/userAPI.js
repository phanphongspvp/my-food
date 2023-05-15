const express = require("express");

const router = express.Router();

const { verifyUser, verifyAdmin } = require("../../utils/verifyToken");
const apiController = require("../../app/controllers/ApiController");

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logger in!");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logger in and you can delete your account!");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin, you are logger in and you can delete your accounts!");
// });

//CREATE
router.post("/", verifyUser, apiController.userCreate);

//UPDATE
router.put("/:id", verifyUser, apiController.userUpdate);

//DELETE
router.delete("/:id", verifyUser, apiController.userDelete);

//GET
router.get("/:id", verifyUser, apiController.userId);

//GET ALL
router.get("/", verifyAdmin, apiController.userAll);

module.exports = router;
