class SiteController {
  home(req, res) {
    res.render("home.hbs");
  }
}

module.exports = new SiteController();
