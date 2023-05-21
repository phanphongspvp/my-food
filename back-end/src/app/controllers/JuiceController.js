const { mongooseToObject } = require("../../utils/mongoose");

const { mongoosesCustomTimeAt } = require("../../utils/mongooseCustomTime");

const Juices = require("../models/Juices");

class JuiceController {
  //GET PAGE juice
  mainJuice(req, res) {
    let queryJuice = Juices.find({});

    Promise.all([queryJuice, Juices.countDocumentsDeleted()])
      .then(([juices, deleteJuice]) => {
        res.render("juice/homeJuice", {
          deleteJuice,
          juices: mongoosesCustomTimeAt(juices),
        });
      })
      .catch();
  }

  //POST CREATE PAGE juice
  storeJuice(req, res) {
    const juices = new Juices(req.body);
    juices
      .save()
      .then(() => {
        res.redirect("/juice");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET EDIT PAGE juice
  createJuice(req, res) {
    res.render("juice/createJuice");
  }

  //GET EDIT PAGE juice
  editJuice(req, res) {
    Juices.findById(req.params.id)
      .then((juices) => {
        res.render("juice/editJuice", {
          juices: mongooseToObject(juices),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //PUT EDIT PAGE juice
  updateJuice(req, res) {
    Juices.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/juice");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE juice
  deleteJuice(req, res) {
    Juices.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TRASH PAGE juice
  trashJuice(req, res) {
    Juices.findDeleted({})
      .then((juices) => {
        res.render("juice/trashJuice", {
          juices: mongoosesCustomTimeAt(juices),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //RESTORE PAGE juice
  restoreJuice(req, res) {
    Juices.restore({ _id: req.params.id })
      .then(() => res.redirect("/juice"))
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE FORCE juice
  deleteForceJuice(req, res) {
    Juices.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/juice/trash"))
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle Form Action juice
  handleFormActionJuice(req, res) {
    switch (req.body.action) {
      case "delete":
        Juices.delete({ _id: { $in: req.body.juiceIds } })
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

  handleFormAtcJuice(req, res) {
    switch (req.body.action) {
      case "restore":
        Juices.restore({ _id: { $in: req.body.juiceIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      case "force":
        Juices.deleteMany({ _id: { $in: req.body.juiceIds } })
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
