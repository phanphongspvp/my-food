const Juices = require("../models/Juices");

class JuiceController {
  //[GET] API list rice
  async listJuice(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || 0);
    const total = await Juices.countDocuments({});

    const data = await Juices.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), total, data });
  }

  async listJuiceMain(req, res) {
    const PAGE_SIZE = 9;

    const juices = await Juices.find({}).limit(PAGE_SIZE);
    res.json(juices);
  }
}

module.exports = new JuiceController();
