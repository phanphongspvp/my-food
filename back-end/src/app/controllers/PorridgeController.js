const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../utils/mongoose");

const Porridges = require("../models/Porridges");

class PorridgeController {
  //GET PAGE porridge
  mainPorridge(req, res) {
    let queryPorridge = Porridges.find({});

    Promise.all([queryPorridge, Porridges.countDocumentsDeleted()])
      .then(([porridges, deletePorridge]) => {
        res.render("porridge/homePorridge", {
          deletePorridge,
          porridges: multipleMongooseToObject(porridges),
        });
      })
      .catch();
  }

  //POST CREATE PAGE porridge
  storePorridge(req, res) {
    const porridges = new Porridges(req.body);
    porridges
      .save()
      .then(() => {
        res.redirect("/porridge");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET EDIT PAGE porridge
  createPorridge(req, res) {
    res.render("porridge/createPorridge");
  }

  //GET EDIT PAGE porridge
  editPorridge(req, res) {
    Porridges.findById(req.params.id)
      .then((porridges) => {
        res.render("porridge/editPorridge", {
          porridges: mongooseToObject(porridges),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //PUT EDIT PAGE porridge
  updatePorridge(req, res) {
    Porridges.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/porridge");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE porridge
  deletePorridge(req, res) {
    Porridges.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TRASH PAGE porridge
  trashPorridge(req, res) {
    Porridges.findDeleted({})
      .then((porridges) => {
        res.render("porridge/trashPorridge", {
          porridges: multipleMongooseToObject(porridges),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //RESTORE PAGE porridge
  restorePorridge(req, res) {
    Porridges.restore({ _id: req.params.id })
      .then(() => res.redirect("/porridge"))
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE FORCE porridge
  deleteForcePorridge(req, res) {
    Porridges.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/porridge/trash"))
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle Form Action porridge
  handleFormActionPorridge(req, res) {
    switch (req.body.action) {
      case "delete":
        Porridges.delete({ _id: { $in: req.body.porridgeIds } })
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

  handleFormAtcPorridge(req, res) {
    switch (req.body.action) {
      case "restore":
        Porridges.restore({ _id: { $in: req.body.porridgeIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      case "force":
        Porridges.deleteMany({ _id: { $in: req.body.porridgeIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        res.json({ message: "Action invalid !!!" });
    }
  }

  //[GET] API list porridge
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
