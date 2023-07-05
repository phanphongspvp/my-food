class UserController {
  mainUser(req, res) {
    res.render("user/homeUser");
  }
}

module.exports = new UserController();
