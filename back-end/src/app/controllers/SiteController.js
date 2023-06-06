class SiteController {
  home(req, res) {
    const usernameSession = req.session.user?.fullname;
    res.render("home.hbs", { usernameSession });
  }
}

module.exports = new SiteController();
