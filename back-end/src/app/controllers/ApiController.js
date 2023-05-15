const infoShop = require("../../data/dataInfoShop");
const Users = require("../models/Users");

// const { createError } = require("../../utils/error");

class ApiController {
  //[GET] API search
  search(req, res) {
    const { q } = req.query;

    const keys = ["title", "address", "category"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };

    res.json(search(infoShop).splice(0, 10));
  }

  //[CREATE] user
  async userCreate(req, res) {
    const newUser = new Users(req.body);

    try {
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[UPDATE] user
  async userUpdate(req, res) {
    try {
      const updateUser = await Users.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[DELETE] user
  async userDelete(req, res) {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[GET] one user
  async userId(req, res) {
    try {
      const user = await Users.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[GET] all user
  async userAll(req, res, next) {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ApiController();
