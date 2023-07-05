const session = require("express-session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const notifier = require("node-notifier");

const { createError } = require("../../utils/error");

const Users = require("../models/Users");

class AuthController {
  async register(req, res, next) {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = Users({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      await newUser.save();
      res.status(200).send("User has been created!");
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await Users.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect)
        return next(createError(404, "Wrong password or username"));

      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "abcd");

      const { password, isAdmin, ...otherDetails } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .render("home");
    } catch (error) {
      next(error);
    }
  }

  loginPage(req, res) {
    res.render("authentication/login", {
      layout: "bodyOnly",
    });
  }

  registerPage(req, res) {
    res.render("authentication/register", {
      layout: "bodyOnly",
    });
  }

  registerCreate(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    Users.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          res.status(404).json("Tai khoan da ton tai");
          next();
        } else {
          const users = new Users({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            birthday: req.body.birthday,
            password: hash,
          });

          req.session.user = users;

          users
            .save()
            .then(() => {
              res.redirect("/");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => console.log(err));
  }

  async handleLogin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await Users.findOne({ username: username }).exec();

      if (!user) {
        notifier.notify({
          title: "Thông báo",
          message: "Tài khoản hoặc mật khẩu không chính xác !!!",
          icon: "Message error user",
        });
        res.redirect("/");
      } else {
        const isPassWord = await bcrypt.compare(password, user.password);

        if (isPassWord) {
          req.session.user = user;
          res.redirect("/");
        } else {
          notifier.notify({
            title: "Thông báo",
            message: "Tài khoản hoặc mật khẩu không chính xác !!!",
            icon: "Message error user",
          });
          res.redirect("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleLogout(req, res) {
    if (req.session.user) {
      res.clearCookie("myCookieUser");
      res.redirect("/");
    }
  }
}

module.exports = new AuthController();
