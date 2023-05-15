const MilkTeas = require("../models/MilkTeas");

class MilkTeaController {
  //[GET] API list milk tea
  async listMilkTea(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || 0);
    const total = await MilkTeas.countDocuments({});

    const data = await MilkTeas.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), total, data });
  }

  async listMilkTeaMain(req, res) {
    const PAGE_SIZE = 9;

    const milkteas = await MilkTeas.find({}).limit(PAGE_SIZE);
    res.json(milkteas);
  }
}

module.exports = new MilkTeaController();
