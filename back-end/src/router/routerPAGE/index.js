const sitePage = require("./sitePage");
const ricePage = require("./ricePAGE");

function routerPAGE(app) {
  app.use("/", sitePage);
  app.use("/", ricePage);
}

module.exports = routerPAGE;
