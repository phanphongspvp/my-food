const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const createJWT = () => {
  let payload = { username: "phanphongspvp", isAdmin: true };
  let key = process.env.JWT_SECRET;
  let token = null;

  try {
    token = jwt.sign(payload, key);
  } catch (err) {
    console.log(err);
  }

  console.log(token);
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;

  jwt.verify(token, key, function (err, decoded) {
    if (err) {
      console.log(err);
      return data;
    }
    console.log(decoded);
    return decoded;
  });
};

module.exports = { createJWT, verifyToken };
