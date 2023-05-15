const Noodles = require("../models/Noodles");

class Noodle {
  //[GET] API list rice
  async listNoodle(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || 0);
    const total = await Noodles.countDocuments({});

    const data = await Noodles.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), total, data });
  }

  async listNoodleMain(req, res) {
    const PAGE_SIZE = 9;

    const noodles = await Noodles.find({}).limit(PAGE_SIZE);
    res.json(noodles);
  }
}

module.exports = new Noodle();
