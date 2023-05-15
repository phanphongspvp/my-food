const Coffees = require("../models/Coffees");

class CoffeeController {
  //[GET] API list rice
  async listCoffee(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || 0);
    const total = await Coffees.countDocuments({});

    const data = await Coffees.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), total, data });
  }

  async listCoffeeMain(req, res) {
    const PAGE_SIZE = 9;

    const coffees = await Coffees.find({}).limit(PAGE_SIZE);
    res.json(coffees);
  }
}

module.exports = new CoffeeController();
