const { mongooseToObject } = require("../../utils/mongoose");

const { mongoosesCustomTimeAt } = require("../../utils/mongooseCustomTime");

const Coffees = require("../models/Coffees");

class CoffeeController {
  //GET PAGE coffee
  mainCoffee(req, res) {
    let queryCoffee = Coffees.find({});

    Promise.all([queryCoffee, Coffees.countDocumentsDeleted()])
      .then(([coffees, deleteCoffee]) => {
        res.render("coffee/homeCoffee", {
          deleteCoffee,
          coffees: mongoosesCustomTimeAt(coffees),
        });
      })
      .catch();
  }

  //POST CREATE PAGE coffee
  storeCoffee(req, res) {
    const coffees = new Coffees(req.body);
    coffees
      .save()
      .then(() => {
        res.redirect("/coffee");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //GET EDIT PAGE coffee
  createCoffee(req, res) {
    res.render("coffee/createCoffee");
  }

  //GET EDIT PAGE coffee
  editCoffee(req, res) {
    Coffees.findById(req.params.id)
      .then((coffees) => {
        res.render("coffee/editCoffee", {
          coffees: mongooseToObject(coffees),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //PUT EDIT PAGE coffee
  updateCoffee(req, res) {
    Coffees.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/coffee");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE coffee
  deleteCoffee(req, res) {
    Coffees.delete({ _id: req.params.id })
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TRASH PAGE coffee
  trashCoffee(req, res) {
    Coffees.findDeleted({})
      .then((coffees) => {
        res.render("coffee/trashCoffee", {
          coffees: mongoosesCustomTimeAt(coffees),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //RESTORE PAGE coffee
  restoreCoffee(req, res) {
    Coffees.restore({ _id: req.params.id })
      .then(() => res.redirect("/coffee"))
      .catch((error) => {
        console.log(error);
      });
  }

  //DELETE PAGE FORCE coffee
  deleteForceCoffee(req, res) {
    Coffees.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/coffee/trash"))
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle Form Action coffee
  handleFormActionCoffee(req, res) {
    switch (req.body.action) {
      case "delete":
        Coffees.delete({ _id: { $in: req.body.coffeeIds } })
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

  handleFormAtcCoffee(req, res) {
    switch (req.body.action) {
      case "restore":
        Coffees.restore({ _id: { $in: req.body.coffeeIds } })
          .then(() => res.redirect("back"))
          .catch((err) => {
            console.log(err);
          });
        break;
      case "force":
        Coffees.deleteMany({ _id: { $in: req.body.coffeeIds } })
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
  async listCoffee(req, res) {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || 0);
    const total = await Coffees.countDocuments({});

    const data = await Coffees.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({ totalPages: Math.ceil(total / PAGE_SIZE), total, data });
  }

  async listCoffeeMain(req, res) {
    const PAGE_SIZE = 9;

    const coffees = await Coffees.find({}).limit(PAGE_SIZE);
    res.json(coffees);
  }
}

module.exports = new CoffeeController();
