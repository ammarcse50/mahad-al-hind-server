const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { userCollection } = require("../models/db");



exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "forbidden access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.status(403).send({ message: "Forbidden Access" });
    req.decoded = decoded;
    next();
  });
};

exports.verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await userCollection.findOne({ email });
  if (user?.role === "admin") next();
  else return res.status(403).send({ message: "Forbidden Access" });
};
