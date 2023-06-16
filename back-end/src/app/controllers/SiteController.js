const formidable = require("formidable");

class SiteController {
  home(req, res) {
    if (req.session.user) {
      const usernameSession = req.session.user?.fullname;
      res.render("home.hbs", { usernameSession });
    } else {
      res.redirect("/admin/login");
    }
  }

  upload(req, res, next) {
    const form = new formidable.IncomingForm();

    form.uploadDir = "/images";
    form.keepExtensions = true;
    form.maxFileSize = 10 * 1024 * 1024;
    form.multiples = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        res.json({
          result: "failed",
          data: {},
          message: `Cannot update images.Error is ${err}`,
        });
      }
      var arrayOfFiles = files[""];
      if (arrayOfFiles.length > 0) {
        var fileNames = [];
        arrayOfFiles.forEach((eachFile) => {
          fileNames.push(eachFile.path);
        });
      } else {
      }
    });
  }
}

module.exports = new SiteController();
