const sitePage = require("./sitePage");
const ricePage = require("./ricePAGE");
const soupPage = require("./soupPAGE");
const porridgePage = require("./porridgePAGE");
const noodlePage = require("./noodlePAGE");

function routerPAGE(app) {
  app.use("/", sitePage);
  app.use("/", ricePage);
  app.use("/", soupPage);
  app.use("/", porridgePage);
  app.use("/", noodlePage);
}

module.exports = routerPAGE;
