const multer = require("multer");

const Users = require("../models/Users");

class SiteController {
  home(req, res) {
    if (req.session.user) {
      const userFullNameSession = req.session.user?.fullname;
      const userAvatarSession = req.session.user?.avatar;

      res.render("home.hbs", { userFullNameSession, userAvatarSession });
    } else {
      res.redirect("/admin/login");
    }
  }

  upload(req, res) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "./src/public/images/avatars");
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    });

    const uploadFile = multer({ storage: storage }).single("file");

    const userName = req.session.user?.username;

    uploadFile(req, res, async (err) => {
      if (err) {
        return res.status(400).send({ message: "Upload file failed" });
      }

      await Users.updateOne(
        { username: userName },
        { $set: { avatar: req.file.filename } },
        { new: true }
      ).then(async () => {
        const updatedUser = await Users.findOne({ username: userName });
        req.session.user = updatedUser;
        res.redirect("/");
      });
    });
  }
}

module.exports = new SiteController();
