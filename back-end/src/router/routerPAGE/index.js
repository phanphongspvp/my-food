const sitePage = require("./sitePage");
const ricePage = require("./ricePAGE");
const soupPage = require("./soupPAGE");
const porridgePage = require("./porridgePAGE");
const noodlePage = require("./noodlePAGE");
const milkteaPage = require("./milkteaPAGE");
const juicePage = require("./juicePAGE");
const coffeePage = require("./coffeePAGE");
const authPage = require("./authenPAGE");
const userPage = require("./userPAGE");

function routerPAGE(app) {
  app.use("/", sitePage);
  app.use("/", ricePage);
  app.use("/", soupPage);
  app.use("/", porridgePage);
  app.use("/", noodlePage);
  app.use("/", milkteaPage);
  app.use("/", juicePage);
  app.use("/", coffeePage);
  app.use("/", authPage);
  app.use("/", userPage);
}

module.exports = routerPAGE;
