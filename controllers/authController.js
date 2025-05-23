const jwt = require("jsonwebtoken");

exports.generateToken = (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  res.send({ token });
};