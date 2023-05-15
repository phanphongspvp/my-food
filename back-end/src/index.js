const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const port = 5000;

const app = express();
const routerAPI = require("./router/routerAPI");
const routerPAGE = require("./router/routerPAGE");
const db = require("./config/db");

dotenv.config();

//Path default
app.use(express.static(path.join(__dirname, "/public")));

//Method-override middleware
app.use(methodOverride("_method"));

//Middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

routerAPI(app);
routerPAGE(app);

app.listen(port, () => {
  //Connect database
  db.connect();

  //App listening port
  console.log(`App listening http://localhost:${port}`);
});
