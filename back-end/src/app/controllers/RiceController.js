const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../utils/mongoose");

const Rices = require("../models/Rices");

class RiceController {
  //GET PAGE rice
  mainRice(req, res) {
    let queryRice = Rices.find({});

    Promise.all([queryRice, Rices.countDocumentsDeleted()])
      .then(([rices, deleteRice]) => {
        res.render("rice/homeRice", {
          deleteRice,
          rices: multipleMongooseToObject(rices),
        });
      })
      .catch();
  }

  //POST CREATE PAGE rice
  storeRice(req, res) {
    const rices = new Rices(req.body);
    rices
      .save()
      .then(() => {
        res.redirect("/rice");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET EDIT PAGE rice
  createRice(req, res) {
    res.render("rice/createRice");
  }

  //GET EDIT PAGE rice
  editRice(req, res) {
    Rices.findById(req.params.id)
      .then((rices) => {
        res.render("rice/editRice", { rices: mongooseToObject(rices) });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //PUT EDIT PAGE rice
  updateRice(req, res) {
    Rices.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/rice");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE rice
  deleteRice(req, res) {
    Rices.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TRASH PAGE rice
  trashRice(req, res) {
    Rices.findDeleted({})
      .then((rices) => {
        res.render("rice/trashRice", {
          rices: multipleMongooseToObject(rices),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //RESTORE PAGE rice
  restoreRice(req, res) {
    Rices.restore({ _id: req.params.id })
      .then(() => res.redirect("/rice"))
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE FORCE rice
  deleteForceRice(req, res) {
    Rices.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/rice/trash"))
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle Form Action rice
  handleFormActionRice(req, res) {
    switch (req.body.action) {
      case "delete":
        Rices.delete({ _id: { $in: req.body.riceIds } })
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

  handleFormAtcRice(req, res) {
    switch (req.body.action) {
      case "restore":
        Rices.restore({ _id: { $in: req.body.riceIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      case "force":
        Rices.deleteMany({ _id: { $in: req.body.riceIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        res.json({ message: "Action invalid !!!" });
    }
  }

  //[GET] API list rice
  async listRice(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || 0);
    const total = await Rices.countDocuments({});

    const data = await Rices.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), total, data });
  }

  async listRiceMain(req, res) {
    const PAGE_SIZE = 9;

    const rices = await Rices.find({}).limit(PAGE_SIZE);
    res.json(rices);
  }
}

module.exports = new RiceController();
