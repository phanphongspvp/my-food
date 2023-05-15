const searchRoute = require("./searchAPI");
const userRoute = require("./userAPI");
const authRoute = require("./authAPI");
const dealRoute = require("./dealAPI");
const riceRoute = require("./riceAPI");
const coffeeRoute = require("./coffeeAPI");
const juiceRoute = require("./juiceAPI");
const milkTeaRoute = require("./milkteaAPI");
const noodleRoute = require("./noodleAPI");
const porridgeRoute = require("./porridgeAPI");
const soupRoute = require("./soupAPI");

function routerAPI(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/search", searchRoute);
  app.use("/api/users", userRoute);
  app.use("/api/deals", dealRoute);
  app.use("/api/rices", riceRoute);
  app.use("/api/coffees", coffeeRoute);
  app.use("/api/juices", juiceRoute);
  app.use("/api/milkteas", milkTeaRoute);
  app.use("/api/noodles", noodleRoute);
  app.use("/api/porridges", porridgeRoute);
  app.use("/api/soups", soupRoute);
}

module.exports = routerAPI;
