const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        .json({ ...otherDetails });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
