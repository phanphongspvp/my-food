const Porridges = require("../models/Porridges");

class PorridgeController {
  //[GET] API list rice
  async listPorridge(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || 0);
    const total = await Porridges.countDocuments({});

    const data = await Porridges.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), total, data });
  }

  async listPorridgeMain(req, res) {
    const PAGE_SIZE = 9;

    const porridges = await Porridges.find({}).limit(PAGE_SIZE);
    res.json(porridges);
  }
}

module.exports = new PorridgeController();
