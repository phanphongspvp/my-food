const Soups = require("../models/Soups");

class SoupController {
  //[GET] API list rice
  async listSoup(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || 0);
    const total = await Soups.countDocuments({});

    const data = await Soups.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), total, data });
  }

  async listSoupMain(req, res) {
    const PAGE_SIZE = 9;

    const soups = await Soups.find({}).limit(PAGE_SIZE);
    res.json(soups);
  }
}

module.exports = new SoupController();
