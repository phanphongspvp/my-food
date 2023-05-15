const Deals = require("../models/Deals");

class DealController {
  //[GET] API list deal
  async listDeal(req, res) {
    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page || 0);
    const total = await Deals.countDocuments({});

    const data = await Deals.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), data });
  }

  async listDealMain(req, res) {
    const PAGE_SIZE = 9;

    const deals = await Deals.find({}).limit(PAGE_SIZE);
    res.json(deals);
  }
}

module.exports = new DealController();
