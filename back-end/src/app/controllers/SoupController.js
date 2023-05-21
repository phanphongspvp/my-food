const { mongooseToObject } = require("../../utils/mongoose");

const { mongoosesCustomTimeAt } = require("../../utils/mongooseCustomTime");

const Soups = require("../models/Soups");

class SoupController {
  //GET PAGE soup
  mainSoup(req, res) {
    let querySoup = Soups.find({});

    Promise.all([querySoup, Soups.countDocumentsDeleted()])
      .then(([soups, deleteSoup]) => {
        res.render("soup/homeSoup", {
          deleteSoup,
          soups: mongoosesCustomTimeAt(soups),
        });
      })
      .catch();
  }

  //POST CREATE PAGE soup
  storeSoup(req, res) {
    const soups = new Soups(req.body);
    soups
      .save()
      .then(() => {
        res.redirect("/soup");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET EDIT PAGE soup
  createSoup(req, res) {
    res.render("soup/createSoup");
  }

  //GET EDIT PAGE soup
  editSoup(req, res) {
    Soups.findById(req.params.id)
      .then((soups) => {
        res.render("soup/editSoup", { soups: mongooseToObject(soups) });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //PUT EDIT PAGE soup
  updateSoup(req, res) {
    Soups.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/soup");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE soup
  deleteSoup(req, res) {
    Soups.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TRASH PAGE soup
  trashSoup(req, res) {
    Soups.findDeleted({})
      .then((soups) => {
        res.render("soup/trashSoup", {
          soups: mongoosesCustomTimeAt(soups),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //RESTORE PAGE soup
  restoreSoup(req, res) {
    Soups.restore({ _id: req.params.id })
      .then(() => res.redirect("/soup"))
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE FORCE soup
  deleteForceSoup(req, res) {
    Soups.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/soup/trash"))
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle Form Action soup
  handleFormActionSoup(req, res) {
    switch (req.body.action) {
      case "delete":
        Soups.delete({ _id: { $in: req.body.soupIds } })
          .then(() => {
            res.redirect("back");
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      default:
        res.json({ message: "Action invalid !!!" });
    }
  }

  handleFormAtcSoup(req, res) {
    switch (req.body.action) {
      case "restore":
        Soups.restore({ _id: { $in: req.body.soupIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      case "force":
        Soups.deleteMany({ _id: { $in: req.body.soupIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        res.json({ message: "Action invalid !!!" });
    }
  }

  //[GET] API list soup
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
