const { mongooseToObject } = require("../../utils/mongoose");

const { mongoosesCustomTimeAt } = require("../../utils/mongooseCustomTime");

const MilkTeas = require("../models/MilkTeas");

class MilkTeaController {
  //GET PAGE milktea
  mainMilkTea(req, res) {
    let queryMilkTea = MilkTeas.find({});

    Promise.all([queryMilkTea, MilkTeas.countDocumentsDeleted()])
      .then(([milkteas, deleteMilkTea]) => {
        res.render("milktea/homeMilkTea", {
          deleteMilkTea,
          milkteas: mongoosesCustomTimeAt(milkteas),
        });
      })
      .catch();
  }

  //POST CREATE PAGE milktea
  storeMilkTea(req, res) {
    const milkteas = new MilkTeas(req.body);
    milkteas
      .save()
      .then(() => {
        res.redirect("/milktea");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET EDIT PAGE milktea
  createMilkTea(req, res) {
    res.render("milktea/createMilkTea");
  }

  //GET EDIT PAGE milktea
  editMilkTea(req, res) {
    MilkTeas.findById(req.params.id)
      .then((milkteas) => {
        res.render("milktea/editMilkTea", {
          milkteas: mongooseToObject(milkteas),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //PUT EDIT PAGE milktea
  updateMilkTea(req, res) {
    MilkTeas.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/milktea");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE milktea
  deleteMilkTea(req, res) {
    MilkTeas.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TRASH PAGE milktea
  trashMilkTea(req, res) {
    MilkTeas.findDeleted({})
      .then((milkteas) => {
        res.render("milktea/trashMilkTea", {
          milkteas: mongoosesCustomTimeAt(milkteas),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //RESTORE PAGE milktea
  restoreMilkTea(req, res) {
    MilkTeas.restore({ _id: req.params.id })
      .then(() => res.redirect("/milktea"))
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE FORCE milktea
  deleteForceMilkTea(req, res) {
    MilkTeas.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/milktea/trash"))
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle Form Action milktea
  handleFormActionMilkTea(req, res) {
    switch (req.body.action) {
      case "delete":
        MilkTeas.delete({ _id: { $in: req.body.milkteaIds } })
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

  handleFormAtcMilkTea(req, res) {
    switch (req.body.action) {
      case "restore":
        MilkTeas.restore({ _id: { $in: req.body.milkteaIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      case "force":
        MilkTeas.deleteMany({ _id: { $in: req.body.milkteaIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        res.json({ message: "Action invalid !!!" });
    }
  }

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
