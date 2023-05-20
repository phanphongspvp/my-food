const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../utils/mongoose");

const Noodles = require("../models/Noodles");

class Noodle {
  //GET PAGE noodle
  mainNoodle(req, res) {
    let queryNoodle = Noodles.find({});

    Promise.all([queryNoodle, Noodles.countDocumentsDeleted()])
      .then(([noodles, deleteNoodle]) => {
        res.render("noodle/homeNoodle", {
          deleteNoodle,
          noodles: multipleMongooseToObject(noodles),
        });
      })
      .catch();
  }

  //POST CREATE PAGE noodle
  storeNoodle(req, res) {
    const noodles = new Noodles(req.body);
    noodles
      .save()
      .then(() => {
        res.redirect("/noodle");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET EDIT PAGE noodle
  createNoodle(req, res) {
    res.render("noodle/createNoodle");
  }

  //GET EDIT PAGE noodle
  editNoodle(req, res) {
    Noodles.findById(req.params.id)
      .then((noodles) => {
        res.render("noodle/editNoodle", {
          noodles: mongooseToObject(noodles),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //PUT EDIT PAGE noodle
  updateNoodle(req, res) {
    Noodles.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/noodle");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE noodle
  deleteNoodle(req, res) {
    Noodles.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TRASH PAGE noodle
  trashNoodle(req, res) {
    Noodles.findDeleted({})
      .then((noodles) => {
        res.render("noodle/trashNoodle", {
          noodles: multipleMongooseToObject(noodles),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //RESTORE PAGE noodle
  restoreNoodle(req, res) {
    Noodles.restore({ _id: req.params.id })
      .then(() => res.redirect("/noodle"))
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE FORCE noodle
  deleteForceNoodle(req, res) {
    Noodles.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/noodle/trash"))
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle Form Action noodle
  handleFormActionNoodle(req, res) {
    switch (req.body.action) {
      case "delete":
        Noodles.delete({ _id: { $in: req.body.noodleIds } })
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

  handleFormAtcNoodle(req, res) {
    switch (req.body.action) {
      case "restore":
        Noodles.restore({ _id: { $in: req.body.noodleIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      case "force":
        Noodles.deleteMany({ _id: { $in: req.body.noodleIds } })
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
